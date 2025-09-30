import { getEasingFunc }      from '#runtime/svelte/easing';
import { TJSSvelte }          from '#runtime/svelte/util';
import { A11yHelper }         from '#runtime/util/a11y';
import { AssetValidator }     from '#runtime/util/browser';
import { ThemeObserver }      from '#runtime/util/dom/theme';
import { CrossWindow }        from '#runtime/util/browser';

import {
   isIterable,
   isObject }                 from '#runtime/util/object';

import { TJSContextMenuImpl } from '#standard/component/menu';

/**
 * Provides and manages browser window wide context menu functionality. The best way to create a context menu is to
 * attach the source KeyboardEvent or MouseEvent / PointerEvent as data in {@link TJSContextMenu.create}. This allows
 * proper keyboard handling across browsers supporting the context menu key. A A11yFocusSource data object is generated
 * which allows tracking of the source element that triggered the context menu allowing focus to return to the source
 * when the context menu is closed. This A11yFocusSource object is also forwarded on through the `onPress` callback and
 * is intended to be supplied as `SvelteApplication` options particularly for modal dialogs allowing focus to return
 * to the original source after the modal dialog is closed.
 */
export class TJSContextMenu
{
   /**
    * Stores any active context menu.
    */
   static #contextMenu = void 0;

   /**
    * @hideconstructor
    */
   constructor()
   {
      throw new Error('TJSContextMenu constructor: This is a static class and should not be constructed.');
   }

   /**
    * Creates and manages a browser wide context menu. The best way to create the context menu is to pass in the source
    * DOM event as it is processed for the location of the context menu to display. Likewise, an A11yFocusSource object
    * is generated that allows focus to be returned to the source location. You may supply a default focus target as a
    * fallback via `focusEl`.
    *
    * @param {object}      opts - Optional parameters.
    *
    * @param {KeyboardEvent | MouseEvent}  [opts.event] - The source MouseEvent or KeyboardEvent. It is highly
    *        recommended to pass the originating DOM event for automatic configuration.
    *
    * @param {Iterable<import('#standard/component/menu').TJSMenuData.Items>} [opts.items] - Menu items to display.
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
    * @param {number}      [opts.duration] - Transition option for duration of transition in milliseconds.
    *
    * @param {import('#runtime/svelte/easing').EasingReference}   [opts.easing] - Transition option for ease. Either an
    *        easing function or easing function name.
    *
    * @param {Window}      [opts.activeWindow] - The active browser window that the context menu is displaying inside.
    *        When you pass an `event` this is determined automatically.
    */
   static create({ event, items, x, y, offsetX = 2, offsetY = 2, focusDebug = false, focusEl,
    keyCode = 'Enter', classes = [], id = '', onClose, onPressApplyFocus = false, styles, duration = 120, easing,
     activeWindow })
   {
      if (TJSContextMenu.#contextMenu !== void 0) { return; }

      if (!event && (typeof x !== 'number' || typeof y !== 'number'))
      {
         throw new Error(`TJSContextMenu.create error: No event or absolute X / Y position not defined.`);
      }

      if (Number.isInteger(offsetX) && offsetX < 0)
      {
         throw new TypeError(`TJSContextMenu.create error: offsetX is not a positive integer.`);
      }

      if (Number.isInteger(offsetY) && offsetY < 0)
      {
         throw new TypeError(`TJSContextMenu.create error: offsetY is not a positive integer.`);
      }

      if (!Number.isInteger(duration) || duration < 0)
      {
         throw new TypeError(`TJSContextMenu.create error: 'duration' is not a positive integer.`);
      }

      // Perform duck typing on event constructor name.
      if (event !== void 0 && !CrossWindow.isUserInputEvent(event))
      {
         throw new TypeError(
          `TJSContextMenu.create error: 'event' is not a KeyboardEvent, MouseEvent, or PointerEvent.`);
      }

      // If `activeWindow` is not defined determine it from the given event.
      if (activeWindow === void 0 && event !== void 0) { activeWindow = CrossWindow.getWindow(event); }

      if (!CrossWindow.isWindow(activeWindow))
      {
         throw new TypeError(`TJSContextMenu.create error: 'activeWindow' is not a Window.`);
      }

      if (typeof id !== 'string')
      {
         throw new TypeError(`TJSContextMenu.create error: 'id' is not a string.`);
      }

      if (onClose !== void 0 && typeof onClose !== 'function')
      {
         throw new TypeError(`TJSContextMenu.create error: 'onClose' is not a function.`);
      }

      if (typeof onPressApplyFocus !== 'boolean')
      {
         throw new TypeError(`TJSContextMenu.create error: 'onPressApplyFocus' is not a boolean.`);
      }

      if (!isIterable(classes))
      {
         throw new TypeError(`TJSContextMenu.create error: 'classes' is not a list of strings.`);
      }

      const processedItems = TJSContextMenu.#processItems(items);

      // No applicable menu items. Abort showing the menu.
      if (processedItems.length === 0) { return; }

      const hasIcon = processedItems.some((entry) => entry['#type'] === 'font' || entry['#type'] === 'svg');

      const focusSource = A11yHelper.getFocusSource({ event, x, y, focusEl, debug: focusDebug });

      const easingFn = getEasingFunc(easing, { default: false });

      // Retrieve any additional platform theme classes depending on event target.
      const themedClasses = ThemeObserver.nearestThemedTokens({
         element: event?.target,
         output: new Set(classes),
         override: false,
         strict: true
      });

      // Create the new context menu with the last click x / y point.
      TJSContextMenu.#contextMenu = new TJSContextMenuImpl({
         target: activeWindow.document.body,
         intro: true,
         props: {
            x: focusSource.x,
            y: focusSource.y,
            offsetX,
            offsetY,
            hasIcon,
            items: processedItems,
            classes: Array.from(themedClasses),
            focusSource,
            keyCode,
            id,
            styles,
            transitionOptions: { duration, easing: easingFn },
            activeWindow,
            onPressApplyFocus
         }
      });

