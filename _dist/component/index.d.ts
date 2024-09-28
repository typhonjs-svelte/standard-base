import * as svelte from 'svelte';
import { SvelteComponent } from 'svelte';
import * as svelte_store from 'svelte/store';
import * as _runtime_svelte_util from '#runtime/svelte/util';
import { TJSPosition } from '#runtime/svelte/store/position';
import * as _runtime_svelte_easing from '#runtime/svelte/easing';
import * as _runtime_util_browser from '#runtime/util/browser';
import * as _runtime_svelte_store_web_storage from '#runtime/svelte/store/web-storage';

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
 * --tjs-button-cursor
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
 * --tjs-icon-button-cursor
 * --tjs-icon-button-cursor-disabled
 * --tjs-icon-button-diameter
 * --tjs-icon-button-outline-focus-visible
 * --tjs-icon-button-text-shadow-focus: undefined
 * --tjs-icon-button-text-shadow-hover: undefined
 * --tjs-icon-button-transition
 * --tjs-icon-button-transition-focus-visible
 * ```
 */
declare class TjsIconButton extends SvelteComponent<TjsIconButton.Props, TjsIconButton.Events, TjsIconButton.Slots> {}

/** Event / Prop / Slot type aliases for {@link TjsIconButton | associated component}. */
declare namespace TjsIconButton {
  /** Props type alias for {@link TjsIconButton | associated component}. */
  export type Props = {
    keyCode?: any;
    button?: any;
    title?: any;
    disabled?: any;
    icon?: any;
    onPress?: any;
    styles?: any;
    efx?: any;
    onContextMenu?: any;
    clickPropagate?: any;
  };
  /** Events type alias for {@link TjsIconButton | associated component}. */
  export type Events = { click: MouseEvent; contextmenu: MouseEvent; press: CustomEvent<any> } & {
    [evt: string]: CustomEvent<any>;
  };
  /** Slots type alias for {@link TjsIconButton | associated component}. */
  export type Slots = {};
}

/**
 * ### CSS Variables:
 *
 * ```
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
 * --tjs-slot-button-cursor
 * --tjs-slot-button-cursor-disabled
 * --tjs-slot-button-diameter
 * --tjs-slot-button-outline-focus-visible
 * --tjs-slot-button-transition
 * --tjs-slot-button-transition-focus-visible
 * ```
 */
declare class TjsSlotButton extends SvelteComponent<TjsSlotButton.Props, TjsSlotButton.Events, TjsSlotButton.Slots> {}

/** Event / Prop / Slot type aliases for {@link TjsSlotButton | associated component}. */
declare namespace TjsSlotButton {
  /** Props type alias for {@link TjsSlotButton | associated component}. */
  export type Props = {
    keyCode?: any;
    button?: any;
    disabled?: any;
    onPress?: any;
    styles?: any;
    efx?: any;
    onContextMenu?: any;
    clickPropagate?: any;
  };
  /** Events type alias for {@link TjsSlotButton | associated component}. */
  export type Events = { click: MouseEvent; contextmenu: MouseEvent; press: CustomEvent<any> } & {
    [evt: string]: CustomEvent<any>;
  };
  /** Slots type alias for {@link TjsSlotButton | associated component}. */
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
 * --tjs-button-cursor
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
 * --tjs-icon-button-cursor
 * --tjs-icon-button-cursor-disabled
 * --tjs-icon-button-diameter
 * --tjs-icon-button-outline-focus-visible
 * --tjs-icon-button-text-shadow-focus: undefined
 * --tjs-icon-button-text-shadow-hover: undefined
 * --tjs-icon-button-transition
 * --tjs-icon-button-transition-focus-visible
 * ```
 */
declare class TjsToggleIconButton extends SvelteComponent<
  TjsToggleIconButton.Props,
  TjsToggleIconButton.Events,
  TjsToggleIconButton.Slots
> {}

/** Event / Prop / Slot type aliases for {@link TjsToggleIconButton | associated component}. */
declare namespace TjsToggleIconButton {
  /** Props type alias for {@link TjsToggleIconButton | associated component}. */
  export type Props = {
    keyCode?: any;
    button?: any;
    title?: any;
    disabled?: any;
    icon?: any;
    store?: any;
    onPress?: any;
    styles?: any;
    efx?: any;
    onContextMenu?: any;
    clickPropagate?: any;
    titleSelected?: any;
    onClose?: any;
  };
  /** Events type alias for {@link TjsToggleIconButton | associated component}. */
  export type Events = { click: MouseEvent; contextmenu: MouseEvent; press: CustomEvent<any> } & {
    [evt: string]: CustomEvent<any>;
  };
  /** Slots type alias for {@link TjsToggleIconButton | associated component}. */
  export type Slots = { default: {} };
}

/**
 * ```
 * --tjs-default-text-shadow-focus-hover: system default
 * --tjs-default-outline-focus-visible: undefined; global replacement for focus-visible outline.
 *
 * --tjs-button-background
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
 * --tjs-button-cursor
 * --tjs-button-diameter
 * --tjs-button-outline-focus-visible
 * --tjs-button-text-shadow-focus: undefined
 * --tjs-button-text-shadow-hover: undefined
 * --tjs-button-transition
 * --tjs-button-transition-focus-visible
 *
 * --tjs-icon-button-background
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
 * --tjs-icon-button-cursor
 * --tjs-icon-button-diameter
 * --tjs-icon-button-outline-focus-visible
 * --tjs-icon-button-text-shadow-focus: undefined
 * --tjs-icon-button-text-shadow-hover: undefined
 * --tjs-icon-button-transition
 * --tjs-icon-button-transition-focus-visible
 * ```
 */
declare class TjsColordButton extends SvelteComponent<
  TjsColordButton.Props,
  TjsColordButton.Events,
  TjsColordButton.Slots
> {}

/** Event / Prop / Slot type aliases for {@link TjsColordButton | associated component}. */
declare namespace TjsColordButton {
  /** Props type alias for {@link TjsColordButton | associated component}. */
  export type Props = {
    keyCode?: any;
    button?: any;
    color?: any;
    title?: any;
    onPress?: any;
    styles?: any;
    efx?: any;
    onContextMenu?: any;
    clickPropagate?: any;
  };
  /** Events type alias for {@link TjsColordButton | associated component}. */
  export type Events = { click: MouseEvent; contextmenu: MouseEvent; press: CustomEvent<any> } & {
    [evt: string]: CustomEvent<any>;
  };
  /** Slots type alias for {@link TjsColordButton | associated component}. */
  export type Slots = { default: {} };
}

/**
 * TODO: Finish documentation.
 *
 * Events:
 * - color: current color
 *
 */
declare class TjsColordPicker extends SvelteComponent<
  TjsColordPicker.Props,
  TjsColordPicker.Events,
  TjsColordPicker.Slots
> {}

/** Event / Prop / Slot type aliases for {@link TjsColordPicker | associated component}. */
declare namespace TjsColordPicker {
  /** Props type alias for {@link TjsColordPicker | associated component}. */
  export type Props = {
    /**
     * color properties
     *
     * @type {import('.').TJSColordPickerColor}
     */
    color?: TJSColordPickerColor;
    /**
     * User settable options / customization properties.
     *
     * @type {import('../../').TJSColordPickerOptions}
     */
    options?: TJSColordPickerOptions;
  };
  /** Events type alias for {@link TjsColordPicker | associated component}. */
  export type Events = { color: CustomEvent<any> } & { [evt: string]: CustomEvent<any> };
  /** Slots type alias for {@link TjsColordPicker | associated component}. */
  export type Slots = {};
}

/**
 * TJSFolder provides a collapsible folder using the details and summary HTMLElements.
 *
 * This is a slotted component. The default slot is the collapsible contents. There are also two additional optional
 * named slots available for the summary element. `label` allows setting custom content with the fallback being the
 * `label` string. Additionally, `summary-end` allows a component or text to be slotted after the label. This can be
 * useful for say an "expand all" button.
 *
 * ----------------------------------------------------------------------------------------------------------------
 * ### Exported props
 *
 * - `folder` ({@link TJSFolderData}): An object defining all properties of a folder including potentially data
 * driven minimal Svelte configuration objects (`slotDefault`, `slotLabel`, and `slotSummaryEnd`) providing default
 * component implementations.
 *
 * Or in lieu of passing the folder object you can assign these props directly:
 *
 * - `id`: Anything used for an ID.
 *
 * -`label`: The label name of the folder; string.
 *
 * -`store`: The store tracking the open / close state: Writable<boolean>
 *
 * -`styles`: Styles to be applied inline via `applyStyles` action.
 *
 * ----------------------------------------------------------------------------------------------------------------
 * ### Events
 *
 * There are several events that are fired and / or bubbled up through parent elements. There are four
 * custom events that pass a details object including: `the details element, id, label, and store`.
 *
 * The following events are bubbled up such that assigning a listener in any parent component receives them
 * from all children folders:
 *
 * - `click` - Basic MouseEvent of folder being clicked.
 *
 * - `keydown` - Key down event.
 *
 * - `keyup` - Key up event.
 *
 * - `closeAny` - Triggered when any child folder is closed w/ details object.
 *
 * - `openAny` - Triggered when any child folder is opened w/ details object.
 *
 * The following events do not propagate / bubble up and can be registered with:
 *
 * - `close` - Triggered when direct descendent folder is closed w/ details object.
 *
 * - `open` - Triggered when direct descendent folder is opened w/ details object.
 *
 * ----------------------------------------------------------------------------------------------------------------
 * Styling: To style this component use `details.tjs-folder` as a selector. Each element also contains data
 * attributes for `id` and `label`.
 *
 * There are several local CSS variables that you can use to change the appearance dynamically. Either use
 * CSS props or pass in a `styles` object w/ key / value props to set to the details element.
 *
 * ### CSS Variables
 * The following CSS variables are supported, but not defined by default:
 *
 * ```
 * Details element (attributes follow `--tjs-folder-details-`):
 * --tjs-folder-details-margin-left: -0.4em;
 * --tjs-folder-details-padding-left: 0.4em; set for children to indent more;
 *
 * Summary element (attributes follow `--tjs-folder-summary-`):
 * --tjs-folder-summary-background-blend-mode: initial
 * --tjs-folder-summary-background: none
 * --tjs-folder-summary-background-open - fallback: --tjs-folder-summary-background; default: inherit
 * --tjs-folder-summary-border: none
 * --tjs-folder-summary-border-radius: 0
 * --tjs-folder-summary-border-width: initial
 * --tjs-folder-summary-cursor: pointer
 * --tjs-folder-summary-font-size: inherit
 * --tjs-folder-summary-font-weight: bold
 * --tjs-folder-summary-font-family: inherit
 * --tjs-folder-summary-gap: 0.125em
 * --tjs-folder-summary-padding: 0.25em
 * --tjs-folder-summary-transition: background 0.1s
 * --tjs-folder-summary-width: fit-content; wraps content initially, set to 100% or other width measurement
 *
 * Summary element (focus visible):
 * --tjs-folder-summary-box-shadow-focus-visible - fallback: --tjs-default-box-shadow-focus-visible
 * --tjs-folder-summary-outline-focus-visible - fallback: --tjs-default-outline-focus-visible; default: revert
 * --tjs-folder-summary-transition-focus-visible - fallback: --tjs-default-transition-focus-visible
 *
 * A keyboard focus indicator is defined by the following CSS variables:
 * --tjs-folder-summary-focus-indicator-align-self - fallback: --tjs-default-focus-indicator-align-self; default: stretch
 * --tjs-folder-summary-focus-indicator-background - fallback: --tjs-default-focus-indicator-background; default: white
 * --tjs-folder-summary-focus-indicator-border - fallback: --tjs-default-focus-indicator-border; default: undefined
 * --tjs-folder-summary-focus-indicator-border-radius - fallback: --tjs-default-focus-indicator-border-radius; default: 0.1em
 * --tjs-folder-summary-focus-indicator-height - fallback: --tjs-default-focus-indicator-height; default: undefined
 * --tjs-folder-summary-focus-indicator-transition - fallback: --tjs-default-focus-indicator-transition
 * --tjs-folder-summary-focus-indicator-width - fallback: --tjs-default-focus-indicator-width; default: 0.25em
 *
 * Summary SVG / chevron element (attributes follow `--tjs-folder-summary-chevron-`):
 *
 * The width and height use multiple fallback variables before setting a default of 1.25em. You can provide
 * `--tjs-folder-summary-chevron-size`. If not provided then the chevron dimensions are set by
 * `--tjs-folder-summary-font-size`; default: 1.25em.
 *
 * --tjs-folder-summary-chevron-border-radius: 0
 * --tjs-folder-summary-chevron-color: currentColor
 * --tjs-folder-summary-chevron-opacity: 0.2; Opacity when not hovering.
 * --tjs-folder-summary-chevron-opacity-focus-visible: 1; When summary focus-visible.
 * --tjs-folder-summary-chevron-opacity-hover: 1; Opacity when hovering.
 * --tjs-folder-summary-chevron-margin: 0;
 * --tjs-folder-summary-chevron-transition: opacity 0.2s, transform 0.1s
 * --tjs-folder-summary-chevron-rotate-closed: -90deg; rotation angle when closed.
 * --tjs-folder-summary-chevron-rotate-open: 0; rotation angle when open.
 *
 * Summary label element (attributes follow `--tjs-folder-summary-label-):
 *
 * By default, the label element does not wrap and uses ellipsis for text overflow.
 *
 * --tjs-folder-summary-label-overflow: hidden
 * --tjs-folder-summary-label-text-overflow: ellipsis
 * --tjs-folder-summary-label-white-space: nowrap
 * --tjs-folder-summary-label-width: fit-content
 *
 * Default label (focus visible):
 * --tjs-folder-summary-label-text-shadow-focus-visible - fallback: --tjs-default-text-shadow-focus-hover; default: revert
 *
 * Contents element (attributes follow `--tjs-folder-contents-`):
 * --tjs-folder-contents-background-blend-mode: initial
 * --tjs-folder-contents-background: none
 * --tjs-folder-contents-border: none
 * --tjs-folder-contents-margin: 0 0 0 -0.4em
 *
 * Padding is set directly by `--tjs-folder-contents-padding` or follows the following calculation:
 * `0 0 0 calc(var(--tjs-folder-summary-font-size, 1em) * 0.8)`
 *
 * If neither `--tjs-folder-contents-padding` or `--tjs-folder-summary-font-size` is defined the default is
 * `1em * 0.8`.
 * ```
 */
