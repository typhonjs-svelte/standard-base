import * as _runtime_svelte_easing from '#runtime/svelte/easing';
import * as _standard_component_menu from '#standard/component/menu';

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
   * DOM event as it is processed for the location of the context menu to display. Likewise, an A11yFocusSource object
   * is generated that allows focus to be returned to the source location. You may supply a default focus target as a
   * fallback via `focusEl`.
   *
   * @param {object}      opts - Optional parameters.
   *
   * @param {PointerEvent | MouseEvent | KeyboardEvent}  [opts.event] - The source PointerEvent, MouseEvent or
   *        KeyboardEvent. It is highly recommended to pass the originating DOM event for automatic configuration.
   *
   * @param {(
   *    Iterable<import('#standard/component/menu').TJSMenuData.Items> |
   *    (() => Iterable<import('#standard/component/menu').TJSMenuData.Items>)
   * )} [opts.items] - Menu items list of function returning a menu item list to display.
   *
   * @param {number}      [opts.x] - X position override for the top / left of the menu.
   *
   * @param {number}      [opts.y] - Y position override for the top / left of the menu.
   *
   * @param {number}      [opts.offsetX=2] - Small positive number offset for context menu so the pointer / mouse is
   *        over the menu on display.
   *
   * @param {number}      [opts.offsetY=2] - Small positive number offset for context menu so the pointer / mouse is
   *        over the menu on display.
   *
   * @param {boolean}     [opts.anchorToEventTarget=false] - Align context menu to the `event.target` element. This
   *        will usually display the context menu aligned at the bottom left of the target element with automatic
   *        alignment adjustments when the menu opens to the left or upwards.
   *
   * @param {Iterable<string>}    [opts.classes] - Additional custom CSS classes to add to the menu. This allows CSS
   *        style targeting.
   *
   * @param {boolean}     [opts.focusDebug] - When true the associated A11yFocusSource object will log focus target
   *        data when applied.
   *
   * @param {HTMLElement|string} [opts.focusEl] - A specific HTMLElement or selector string as the default focus
   *        target.
   *
   * @param {string}      [opts.keyCode='Enter'] - Key to select menu items.
   *
   * @param {string}      [opts.id] - A custom CSS ID to add to the menu. This allows CSS style targeting.
   *
   * @param {Function}    [opts.onClose] - A function that is invoked when the context menu is closed. Useful for any
   *        state based changes such as CSS highlighting of context menu invoking element.
   *
   * @param {boolean}     [opts.onPressApplyFocus=false] When true, any focus source derived from the associated
   *        `event` or defined `focusEl` is applied automatically in response to menu item presses.
   *
   * @param {{ [key: string]: string | null }}  [opts.styles] - Optional inline styles to apply.
   *
   * @param {number}      [opts.duration] - Transition option for duration of transition in milliseconds;
   *        default: `120ms`.
   *
   * @param {import('#runtime/svelte/easing').EasingReference}   [opts.easing] - Transition option for ease. Either an
   *        easing function or easing function name.
   *
   * @param {Window}      [opts.activeWindow] - The active browser window that the context menu is displaying inside.
   *        When you pass an `event` this is determined automatically.
   */
  static create({
    event,
    items,
    x,
    y,
    offsetX,
    offsetY,
    anchorToEventTarget,
    classes,
    focusDebug,
    focusEl,
    keyCode,
    id,
    onClose,
    onPressApplyFocus,
    styles,
    duration,
    easing,
    activeWindow,
  }: {
    event?: PointerEvent | MouseEvent | KeyboardEvent;
    items?:
      | Iterable<_standard_component_menu.TJSMenuData.Items>
      | (() => Iterable<_standard_component_menu.TJSMenuData.Items>);
    x?: number;
    y?: number;
    offsetX?: number;
    offsetY?: number;
    anchorToEventTarget?: boolean;
    classes?: Iterable<string>;
    focusDebug?: boolean;
    focusEl?: HTMLElement | string;
    keyCode?: string;
    id?: string;
    onClose?: Function;
    onPressApplyFocus?: boolean;
    styles?: {
      [key: string]: string | null;
    };
    duration?: number;
    easing?: _runtime_svelte_easing.EasingReference;
    activeWindow?: Window;
  }): void;
}

export { TJSContextMenu };
