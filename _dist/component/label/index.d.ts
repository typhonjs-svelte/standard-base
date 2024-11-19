import * as _runtime_svelte_util from '#runtime/svelte/util';
import { SvelteComponent } from 'svelte';

/**
 * Provides a helper utility to verify if a label prop is valid for the TJSSlotLabel component.
 */
declare class TJSSlotLabelUtil {
  /**
   * Test if the given label is valid data / prop for the TJSSlotLabel component.
   */
  static isValid(label: any): label is string | _runtime_svelte_util.TJSSvelteConfig;
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
declare class TjsSlotLabel extends SvelteComponent<TjsSlotLabel.Props, TjsSlotLabel.Events, TjsSlotLabel.Slots> {}

/** Event / Prop / Slot type aliases for {@link TjsSlotLabel | associated component}. */
declare namespace TjsSlotLabel {
  /** Props type alias for {@link TjsSlotLabel | associated component}. */
  export type Props = {
    label?: any;
    /** @type {boolean} */
    enabled?: boolean;
  };
  /** Events type alias for {@link TjsSlotLabel | associated component}. */
  export type Events = { [evt: string]: CustomEvent<any> };
  /** Slots type alias for {@link TjsSlotLabel | associated component}. */
  export type Slots = { default: {} };
}

/**
 * ### CSS Variables
 *
 * ```
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
 * ```
 */
declare class TjsToggleLabel extends SvelteComponent<
  TjsToggleLabel.Props,
  TjsToggleLabel.Events,
  TjsToggleLabel.Slots
> {}

/** Event / Prop / Slot type aliases for {@link TjsToggleLabel | associated component}. */
declare namespace TjsToggleLabel {
  /** Props type alias for {@link TjsToggleLabel | associated component}. */
  export type Props = {
    keyCode?: any;
    label?: any;
    title?: any;
    text?: any;
    enabled?: any;
    comp?: any;
    titleSelected?: any;
    store?: any;
    styles?: any;
    efx?: any;
    onPress?: any;
    onClose?: any;
    onContextMenu?: any;
    clickPropagate?: any;
  };
  /** Events type alias for {@link TjsToggleLabel | associated component}. */
  export type Events = {
    pointerdown: PointerEvent;
    click: MouseEvent;
    contextmenu: MouseEvent;
    press: CustomEvent<any>;
  } & { [evt: string]: CustomEvent<any> };
  /** Slots type alias for {@link TjsToggleLabel | associated component}. */
  export type Slots = { outer: {}; left: {}; right: {}; default: {} };
}

export { TjsSlotLabel as TJSSlotLabel, TJSSlotLabelUtil, TjsToggleLabel as TJSToggleLabel };