declare class TjsSvgFolder extends SvelteComponent<TjsSvgFolder.Props, TjsSvgFolder.Events, TjsSvgFolder.Slots> {}

/** Event / Prop / Slot type aliases for {@link TjsSvgFolder | associated component}. */
declare namespace TjsSvgFolder {
  /** Props type alias for {@link TjsSvgFolder | associated component}. */
  export type Props = {
    /** @type {string} */
    keyCode?: string;
    /** @type {string} */
    id?: string;
    /** @type {string} */
    label?: string;
    /** @type {boolean} */
    animate?: boolean;
    /** @type {import('.').TJSFolderOptions} */
    options?: TJSFolderOptions;
    /** @type {import('svelte/store').Writable<boolean>} */
    store?: svelte_store.Writable<boolean>;
    /** @type {object} */
    styles?: object;
    /** @type {(data?: { event?: PointerEvent }) => void} */
    onContextMenu?: (data?: { event?: PointerEvent }) => void;
    /** @type {(data?: { event?: KeyboardEvent | PointerEvent }) => void} */
    onClose?: (data?: { event?: KeyboardEvent | PointerEvent }) => void;
    /** @type {(data?: { event?: KeyboardEvent | PointerEvent }) => void} */
    onOpen?: (data?: { event?: KeyboardEvent | PointerEvent }) => void;
    /** @type {import('.').TJSFolderData} */
    folder?: TJSFolderData;
  };
  /** Events type alias for {@link TjsSvgFolder | associated component}. */
  export type Events = {
    click: MouseEvent;
    keydown: KeyboardEvent;
    keyup: KeyboardEvent;
    open:
      | PointerEvent
      | MouseEvent
      | UIEvent
      | Event
      | KeyboardEvent
      | ErrorEvent
      | AnimationEvent
      | ClipboardEvent
      | CompositionEvent
      | DragEvent
      | FocusEvent
      | FormDataEvent
      | InputEvent
      | ProgressEvent<EventTarget>
      | SecurityPolicyViolationEvent
      | SubmitEvent
      | TouchEvent
      | TransitionEvent
      | WheelEvent;
    close: Event;
    openAny:
      | PointerEvent
      | MouseEvent
      | UIEvent
      | Event
      | KeyboardEvent
      | ErrorEvent
      | AnimationEvent
      | ClipboardEvent
      | CompositionEvent
      | DragEvent
      | FocusEvent
      | FormDataEvent
      | InputEvent
      | ProgressEvent<EventTarget>
      | SecurityPolicyViolationEvent
      | SubmitEvent
      | TouchEvent
      | TransitionEvent
      | WheelEvent;
    closeAny:
      | PointerEvent
      | MouseEvent
      | UIEvent
      | Event
      | KeyboardEvent
      | ErrorEvent
      | AnimationEvent
      | ClipboardEvent
      | CompositionEvent
      | DragEvent
      | FocusEvent
      | FormDataEvent
      | InputEvent
      | ProgressEvent<EventTarget>
      | SecurityPolicyViolationEvent
      | SubmitEvent
      | TouchEvent
      | TransitionEvent
      | WheelEvent;
  } & { [evt: string]: CustomEvent<any> };
  /** Slots type alias for {@link TjsSvgFolder | associated component}. */
  export type Slots = { label: {}; 'summary-end': {}; default: {} };
}

/**
 * TJSFolder provides a collapsible folder using the details and summary HTMLElements.
 *
 * This is a slotted component. The default slot is the collapsible contents. There are also two additional optional
 * named slots available for the summary element. `label` allows setting custom content with the fallback being the
 * `label` string. Additionally, `summary-end` allows a component or text to be slotted after the label. This can be
 * useful for say an "expand all" button.
 *
 * ----------------------------------------------------------------------------------------------------------------
 * ### Exported props
 *
 * - `folder` ({@link TJSFolderData}): An object defining all properties of a folder including potentially data
 * driven minimal Svelte configuration objects (`slotDefault`, `slotLabel`, and `slotSummaryEnd`) providing default
 * component implementations.
 *
 * Or in lieu of passing the folder object you can assign these props directly:
 *
 * - `id`: Anything used for an ID.
 *
 * - `label`: The label name of the folder; string.
 *
 * - `store`: The store tracking the open / close state: Writable<boolean>
 *
 * - `styles`: Styles to be applied inline via `applyStyles` action.
 *
 * ----------------------------------------------------------------------------------------------------------------
 * ### Events
 *
 * There are several events that are fired and / or bubbled up through parent elements. There are four
 * custom events that pass a details object including: `the details element, id, label, and store`.
 *
 * The following events are bubbled up such that assigning a listener in any parent component receives them
 * from all children folders:
 *
 * - `click` - Basic MouseEvent of folder being clicked.
 *
 * - `keydown` - Key down event.
 *
 * - `keyup` - Key up event.
 *
 * - `closeAny` - Triggered when any child folder is closed w/ details object.
 *
 * - `openAny` - Triggered when any child folder is opened w/ details object.
 *
 * The following events do not propagate / bubble up and can be registered with:
 *
 * - `close` - Triggered when direct descendent folder is closed w/ details object.
 *
 * - `open` - Triggered when direct descendent folder is opened w/ details object.
 *
 * ----------------------------------------------------------------------------------------------------------------
 * Styling: To style this component use `details.tjs-folder` as a selector. Each element also contains data
 * attributes for `id` and `label`.
 *
 * There are several local CSS variables that you can use to change the appearance dynamically. Either use
 * CSS props or pass in a `styles` object w/ key / value props to set to the details.
 *
 * ### CSS Variables
 * The following CSS variables are supported, but not defined by default:
 *
 * ```
 * Details element (attributes follow `--tjs-folder-details-`):
 * --tjs-folder-details-margin-left: -0.4em;
 * --tjs-folder-details-padding-left: 0.4em; set for children to indent more;
 *
 * Summary element (attributes follow `--tjs-folder-summary-`):
 * --tjs-folder-summary-background-blend-mode: initial
 * --tjs-folder-summary-background: none
 * --tjs-folder-summary-background-open - fallback: --tjs-folder-summary-background; default: inherit
 * --tjs-folder-summary-border: none
 * --tjs-folder-summary-border-radius: 0
 * --tjs-folder-summary-border-width: initial
 * --tjs-folder-summary-cursor: pointer
 * --tjs-folder-summary-font-size: inherit
 * --tjs-folder-summary-font-weight: bold
 * --tjs-folder-summary-font-family: inherit
 * --tjs-folder-summary-gap: 0.125em
 * --tjs-folder-summary-padding: 0.25em
 * --tjs-folder-summary-transition: background 0.1s
 * --tjs-folder-summary-width: fit-content; wraps content initially, set to 100% or other width measurement
 *
 * Summary element (focus visible):
 * --tjs-folder-summary-box-shadow-focus-visible - fallback: --tjs-default-box-shadow-focus-visible
 * --tjs-folder-summary-outline-focus-visible - fallback: --tjs-default-outline-focus-visible; default: revert
 * --tjs-folder-summary-transition-focus-visible - fallback: --tjs-default-transition-focus-visible
 *
 * A keyboard focus indicator is defined by the following CSS variables:
 * --tjs-folder-summary-focus-indicator-align-self - fallback: --tjs-default-focus-indicator-align-self; default: stretch
 * --tjs-folder-summary-focus-indicator-background - fallback: --tjs-default-focus-indicator-background; default: white
 * --tjs-folder-summary-focus-indicator-border - fallback: --tjs-default-focus-indicator-border; default: undefined
 * --tjs-folder-summary-focus-indicator-border-radius - fallback: --tjs-default-focus-indicator-border-radius; default: 0.1em
 * --tjs-folder-summary-focus-indicator-height - fallback: --tjs-default-focus-indicator-height; default: undefined
 * --tjs-folder-summary-focus-indicator-transition - fallback: --tjs-default-focus-indicator-transition
 * --tjs-folder-summary-focus-indicator-width - fallback: --tjs-default-focus-indicator-width; default: 0.25em
 *
 * Summary icon / chevron element (attributes follow `--tjs-folder-summary-chevron-`):
 *
 * --tjs-folder-summary-chevron-border-radius: 0
 * --tjs-folder-summary-chevron-color: inherit
 * --tjs-folder-summary-chevron-opacity: 1; Opacity when not hovering.
 * --tjs-folder-summary-chevron-opacity-focus-visible: 1; When summary focus-visible.
 * --tjs-folder-summary-chevron-opacity-hover: 1; Opacity when hovering.
 * --tjs-folder-summary-chevron-margin: 0 0 0 0.25em;
 * --tjs-folder-summary-chevron-transition: opacity 0.2s, transform 0.1s
 * --tjs-folder-summary-chevron-width: 1.25em
 *
 * Summary label element (attributes follow `--tjs-folder-summary-label-`):
 *
 * By default, the label element does not wrap and uses ellipsis for text overflow.
 *
 * --tjs-folder-summary-label-overflow: hidden
 * --tjs-folder-summary-label-text-overflow: ellipsis
 * --tjs-folder-summary-label-white-space: nowrap
 * --tjs-folder-summary-label-width: fit-content
 *
 * Default label (focus visible):
 * --tjs-folder-summary-label-text-shadow-focus-visible - fallback: --tjs-default-text-shadow-focus-hover; default: revert
 *
 * Contents element (attributes follow `--tjs-folder-contents-`):
 * --tjs-folder-contents-background-blend-mode: initial
 * --tjs-folder-contents-background: none
 * --tjs-folder-contents-border: none
 * --tjs-folder-contents-margin: 0 0 0 -0.4em
 *
 * Padding is set directly by `--tjs-folder-contents-padding` or follows the following calculation:
 * `0 0 0 calc(var(--tjs-folder-summary-font-size, 1em) * 0.8)`
 *
 * If neither `--tjs-folder-contents-padding` or `--tjs-folder-summary-font-size` is defined the default is
 * `1em * 0.8`.
 * ```
 */
declare class TjsIconFolder extends SvelteComponent<TjsIconFolder.Props, TjsIconFolder.Events, TjsIconFolder.Slots> {}

