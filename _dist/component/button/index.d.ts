import { SvelteComponent } from 'svelte';

/**
 * ### CSS Variables
 * ```
 * --tjs-default-text-shadow-focus-hover: system default
 * --tjs-default-outline-focus-visible: undefined; global replacement for focus-visible outline.
 *
 * --tjs-button-background
 * --tjs-button-background-focus
 * --tjs-button-background-focus-visible
 * --tjs-button-background-hover
 * --tjs-button-background-selected
 * --tjs-button-border
 * --tjs-button-border-radius
 * --tjs-button-border-width
 * --tjs-button-box-shadow-focus-visible
 * --tjs-button-clip-path
 * --tjs-button-clip-path-hover
 * --tjs-button-clip-path-focus
 * --tjs-button-cursor-disabled
 * --tjs-button-diameter
 * --tjs-button-outline-focus-visible
 * --tjs-button-text-shadow-focus: undefined
 * --tjs-button-text-shadow-hover: undefined
 * --tjs-button-transition
 * --tjs-button-transition-focus-visible
 *
 * --tjs-icon-button-background
 * --tjs-icon-button-background-focus
 * --tjs-icon-button-background-focus-visible
 * --tjs-icon-button-background-hover
 * --tjs-icon-button-background-selected
 * --tjs-icon-button-border
 * --tjs-icon-button-border-radius
 * --tjs-icon-button-border-width
 * --tjs-icon-button-box-shadow-focus-visible
 * --tjs-icon-button-clip-path
 * --tjs-icon-button-clip-path-focus
 * --tjs-icon-button-clip-path-hover
 * --tjs-icon-button-diameter
 * --tjs-icon-button-outline-focus-visible
 * --tjs-icon-button-text-shadow-focus: undefined
 * --tjs-icon-button-text-shadow-hover: undefined
 * --tjs-icon-button-transition
 * --tjs-icon-button-transition-focus-visible
 * ```
 */
declare class TJSIconButton extends SvelteComponent<TJSIconButton.Props, TJSIconButton.Events, TJSIconButton.Slots> {}

/** Event / Prop / Slot type aliases for {@link TJSIconButton | associated component}. */
declare namespace TJSIconButton {
  /** Props type alias for {@link TJSIconButton | associated component}. */
  export type Props = {
    keyCode?: any;
    button?: any;
    tooltip?: any;
    enabled?: any;
    icon?: any;
    tooltipDirection?: any;
    styles?: any;
    efx?: any;
    onPress?: any;
    onContextMenu?: any;
    clickPropagate?: any;
  };
  /** Events type alias for {@link TJSIconButton | associated component}. */
  export type Events = { click: PointerEvent; contextmenu: PointerEvent; press: CustomEvent<any> } & {
    [evt: string]: CustomEvent<any>;
  };
  /** Slots type alias for {@link TJSIconButton | associated component}. */
  export type Slots = {};
}

/**
 * ### CSS Variables:
 *
 * ```
 * --tjs-button-cursor-disabled
 *
 * --tjs-default-text-shadow-focus-hover: system default
 * --tjs-default-outline-focus-visible: undefined; global replacement for focus-visible outline.
 *
 * --tjs-slot-button-background
 * --tjs-slot-button-background-focus
 * --tjs-slot-button-background-focus-visible
 * --tjs-slot-button-background-hover
 * --tjs-slot-button-border
 * --tjs-slot-button-border-radius
 * --tjs-slot-button-box-shadow-focus-visible
 * --tjs-slot-button-diameter
 * --tjs-slot-button-outline-focus-visible
 * --tjs-slot-button-transition
 * --tjs-slot-button-transition-focus-visible
 * ```
 */
declare class TJSSlotButton extends SvelteComponent<TJSSlotButton.Props, TJSSlotButton.Events, TJSSlotButton.Slots> {}

/** Event / Prop / Slot type aliases for {@link TJSSlotButton | associated component}. */
declare namespace TJSSlotButton {
  /** Props type alias for {@link TJSSlotButton | associated component}. */
  export type Props = {
    keyCode?: any;
    button?: any;
    tooltip?: any;
    enabled?: any;
    tooltipDirection?: any;
    styles?: any;
    efx?: any;
    onPress?: any;
    onContextMenu?: any;
    clickPropagate?: any;
  };
  /** Events type alias for {@link TJSSlotButton | associated component}. */
  export type Events = { click: PointerEvent; contextmenu: PointerEvent; press: CustomEvent<any> } & {
    [evt: string]: CustomEvent<any>;
  };
  /** Slots type alias for {@link TJSSlotButton | associated component}. */
  export type Slots = { default: {} };
}

/**
 * ### CSS Variables
 *
 * ```
 * --tjs-default-text-shadow-focus-hover: system default
 * --tjs-default-outline-focus-visible: undefined; global replacement for focus-visible outline.
 *
 * --tjs-button-background
 * --tjs-button-background-focus
 * --tjs-button-background-focus-visible
 * --tjs-button-background-hover
 * --tjs-button-background-selected
 * --tjs-button-border
 * --tjs-button-border-radius
 * --tjs-button-border-width
 * --tjs-button-box-shadow-focus-visible
 * --tjs-button-clip-path
 * --tjs-button-clip-path-focus
 * --tjs-button-clip-path-hover
 * --tjs-button-cursor-disabled
 * --tjs-button-diameter
 * --tjs-button-outline-focus-visible
 * --tjs-button-text-shadow-focus: undefined
 * --tjs-button-text-shadow-hover: undefined
 * --tjs-button-transition
 * --tjs-button-transition-focus-visible
 *
 * --tjs-icon-button-background
 * --tjs-icon-button-background-focus
 * --tjs-icon-button-background-focus-visible
 * --tjs-icon-button-background-hover
 * --tjs-icon-button-background-selected
 * --tjs-icon-button-border
 * --tjs-icon-button-border-radius
 * --tjs-icon-button-border-width
 * --tjs-icon-button-box-shadow-focus-visible
 * --tjs-icon-button-clip-path
 * --tjs-icon-button-clip-path-focus
 * --tjs-icon-button-clip-path-hover
 * --tjs-icon-button-diameter
 * --tjs-icon-button-outline-focus-visible
 * --tjs-icon-button-text-shadow-focus: undefined
 * --tjs-icon-button-text-shadow-hover: undefined
 * --tjs-icon-button-transition
 * --tjs-icon-button-transition-focus-visible
 * ```
 */
declare class TJSToggleIconButton extends SvelteComponent<
  TJSToggleIconButton.Props,
  TJSToggleIconButton.Events,
  TJSToggleIconButton.Slots
> {}

/** Event / Prop / Slot type aliases for {@link TJSToggleIconButton | associated component}. */
declare namespace TJSToggleIconButton {
  /** Props type alias for {@link TJSToggleIconButton | associated component}. */
  export type Props = {
    keyCode?: any;
    button?: any;
    store?: any;
    tooltip?: any;
    enabled?: any;
    icon?: any;
    tooltipDirection?: any;
    styles?: any;
    efx?: any;
    onPress?: any;
    onContextMenu?: any;
    clickPropagate?: any;
    tooltipSelected?: any;
    onClose?: any;
  };
  /** Events type alias for {@link TJSToggleIconButton | associated component}. */
  export type Events = { click: PointerEvent; contextmenu: PointerEvent; press: CustomEvent<any> } & {
    [evt: string]: CustomEvent<any>;
  };
  /** Slots type alias for {@link TJSToggleIconButton | associated component}. */
  export type Slots = { default: {} };
}

export { TJSIconButton, TJSSlotButton, TJSToggleIconButton };
