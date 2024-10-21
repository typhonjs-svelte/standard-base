import * as _runtime_util_a11y from '#runtime/util/a11y';
import * as _runtime_svelte_easing from '#runtime/svelte/easing';
import * as svelte from 'svelte';
import { SvelteComponent } from 'svelte';

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
    /** @type {HTMLElement | string} */
    focusEl?: HTMLElement | string;
    /** @type {Iterable<import('.').TJSMenuItemData>} */
    items?: Iterable<TJSMenuItemData>;
    /** @type {{ [key: string]: string | null }} */
    styles?: { [key: string]: string | null };
    /** @type {Function} */
    efx?: Function;
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
    items?: any[];
    /** @type {{ [key: string]: string | null }} */
    styles?: { [key: string]: string | null };
    /** @type {{ duration: number, easing: import('#runtime/svelte/easing').EasingFunction }} */
    transitionOptions?: { duration: number; easing: _runtime_svelte_easing.EasingFunction };
    offsetX?: number;
    offsetY?: number;
    /** @type {import('#runtime/util/a11y').A11yFocusSource} */
    focusSource?: _runtime_util_a11y.A11yFocusSource;
    /**
     * @type {Window} The active window the context menu is displaying inside.
     */
    activeWindow?: Window;
    /**
     * This component. Set externally removing dependence on `current_component`.
     *
     * @type {import('svelte').SvelteComponent}
     * @internal
     */
    current_component?: svelte.SvelteComponent;
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
  styles?: {
    [key: string]: string | null;
  };
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
    focusSource?: _runtime_util_a11y.A11yFocusSource;
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

export { TjsContextMenuImpl as TJSContextMenuImpl, TjsMenu as TJSMenu, type TJSMenuData, type TJSMenuItemData };
