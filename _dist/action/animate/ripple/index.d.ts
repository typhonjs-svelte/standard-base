import * as svelte_action from 'svelte/action';

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
 * @param {number}   [opts.duration=600] - Duration in milliseconds.
 *
 * @param {string}   [opts.background='rgba(255, 255, 255, 0.7)'] - A valid CSS background attribute.
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
 * @returns {import('svelte/action').Action} Actual action.
 */
declare function ripple({
  duration,
  background,
  events,
  keyCode,
  contextmenu,
  debounce,
}?: {
  duration?: number;
  background?: string;
  events?: Iterable<string>;
  keyCode?: string;
  contextmenu?: boolean;
  debounce?: number;
}): svelte_action.Action;

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
 * @param {string}   [opts.background='rgba(255, 255, 255, 0.7)'] - A valid CSS background attribute.
 *
 * @param {string}   [opts.selector] - A valid CSS selector string.
 *
 * @returns {import('svelte/action').Action} Actual action.
 */
declare function rippleFocus({
  duration,
  background,
  selector,
}?: {
  duration?: number;
  background?: string;
  selector?: string;
}): svelte_action.Action;

export { ripple, rippleFocus };
