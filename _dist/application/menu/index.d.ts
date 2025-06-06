import * as _runtime_svelte_easing from '#runtime/svelte/easing';

/**
 * Provides and manages browser window wide context menu functionality. The best way to create a context menu is to
 * attach the source KeyboardEvent or MouseEvent / PointerEvent as data in {@link TJSContextMenu.create}. This allows
 * proper keyboard handling across browsers supporting the context menu key. A A11yFocusSource data object is generated
 * which allows tracking of the source element that triggered the context menu allowing focus to return to the source
 * when the context menu is closed. This A11yFocusSource object is also forwarded on through the `onPress` callback and
 * is intended to be supplied as `SvelteApplication` options particularly for modal dialogs allowing focus to return
 * to the original source after the modal dialog is closed.
 */
declare class TJSContextMenu {
  /**
   * Creates and manages a browser wide context menu. The best way to create the context menu is to pass in the source
   * DOM event as it is processed for the location of the context menu to display. Likewise, a A11yFocusSource object
   * is generated that allows focus to be returned to the source location. You may supply a default focus target as a
   * fallback via `focusEl`.
   *
   * @param {object}      opts - Optional parameters.
   *
   * @param {string}      [opts.id] - A custom CSS ID to add to the menu. This allows CSS style targeting.
   *
   * @param {KeyboardEvent | MouseEvent}  [opts.event] - The source MouseEvent or KeyboardEvent.
   *
   * @param {number}      [opts.x] - X position override for the top / left of the menu.
   *
   * @param {number}      [opts.y] - Y position override for the top / left of the menu.
   *
   * @param {number}      [opts.offsetX=2] - Small positive integer offset for context menu so the pointer / mouse is
   *        over the menu on display.
   *
   * @param {number}      [opts.offsetY=2] - Small positive integer offset for context menu so the pointer / mouse is
   *        over the menu on display.
   *
   * @param {Iterable<TJSContextMenuItemData>} [opts.items] - Menu items to display.
   *
   * @param {boolean}     [opts.focusDebug] - When true the associated A11yFocusSource object will log focus target
   *        data when applied.
   *
   * @param {HTMLElement|string} [opts.focusEl] - A specific HTMLElement or selector string as the default focus
   *        target.
   *
   * @param {string}      [opts.keyCode='Enter'] - Key to select menu items.
   *
   * @param {{ [key: string]: string | null }}  [opts.styles] - Optional inline styles to apply.
   *
   * @param {number}      [opts.zIndex=Number.MAX_SAFE_INTEGER - 100] - Z-index for context menu.
   *
   * @param {number}      [opts.duration] - Transition option for duration of transition.
   *
   * @param {import('#runtime/svelte/easing').EasingReference}   [opts.easing] - Transition option for ease. Either an
   *        easing function or easing function name.
   *
   * @param {Window}      [opts.activeWindow=globalThis] - The active browser window that the context menu is
   *        displaying inside.
   */
  static create({
    id,
    event,
    x,
    y,
    items,
    offsetX,
    offsetY,
    focusDebug,
    focusEl,
    keyCode,
    styles,
    zIndex,
    duration,
    easing,
    activeWindow,
  }?: {
    id?: string;
    event?: KeyboardEvent | MouseEvent;
    x?: number;
    y?: number;
    offsetX?: number;
    offsetY?: number;
    items?: Iterable<TJSContextMenuItemData>;
    focusDebug?: boolean;
    focusEl?: HTMLElement | string;
    keyCode?: string;
    styles?: {
      [key: string]: string | null;
    };
    zIndex?: number;
    duration?: number;
    easing?: _runtime_svelte_easing.EasingReference;
    activeWindow?: Window;
  }): void;
}
/**
 * Defines a menu item entry. Depending on the item data that is passed
 * into the menu you can define 4 types of items: 'icon / label', 'image / label', 'class / Svelte component', and
 * 'separator / hr'. A single callback function `onPress` is supported.
 */
type TJSContextMenuItemData = {
  /**
   * A callback function that receives the selected
   * item data and an object containing the A11yFocusSource data that can be passed to any Application / particularly
   * modal dialogs returning focus when closed.
   */
  onPress?: (item: TJSContextMenuItemData, object: any) => void;
  /**
   * If a boolean and false or a function that invoked returns a falsy
   * value this item is not added.
   */
  condition?: boolean | (() => boolean);
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

export { TJSContextMenu, type TJSContextMenuItemData };
