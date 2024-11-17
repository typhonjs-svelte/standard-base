import { Timing }    from '#runtime/util';
import { isObject }  from '#runtime/util/object';

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
export function animateWAAPI({ debounce, enabled = true, duration = 600, event = 'click', keyframes = [],
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
