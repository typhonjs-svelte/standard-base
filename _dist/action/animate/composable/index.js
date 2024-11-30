import { Timing } from '#runtime/util';
import { isObject } from '#runtime/util/object';
import { CrossWindow } from '#runtime/util/browser';
import { A11yHelper } from '#runtime/util/a11y';

/**
 * Defines a higher order function returning an action that triggers WAAPI / `Element.animate` animations from
 * provided keyframes and options in response to a given event. The default event is the `click` event. You may change
 * that to any
 *
 * @param {import('./types').ComposableActionOptions.AnimateWAAPI} [options] - Optional parameters.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Element/animate
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API/Keyframe_Formats
 *
 * @returns {(import('svelte/action').Action<
 *    HTMLElement,
 *    import('svelte/action').ActionReturn<import('./types').ComposableActionOptions.AnimateWAAPI>
 * >)} Actual `animateWAAPI` Action.
 */
function animateWAAPI({ debounce, enabled = true, duration = 600, event = 'click', keyframes = [],
 keyframeOptions, strategy = 'cancel' } = {})
{
   return (element, initialOptions) =>
   {
      /** @type {Animation} */
      let animation;

      /**
       * Defines the animation finished / canceled operation clearing the existing animation reference.
       */
      function animationFinished()
      {
         if (animation)
         {
            animation.effect = void 0;
            animation = void 0;
         }
      }

      /**
       * Creates WAAPI animation.
       */
      function createAnimation()
      {
         if (!enabled) { return; }

         if (animation !== void 0)
         {
            switch (strategy)
            {
               default:
               case 'cancel':
                  if (animation?.playState !== 'finished')
                  {
                     animation.cancel();
                     animationFinished();
                  }
                  break;

               case 'exclusive':
                  // Exclusive animations simply return immediately as an animation is already in progress.
                  return;
            }
         }

         animation = element.animate(keyframes, isObject(keyframeOptions) ? keyframeOptions : duration);
         animation.onfinish = animationFinished;
      }

      /**
       * Updates options.
       *
       * @param {import('./types').ComposableActionOptions.AnimateWAAPI} newOptions - Options to update.
       */
      function updateOptions(newOptions)
      {
         if (typeof newOptions?.debounce === 'number' && debounce !== newOptions.debounce)
         {
            element.removeEventListener(event, eventFn);

            eventFn = Number.isInteger(debounce) && debounce > 0 ? Timing.debounce(createAnimation, debounce) :
               createAnimation;

            element.addEventListener(event, eventFn);
         }

         if (typeof newOptions?.enabled === 'boolean') { enabled = newOptions.enabled; }

         if (typeof newOptions?.duration === 'number') { duration = newOptions.duration; }

         if (typeof newOptions?.event === 'string' && event !== newOptions.event)
         {
            element.removeEventListener(event, eventFn);

            event = newOptions.event;

            element.addEventListener(event, eventFn);
         }

         if (Array.isArray(newOptions?.keyframes) || isObject(newOptions?.keyframes))
         {
            keyframes = newOptions.keyframes;
         }

         if (isObject(newOptions?.keyframeOptions)) { keyframeOptions = newOptions.keyframeOptions; }

         if (typeof newOptions?.strategy === 'string' && strategy !== newOptions.strategy)
         {
            strategy = newOptions.strategy;
         }
      }

      let eventFn = Number.isInteger(debounce) && debounce > 0 ? Timing.debounce(createAnimation, debounce) :
       createAnimation;

      element.addEventListener(event, eventFn);

      // Update options with any action assigned initial options.
      if (isObject(initialOptions)) { updateOptions(initialOptions); }

      return {
         update: updateOptions,
         destroy: () => element.removeEventListener(event, eventFn)
      };
   };
}

/**
 * Combines multiple composable actions.
 *
 * Note: The update function passes the same variable to all update functions of each action.
 *
 * TODO: This is a naive implementation and will be further refined in the near future.
 *
 * @param {...import('svelte/action').Action} actions - One or more composable action functions to combine.
 *
 * @returns {import('svelte/action').Action<HTMLElement, any>} Composed action.
 */