/** Event / Prop / Slot type aliases for {@link TjsIconFolder | associated component}. */
declare namespace TjsIconFolder {
  /** Props type alias for {@link TjsIconFolder | associated component}. */
  export type Props = {
    /** @type {string} */
    keyCode?: string;
    /** @type {string} */
    id?: string;
    /** @type {string} */
    label?: string;
    /** @type {boolean} */
    animate?: boolean;
    /** @type {import('.').TJSFolderOptions} */
    options?: TJSFolderOptions;
    /** @type {import('svelte/store').Writable<boolean>} */
    store?: svelte_store.Writable<boolean>;
    /** @type {object} */
    styles?: object;
    /** @type {(data?: { event?: PointerEvent }) => void} */
    onContextMenu?: (data?: { event?: PointerEvent }) => void;
    /** @type {(data?: { event?: KeyboardEvent | PointerEvent }) => void} */
    onClose?: (data?: { event?: KeyboardEvent | PointerEvent }) => void;
    /** @type {(data?: { event?: KeyboardEvent | PointerEvent }) => void} */
    onOpen?: (data?: { event?: KeyboardEvent | PointerEvent }) => void;
    /** @type {import('.').TJSIconFolderData} */
    folder?: TJSIconFolderData;
    /** @type {string} */
    iconOpen?: string;
    /** @type {string} */
    iconClosed?: string;
  };
  /** Events type alias for {@link TjsIconFolder | associated component}. */
  export type Events = {
    click: MouseEvent;
    keydown: KeyboardEvent;
    keyup: KeyboardEvent;
    open:
      | PointerEvent
      | MouseEvent
      | UIEvent
      | Event
      | KeyboardEvent
      | ErrorEvent
      | AnimationEvent
      | ClipboardEvent
      | CompositionEvent
      | DragEvent
      | FocusEvent
      | FormDataEvent
      | InputEvent
      | ProgressEvent<EventTarget>
      | SecurityPolicyViolationEvent
      | SubmitEvent
      | TouchEvent
      | TransitionEvent
      | WheelEvent;
    close: Event;
    openAny:
      | PointerEvent
      | MouseEvent
      | UIEvent
      | Event
      | KeyboardEvent
      | ErrorEvent
      | AnimationEvent
      | ClipboardEvent
      | CompositionEvent
      | DragEvent
      | FocusEvent
      | FormDataEvent
      | InputEvent
      | ProgressEvent<EventTarget>
      | SecurityPolicyViolationEvent
      | SubmitEvent
      | TouchEvent
      | TransitionEvent
      | WheelEvent;
    closeAny:
      | PointerEvent
      | MouseEvent
      | UIEvent
      | Event
      | KeyboardEvent
      | ErrorEvent
      | AnimationEvent
      | ClipboardEvent
      | CompositionEvent
      | DragEvent
      | FocusEvent
      | FormDataEvent
      | InputEvent
      | ProgressEvent<EventTarget>
      | SecurityPolicyViolationEvent
      | SubmitEvent
      | TouchEvent
      | TransitionEvent
      | WheelEvent;
  } & { [evt: string]: CustomEvent<any> };
  /** Slots type alias for {@link TjsIconFolder | associated component}. */
  export type Slots = { label: {}; 'summary-end': {}; default: {} };
}

type TJSFolderOptions = {
  /**
   * When true only clicks on the folder chevron open / close the summary.
   */
  chevronOnly?: boolean;
  /**
   * When true the focus-visible outline for the summary will only be around the
   * chevron.
   */
  focusChevron?: boolean;
  /**
   * When true a `focus-visible` focus indicator is inserted between the
   * chevron and summary label. This is a useful a11y focus indicator when `outline` isn't suitable.
   */
  focusIndicator?: boolean;
};
type TJSFolderData = {
  /**
   * -
   */
  id?: string;
  /**
   * -
   */
  label?: string;
  /**
   * Defines the key event code to open / close summary when focused.
   */
  keyCode?: string;
  /**
   * Callback when folder closed.
   */
  onClose?: () => void;
  /**
   * Callback when folder opened.
   */
  onOpen?: () => void;
  /**
   * Callback for context menu.
   */
  onContextMenu?: (event?: MouseEvent) => void;
  /**
   * Additional folder options.
   */
  options?: TJSFolderOptions;
  /**
   * A minimal Svelte config defining the default content
   * component.
   */
  slotDefault?: {
    class: Function;
    props?: object;
  };
  /**
   * A minimal Svelte config defining the summary label
   * component.
   */
  slotLabel?: {
    class: Function;
    props?: object;
  };
  /**
   * A minimal Svelte config defining the summary end
   * component.
   */
  slotSummaryEnd?: {
    class: Function;
    props?: object;
  };
  /**
   * Folder open / close store.
   */
  store?: svelte_store.Writable<boolean>;
  /**
   * Additional styles to apply.
   */
  styles?: object;
};
type TJSIconFolderData = TJSFolderData;

type PickerStores = {
  /**
   * This selected
   * layout components.
   */
  components: svelte_store.Writable<TJSColordPickerComponents>;
  /**
   * See {@link TJSColordPickerOptions.hasAlpha}
   */
  hasAlpha: svelte_store.Writable<boolean>;
  /**
   * See {@link TJSColordPickerOptions.hasButtonBar}
   */
  hasButtonBar: svelte_store.Writable<boolean>;
  /**
   * See {@link TJSColordPickerOptions.hasEyeDropper}
   */
  hasEyeDropper: svelte_store.Writable<boolean>;
  /**
   * See {@link TJSColordPickerOptions.hasTextInput}
   */
  hasTextInput: svelte_store.Writable<boolean>;
  /**
   * See {@link TJSColordPickerOptions.inputName}
   */
  inputName: svelte_store.Writable<string>;
  /**
   * See {@link TJSColordPickerOptions.isPopup}
   */
  isPopup: svelte_store.Writable<boolean>;
  /**
   * See {@link TJSColordPickerOptions.lockTextFormat}
   */
  lockTextFormat: svelte_store.Writable<boolean>;
  /**
   * See {@link TJSColordPickerOptions.precision}
   */
  precision: svelte_store.Writable<number>;
  /**
   * See {@link TJSColordPickerOptions.width}
   */
  width: svelte_store.Writable<string>;
  /**
   * Stores first tab / focus traversable element.
   */
  firstFocusEl: svelte_store.Writable<boolean>;
  /**
   * See {@link PickerInternalData.hasAddons}
   */
  hasAddons: svelte_store.Writable<boolean>;
  /**
   * See {@link PickerInternalData.isOpen}
   */
  isOpen: svelte_store.Writable<boolean>;
  /**
   * See {@link PickerInternalData.padding}
   */
  padding: svelte_store.Writable<string>;
};

/**
 * Manages the addon state instantiating external user defined addons storing the model and providing a readable store
 * of all addons for {@link AddOnPanel}.
 */
declare class AddOnState {
  /**
   * @param {import('./').InternalState}  internalState -
   */
  constructor(internalState: InternalState);
  /**
   * @returns {number} Number of addons.
   */
  get size(): number;
  /**
   * @param {string}   key - Addon ID.
   *
   * @returns {object} The model instance for any associated addon.
   */
  get(key: string): object;
  /**
   * @param {string}   key - Addon ID.
   *
   * @returns {boolean} Is an addon with the given ID found?
   */
  has(key: string): boolean;
  /**
   * Invoked from {@link InternalState} to update addon state.
   *
   * @param {Iterable<Function>}   addonOptions - `options.addons` iterable list of addon constructor functions.
   */
  updateOptions(addonOptions: Iterable<Function>): void;
  /**
   * @param {import('svelte/store').Subscriber<import('../../../folder').TJSFolderData[]>} handler - Callback function
   * that is invoked on update / changes.
   *
   * @returns {import('svelte/store').Unsubscriber} Unsubscribe function.
   */
  subscribe(handler: svelte_store.Subscriber<TJSFolderData[]>): svelte_store.Unsubscriber;
  #private;
}

/**
 * Manages the addon button state allowing addons to add buttons to the button bar. When addons are removed
 * {@link AddOnState} invokes {@link ButtonState.removeById}.
 */
declare class ButtonState {
  /**
   * @param {import('./').InternalState}  internalState -
   */
  constructor(internalState: InternalState);
  /**
   * @returns {number} Number of addons.
   */
  get length(): number;
  /**
   * Adds a {@link TJSIconButton} or {@link TJSToggleIconButton} to the {@link ButtonBar}.
   *
   * @param {object}   button - Button data; optional `isToggle` boolean to indicate a toggle button.
   */
  add(button: object): void;
  removeById(id: any): void;
  /**
   * @param {import('svelte/store').Subscriber<object[]>} handler - Callback function that is invoked on update /
   * changes.
   *
   * @returns {import('svelte/store').Unsubscriber} Unsubscribe function.
   */
  subscribe(handler: svelte_store.Subscriber<object[]>): svelte_store.Unsubscriber;
  #private;
}

declare class ActiveTextState {
  constructor(allState: any, activeKey?: string);
  /**
   * @returns {object} Current active text mode configuration.
   */
  get active(): any;
  /**
   * Advances to the next color text mode.
   */
  next(): void;
  /**
   * Selects the previous color text mode.
   */
  previous(): void;
  /**
   * Sets the active key / format for text component display.
   *
   * @param {string}   format -
   */
  setFormat(format: string): void;
  /**
   * @param {import('svelte/store').Subscriber<object>} handler - Callback function that is invoked on
   * update / changes.
   *
   * @returns {import('svelte/store').Unsubscriber} Unsubscribe function.
   */
  subscribe(handler: svelte_store.Subscriber<object>): svelte_store.Unsubscriber;
  #private;
}

/**
 * Provides a buffered set of stores converting the current color from color state into a rounded alpha
 * value for display in the {@link TextInput} component. The alpha component store has an overridden set method that
 * validate updates from the number inputs they are assigned to keeping number ranges between `0-1`.
 * Also handling the case when the number input is `null` which occurs when the user removes all input
 * values or inputs `-` a minus character, etc. In that case `0` is substituted for `null`.
 *
 * Note: Alpha state changes do not set `#colorStateAccess.internalUpdate.textUpdate` to true.
 */
declare class AlphaState {
  /**
   * @param {import('./').ColorStateAccess}  colorStateAccess -
   *
   * @param {import('./').TextStateAccess}   textStateAccess -
   */
  constructor(colorStateAccess: ColorStateAccess, textStateAccess: TextStateAccess);
  /**
   * @returns {AlphaStateInputData} Alpha input component data.
   */
  get inputData(): AlphaStateInputData;
  /**
   * @returns {AlphaStateStores} Alpha text state stores.
   */
  get stores(): AlphaStateStores;
  /**
   * Updates the internal state from changes in color state current color.
   *
   * @param {object}   color - Current color value (HSV currently).
   *
   * @package
   */
  _updateColor(color: object): void;
  #private;
}
/**
 * Provides the input data options to use in number input components.
 */
type AlphaStateInputData = {
  /**
   * Alpha input component data.
   */
  alpha: object;
};
/**
 * Provides the buffered stores to use in number input components.
 */
type AlphaStateStores = {
  /**
   * Alpha component value.
   */
  alpha: svelte_store.Writable<number | null>;
};

/**
 * Provides a buffered set of stores converting the current color from {@link ColorState} into a hex values for display
 * in the {@link TextInput} component. The hex store has an overridden set method that validate updates from the text
 * input assigned to it keeping ensuring that the string value is a valid hex color. A validation store `isHexValid`
 * is also available to be able to selectively set a CSS class on the input to notify users when the entered string
 * is not a valid hex color.
 */
declare class HexState {
  /**
   * @param {import('./').ColorStateAccess}  colorStateAccess -
   *
   * @param {import('./').TextStateAccess}   textStateAccess -
   */
  constructor(colorStateAccess: ColorStateAccess, textStateAccess: TextStateAccess);
  /**
   * @returns {boolean} Supports separate alpha channel.
   */
  get hasAlpha(): boolean;
  /**
   * @returns {HexStateInputData} Hex input component data.
   */
  get inputData(): HexStateInputData;
  /**
   * @returns {HexStateStores} Hex text state stores.
   */
  get stores(): HexStateStores;
  /**
   * Updates the internal state from changes in {@link ColorState} current color.
   * Covert to a hex color for display in the TextInput component.
   *
   * @param {object}   color - Current color value (HSV currently).
   *
   * @package
   */
  _updateColor(color: object): void;
  #private;
}
/**
 * Provides the input data options to use in text input components.
 */
type HexStateInputData = object[];
/**
 * Provides the buffered stores to use in text input components.
 */
type HexStateStores = {
  /**
   * Hex value.
   */
  hex: svelte_store.Writable<string | null>;
  /**
   * Is current entered hex string valid.
   */
  isHexValid: svelte_store.Writable<boolean>;
};

/**
 * Provides a buffered set of stores converting the current color from {@link ColorState} into rounded HSL component
 * values for display in the {@link TextInput} component. These HSL component stores have an overridden set method that
 * validate updates from the number inputs they are assigned to keeping number ranges between `0-360` for hue / h and
 * s / l (0 - 100). Also handling the case when the number input is `null` which occurs when the user removes all input
 * values or inputs `-` a minus character, etc. In that case `0` is substituted for `null`.
 */
