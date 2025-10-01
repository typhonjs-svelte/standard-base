/**
 * Provides composable / data-driven actions related to animation. The functions provided are higher-order
 * functions that return the actual action generated. This allows the resulting actions to be used in data-driven use
 * cases with many of the Svelte components defined in the standard library.
 *
 * @module
 */

import * as svelte_action from 'svelte/action';

/**
 * Defines the options for all composable animation actions.
 */
declare namespace ComposableActionOptions {
  /**
   * Defines the options for the {@link animateWAAPI} action.
   *
   * @see https://developer.mozilla.org/en-US/docs/Web/API/Element/animate
   * @see https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API/Keyframe_Formats
   */
  interface AnimateWAAPI {
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
    keyframeOptions?: KeyframeAnimationOptions;
    /**
     * The scheduling strategy to take. `cancel` to cancel any current animation, `exclusive` to skip scheduling an
     * animation if one is currently running. Default value: `cancel`.
     */
    strategy?: 'cancel' | 'exclusive';
  }
  /**
   * Defines the options for the {@link ripple} action.
   */
  interface Ripple {
    /**
     * Is the animation enabled. Default value: `true`.
     */
    enabled?: boolean;
  }
  /**
   * Defines the options for the {@link rippleFocus} action.
   */
  interface RippleFocus {
    /**
     * Is the animation enabled. Default value: `true`.
     */
    enabled?: boolean;
  }
}

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
declare function animateWAAPI({
  debounce,
  enabled,
  duration,
  event,
  keyframes,
  keyframeOptions,
  strategy,
}?: ComposableActionOptions.AnimateWAAPI): svelte_action.Action<
  HTMLElement,
  svelte_action.ActionReturn<ComposableActionOptions.AnimateWAAPI>
>;

/**
 * Combines multiple composable actions.
 *
 * Note: The update function passes the same variable to all update functions of each action.
 *
 * @privateRemarks
 * TODO: This is a naive implementation and will be further refined in the near future.
 *
 * @param {...import('svelte/action').Action} actions - One or more composable action functions to combine.
 *
 * @returns {import('svelte/action').Action<HTMLElement, any>} Composed action.
 */
declare function composable(...actions: svelte_action.Action[]): svelte_action.Action<HTMLElement, any>;

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
declare function ripple({
  background,
  contextmenu,
  debounce,
  duration,
  enabled,
  events,
  keyCode,
}?: {
  background?: string;
  duration?: number;
  enabled?: boolean;
  events?: Iterable<string>;
  keyCode?: string;
  contextmenu?: boolean;
  debounce?: number;
}): svelte_action.Action<HTMLElement, svelte_action.ActionReturn<ComposableActionOptions.Ripple>>;

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
declare function rippleFocus({
  background,
  duration,
  enabled,
  selector,
}?: {
  duration?: number;
  enabled?: boolean;
  background?: string;
  selector?: string;
}): svelte_action.Action<HTMLElement, svelte_action.ActionReturn<ComposableActionOptions.RippleFocus>>;

export { ComposableActionOptions, animateWAAPI, composable, ripple, rippleFocus };