function composable(...actions)
{
   return (element, options) =>
   {
      let lifecycle = actions.map((action) => action(element, options));

      return {
         destroy: () =>
         {
            for (const action of lifecycle)
            {
               if (typeof action.destroy === 'function') { action.destroy(); }
            }

            lifecycle = void 0;
         },
         update: (parameters) =>
         {
            for (const action of lifecycle)
            {
               if (typeof action.update === 'function') { action.update(parameters); }
            }
         }
      };
   };
}

/**
 * Defines the classic Material Design ripple effect as an action. `ripple` is a wrapper around the returned action.
 * This allows it to be easily used as a prop.
 *
 * Note: A negative one translateZ transform is applied to the added spans allowing other content to be layered on top
 * with a positive translateZ.
 *
 * Note: The ripple effect requires the `efx` element to have overflow hidden. This is set inline when the effect is
 * applied.
 *
 * Note: A CustomEvent `efx-trigger` is handled in cases when explicit triggering is necessary. This event should
 * have the actual source event as a property of `detail`.
 *
 * Styling: There is a single CSS variable `--tjs-action-ripple-background` that can be set to control the background.
 *
 * @param {object}   [opts] - Optional parameters.
 *
 * @param {string}   [opts.background='rgba(255, 255, 255, 0.7)'] - A valid CSS background attribute.
 *
 * @param {number}   [opts.duration=600] - Duration in milliseconds.
 *
 * @param {boolean}  [opts.enabled=true] - Enabled state.
 *
 * @param {Iterable<string>}  [opts.events=['click', 'keyup']] - DOM event to bind element to respond with the ripple
 *                                                                  effect.
 *
 * @param {string}   [opts.keyCode='Enter'] - Key code to trigger for any applicable key events.
 *
 * @param {boolean}  [opts.contextmenu=false] - Add triggering for context menu key and click.
 *
 * @param {number}   [opts.debounce=undefined] - Add a debounce to incoming events in milliseconds.
 *
 * @returns {(import('svelte/action').Action<
 *    HTMLElement,
 *    import('svelte/action').ActionReturn<import('./types').ComposableActionOptions.Ripple>
 * >)} Actual `ripple` Action.
 */