declare class HslState {
  /**
   * @param {import('./').ColorStateAccess}  colorStateAccess -
   *
   * @param {import('./').TextStateAccess}   textStateAccess -
   */
  constructor(colorStateAccess: ColorStateAccess, textStateAccess: TextStateAccess);
  /**
   * @returns {boolean} Supports separate alpha channel.
   */
  get hasAlpha(): boolean;
  /**
   * @returns {HslStateInputData} HSL input component data.
   */
  get inputData(): HslStateInputData;
  /**
   * @returns {HslStateStores} HSV text state stores.
   */
  get stores(): HslStateStores;
  /**
   * Updates the internal state from changes in {@link ColorState} current color.
   * Covert to HSL and round values for display in the TextInput component.
   *
   * @param {object}   color - Current color value (HSV currently).
   *
   * @package
   */
  _updateColor(color: object): void;
  #private;
}
/**
 * Provides the input data options to use in number input components.
 */
type HslStateInputData = object[];
/**
 * Provides the buffered stores to use in text input components.
 */
type HslStateStores = {
  /**
   * Hue component value.
   */
  h: svelte_store.Writable<number | null>;
  /**
   * Saturation component value.
   */
  s: svelte_store.Writable<number | null>;
  /**
   * Luminance component value.
   */
  l: svelte_store.Writable<number | null>;
};

/**
 * Provides a buffered set of stores converting the current color from {@link ColorState} into rounded HSV component
 * values for display in the {@link TextInput} component. These HSV component stores have an overridden set method that
 * validate updates from the number inputs they are assigned to keeping number ranges between `0-360` for hue / h and
 * s / v (0 - 100). Also handling the case when the number input is `null` which occurs when the user removes all input
 * values or inputs `-` a minus character, etc. In that case `0` is substituted for `null`.
 */
declare class HsvState {
  /**
   * @param {import('./').ColorStateAccess}  colorStateAccess -
   *
   * @param {import('./').TextStateAccess}   textStateAccess -
   */
  constructor(colorStateAccess: ColorStateAccess, textStateAccess: TextStateAccess);
  /**
   * @returns {boolean} Supports separate alpha channel.
   */
  get hasAlpha(): boolean;
  /**
   * @returns {HsvStateInputData} HSV input component data.
   */
  get inputData(): HsvStateInputData;
  /**
   * @returns {HsvStateStores} HSV text state stores.
   */
  get stores(): HsvStateStores;
  /**
   * Updates the internal state from changes in {@link ColorState} current color.
   * Covert to HSV and round values for display in the TextInput component.
   *
   * @param {object}   color - Current color value (HSV currently).
   *
   * @package
   */
  _updateColor(color: object): void;
  #private;
}
/**
 * Provides the input data options to use in number input components.
 */
type HsvStateInputData = object[];
/**
 * Provides the buffered stores to use in text input components.
 */
type HsvStateStores = {
  /**
   * Hue component value.
   */
  h: svelte_store.Writable<number | null>;
  /**
   * Saturation component value.
   */
  s: svelte_store.Writable<number | null>;
  /**
   * Value / brightness component value.
   */
  v: svelte_store.Writable<number | null>;
};

/**
 * Provides a buffered set of stores converting the current color from {@link ColorState} into rounded RGB component
 * values for display in the {@link TextInput} component. These RGB component stores have an overridden set method that
 * validate updates from the number inputs they are assigned to keeping number ranges between `0-255` and also handling
 * the case when the number input is `null` which occurs when the user removes all input values or inputs `-` a minus
 * character, etc. In that case `0` is substituted for `null`.
 */
declare class RgbState {
  /**
   * @param {import('./').ColorStateAccess}  colorStateAccess -
   *
   * @param {import('./').TextStateAccess}   textStateAccess -
   */
  constructor(colorStateAccess: ColorStateAccess, textStateAccess: TextStateAccess);
  /**
   * @returns {boolean} Supports separate alpha channel.
   */
  get hasAlpha(): boolean;
  /**
   * @returns {RgbStateInputData} HSL input component data.
   */
  get inputData(): RgbStateInputData;
  /**
   * @returns {RgbStateStores} RGB text state stores.
   */
  get stores(): RgbStateStores;
  /**
   * Updates the internal state from changes in {@link ColorState} current color.
   * Covert to RGB and round values for display in the TextInput component.
   *
   * @param {object}   color - Current color value (HSV currently).
   *
   * @package
   */
  _updateColor(color: object): void;
  #private;
}
/**
 * Provides the input data options to use in number input components.
 */
type RgbStateInputData = object[];
/**
 * Provides the buffered stores to use in text input components.
 */
type RgbStateStores = {
  /**
   * Red component value.
   */
  r: svelte_store.Writable<number | null>;
  /**
   * Green component value.
   */
  g: svelte_store.Writable<number | null>;
  /**
   * Blue component value.
   */
  b: svelte_store.Writable<number | null>;
};

/**
 * Manages the text state for all supported color formats such as `rgb` and `hex` formats. The internal storage format
 * is HSV and the conversions between floating point and integer representation in the text input GUI is lossy.
 * TextState provides a store that tracks the text representations like `rgb` component values (0 - 255). Changes from
 * the text input component are converted into internal HSV representation and set the `hue` and `sv` stores setting
 * the #interalUpdate `textUpdate` flag so that {@link ColorState.#updateCurrentColor} doesn't update TextState. This
 * makes it possible to support a single internal color representation in HSV and not have independent variables for
 * each type.
 */
declare class TextState {
  /**
   * @param {import('../').ColorState}                 colorState - ColorState instance.
   *
   * @param {import('../').ColorStateInternalUpdate}   internalUpdate - ColorState internal store update data.
   */
  constructor(colorState: ColorState, internalUpdate: ColorStateInternalUpdate);
  /**
   * @returns {ActiveTextState} Current active text state.
   */
  get activeState(): ActiveTextState;
  /**
   * @returns {AlphaState} Alpha text state.
   */
  get alpha(): AlphaState;
  /**
   * @returns {HexState} Hex text state.
   */
  get hex(): HexState;
  /**
   * @returns {HslState} HSL text state.
   */
  get hsl(): HslState;
  /**
   * @returns {HsvState} HSV text state.
   */
  get hsv(): HsvState;
  /**
   * @returns {RgbState} RGB text state.
   */
  get rgb(): RgbState;
  /**
   * Updates all text state for supported formats from the given color.
   *
   * @param {object}  color - A supported ColorD color format.
   */
  updateColor(color: object): void;
  /**
   * Updates active text state format when format option changes.
   *
   * @param {string} format -
   */
  updateFormat(format: string): void;
  /**
   * @param {import('svelte/store').Subscriber<TextState>} handler - Callback function that is invoked on update /
   * changes.
   *
   * @returns {import('svelte/store').Unsubscriber} Unsubscribe function.
   */
  subscribe(handler: svelte_store.Subscriber<TextState>): svelte_store.Unsubscriber;
  #private;
}

type ColorStateAccess = {
  /**
   * The stores from {@link ColorState}.
   */
  stores: ColorStateStores;
  /**
   * The internal tracking state from
   * {@link ColorState}.
   */
  internalUpdate: ColorStateInternalUpdate;
};
type TextStateAccess = {
  /**
   * Provides access to the #updateColorInternal method.
   */
  updateColorInternal: Function;
};

/**
 *
 * The separated store updates for alpha, hue, sv are debounced with a next tick update and this object
 * collates the values for each store update in the same tick. It is reset in #updateOutputColorDebounce.
 *
 * `textUpdate` determines if the update came from {@link TextState} and if so TextState is not updated in
 * #updateCurrentColor.
 */
type ColorStateInternalUpdate = {
  /**
   * New alpha value.
   */
  a: number;
  /**
   * New hue value.
   */
  h: number;
  /**
   * New SV value.
   */
  sv: {
    s: number;
    v: number;
  };
  /**
   * Did the update come from {@link TextState}.
   */
  textUpdate: boolean;
};
type ColorStateStores = {
  /**
   * The current alpha value (0 - 1).
   */
  alpha: svelte_store.Writable<number>;
  /**
   * The current hue value (0 - 360).
   */
  hue: svelte_store.Writable<number>;
  /**
   * The current color.
   */
  currentColor: svelte_store.Readable<string | object>;
  /**
   * - The current color string matching format or
   * HSL.
   */
  currentColorString: svelte_store.Readable<string>;
  /**
   * Is the current color considered "dark".
   */
  isDark: svelte_store.Readable<boolean>;
  /**
   * The text state for various supported color formats.
   */
  textState: TextState;
  /**
   * The current color / RGB only string.
   */
  hslString: svelte_store.Readable<string>;
  /**
   * The current color hue / RGB only string.
   */
  hslHueString: svelte_store.Readable<string>;
  /**
   * The current color / RGBA only string.
   */
  hslaString: svelte_store.Readable<string>;
  /**
   * The saturation / value pair for HSV
   * components.
   */
  sv: svelte_store.Writable<{
    s: number;
    v: number;
  }>;
};

declare class ColorState {
  /**
   * @param {import('../').InternalState}   internalState -
   *
   * @param {object|string}  color -
   *
   * @param {import('../../../').TJSColordPickerOptions}  options -
   */
  constructor(internalState: InternalState, color: object | string, options: TJSColordPickerOptions);
  /**
   * @returns {number} Alpha color data.
   */
  get alpha(): number;
  /**
   * @returns {"hex"|"hsl"|"hsv"|"rgb"} Color format.
   */
  get format(): 'rgb' | 'hex' | 'hsl' | 'hsv';
  /**
   * @returns {"object"|"string"} Color format data type.
   */
  get formatType(): 'string' | 'object';
  /**
   * @returns {number} Color hue data.
   */
  get hue(): number;
  /**
   * @returns {{ h: number, s: number, v: number, a: number }} Current HSV color object.
   */
  get hsv(): {
    h: number;
    s: number;
    v: number;
    a: number;
  };
  /**
   * @returns {import('./').ColorStateStores} ColorState stores.
   */
  get stores(): ColorStateStores;
  /**
   * @returns {{s: number, v: number}} Saturation / Value data.
   */
  get sv(): {
    s: number;
    v: number;
  };
  /**
   * Unsubscribe from stores.
   */
  destroy(): void;
  /**
   * Gets the current color in the specific format and format type.
   *
   * @param {object}                  [opts] - Optional parameters.
   *
   * @param {'hex'|'hsl'|'hsv'|'rgb'} [opts.format='hsl'] - Format to convert to...
   *
   * @param {'object'|'string'}       [opts.formatType='string'] - Primitive type.
   *
   * @param {number}                  [opts.precision=0] - Primitive type.
   *
   * @returns {object|string} Current color.
   */
  getColor(opts?: {
    format?: 'hex' | 'hsl' | 'hsv' | 'rgb';
    formatType?: 'object' | 'string';
    precision?: number;
  }): object | string;
  /**
   * Returns initial color when in popup mode and container is openend.
   *
   * @returns {string|object} Initial color before popup.
   */
  getPopupColor(): string | object;
  /**
   * Sets current color from given color data.
   *
   * @param {object|string}   color - Supported ColorD color format.
   */
  setColor(color: object | string): void;
  /**
   * Saves the current color when in popup mode and picker is initially opened.
   */
  savePopupColor(): void;
  updateExternal(extColor: any): void;
  /**
   * Updates options related to ColorState.
   *
   * @param {import('../../../').TJSColordPickerOptions}   options -
   */
  updateOptions(options: TJSColordPickerOptions): void;
  #private;
}

declare class InternalState {
  /**
   * @param {object|string}           color -
   *
   * @param {import('../../').TJSColordPickerOptions}  options -
   *
   * @param {import('#runtime/svelte/store/web-storage').TJSWebStorage}  tjsSessionStorage - External
   *        TJSWebStorage (session) instance.
   */
  constructor(
    color: object | string,
    options: TJSColordPickerOptions,
    tjsSessionStorage: _runtime_svelte_store_web_storage.TJSWebStorage,
  );
  /**
   * @returns {AddOnState} Gets AddOnState data.
   */
  get addOnState(): AddOnState;
  /**
   * @returns {ButtonState} Gets ButtonState data.
   */
  get buttonState(): ButtonState;
  /**
   * @returns {ColorState} Gets ColorState data.
   */
  get colorState(): ColorState;
  /**
   * @returns {boolean} Current 'hasAlpha' state.
   */
  get hasAlpha(): boolean;
  /**
   * @param {boolean}  isOpen - New `isOpen` state.
   */
  set isOpen(isOpen: boolean);
  /**
   * @returns {boolean} Current `isOpen` state.
   */
  get isOpen(): boolean;
  /**
   * @returns {number} Gets current `precision` data.
   */
  get precision(): number;
  /**
   * @returns {import('#runtime/svelte/store/web-storage').TJSWebStorage} Gets associated TJSWebStorage (session)
   *          instance.
   */
  get sessionStorage(): _runtime_svelte_store_web_storage.TJSWebStorage;
  /**
   * @returns {import('./').PickerStores} Gets the color picker stores.
   */
  get stores(): PickerStores;
  destroy(): void;
  /**
   * Swaps the current `isOpen` state.
   *
   * @returns {boolean} The current `isOpen` state.
   */
  swapIsOpen(): boolean;
  /**
   * Updates external & internal data on changes to the `options` prop.
   *
   * @param {import('../../').TJSColordPickerOptions} options -
   */
  updateOptions(options: TJSColordPickerOptions): void;
  #private;
}

