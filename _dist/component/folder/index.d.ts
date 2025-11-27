import * as _runtime_svelte_store_util from '#runtime/svelte/store/util';
import { MinimalWritable } from '#runtime/svelte/store/util';
import { TJSSvelte } from '#runtime/svelte/util';
import { SvelteComponent } from 'svelte';

/**
 * Provides shared options and data between {@link TJSIconFolder} and {@link TJSSvgFolder}.
 */
declare namespace TJSFolder {
  /**
   * Provides the data object passed to callback functions and triggered custom DOM events for folder state.
   */
  type EventData = {
    /**
     * Associated originating DOM event for `onClose`, `onContextMenu`, `onOpen` callbacks.
     */
    event?: KeyboardEvent | PointerEvent;
    /**
     * The folder component `<details>` element.
     */
    element: HTMLDetailsElement;
    /**
     * The associated `TJSFolder.Data` instance.
     */
    folder?: TJSFolder.Data;
    /**
     * The associated folder ID.
     */
    id?: string;
    /**
     * The associated folder label.
     */
    label?: string;
    /**
     * The associated folder store.
     */
    store?: MinimalWritable<boolean>;
  };
  /**
   * Provides the main `folder` data.
   */
  interface Data {
    /**
     * Enabled state.
     *
     * @defaultValue `true`
     */
    enabled?: boolean;
    /**
     * Defines an ID for the folder that is passed through event data and set as the `id` data attribute on the folder.
     */
    id?: string;
    /**
     * The label name of the folder.
     */
    label?: string;
    /**
     * Defines the key event code to open / close summary when focused.
     *
     * @defaultValue `Enter`
     */
    keyCode?: string;
    /**
     * Callback when folder closed.
     */
    onClose?: (data?: EventData) => void;
    /**
     * Callback when context menu pressed.
     */
    onContextMenu?: (data?: EventData) => void;
    /**
     * Callback when folder opened.
     */
    onOpen?: (data?: EventData) => void;
    /**
     * Additional internal folder feature options.
     */
    options?: InternalOptions;
    /**
     * A minimal Svelte config defining the default content component.
     */
    slotDefault?: TJSSvelte.Config.Embed;
    /**
     * A minimal Svelte config defining the summary label component.
     */
    slotLabel?: TJSSvelte.Config.Embed;
    /**
     * A minimal Svelte config defining the summary end component.
     */
    slotSummaryEnd?: TJSSvelte.Config.Embed;
    /**
     * Folder open / close store.
     */
    store?: MinimalWritable<boolean>;
    /**
     * Additional inline CSS styles to apply.
     */
    styles?: object;
  }
  /**
   * Provides extended `folder` data for {@link TJSIconFolder}.
   */
  interface DataIcon extends Data {
    /**
     * Closed icon asset: URL for image / SVG asset or CSS class string for font.
     */
    iconClosed?: string;
    /**
     * Open icon asset: URL for image / SVG asset or CSS class string for font.
     */
    iconOpen?: string;
  }
  /**
   * Options controlling various folder features.
   */
  type InternalOptions = {
    /**
     * When true, only clicks on the folder chevron open / close the summary.
     *
     * @defaultValue `false`
     */
    chevronOnly?: boolean;
    /**
     * When true, the focus-visible outline for the summary will only be around the chevron.
     *
     * @defaultValue `false`
     */
    focusChevron?: boolean;
    /**
     * When true, a `focus-visible` focus indicator is inserted between the chevron and summary label. This is a useful
     * a11y focus indicator when `outline` isn't suitable.
     *
     * @defaultValue `false`
     */
    focusIndicator?: boolean;
    /**
     * There are two strategies for how content is handled when the folder is closed. The default is `remove`, but
     * depending on the application and performance characteristics `hidden` may be a more optimum solution.
     *
     * Strategy options:
     * ```
     * - `remove`: Will remove / unmount the content from the DOM.
     * - `hidden`: Will mark the content as hidden / not visible in the DOM.
     * ```
     *
     * @defaultValue `remove`
     */
    strategy?: 'hidden' | 'remove';
  };
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
 * - `folder` ({@link TJSFolder.Data}): An object defining all properties of a folder including potentially data
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
 * --tjs-folder-summary-color: inherit
 * --tjs-folder-summary-font-size: inherit
 * --tjs-folder-summary-font-weight: bold
 * --tjs-folder-summary-font-family: inherit
 * --tjs-folder-summary-gap: 0.125em
 * --tjs-folder-summary-padding: 0.25em
 * --tjs-folder-summary-text-shadow: none
 * --tjs-folder-summary-transition: background 0.1s
 * --tjs-folder-summary-width: fit-content; wraps content initially, set to 100% or other width measurement
 *
 * Summary element (disabled):
 * --tjs-folder-summary-disabled-color: inherit
 * --tjs-folder-summary-disabled-cursor: default
 *
 * Summary element (focus visible):
 * --tjs-folder-summary-box-shadow-focus-visible - fallback: --tjs-default-box-shadow-focus-visible
 * --tjs-folder-summary-outline-focus-visible - fallback: --tjs-default-outline-focus-visible; default: revert
 * --tjs-folder-summary-transition-focus-visible - fallback: --tjs-default-transition-focus-visible
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
declare class TJSSvgFolder extends SvelteComponent<TJSSvgFolder.Props, TJSSvgFolder.Events, TJSSvgFolder.Slots> {}

/** Event / Prop / Slot type aliases for {@link TJSSvgFolder | associated component}. */
declare namespace TJSSvgFolder {
  /** Props type alias for {@link TJSSvgFolder | associated component}. */
  export type Props = {
    /** @type {string} */
    keyCode?: string;
    /** @type {string} */
    id?: string;
    /** @type {string} */
    label?: string;
    /** @type {boolean} */
    animate?: boolean;
    /** @type {import('./types').TJSFolder.InternalOptions} */
    options?: TJSFolder.InternalOptions;
    /** @type {import('#runtime/svelte/store/util').MinimalWritable<boolean>} */
    store?: _runtime_svelte_store_util.MinimalWritable<boolean>;
    /** @type {boolean} */
    enabled?: boolean;
    /** @type {import('./types').TJSFolder.Data} */
    folder?: TJSFolder.Data;
    /** @type {object} */
    styles?: object;
    /** @type {(data?: { event?: KeyboardEvent | PointerEvent }) => void} */
    onClose?: (data?: { event?: KeyboardEvent | PointerEvent }) => void;
    /** @type {(data?: { event?: KeyboardEvent | PointerEvent }) => void} */
    onOpen?: (data?: { event?: KeyboardEvent | PointerEvent }) => void;
    /** @type {(data?: { event?: PointerEvent }) => void} */
    onContextMenu?: (data?: { event?: PointerEvent }) => void;
  };
  /** Events type alias for {@link TJSSvgFolder | associated component}. */
  export type Events = {
    click: PointerEvent;
    keydown: KeyboardEvent;
    keyup: KeyboardEvent;
    open:
      | KeyboardEvent
      | UIEvent
      | Event
      | PointerEvent
      | MouseEvent
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
      | ToggleEvent
      | TouchEvent
      | TransitionEvent
      | WheelEvent;
    close: Event;
    openAny:
      | KeyboardEvent
      | UIEvent
      | Event
      | PointerEvent
      | MouseEvent
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
      | ToggleEvent
      | TouchEvent
      | TransitionEvent
      | WheelEvent;
    closeAny:
      | KeyboardEvent
      | UIEvent
      | Event
      | PointerEvent
      | MouseEvent
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
      | ToggleEvent
      | TouchEvent
      | TransitionEvent
      | WheelEvent;
  } & { [evt: string]: CustomEvent<any> };
  /** Slots type alias for {@link TJSSvgFolder | associated component}. */
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
 * - `folder` ({@link TJSFolder.DataIcon}): An object defining all properties of a folder including potentially data
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
 * --tjs-folder-summary-color: inherit
 * --tjs-folder-summary-font-size: inherit
 * --tjs-folder-summary-font-weight: bold
 * --tjs-folder-summary-font-family: inherit
 * --tjs-folder-summary-gap: 0.125em
 * --tjs-folder-summary-padding: 0.25em
 * --tjs-folder-summary-text-shadow: none
 * --tjs-folder-summary-transition: background 0.1s
 * --tjs-folder-summary-width: fit-content; wraps content initially, set to 100% or other width measurement
 *
 * Summary element (disabled):
 * --tjs-folder-summary-disabled-color: inherit
 * --tjs-folder-summary-disabled-cursor: default
 *
 * Summary element (focus visible):
 * --tjs-folder-summary-box-shadow-focus-visible - fallback: --tjs-default-box-shadow-focus-visible
 * --tjs-folder-summary-outline-focus-visible - fallback: --tjs-default-outline-focus-visible; default: revert
 * --tjs-folder-summary-transition-focus-visible - fallback: --tjs-default-transition-focus-visible
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
declare class TJSIconFolder extends SvelteComponent<TJSIconFolder.Props, TJSIconFolder.Events, TJSIconFolder.Slots> {}

/** Event / Prop / Slot type aliases for {@link TJSIconFolder | associated component}. */
declare namespace TJSIconFolder {
  /** Props type alias for {@link TJSIconFolder | associated component}. */
  export type Props = {
    /** @type {string} */
    keyCode?: string;
    /** @type {string} */
    id?: string;
    /** @type {string} */
    label?: string;
    /** @type {boolean} */
    animate?: boolean;
    /** @type {import('./types').TJSFolder.InternalOptions} */
    options?: TJSFolder.InternalOptions;
    /** @type {import('#runtime/svelte/store/util').MinimalWritable<boolean>} */
    store?: _runtime_svelte_store_util.MinimalWritable<boolean>;
    /** @type {boolean} */
    enabled?: boolean;
    /** @type {string} */
    iconClosed?: string;
    /** @type {string} */
    iconOpen?: string;
    /** @type {import('./types').TJSFolder.DataIcon} */
    folder?: TJSFolder.DataIcon;
    /** @type {object} */
    styles?: object;
    /** @type {(data?: { event?: KeyboardEvent | PointerEvent }) => void} */
    onClose?: (data?: { event?: KeyboardEvent | PointerEvent }) => void;
    /** @type {(data?: { event?: KeyboardEvent | PointerEvent }) => void} */
    onOpen?: (data?: { event?: KeyboardEvent | PointerEvent }) => void;
    /** @type {(data?: { event?: PointerEvent }) => void} */
    onContextMenu?: (data?: { event?: PointerEvent }) => void;
  };
  /** Events type alias for {@link TJSIconFolder | associated component}. */
  export type Events = {
    click: PointerEvent;
    keydown: KeyboardEvent;
    keyup: KeyboardEvent;
    open:
      | KeyboardEvent
      | UIEvent
      | Event
      | PointerEvent
      | MouseEvent
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
      | ToggleEvent
      | TouchEvent
      | TransitionEvent
      | WheelEvent;
    close: Event;
    openAny:
      | KeyboardEvent
      | UIEvent
      | Event
      | PointerEvent
      | MouseEvent
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
      | ToggleEvent
      | TouchEvent
      | TransitionEvent
      | WheelEvent;
    closeAny:
      | KeyboardEvent
      | UIEvent
      | Event
      | PointerEvent
      | MouseEvent
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
      | ToggleEvent
      | TouchEvent
      | TransitionEvent
      | WheelEvent;
  } & { [evt: string]: CustomEvent<any> };
  /** Slots type alias for {@link TJSIconFolder | associated component}. */
  export type Slots = { label: {}; 'summary-end': {}; default: {} };
}

export { TJSFolder, TJSIconFolder, TJSSvgFolder };
