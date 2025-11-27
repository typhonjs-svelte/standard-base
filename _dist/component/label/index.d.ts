import * as svelte from 'svelte';
import { SvelteComponent } from 'svelte';
import { TJSSvelte } from '#runtime/svelte/util';

/**
 * Provides a helper utility to verify if a label prop is valid for the TJSSlotLabel component.
 */
declare class TJSSlotLabelUtil {
  /**
   * Test if the given label is valid data / prop for the TJSSlotLabel component.
   */
  static isValid(label: any): label is
    | string
    | TJSSvelte.Config.Embed<
        svelte.SvelteComponent<any, any, any>,
        {
          PropsOmit: never;
        }
      >;
}

/**
 * Provides a slotted component wrapped in a label element. The `label` prop can either be a string or a Svelte
 * configuration object to be used as the label text. The label element uses `display: contents` which ignores the
 * label element and lays out the children as if the label element does not exist which is perfect for a grid layout.
 * Optionally, there are CSS variables available to change the `display` and additional flex layout configuration
 * possibilities.
 *
 * ### CSS Variables
 *
 * The following CSS variables control the associated styles with the default values:
 *
 * ```
 * For layout:
 * -----------------------------------------------------
 * --tjs-slot-label-display - contents
 * --tjs-slot-label-flex - unset
 * --tjs-slot-label-flex-direction - unset
 * --tjs-slot-label-flex-wrap - unset
 *
 * For text / string label:
 * -----------------------------------------------------
 * --tjs-slot-label-color - inherit
 * --tjs-slot-label-font-family - inherit
 * --tjs-slot-label-font-size - inherit
 * --tjs-slot-label-line-height - inherit
 * --tjs-slot-label-text-align - right
 * --tjs-slot-label-white-space - nowrap
 * ```
 */
declare class TJSSlotLabel extends SvelteComponent<TJSSlotLabel.Props, TJSSlotLabel.Events, TJSSlotLabel.Slots> {}

/** Event / Prop / Slot type aliases for {@link TJSSlotLabel | associated component}. */
declare namespace TJSSlotLabel {
  /** Props type alias for {@link TJSSlotLabel | associated component}. */
  export type Props = {
    label?: any;
    /** @type {boolean} */
    enabled?: boolean;
    /**
     * Set to `true` to use the `pointer` cursor over label.
     *
     * @type {boolean}
     */
    isPointer?: boolean;
  };
  /** Events type alias for {@link TJSSlotLabel | associated component}. */
  export type Events = { [evt: string]: CustomEvent<any> };
  /** Slots type alias for {@link TJSSlotLabel | associated component}. */
  export type Slots = { default: {} };
}

/**
 * ### CSS Variables
 *
 * ```
 * -tjs-cursor-pointer
 *
 * --tjs-toggle-label-background
 * --tjs-toggle-label-background-focus-visible
 * --tjs-toggle-label-background-hover
 * --tjs-toggle-label-background-selected
 * --tjs-toggle-label-border
 * --tjs-toggle-label-border-radius
 * --tjs-toggle-label-box-shadow-focus-visible - fallback: --tjs-default-box-shadow-focus-visible
 * --tjs-toggle-label-font-size - inherit
 * --tjs-toggle-label-font-weight - inherit
 * --tjs-toggle-label-font-family - inherit
 * --tjs-toggle-label-overflow - hidden
 * --tjs-toggle-label-padding - 0
 * --tjs-toggle-label-text-shadow-focus - undefined; default: --tjs-default-text-shadow-focus-hover
 * --tjs-toggle-label-text-shadow-hover - undefined; default: --tjs-default-text-shadow-focus-hover
 * --tjs-toggle-label-text-shadow-selected - undefined; default: --tjs-default-text-shadow-focus-hover
 * --tjs-toggle-label-transition - global default: 'background 0.2s ease-in-out'
 * --tjs-toggle-label-transition-focus-visible - fallback: --tjs-default-transition-focus-visible
 *
 * --tjs-toggle-label-cursor-disabled - fallback: var(--tjs-cursor-default, default)
 * ```
 */
declare class TJSToggleLabel extends SvelteComponent<
  TJSToggleLabel.Props,
  TJSToggleLabel.Events,
  TJSToggleLabel.Slots
> {}

/** Event / Prop / Slot type aliases for {@link TJSToggleLabel | associated component}. */
declare namespace TJSToggleLabel {
  /** Props type alias for {@link TJSToggleLabel | associated component}. */
  export type Props = {
    keyCode?: any;
    label?: any;
    text?: any;
    enabled?: any;
    tooltip?: any;
    store?: any;
    comp?: any;
    tooltipDirection?: any;
    tooltipSelected?: any;
    styles?: any;
    efx?: any;
    onPress?: any;
    onClose?: any;
    onContextMenu?: any;
    clickPropagate?: any;
  };
  /** Events type alias for {@link TJSToggleLabel | associated component}. */
  export type Events = {
    pointerdown: PointerEvent;
    click: PointerEvent;
    contextmenu: PointerEvent;
    press: CustomEvent<any>;
  } & { [evt: string]: CustomEvent<any> };
  /** Slots type alias for {@link TJSToggleLabel | associated component}. */
  export type Slots = { outer: {}; left: {}; right: {}; default: {} };
}

export { TJSSlotLabel, TJSSlotLabelUtil, TJSToggleLabel };