function ripple({ background = 'rgba(255, 255, 255, 0.7)', contextmenu = false, debounce, duration = 600,
 enabled = true, events = ['click', 'keyup'], keyCode = 'Enter' } = {})
{
   return (element, initialOptions) =>
   {
      // Ripple requires the efx element to have the overflow hidden due to rendering content outside the boundary.
      element.style.overflow = 'hidden';

      /**
       * Creates the ripple effect.
       *
       * @param {MouseEvent|KeyboardEvent}   e -
       */
      function createRipple(e)
      {
         if (!enabled) { return; }

         const elementRect = element.getBoundingClientRect();

         const diameter = Math.max(elementRect.width, elementRect.height);
         const radius = diameter / 2;

         let left, top;

         // Firefox currently (11/24) does not correctly determine the location of a keyboard originated
         // context menu location, so default to 0 instead of using `clientX` / `clientY`.
         if (e?.button !== 2 && e.type === 'contextmenu')
         {
            left = '0';
            top = '0';
         }
         else
         {
            // Find the adjusted click location relative to center or if no `clientX/Y` parameters choose center.
            left = e.clientX ? `${e.clientX - (elementRect.left + radius)}px` : '0';
            top = e.clientY ? `${e.clientY - (elementRect.top + radius)}px` : '0';
         }

         const span = document.createElement('span');

         span.style.position = 'absolute';
         span.style.width = `${diameter}px`;
         span.style.height = `${diameter}px`;
         span.style.left = left;
         span.style.top = top;

         span.style.background = `var(--tjs-action-ripple-background, ${background})`;
         span.style.borderRadius = '50%';
         span.style.pointerEvents = 'none';
         span.style.transform = 'translateZ(-1px)';

         element.prepend(span);

         const animation = span.animate([
            {  // from
               transform: 'scale(.7)',
               opacity: 0.5,
               filter: 'blur(2px)'
            },
            {  // to
               transform: 'scale(4)',
               opacity: 0,
               filter: 'blur(5px)'
            }
         ],
         duration);

         animation.onfinish = () =>
         {
            if (span && span.isConnected) { span.remove(); }
         };
      }

      /**
       * Handles a custom event trigger `efx-trigger`. The `CustomEvent` should have an `event` object accessible from
       * `detail`.
       *
       * @param {CustomEvent} event - CustomEvent.
       */
      function customHandler(event)
      {
         const actual = event?.detail?.event;

         if (CrossWindow.isUserInputEvent(actual)) { createRipple(actual); }

         event.preventDefault();
         event.stopPropagation();
      }

      /**
       * Handles any key event and only triggers the ripple effect if key code matches.
       *
       * @param {KeyboardEvent}  event -
       */
      function keyHandler(event)
      {
         if (!enabled) { return; }

         if (event?.code === keyCode) { createRipple(event); }
      }

      /**
       * Updates options.
       *
       * @param {import('./types').ComposableActionOptions.Ripple} newOptions - Options to update.
       */
      function updateOptions(newOptions)
      {
         if (typeof newOptions?.enabled === 'boolean') { enabled = newOptions.enabled; }
      }

      const eventFn = Number.isInteger(debounce) && debounce > 0 ? Timing.debounce(createRipple, debounce) :
       createRipple;

      const customEventFn = Number.isInteger(debounce) && debounce > 0 ? Timing.debounce(customHandler, debounce) :
       customHandler;

      const keyEventFn = Number.isInteger(debounce) && debounce > 0 ? Timing.debounce(keyHandler, debounce) :
       keyHandler;

      for (const event of events)
      {
         if (['keydown', 'keyup'].includes(event))
         {
            element.addEventListener(event, keyEventFn);
         }
         else
         {
            element.addEventListener(event, eventFn);
         }
      }

      element.addEventListener('efx-trigger', customEventFn);

      if (contextmenu) { element.addEventListener('contextmenu', eventFn); }

      // Update options with any action assigned initial options.
      if (isObject(initialOptions)) { updateOptions(initialOptions); }

      return {
         update: updateOptions,
         destroy: () =>
         {
            for (const event of events)
            {
               if (['keydown', 'keyup'].includes(event))
               {
                  element.removeEventListener(event, keyEventFn);
               }
               else
               {
                  element.removeEventListener(event, eventFn);
               }
            }

            element.removeEventListener('efx-trigger', customEventFn);

            if (contextmenu) { element.removeEventListener('contextmenu', eventFn); }
         }
      };
   };
}

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
function rippleFocus({ background = 'rgba(255, 255, 255, 0.7)', duration = 300, enabled = true, selector } = {})
{
   return (element, initialOptions) =>
   {
      // Ripple requires the efx element to have the overflow hidden due to rendering content outside the boundary.
      element.style.overflow = 'hidden';

      const targetEl = typeof selector === 'string' ? element.querySelector(selector) :
       A11yHelper.isFocusTarget(element.firstChild) ? element.firstChild : element;

      let clientX = -1;
      let clientY = -1;

      /** @type {HTMLSpanElement[]} */
      const activeSpans = [];

      /**
       * WAAPI ripple animation on blur.
       */
      function blurRipple()
      {
         if (!enabled) { return; }

         // When clicking outside the browser window or to another tab `document.activeElement` remains
         // the same despite blur being invoked; IE the target element.
         if (activeSpans.length === 0 || targetEl === CrossWindow.getActiveElement(targetEl)) { return; }

         for (const span of activeSpans)
         {
            const animation = span.animate(
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
             });

            animation.onfinish = () =>
            {
               if (span.isConnected) { span.remove(); }
            };
         }

         // Remove all active spans as they are now animating out.
         activeSpans.length = 0;
      }

      /**
       * WAAPI ripple animation on focus.
       */
      function focusRipple()
      {
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

         const span = document.createElement('span');

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

         activeSpans.push(span);

         span.animate([
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
         });

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
         }
      };
   };
}

export { animateWAAPI, composable, ripple, rippleFocus };
//# sourceMappingURL=index.js.map