/**
 * Provides management of all saved colors in a session storage store.
 *
 * Note:
 */
declare class SavedColorsState {
  /**
   * @param {import('../../../model/InternalState').InternalState} internalState - Internal picker state.
   */
  constructor(internalState: InternalState);
  destroy(): void;
  addColor(): void;
  deleteColor(color: any): void;
  deleteAll(): void;
  /**
   * @param {import('svelte/store').Subscriber<string[]>} handler - Callback function that is invoked on update /
   * changes.
   *
   * @returns {import('svelte/store').Unsubscriber} Unsubscribe function.
   */
  subscribe(handler: svelte_store.Subscriber<string[]>): svelte_store.Unsubscriber;
  #private;
}

/**
 * Provides the main addon example for TJSColordPicker. Addons allow extension of the color picker. This addon provides
 * session storage for saving / restoring colors.
 *
 * An oddon for TJSColordPicker must provide a static accessor for a unique `id` and also provide a
 * {@link TJSFolderData} object via a `folderData` accessor.
 */
declare class TJSColordPickerSavedColors {
  /**
   * @returns {string} ID of the addon.
   */
  static get id(): string;
  /**
   * @param {object} opts - Options.
   *
   * @param {import('../../../model/InternalState').InternalState}  opts.internalState - Internal picker state.
   *
   * @param {string}   opts.label - Label for folder.
   */
  constructor({ internalState, label }?: { internalState: InternalState; label: string });
  /**
   * @returns {SavedColorsState} Gets SavedColorState data.
   */
  get savedColorsState(): SavedColorsState;
  /**
   * @returns {import('../../../../../folder').TJSFolderData} The TJSFolderData object to configure the TJSSvgFolder
   * component the addon is installed into.
   */
  get folderData(): TJSFolderData;
  destroy(): void;
  #private;
}

type TJSColordPickerColor = object | string;
type TJSColordPickerOptions = {
  /**
   * Iterable list of addon class constructor functions.
   */
  addons?: Iterable<Function>;
  /**
   * User defined picker component overrides.
   */
  components?: TJSColordPickerComponents;
  /**
   * The user defined color format.
   */
  format?: 'hex' | 'hsl' | 'hsv' | 'rgb';
  /**
   * The user defined color format type.
   */
  formatType?: 'object' | 'string';
  /**
   * Enables the addons panel / can set to false to hide panel when addons loaded.
   */
  hasAddons?: boolean;
  /**
   * Enables alpha / opacity color selection and output.
   */
  hasAlpha?: boolean;
  /**
   * Enables the button bar.
   */
  hasButtonBar?: boolean;
  /**
   * Enables eye dropper support if available (requires secure context).
   */
  hasEyeDropper?: boolean;
  /**
   * Enables text input component.
   */
  hasTextInput?: boolean;
  /**
   * Name attribute for hidden input element / form submission.
   */
  inputName?: string;
  /**
   * Is the picker configured as a pop-up.
   */
  isPopup?: boolean;
  /**
   * Picker layout variant.
   */
  layout?: 'chrome' | undefined;
  /**
   * When true text input format can not be changed from current format.
   */
  lockTextFormat?: boolean;
  /**
   * A positive integer defining rounding precision.
   */
  precision?: number;
  /**
   * An external store to update current color.
   */
  store?: svelte_store.Writable<TJSColordPickerColor>;
  /**
   * Inline styles to apply to TJSColordPicker span; useful to set CSS variables.
   */
  styles?: object;
  /**
   * A positive integer greater than 50 defining the main container width in
   * pixels or a valid CSS dimension string.
   */
  width?: number | string;
};
type TJSColordPickerComponents = {
  /**
   * Alpha slider indicator.
   */
  alphaIndicator?: svelte.SvelteComponent;
  /**
   * Alpha slider wrapper.
   */
  alphaWrapper?: svelte.SvelteComponent;
  /**
   * When in popup model advances focus to prop element.
   */
  focusWrap?: svelte.SvelteComponent;
  /**
   * Picker indicator.
   */
  pickerIndicator?: svelte.SvelteComponent;
  /**
   * Picker wrapper.
   */
  pickerWrapper?: svelte.SvelteComponent;
  /**
   * Hue slider indicator.
   */
  sliderIndicator?: svelte.SvelteComponent;
  /**
   * Hue slider wrapper.
   */
  sliderWrapper?: svelte.SvelteComponent;
  /**
   * Text input component.
   */
  textInput?: svelte.SvelteComponent;
  /**
   * Outer wrapper for all components.
   */
  wrapper?: svelte.SvelteComponent;
};

/**
 * Provides a convenient scrollable container / DIV that always allows keyboard scroll navigation by stopping
 * propagation of page up / down key events when the active element is or is contained by the container.
 *
 * Auto serialization of scroll state is handled by providing a store / `scrollTop`.
 *
 * A main slot is provided for a content component, but a fallback allows a child content component to be defined
 * by the `class` and `props` fields in {@link TJSScrollContainerData}.
 *
 */
declare class TjsScrollContainer extends SvelteComponent<
  TjsScrollContainer.Props,
  TjsScrollContainer.Events,
  TjsScrollContainer.Slots
> {}

/** Event / Prop / Slot type aliases for {@link TjsScrollContainer | associated component}. */
declare namespace TjsScrollContainer {
  /** Props type alias for {@link TjsScrollContainer | associated component}. */
  export type Props = {
    /** @type {import('.').TJSScrollContainerData} */
    container?: TJSScrollContainerData;
    /** @type {import('svelte/store').Writable<number>} */
    scrollTop?: svelte_store.Writable<number>;
    /** @type {Record<string, string>} */
    styles?: Record<string, string>;
  };
  /** Events type alias for {@link TjsScrollContainer | associated component}. */
  export type Events = { [evt: string]: CustomEvent<any> };
  /** Slots type alias for {@link TjsScrollContainer | associated component}. */
  export type Slots = { default: {} };
}

type TJSScrollContainerData = {
  /**
   * A svelte component class used as the content component when
   * there is no slotted component defined.
   */
  class?: svelte.SvelteComponent;
  /**
   * An object to apply to any data defined Svelte component when there is no slotted
   * component defined.
   */
  props?: object;
  /**
   * A Svelte store that serializes the scroll top
   * position of the scrollable container.
   */
  scrollTop?: svelte_store.Writable<number>;
  /**
   * Inline styles to assign to the container.
   */
  styles?: Record<string, string>;
};

/**
 * TODO: Add description
 *
 */
declare class TjsButton extends SvelteComponent<TjsButton.Props, TjsButton.Events, TjsButton.Slots> {}

/** Event / Prop / Slot type aliases for {@link TjsButton | associated component}. */
declare namespace TjsButton {
  /** Props type alias for {@link TjsButton | associated component}. */
  export type Props = {
    keyCode?: any;
    button?: any;
    label?: any;
    title?: any;
    disabled?: any;
    icon?: any;
    onPress?: any;
    styles?: any;
    efx?: any;
    onContextMenu?: any;
    clickPropagate?: any;
  };
  /** Events type alias for {@link TjsButton | associated component}. */
  export type Events = { click: MouseEvent; contextmenu: MouseEvent; press: CustomEvent<any> } & {
    [evt: string]: CustomEvent<any>;
  };
  /** Slots type alias for {@link TjsButton | associated component}. */
  export type Slots = { default: {} };
}

/**
 * Provides a generic "input" component that creates the specific input component based on 'type'. If no `type`
 * property is available in the input object `text` is the default.
 *
 * You may optionally define a label either as `input.label` or through the `label` prop as a string. The label
 * element uses `display: contents` which ignores the label element and lays out the children as if the
 * label element does not exist which is perfect for a grid layout.
 *
 * ### CSS Variables
 *
 * The following CSS variables control the associated styles with the default values:
 * ```
 * --tjs-input-label-display - content
 * --tjs-input-label-text-align - right
 * --tjs-input-label-white-space - nowrap
 * ```
 */
declare class TjsInput extends SvelteComponent<TjsInput.Props, TjsInput.Events, TjsInput.Slots> {}

/** Event / Prop / Slot type aliases for {@link TjsInput | associated component}. */
declare namespace TjsInput {
  /** Props type alias for {@link TjsInput | associated component}. */
  export type Props = { input?: any; type?: any };
  /** Events type alias for {@link TjsInput | associated component}. */
  export type Events = { click: any; press: any; contextmenu: any } & { [evt: string]: CustomEvent<any> };
  /** Slots type alias for {@link TjsInput | associated component}. */
  export type Slots = {};
}

/**
 * Provides a data driven checkbox input w/ label.
 *
 * ### CSS Variables:
 * ```
 * --tjs-input-appearance
 * --tjs-input-border
 * --tjs-input-border-radius
 * --tjs-input-border-disabled
 * --tjs-input-box-shadow-focus
 * --tjs-input-box-shadow-focus-visible
 * --tjs-input-cursor
 * --tjs-input-cursor-disabled
 * --tjs-input-flex
 * --tjs-input-outline-focus-visible
 * --tjs-input-outline-offset
 * --tjs-input-transition-focus-visible
 * --tjs-input-transition-hover
 *
 * --tjs-input-checkbox-appearance
 * --tjs-input-checkbox-background
 * --tjs-input-checkbox-border
 * --tjs-input-checkbox-border-radius
 * --tjs-input-checkbox-border-disabled
 * --tjs-input-checkbox-box-shadow-focus
 * --tjs-input-checkbox-box-shadow-focus-visible
 * --tjs-input-checkbox-cursor
 * --tjs-input-checkbox-cursor-disabled
 * --tjs-input-checkbox-diameter
 * --tjs-input-checkbox-flex
 * --tjs-input-checkbox-height
 * --tjs-input-checkbox-outline-hover
 * --tjs-input-checkbox-outline-focus-visible
 * --tjs-input-checkbox-outline-offset
 * --tjs-input-checkbox-transition-focus-visible
 * --tjs-input-checkbox-transition-hover
 * --tjs-input-checkbox-width
 * ```
 */
declare class TjsInputCheckbox extends SvelteComponent<
  TjsInputCheckbox.Props,
  TjsInputCheckbox.Events,
  TjsInputCheckbox.Slots
> {}

/** Event / Prop / Slot type aliases for {@link TjsInputCheckbox | associated component}. */
declare namespace TjsInputCheckbox {
  /** Props type alias for {@link TjsInputCheckbox | associated component}. */
  export type Props = {
    input?: any;
    label?: any;
    disabled?: any;
    readonly?: any;
    store?: any;
    styles?: any;
    efx?: any;
  };
  /** Events type alias for {@link TjsInputCheckbox | associated component}. */
  export type Events = { pointerdown: PointerEvent } & { [evt: string]: CustomEvent<any> };
  /** Slots type alias for {@link TjsInputCheckbox | associated component}. */
  export type Slots = {};
}

/**
 * A number input type.
 *
 * ### CSS Variables:
 * ```
 * --tjs-input-appearance
 * --tjs-input-background
 * --tjs-input-border
 * --tjs-input-border-radius
 * --tjs-input-border-disabled
 * --tjs-input-box-shadow-focus
 * --tjs-input-box-shadow-focus-visible
 * --tjs-input-caret-color
 * --tjs-input-color
 * --tjs-input-color-disabled
 * --tjs-input-cursor
 * --tjs-input-cursor-disabled
 * --tjs-input-flex
 * --tjs-input-font-family
 * --tjs-input-font-size
 * --tjs-input-height
 * --tjs-input-line-height
 * --tjs-input-padding
 * --tjs-input-placeholder-color
 * --tjs-input-outline-focus-visible
 * --tjs-input-outline-offset
 * --tjs-input-overflow
 * --tjs-input-text-align
 * --tjs-input-transition-focus-visible
 * --tjs-input-value-invalid-color
 * --tjs-input-width
 *
 * --tjs-input-number-appearance
 * --tjs-input-number-background
 * --tjs-input-number-border
 * --tjs-input-number-border-radius
 * --tjs-input-number-border-disabled
 * --tjs-input-number-box-shadow-focus
 * --tjs-input-number-box-shadow-focus-visible
 * --tjs-input-number-caret-color
 * --tjs-input-number-color
 * --tjs-input-number-color-disabled
 * --tjs-input-number-cursor
 * --tjs-input-number-cursor-disabled
 * --tjs-input-number-flex
 * --tjs-input-number-font-family
 * --tjs-input-number-font-size
 * --tjs-input-number-height
 * --tjs-input-number-line-height
 * --tjs-input-number-outline-focus-visible
 * --tjs-input-number-outline-offset
 * --tjs-input-number-overflow
 * --tjs-input-number-padding
 * --tjs-input-number-placeholder-color
 * --tjs-input-number-text-align
 * --tjs-input-number-transition-focus-visible
 * --tjs-input-number-value-invalid-color
 * --tjs-input-number-width
 *
 * Webkit unique variables:
 * --tjs-input-number-webkit-inner-spin-button-opacity
 * --tjs-input-number-webkit-outer-spin-button-opacity
 * ```
 */
