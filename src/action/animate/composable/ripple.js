import { Timing }       from '#runtime/util';
import { CrossWindow }  from '#runtime/util/browser';
import { isObject }     from '#runtime/util/object';

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
export function ripple({ background = 'rgba(255, 255, 255, 0.7)', contextmenu = false, debounce, duration = 600,
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
