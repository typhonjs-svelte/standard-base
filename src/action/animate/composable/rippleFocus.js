import { A11yHelper }         from '#runtime/util/a11y';
import { nextAnimationFrame } from '#runtime/util/animate';
import { isObject }           from '#runtime/util/object';
import { CrossRealm }         from '#runtime/util/realm';

/**
 * Defines the classic Material Design ripple effect as an action that is attached to an elements focus and blur events.
 * `rippleFocus` is a wrapper around the returned action. This allows it to be easily used as a prop.
 *
 * Note: A negative one translateZ transform is applied to the added spans allowing other content to be layered on top
 * with a positive translateZ.
 *
 * Note: The ripple effect requires the `efx` element to have overflow hidden. This is set inline when the effect is
 * applied.
 *
 * If providing the `selector` option a target child element will be registered for the focus events otherwise the
 * first child is targeted with a final fallback of the element assigned to this action.
 *
 * Styling: There is a single CSS variable `--tjs-action-ripple-background-focus` that can be set to control the
 * background with a fallback to `--tjs-action-ripple-background`.
 *
 * @param {object}   [opts] - Optional parameters.
 *
 * @param {number}   [opts.duration=300] - Duration in milliseconds.
 *
 * @param {boolean}  [opts.enabled=true] - Enabled state.
 *
 * @param {string}   [opts.background='rgba(255, 255, 255, 0.7)'] - A valid CSS background attribute.
 *
 * @param {string}   [opts.selector] - A valid CSS selector string.
 *
 * @returns {(import('svelte/action').Action<
 *    HTMLElement,
 *    import('svelte/action').ActionReturn<import('./types').ComposableActionOptions.RippleFocus>
 * >)} Actual `rippleFocus` Action.
 */