declare class TjsInputNumber extends SvelteComponent<
  TjsInputNumber.Props,
  TjsInputNumber.Events,
  TjsInputNumber.Slots
> {}

/** Event / Prop / Slot type aliases for {@link TjsInputNumber | associated component}. */
declare namespace TjsInputNumber {
  /** Props type alias for {@link TjsInputNumber | associated component}. */
  export type Props = {
    input?: any;
    max?: any;
    min?: any;
    label?: any;
    disabled?: any;
    options?: any;
    readonly?: any;
    store?: any;
    styles?: any;
    efx?: any;
    placeholder?: any;
    step?: any;
    storeIsValid?: any;
  };
  /** Events type alias for {@link TjsInputNumber | associated component}. */
  export type Events = { pointerdown: PointerEvent } & { [evt: string]: CustomEvent<any> };
  /** Slots type alias for {@link TjsInputNumber | associated component}. */
  export type Slots = {};
}

/**
 * A generic input type has issues w/ 2-way binding w/ Svelte.
 * https://github.com/sveltejs/svelte/issues/3921
 *
 * A "hack" is used to set the type on the input element: `{...{ type }}`
 *
 * Only use this component for text inputs presently. More work to come.
 *
 * ### CSS Variables:
 * ```
 * --tjs-input-appearance
 * --tjs-input-background
 * --tjs-input-border
 * --tjs-input-border-radius
 * --tjs-input-border-disabled
 * --tjs-input-box-shadow-focus
 * --tjs-input-box-shadow-focus-visible
 * --tjs-input-caret-color
 * --tjs-input-color
 * --tjs-input-color-disabled
 * --tjs-input-cursor
 * --tjs-input-cursor-disabled
 * --tjs-input-flex
 * --tjs-input-font-family
 * --tjs-input-font-size
 * --tjs-input-height
 * --tjs-input-line-height
 * --tjs-input-padding
 * --tjs-input-placeholder-color
 * --tjs-input-outline-focus-visible
 * --tjs-input-outline-offset
 * --tjs-input-overflow
 * --tjs-input-text-align
 * --tjs-input-transition-focus-visible
 * --tjs-input-value-invalid-color
 * --tjs-input-width
 *
 * --tjs-input-text-appearance
 * --tjs-input-text-background
 * --tjs-input-text-border
 * --tjs-input-text-border-radius
 * --tjs-input-text-border-disabled
 * --tjs-input-text-box-shadow-focus
 * --tjs-input-text-box-shadow-focus-visible
 * --tjs-input-text-caret-color
 * --tjs-input-text-color
 * --tjs-input-text-color-disabled
 * --tjs-input-text-cursor
 * --tjs-input-text-cursor-disabled
 * --tjs-input-text-flex
 * --tjs-input-text-font-family
 * --tjs-input-text-font-size
 * --tjs-input-text-height
 * --tjs-input-text-line-height
 * --tjs-input-text-outline-focus-visible
 * --tjs-input-text-outline-offset
 * --tjs-input-text-overflow
 * --tjs-input-text-padding
 * --tjs-input-text-placeholder-color
 * --tjs-input-text-text-align
 * --tjs-input-text-transition-focus-visible
 * --tjs-input-text-value-invalid-color
 * --tjs-input-text-width
 * ```
 */
declare class TjsInputText extends SvelteComponent<TjsInputText.Props, TjsInputText.Events, TjsInputText.Slots> {}

/** Event / Prop / Slot type aliases for {@link TjsInputText | associated component}. */
declare namespace TjsInputText {
  /** Props type alias for {@link TjsInputText | associated component}. */
  export type Props = {
    input?: any;
    type?: any;
    label?: any;
    disabled?: any;
    options?: any;
    readonly?: any;
    store?: any;
    styles?: any;
    efx?: any;
    placeholder?: any;
    storeIsValid?: any;
  };
  /** Events type alias for {@link TjsInputText | associated component}. */
  export type Events = { pointerdown: PointerEvent } & { [evt: string]: CustomEvent<any> };
  /** Slots type alias for {@link TjsInputText | associated component}. */
  export type Slots = {};
}

/**
 * ### CSS Variables
 * ```
 * --tjs-input-appearance
 * --tjs-input-background
 * --tjs-input-border
 * --tjs-input-border-radius
 * --tjs-input-border-disabled
 * --tjs-input-box-shadow-focus
 * --tjs-input-box-shadow-focus-visible
 * --tjs-input-color
 * --tjs-input-color-disabled
 * --tjs-input-cursor
 * --tjs-input-cursor-disabled
 * --tjs-input-flex
 * --tjs-input-font-family
 * --tjs-input-font-size
 * --tjs-input-height
 * --tjs-input-line-height
 * --tjs-input-outline-focus-visible
 * --tjs-input-outline-offset
 * --tjs-input-overflow
 * --tjs-input-text-overflow
 * --tjs-input-transition-focus-visible
 * --tjs-input-width
 *
 * --tjs-select-appearance
 * --tjs-select-background
 * --tjs-select-border
 * --tjs-select-border-radius
 * --tjs-select-border-disabled
 * --tjs-select-box-shadow-focus
 * --tjs-select-box-shadow-focus-visible
 * --tjs-select-color
 * --tjs-select-color-disabled
 * --tjs-select-cursor
 * --tjs-select-cursor-disabled
 * --tjs-select-flex
 * --tjs-select-font-family
 * --tjs-select-font-size
 * --tjs-select-height
 * --tjs-select-line-height
 * --tjs-select-outline-focus-visible
 * --tjs-select-outline-offset
 * --tjs-select-overflow
 * --tjs-select-text-overflow
 * --tjs-select-transition-focus-visible
 * --tjs-select-width
 *
 * --tjs-select-option-background; fallback: --tjs-default-popup-background; default: #23221d
 * --tjs-select-option-color; fallback: --tjs-default-popup-primary-color; default: #b5b3a4
 * ```
 */
declare class TjsSelect extends SvelteComponent<TjsSelect.Props, TjsSelect.Events, TjsSelect.Slots> {}

/** Event / Prop / Slot type aliases for {@link TjsSelect | associated component}. */
declare namespace TjsSelect {
  /** Props type alias for {@link TjsSelect | associated component}. */
  export type Props = {
    label?: any;
    select?: any;
    disabled?: any;
    options?: any;
    store?: any;
    styles?: any;
    efx?: any;
    selected?: any;
  };
  /** Events type alias for {@link TjsSelect | associated component}. */
  export type Events = { change: Event; pointerdown: PointerEvent } & { [evt: string]: CustomEvent<any> };
  /** Slots type alias for {@link TjsSelect | associated component}. */
  export type Slots = {};
}

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
    disabled?: boolean;
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
    disabled?: any;
    store?: any;
    onPress?: any;
    styles?: any;
    efx?: any;
    onContextMenu?: any;
    clickPropagate?: any;
    titleSelected?: any;
    onClose?: any;
    comp?: any;
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

declare class ControlStore {
  constructor(component: any);
  get component(): any;
  get id(): any;
  set isPrimary(isPrimary: boolean);
  get isPrimary(): boolean;
  /**
   * @returns {TJSPosition} Control position.
   */
  get position(): TJSPosition;
  set resizing(resizing: boolean);
  get resizing(): boolean;
  set selected(selected: boolean);
  get selected(): boolean;
  get stores(): {
    isPrimary: svelte_store.Writable<boolean>;
    resizing: svelte_store.Writable<boolean>;
    selected: svelte_store.Writable<boolean>;
  };
  /**
   * Cleans up all subscriptions and removes references to tracked component data.
   */
  destroy(): void;
  #private;
}

declare class ControlsStore {
  /**
   * Creates a new instance of ControlsStore and the selected drag API.
   *
   * @returns {[ControlsStore, object]}
   */
  static create(): [ControlsStore, object];
  /**
   * @param {DOMRect|void}  boundingRect - Assigns the validation bounding rect.
   */
  set boundingRect(boundingRect: void | DOMRect);
  /**
   * @returns {DOMRect} Returns any validation bounding rect.
   */
  get boundingRect(): DOMRect;
  /**
   * @param {boolean}  enabled - New enabled state.
   */
  set enabled(enabled: boolean);
  /**
   * @returns {boolean} Returns enabled state.
   */
  get enabled(): boolean;
  /**
   * @returns {SelectedAPI} Selected API
   */
  get selected(): SelectedAPI;
  /**
   * @returns {*} Stores.
   */
  get stores(): any;
  /**
   * @param {boolean}  validate - New on-drag validation state.
   */
  set validate(validate: boolean);
  /**
   * @returns {boolean} Returns if on-drag validation is enabled.
   */
  get validate(): boolean;
  /**
   * Exports all or selected component data w/ TJSPosition converted to JSON object. An option to compact the position
   * data will transform the minimum top / left of all components as the origin.
   *
   * @param {object}   [opts] - Optional parameters.
   *
   * @param {boolean}  [opts.compact=false] - Transform / compact position data.
   *
   * @param {boolean}  [opts.selected=false] - When true export selected components.
   *
   * @returns {{width: number|void, height: number|void, components: object[]}} Width / height max extents & serialized
   *                                                                  component data.
   */
  export({ compact, selected }?: { compact?: boolean; selected?: boolean }): {
    width: number | void;
    height: number | void;
    components: object[];
  };
  /**
   * @returns {IterableIterator<any>} Keys for all controls.
   */
  keys(): IterableIterator<any>;
  /**
   * Updates the tracked component data. Each entry must be an object containing a unique `id` property and an
   * instance of TJSPosition as the `position` property.
   *
   * @param {Iterable<object>} components - Iterable list of component data objects.
   */
  updateComponents(components: Iterable<object>): void;
  /**
   * @returns {IterableIterator<ControlStore>} All controls.
   */
  values(): IterableIterator<ControlStore>;
  /**
   * @param {import('svelte/store').Subscriber<ControlStore[]>} handler - Callback function that is invoked on
   * update / changes.
   *
   * @returns {import('svelte/store').Unsubscriber} Unsubscribe function.
   */
  subscribe(handler: svelte_store.Subscriber<ControlStore[]>): svelte_store.Unsubscriber;
  #private;
}
type ControlsData = {
  /**
   * -
   */
  boundingRect: DOMRect;
  /**
   * -
   */
  enabled: boolean;
  /**
   * -
   */
  validate: boolean;
};
declare class SelectedAPI {
  /**
   * @param {ControlsData} data - The main ControlStore data object.
   *
   * @returns {[SelectedAPI, object]}
   */
  static create(data: ControlsData): [SelectedAPI, object];
  /**
   * @param {ControlsData} data - The main ControlStore data object.
   */
  constructor(data: ControlsData);
  /**
   * @param {ControlStore}   control - A control store.
   *
   * @param {boolean}        setPrimary - Make added control the primary control.
   */
  add(control: ControlStore, setPrimary?: boolean): void;
  clear(): void;
  /**
   * @returns {IterableIterator<[*, ControlStore]>} Selected control entries iterator.
   */
  entries(): IterableIterator<[any, ControlStore]>;
  /**
   * @returns {ControlStore} The primary control store.
   */
  getPrimary(): ControlStore;
  /**
   * @returns {IterableIterator<*>} Selected control keys iterator.
   */
  keys(): IterableIterator<any>;
  /**
   * @param {ControlStore}   control - A control store.
   */
  remove(control: ControlStore): void;
  /**
   * @param {*}   controlId - An ID for a control store to remove.
   */
  removeById(controlId: any): void;
  setPrimary(control: any): void;
  /**
   * Processes all selected controls transformed bounds to create a single combined bounding rect.
   *
   * @param {DOMRect} [boundingRect] - A DOMRect to store calculations or one will be created.
   *
   * @returns {DOMRect} Bounding rect.
   */
  getBoundingRect(boundingRect?: DOMRect): DOMRect;
  /**
   * @returns {IterableIterator<object>} Selected controls iterator.
   */
  values(): IterableIterator<object>;
  #private;
}

