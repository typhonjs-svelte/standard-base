/**
 * Defines the options for all composable animation actions.
 */
namespace ComposableActionOptions {
   /**
    * Defines the options for the {@link animateWAAPI} action.
    *
    * @see https://developer.mozilla.org/en-US/docs/Web/API/Element/animate
    * @see https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API/Keyframe_Formats
    */
   export type AnimateWAAPI = {
      /**
       * Add a debounce to incoming events in milliseconds. Consider using the `exclusive` strategy.
       */
      debounce?: number;

      /**
       * Duration in milliseconds. Default value: `600`.
       */
      duration?: number;

      /**
       * Is the animation enabled. Default value: `true`.
       */
      enabled?: boolean;

      /**
       * DOM event name to bind element to respond with the WAAPI animation. Default value: `click`.
       */
      event?: keyof HTMLElementEventMap;

      /**
       * An array of keyframe objects or a keyframe object whose properties are arrays of values to iterate over.
       */
      keyframes: Keyframe[] | PropertyIndexedKeyframes;

      /**
       * An object containing one or more timing properties. When defined it is used instead of `duration`.
       */
      options?: KeyframeAnimationOptions;

      /**
       * The scheduling strategy to take. `cancel` to cancel any current animation, `exclusive` to skip scheduling an
       * animation if one is currently running. Default value: `cancel`.
       */
      strategy?: 'cancel' | 'exclusive';
   }

   /**
    * Defines the options for the {@link ripple} action.
    */
   export type Ripple = {
      /**
       * Is the animation enabled. Default value: `true`.
       */
      enabled?: boolean;
   }

   /**
    * Defines the options for the {@link rippleFocus} action.
    */
   export type RippleFocus = {
      /**
       * Is the animation enabled. Default value: `true`.
       */
      enabled?: boolean;
   }
}

export { ComposableActionOptions };