      TJSContextMenu.#contextMenu.$set({ current_component: TJSContextMenu.#contextMenu });

      // Register an event listener to remove any active context menu if closed from a menu selection or pointer
      // down event to `document.body`.
      TJSContextMenu.#contextMenu.$on('close:contextmenu', () =>
      {
         TJSContextMenu.#contextMenu = void 0;

         if (typeof onClose === 'function') { onClose(); }
      });
   }

   /**
    * Processes menu item data for conditions and evaluating the type of menu item.
    *
    * @param {Iterable<import('#standard/component/menu').TJSMenuData.Items>} items - Menu item data.
    *
    * @returns {object[]} Processed menu items.
    */
   static #processItems(items)
   {
      if (!isIterable(items)) { throw new TypeError(`TJSContextMenu error: 'items' is not an iterable list.`); }

      const tempList = items;
      const tempItems = [];

      let cntr = -1;

      for (const item of tempList)
      {
         cntr++;
         if (!isObject(item)) { throw new TypeError(`TJSContextMenu error: 'item[${cntr}]' is not an object.`); }

         // Filter items for any condition that prevents display.
         if (typeof item.condition === 'function' && !item.condition()) { continue; }
         if (typeof item.condition === 'boolean' && !item.condition) { continue; }

         let type;

         if (TJSSvelte.config.isConfigEmbed(item?.svelte)) { type = 'class'; }
         else if (typeof item.icon === 'string')
         {
            const result = AssetValidator.parseMedia({ url: item.icon, mediaTypes: AssetValidator.MediaTypes.img_svg });
            type = result.valid ? result.elementType : 'font';
         }
         else if (item.icon === void 0 && typeof item.label === 'string') { type = 'label'; }
         else if (typeof item.separator === 'string')
         {
            if (item.separator !== 'hr')
            {
               throw new Error(
                `TJSContextMenu error: 'item[${cntr}]' has unknown separator type; only 'hr' is currently supported.`);
            }

            type = 'separator-hr';
         }

         if (type === void 0) { throw new TypeError(`TJSContextMenu error: Unknown type for 'item[${cntr}]'.`); }

         tempItems.push({ ...item, '#type': type });
      }

      return tempItems;
   }
}