/**
 * TODO: Add description
 *
 */
declare class TjsPositionControlLayer extends SvelteComponent<
  TjsPositionControlLayer.Props,
  TjsPositionControlLayer.Events,
  TjsPositionControlLayer.Slots
> {}

/** Event / Prop / Slot type aliases for {@link TjsPositionControlLayer | associated component}. */
declare namespace TjsPositionControlLayer {
  /** Props type alias for {@link TjsPositionControlLayer | associated component}. */
  export type Props = {
    components?: any;
    /**
     * @type {ControlsStore}
     */
    controls?: ControlsStore;
    enabled?: boolean;
    boundingRect?: any;
    validate?: boolean;
  };
  /** Events type alias for {@link TjsPositionControlLayer | associated component}. */
  export type Events = { [evt: string]: CustomEvent<any> };
  /** Slots type alias for {@link TjsPositionControlLayer | associated component}. */
  export type Slots = { default: {} };
}

/**
 * Provides a component to display an absolutely positioned side layer in a parent element featuring a column of
 * icons that slide out panels defined as Svelte components.
 *
 */
declare class TjsSideSlideLayer extends SvelteComponent<
  TjsSideSlideLayer.Props,
  TjsSideSlideLayer.Events,
  TjsSideSlideLayer.Slots
> {}

/** Event / Prop / Slot type aliases for {@link TjsSideSlideLayer | associated component}. */
declare namespace TjsSideSlideLayer {
  /** Props type alias for {@link TjsSideSlideLayer | associated component}. */
  export type Props = {
    /**
     * A valid CSS value for the `top` positioning attribute for the top of the side slide layer.
     *
     * When top is a number it will be treated as pixels unless `topUnit` is defined.
     *
     * @type {string | number}
     */
    top?: string | number;
    /**
     * The z-index for the side slide layer inside the parent element.
     *
     * @type {number}
     */
    zIndex?: number;
    /**
     * Duration of transition effect.
     *
     * @type {number}
     */
    duration?: number;
    /**
     * Additional inline styles to apply to the side slide layer. Useful for setting CSS variables.
     *
     * @type {Record<string, string>}
     */
    styles?: Record<string, string>;
    /**
     * An iterable list of side slide items including icon (Font awesome string), a Svelte configuration object, and
     * title.
     *
     * You may provide a `condition` boolean or function that returns a boolean to hide the item. This is useful for
     * adding items / panels only visible for the GM amongst other conditional tests.
     *
     * @type {(Iterable<{
     *    condition?: boolean | (() => boolean)
     *    icon: string | import('#runtime/svelte/util').TJSSvelteConfig,
     *    svelte: import('#runtime/svelte/util').TJSSvelteConfig,
     *    title?: string
     * }>)}
     */
    items?: Iterable<{
      condition?: boolean | (() => boolean);
      icon: string | _runtime_svelte_util.TJSSvelteConfig;
      svelte: _runtime_svelte_util.TJSSvelteConfig;
      title?: string;
    }>;
    /**
     * Controls whether items can be locked when `clickToOpen` is false. By default, items can be locked.
     *
     * @type {boolean}
     */
    allowLocking?: boolean;
    /**
     * An iterable list of additional classes to add to the main slide layer element
     *
     * @type {Iterable<string>}
     */
    classes?: Iterable<string>;
    /**
     * When true items are only opened / closed by click / keyboard interaction.
     *
     * @type {boolean}
     */
    clickToOpen?: boolean;
    /**
     * Either the name of a Svelte easing function or a Svelte compatible easing function.
     *
     * @type {import('#runtime/svelte/easing').EasingReference}
     */
    easingIn?: _runtime_svelte_easing.EasingReference;
    /**
     * Either the name of a Svelte easing function or a Svelte compatible easing function.
     *
     * @type {import('#runtime/svelte/easing').EasingReference}
     */
    easingOut?: _runtime_svelte_easing.EasingReference;
    /**
     * When `top` is defined as a number and `topUnit` is defined then it is used to create the top style. This
     * facilitates creating a UI for editing side slide layer via a range input and separately storing the unit type.
     *
     * Examples are: `px`, `%`, `em`, `rem`. Either `px` or `%` make the most sense depending on the layout constraints.
     *
     * @type {string}
     */
    topUnit?: string;
    /**
     * The side in layers parent element to display.
     *
     * @type {'left' | 'right'}
     */
    side?: 'left' | 'right';
  };
  /** Events type alias for {@link TjsSideSlideLayer | associated component}. */
  export type Events = { [evt: string]: CustomEvent<any> };
  /** Slots type alias for {@link TjsSideSlideLayer | associated component}. */
  export type Slots = {};
}

/**
 * Provides an initial implementation to display image or video content from a given file path.
 *
 * You can either set the `filepath` prop or use {@link TJSFileSlotButton} and embed TJSMediaContent as a child.
 * A `filepath` context / store will be examined if it exists to obtain a file path to load.
 *
 * The following CSS variables control the associated styles with the default values:
 * ```
 * --tjs-media-content-background - transparent
 * --tjs-media-content-border - none
 * --tjs-media-content-border-radius - 0
 * --tjs-media-content-diameter - When defined used for height / width.
 * --tjs-media-content-height - 100px
 * --tjs-media-content-object-fit - contain
 * --tjs-media-content-width - 100px
 * ```
 */
declare class TjsMediaContent extends SvelteComponent<
  TjsMediaContent.Props,
  TjsMediaContent.Events,
  TjsMediaContent.Slots
> {}

/** Event / Prop / Slot type aliases for {@link TjsMediaContent | associated component}. */
declare namespace TjsMediaContent {
  /** Props type alias for {@link TjsMediaContent | associated component}. */
  export type Props = {
    media?: any;
    /**
     * A title for the media element.
     *
     * @type {string}
     */
    title?: string;
    /**
     * Prop for filepath media content.
     *
     * @type {string}
     */
    filepath?: string;
    /**
     * Alternate image text.
     *
     * @type {string}
     */
    imgAlt?: string;
    /**
     * Automatically start video playback; default: true
     *
     * @type {boolean}
     */
    videoAutoplay?: boolean;
    /**
     * Automatically loop video; default: true
     *
     * @type {boolean}
     */
    videoLoop?: boolean;
    /**
     * Mute video playback audio; default: true
     *
     * @type {boolean}
     */
    videoMuted?: boolean;
    /**
     * Play video on pointer hover.
     *
     * @type {boolean}
     */
    videoPlayOnHover?: boolean;
    /**
     * Video playback rate - clamped internally between 0 - 2.
     *
     * @type {number}
     */
    videoPlaybackRate?: number;
    /**
     * TODO: provide type and make this generic. Also figure out a non-Foundry default embedded SVG.
     */
    defaultMedia?: { elementType: string; filepath: string; valid: boolean };
  };
  /** Events type alias for {@link TjsMediaContent | associated component}. */
  export type Events = { [evt: string]: CustomEvent<any> };
  /** Slots type alias for {@link TjsMediaContent | associated component}. */
  export type Slots = { 'video-fallback': {} };
}

/**
 * TJSMenu provides a menu component that can be slotted into toggle components like TJSToggleIconButton and
 * TJSToggleLabel.
 *
 * TJSMenu supports a flexible data driven way to construct the menu items. Depending on the item data that is passed
 * into the menu you can define 4 types of items: 'icon / label', 'image / label', 'class / Svelte component', and
 * 'separator / hr'. TJSMenu also accepts a main slot allowing the entire menu contents to be replaced with a custom
 * component as well as named slots `before` and `after` which place named components before or after the main menu
 * data driven items.
 *
 * ----------------------------------------------------------------------------------------------------------------
 * Exported props include:
 *
 * - `menu` ({@link TJSMenuData}): An object defining all properties of a menu including potentially data driven
 * minimal Svelte configuration objects (`slotAfter`, `slotBefore`, and `slotDefault`) providing default
 * component implementations.
 *
 * Or in lieu of passing the folder object you can assign these props directly:
 * - `items`: An iterable list of {@link TJSMenuItemData}; defines data driven menu items.
 *
 * - `offset`: Optional X / Y offsets for the menu display.
 *
 * - `styles`: Styles to be applied inline via `applyStyles` action.
 *
 * - `efx`: Currently unused; for any future action effects.
 *
 * - `keyCode`: The key code to activate menu items.
 *
 * - `transitionOptions`: Custom transition options for duration and easing function.
 *
 * ----------------------------------------------------------------------------------------------------------------
 * ### Events
 *
 * There is a single that is fired and bubbled up through parent elements:
 *
 * - `close:popup` - A CustomEvent fired when the menu closes allowing any parent components to update state. The
 *                 `detail` data may have two optional fields of data including `keyboardFocus` / boolean if the
 *                  close action originated from keyboard navigation and the other is `target` / HTMLElement that is
 *                  the original event target for the close action.
 *
 * ----------------------------------------------------------------------------------------------------------------
 *
 * ### Styling
 * To style this component use `.tjs-menu` as the base selector.
 *
 * There are several local CSS variables that you can use to change the appearance dynamically. Either use
 * CSS props or pass in a `styles` object w/ key / value props to set to the details. The default fallback variables
 * target both TJSMenu and TJSContextMenu. The few `popup` defaults target first level overlaid components inside an
 * application.
 *
 * ### CSS Variables
 * ```
 * The following CSS variables are supported, but not defined by default:
 *
 * --tjs-menu-background - fallback: --tjs-default-menu-background; fallback: --tjs-default-popup-background; default: #23221d
 * --tjs-menu-border - fallback: --tjs-default-popup-border; default: 1px solid #000
 * --tjs-menu-border-radius - fallback: --tjs-default-popup-border-radius; default: 5px
 * --tjs-menu-box-shadow - fallback: --tjs-default-popup-box-shadow; default: 0 0 2px #000
 * --tjs-menu-primary-color - fallback: --tjs-default-menu-primary-color; fallback: --tjs-default-popup-primary-color; default: #b5b3a4
 * --tjs-menu-max-width - fallback: --tjs-default-menu-max-width; default: 360px
 * --tjs-menu-min-width - fallback: --tjs-default-menu-min-width; default: 20px
 * --tjs-menu-z-index - fallback: --tjs-default-popup-z-index; default: 100
 *
 * The following CSS variables define attributes for the data driven menu items.
 *
 * All menu items:
 * --tjs-menu-item-line-height - fallback: --tjs-default-menu-item-line-height; default: 2em
 * --tjs-menu-item-padding - fallback: --tjs-default-menu-item-padding; default: 0 0.5em 0 0
 *
 * Icon / Image menu items (considered a button item):
 * --tjs-menu-item-button-gap - fallback: --tjs-default-menu-item-button-gap; default: 0.25em
 * --tjs-menu-item-highlight-color - fallback: --tjs-default-menu-highlight-color; fallback: --tjs-default-popup-highlight-color; default: #f0f0e0
 * --tjs-menu-item-text-shadow-focus-hover - fallback: --tjs-default-text-shadow-focus-hover; default: 0 0 8px red
 *
 * Specific targeting for the label of button items (allows control of wrapping / set `white-space` to `nowrap`):
 * --tjs-menu-item-label-overflow - fallback: --tjs-default-menu-item-label-overflow; default: hidden
 * --tjs-menu-item-label-text-overflow - fallback: --tjs-default-menu-item-label-text-overflow; default: ellipsis
 * --tjs-menu-item-label-white-space - fallback: --tjs-default-menu-item-label-white-space; default: undefined
 *
 * Icon menu item:
 * --tjs-menu-item-icon-width - fallback: --tjs-default-menu-item-icon-width; default: 1.25em
 *
 * Image menu item:
 * --tjs-menu-item-image-width - fallback: --tjs-default-menu-item-image-width; default: 1.25em
 * --tjs-menu-item-image-height - fallback: --tjs-default-menu-item-image-height; default: 1.25em
 *
 * Separator / HR:
 * --tjs-menu-hr-margin - fallback: --tjs-default-hr-margin; default: 0 0.25em
 * --tjs-menu-hr-border-top - fallback: --tjs-default-hr-border-top; default: 1px solid #555
 * --tjs-menu-hr-border-bottom - fallback: --tjs-default-hr-border-bottom; default: 1px solid #444
 *
 * The following CSS variables define the keyboard / a11y focus indicator for menu items:
 * --tjs-menu-focus-indicator-align-self - fallback: --tjs-default-focus-indicator-align-self; default: stretch
 * --tjs-menu-focus-indicator-background - fallback: --tjs-default-focus-indicator-background; default: white
 * --tjs-menu-focus-indicator-border - fallback: --tjs-default-focus-indicator-border; default: undefined
 * --tjs-menu-focus-indicator-border-radius - fallback: --tjs-default-focus-indicator-border-radius; default: 0.1em
 * --tjs-menu-focus-indicator-height - fallback: --tjs-default-focus-indicator-height; default: undefined
 * --tjs-menu-focus-indicator-width - fallback: --tjs-default-focus-indicator-width; default: 0.25em
 * --tjs-menu-focus-indicator-transition - fallback: --tjs-default-focus-indicator-transition
 * ```
 */