export function rippleFocus({ background = 'rgba(255, 255, 255, 0.7)', duration = 300, enabled = true, selector } = {})
{
   return (element, initialOptions) =>
   {
      // Ripple requires the efx element to have the overflow hidden due to rendering content outside the boundary.
      element.style.overflow = 'hidden';

      const targetEl = typeof selector === 'string' ? element.querySelector(selector) :
       A11yHelper.isFocusTarget(element.firstChild) ? element.firstChild : element;

      /**
       * Holds any reference to targetEl active window when focused.
       *
       * @type {Window}
       */
      let activeWindow = void 0;

      /**
       * True when `targetEl` is the activeElement when Window blurs.
       *
       * @type {boolean}
       */
      let windowBlurActiveFocus = false;

      let clientX = -1;
      let clientY = -1;

      /** @type {HTMLSpanElement[]} */
      const activeSpans = [];

      /**
       * WAAPI ripple animation on blur.
       */
      function blurRipple(event, force = false)
      {
         if (!enabled) { return; }

         // When clicking outside the browser window or to another tab `document.activeElement` remains
         // the same despite blur being invoked; IE the target element.
         if (!force && (activeSpans.length === 0 || targetEl === CrossRealm.browser.getActiveElement(targetEl)))
         {
            return;
         }

         for (const span of activeSpans)
         {
            try
            {
               // Always use main realm / window for animation even when cross-realm.

               const effect = new window.KeyframeEffect(span,
                  [
                     {  // from
                        transform: 'scale(3)',
                        opacity: 0.3,
                     },
                     {  // to
                        transform: 'scale(.7)',
                        opacity: 0.0,
                     }
                  ],
                  {
                     duration,
                     fill: 'forwards'
                  }
               );

               const animation = new window.Animation(effect);

               animation.onfinish = () =>
               {
                  if (span) { span.remove(); }
               };

               animation.play();
            }
            catch
            {
               if (span) { span.remove(); }
            }
         }

         // Remove all active spans as they are now animating out.
         activeSpans.length = 0;

         // Sanity to clean up event listener despite it being `once`.
         activeWindow?.removeEventListener?.('blur', blurRippleForced);
         activeWindow = void 0;
      }

      /**
       * Invoked by window blur event to force blur ripple when active window loses focus.
       */
      function blurRippleForced(event)
      {
         // If targetEl is the active element when Window blurs keep track of this state to defer focus when the Window
         // regains focus.
         if (CrossRealm.browser.isActiveElement(targetEl)) { windowBlurActiveFocus = true; }

         // Force blur
         blurRipple(event, true);
      }

      /**
       * WAAPI ripple animation on focus.
       */
      async function focusRipple()
      {
         // If the window was blurred and regains focus a 2 rAF delay occurs to recheck if `targetEl` is the active
         // element. This handles the case when the exiting active element receives automatic focus despite another
         // element being activated when the browser window is focused again ensuring that the proper actual active
         // element receives the focus animation.
         if (windowBlurActiveFocus)
         {
            windowBlurActiveFocus = false;

            await nextAnimationFrame(2);

            if (!CrossRealm.browser.isActiveElement(targetEl)) { return; }
         }

         if (!enabled) { return; }

         // If already focused and the span exists do not create another ripple effect.
         if (activeSpans.length > 0) { return; }

         const elementRect = element.getBoundingClientRect();

         // The order of events don't always occur with a pointer event first. In this case use the center of the
         // element as the click point. Mostly this is seen when the focused target element has a followup event off
         // the app / screen. If the next pointer down occurs on the target element the focus callback occurs before
         // pointer down in Chrome and Firefox.
         const actualX = clientX >= 0 ? clientX : elementRect.left + (elementRect.width / 2);
         const actualY = clientY >= 0 ? clientY : elementRect.top + (elementRect.height / 2);

         const diameter = Math.max(elementRect.width, elementRect.height);
         const radius = diameter / 2;
         const left = `${actualX - (elementRect.left + radius)}px`;
         const top = `${actualY - (elementRect.top + radius)}px`;

         const span = CrossRealm.browser.getDocument(element).createElement('span');

         span.style.position = 'absolute';
         span.style.width = `${diameter}px`;
         span.style.height = `${diameter}px`;
         span.style.left = left;
         span.style.top = top;

         span.style.background =
          `var(--tjs-action-ripple-background-focus, var(--tjs-action-ripple-background, ${background}))`;

         span.style.borderRadius = '50%';
         span.style.pointerEvents = 'none';
         span.style.transform = 'translateZ(-1px)';

         element.prepend(span);

         try
         {
            // Always use main realm / window for animation even when cross-realm.

            const effect = new window.KeyframeEffect(span,
               [
                  {  // from
                     transform: 'scale(.7)',
                     opacity: 0.5,
                  },
                  {  // to
                     transform: 'scale(3)',
                     opacity: 0.3,
                  }
               ],
               {
                  duration,
                  fill: 'forwards'
               }
            );

            const animation = new window.Animation(effect);
            animation.play();

            activeSpans.push(span);

            // Forced blur ripple when current window is blurred.
            activeWindow = targetEl.ownerDocument.defaultView;
            activeWindow.addEventListener('blur', blurRippleForced, { once: true });
         }
         catch
         {
            if (span) { span.remove(); }
         }

         // Reset stored pointer position.
         clientX = clientY = -1;
      }

      /**
       * Store the pointer down location for the origination of the ripple.
       *
       * @param {PointerEvent} e - A PointerEvent.
       */
      function onPointerDown(e)
      {
         if (!enabled) { return; }

         clientX = e.clientX;
         clientY = e.clientY;
      }

      /**
       * Updates options.
       *
       * @param {import('./types').ComposableActionOptions.RippleFocus} newOptions - Options to update.
       */
      function updateOptions(newOptions)
      {
         if (typeof newOptions?.enabled === 'boolean' && enabled !== newOptions?.enabled)
         {
            enabled = newOptions.enabled;
            if (!enabled) { blurRipple(); }
         }
      }

      targetEl.addEventListener('pointerdown', onPointerDown);
      targetEl.addEventListener('blur', blurRipple);
      targetEl.addEventListener('focus', focusRipple);

      // Update options with any action assigned initial options.
      if (isObject(initialOptions)) { updateOptions(initialOptions); }

      return {
         update: updateOptions,
         destroy: () =>
         {
            targetEl.removeEventListener('pointerdown', onPointerDown);
            targetEl.removeEventListener('blur', blurRipple);
            targetEl.removeEventListener('focus', focusRipple);

            activeWindow?.removeEventListener?.('blur', blurRippleForced);
            activeWindow = void 0;
         }
      };
   };
}