declare class TjsMenu extends SvelteComponent<TjsMenu.Props, TjsMenu.Events, TjsMenu.Slots> {}

/** Event / Prop / Slot type aliases for {@link TjsMenu | associated component}. */
declare namespace TjsMenu {
  /** Props type alias for {@link TjsMenu | associated component}. */
  export type Props = {
    /** @type {{ x?: number, y?: number }} */
    offset?: { x?: number; y?: number };
    /** @type {string} */
    keyCode?: string;
    /** @type {import('.').TJSMenuData} */
    menu?: TJSMenuData;
    /** @type {Record<string, string>} */
    styles?: Record<string, string>;
    /** @type {HTMLElement|string} */
    focusEl?: HTMLElement | string;
    /** @type {Function} */
    efx?: Function;
    /** @type {Iterable<import('.').TJSMenuItemData>} */
    items?: Iterable<TJSMenuItemData>;
    /** @type {{ duration: number, easing: Function }} */
    transitionOptions?: { duration: number; easing: Function };
  };
  /** Events type alias for {@link TjsMenu | associated component}. */
  export type Events = { [evt: string]: CustomEvent<any> };
  /** Slots type alias for {@link TjsMenu | associated component}. */
  export type Slots = { default: {}; before: {}; after: {} };
}

/**
 * TJSContextMenuImpl provides a context menu implementation component that is not meant to be directly used as it is
 * controlled as a single browser wide context menu from {@link TJSContextMenu} that is imported via:
 * `import { TJSContextMenu } from '#standard/application';` The front end for TJSContextMenuImpl processes data and
 * invokes / manages a single context menu.
 *
 * TJSContextMenuImpl supports a flexible data driven way to construct the menu items with the same format as
 * {@link TJSMenu}. Depending on the item data that is passed into the menu you can define 4 types of items:
 * 'icon / label', 'image / label', 'class / Svelte component', and 'separator / hr'. The main difference is that
 * TJSContextMenu does not support default or named slots.
 *
 * ### Exported props
 * - `menu` ({@link TJSMenuData}): An object defining all properties of a menu.
 *
 * Or in lieu of passing the folder object you can assign these props directly:
 *
 * - `items`: An iterable list of {@link TJSContextMenuItemData}; defines data driven menu items.
 *
 * - `styles`: Styles to be applied inline via `applyStyles` action.
 *
 * - `efx`: Currently unused; for any future action effects.
 *
 * - `keyCode`: The key code to activate menu items.
 *
 * - `focusSource`: A `A11yFocusSource` object containing the target element to return focus to on close.
 *
 * - `transitionOptions`: Custom transition options for duration and easing function.
 *
 * ### Events
 *
 * There is a single that is fired and _not_ bubbled up through parent elements:
 * - `close`- Fired when the menu closes allowing {@link TJSContextMenu} to clean up resources.
 *
 * ### CSS Variables
 *
 * Styling: To style this component use `.tjs-context-menu` as the base selector.
 *
 * There are several local CSS variables that you can use to change the appearance dynamically. Either use
 * CSS props or pass in a `styles` object w/ key / value props to set to the details. The default fallback variables
 * target both TJSMenu and TJSContextMenu. The few `popover` defaults target components that independently pop over
 * other elements browser wide.
 *
 * ```
 * The following CSS variables are supported, but not defined by default
 * --tjs-context-menu-background - fallback: --tjs-default-menu-background; fallback: --tjs-default-popup-background; default: #23221d
 * --tjs-context-menu-border - fallback: --tjs-default-popup-border; default: 1px solid #000
 * --tjs-context-menu-border-radius - fallback: --tjs-default-popup-border-radius; default: 5px
 * --tjs-context-menu-box-shadow - fallback: --tjs-default-popup-box-shadow; default: 0 0 2px #000
 * --tjs-context-menu-primary-color - fallback: --tjs-default-menu-primary-color; fallback: --tjs-default-popup-primary-color; default: #b5b3a4
 * --tjs-context-menu-max-width - fallback: --tjs-default-menu-max-width; default: 360px
 * --tjs-context-menu-min-width - fallback: --tjs-default-menu-min-width; default: 20px
 *
 * The following CSS variables define attributes for the data driven menu items.
 *
 * All menu items:
 * --tjs-context-menu-item-line-height - fallback: --tjs-default-menu-item-line-height; default: 2em
 * --tjs-context-menu-item-padding - fallback: --tjs-default-menu-item-padding; default: 0 0.5em 0 0
 *
 * Icon / Image menu items (considered a button item):
 * --tjs-context-menu-item-button-gap - fallback: --tjs-default-menu-item-button-gap; default: 0.25em
 * --tjs-context-menu-item-highlight-color - fallback: --tjs-default-menu-highlight-color; fallback: --tjs-default-popup-highlight-color; default: #f0f0e0
 * --tjs-context-menu-item-text-shadow-focus-hover - fallback: --tjs-default-text-shadow-focus-hover; default: 0 0 8px red
 *
 * Specific targeting for the label of button items (allows control of wrapping / set `white-space` to `nowrap`):
 * --tjs-context-menu-item-label-overflow - fallback: --tjs-default-menu-item-label-overflow; default: hidden
 * --tjs-context-menu-item-label-text-overflow - fallback: --tjs-default-menu-item-label-text-overflow; default: ellipsis
 * --tjs-context-menu-item-label-white-space - fallback: --tjs-default-menu-item-label-white-space; default: undefined
 *
 * Icon menu item:
 * --tjs-context-menu-item-icon-width - fallback: --tjs-default-menu-item-icon-width; default: 1.25em
 *
 * Image menu item:
 * --tjs-context-menu-item-image-width - fallback: --tjs-default-menu-item-image-width; default: 1.25em
 * --tjs-context-menu-item-image-height - fallback: --tjs-default-menu-item-image-height; default: 1.25em
 *
 * Separator / HR:
 * --tjs-context-menu-hr-margin - fallback: --tjs-default-hr-margin; default: 0 0.25em
 * --tjs-context-menu-hr-border-top - fallback: --tjs-default-hr-border-top; default: 1px solid #555
 * --tjs-context-menu-hr-border-bottom - fallback: --tjs-default-hr-border-bottom; default: 1px solid #444
 *
 * The following CSS variables define the keyboard / a11y focus indicator for menu items:
 * --tjs-context-menu-focus-indicator-align-self - fallback: --tjs-default-focus-indicator-align-self; default: stretch
 * --tjs-context-menu-focus-indicator-background - fallback: --tjs-default-focus-indicator-background; default: white
 * --tjs-context-menu-focus-indicator-border - fallback: --tjs-default-focus-indicator-border; default: undefined
 * --tjs-context-menu-focus-indicator-border-radius - fallback: --tjs-default-focus-indicator-border-radius; default: 0.1em
 * --tjs-context-menu-focus-indicator-height - fallback: --tjs-default-focus-indicator-height; default: undefined
 * --tjs-context-menu-focus-indicator-width - fallback: --tjs-default-focus-indicator-width; default: 0.25em
 * --tjs-menu-focus-indicator-transition - fallback: --tjs-default-focus-indicator-transition
 * ```
 * @internal
 */
declare class TjsContextMenuImpl extends SvelteComponent<
  TjsContextMenuImpl.Props,
  TjsContextMenuImpl.Events,
  TjsContextMenuImpl.Slots
> {}

/**
 * Event / Prop / Slot type aliases for {@link TjsContextMenuImpl | associated component}.
 * @internal
 */
declare namespace TjsContextMenuImpl {
  /** Props type alias for {@link TjsContextMenuImpl | associated component}. */
  export type Props = {
    /** @type {string} */
    keyCode?: string;
    id?: string;
    x?: number;
    y?: number;
    zIndex?: number;
    menu?: any;
    /** @type {Record<string, string>} */
    styles?: Record<string, string>;
    offsetX?: number;
    offsetY?: number;
    items?: any[];
    /** @type {{ duration: number, easing: import('#runtime/svelte/easing').EasingFunction }} */
    transitionOptions?: { duration: number; easing: _runtime_svelte_easing.EasingFunction };
    /** @type {import('#runtime/util/browser').A11yFocusSource} */
    focusSource?: _runtime_util_browser.A11yFocusSource;
    /**
     * @type {Window} The active window the context menu is displaying inside.
     */
    activeWindow?: Window;
  };
  /** Events type alias for {@link TjsContextMenuImpl | associated component}. */
  export type Events = { click: MouseEvent; 'close:contextmenu': CustomEvent<any> } & {
    [evt: string]: CustomEvent<any>;
  };
  /** Slots type alias for {@link TjsContextMenuImpl | associated component}. */
  export type Slots = {};
}

type TJSMenuData = {
  /**
   * The data driven menu items.
   */
  items?: Iterable<TJSMenuItemData>;
  /**
   * Optional X / Y offsets for the menu display.
   */
  offset?: {
    x?: number;
    y?: number;
  };
  /**
   * A minimal Svelte config defining a menu item component
   * after the main data driven menu items.
   */
  slotAfter?: {
    class: Function;
    props?: object;
  };
  /**
   * A minimal Svelte config defining a menu item component
   * before the main data driven menu items.
   */
  slotBefore?: {
    class: Function;
    props?: object;
  };
  /**
   * A minimal Svelte config defining the default content
   * component replacing the data driven menu items.
   */
  slotDefault?: {
    class: Function;
    props?: object;
  };
  /**
   * Styles to be applied inline.
   */
  styles?: Record<string, string>;
  /**
   * Currently unused; for any future action effects.
   */
  efx?: Function;
  /**
   * The key code to activate menu items.
   */
  keyCode?: string;
  /**
   * Custom transition options for duration and easing
   * function reference. The default easing function is `quintOut`.
   */
  transitionOptions?: {
    duration: number;
    easing: _runtime_svelte_easing.EasingReference;
  };
};
type TJSMenuItemData = {
  /**
   * A callback function to invoke; The object contains the item menu item data and an A11yFocusSource object
   * to potentially pass to a new application.
   */
  onPress?: (data?: {
    event?: KeyboardEvent | PointerEvent;
    item?: TJSMenuItemData;
    focusSource?: _runtime_util_browser.A11yFocusSource;
  }) => any;
  /**
   * If a boolean and false or a function that invoked returns a falsy value
   * this item is not added.
   */
  condition?: boolean | Function;
  /**
   * A Svelte component class.
   */
  class?: Function;
  /**
   * An object passed on as props for any Svelte component.
   */
  props?: object;
  /**
   * A string containing icon classes.
   */
  icon?: string;
  /**
   * An image icon path.
   */
  image?: string;
  /**
   * An image 'alt' text description.
   */
  imageAlt?: string;
  /**
   * A text string that is passed through localization.
   */
  label?: string;
  /**
   * A menu item separator; only 'hr' supported.
   */
  separator?: 'hr';
};

export {
  TjsButton as TJSButton,
  TjsColordButton as TJSColordButton,
  TjsColordPicker as TJSColordPicker,
  type TJSColordPickerColor,
  type TJSColordPickerComponents,
  type TJSColordPickerOptions,
  TJSColordPickerSavedColors,
  TjsContextMenuImpl as TJSContextMenuImpl,
  type TJSFolderData,
  type TJSFolderOptions,
  TjsIconButton as TJSIconButton,
  TjsIconFolder as TJSIconFolder,
  type TJSIconFolderData,
  TjsInput as TJSInput,
  TjsInputCheckbox as TJSInputCheckbox,
  TjsInputNumber as TJSInputNumber,
  TjsInputText as TJSInputText,
  TjsMediaContent as TJSMediaContent,
  TjsMenu as TJSMenu,
  type TJSMenuData,
  type TJSMenuItemData,
  TjsPositionControlLayer as TJSPositionControlLayer,
  TjsScrollContainer as TJSScrollContainer,
  type TJSScrollContainerData,
  TjsSelect as TJSSelect,
  TjsSideSlideLayer as TJSSideSlideLayer,
  TjsSlotButton as TJSSlotButton,
  TjsSlotLabel as TJSSlotLabel,
  TJSSlotLabelUtil,
  TjsSvgFolder as TJSSvgFolder,
  TjsToggleIconButton as TJSToggleIconButton,
  TjsToggleLabel as TJSToggleLabel,
};
