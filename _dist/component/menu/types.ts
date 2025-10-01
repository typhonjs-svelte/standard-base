import type { EasingReference }  from '#runtime/svelte/easing';
import type { TJSSvelte }        from '#runtime/svelte/util';
import type { A11yFocusSource }  from '#runtime/util/a11y';

/**
 * Defines all menu and menu item data.
 */
namespace TJSMenuData
{
   /**
    * Defines the data configuration object for context and popover menus.
    */
   export interface Menu
   {
      /**
       * The data driven menu items.
       */
      items?: Iterable<Items>;

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
      slotAfter?: TJSSvelte.Config.Embed;

      /**
       * A minimal Svelte config defining a menu item component
       * before the main data driven menu items.
       */
      slotBefore?: TJSSvelte.Config.Embed;

      /**
       * A minimal Svelte config defining the default content
       * component replacing the data driven menu items.
       */
      slotDefault?: TJSSvelte.Config.Embed;

      /**
       * Styles to be applied inline.
       */
      styles?: {
         [key: string]: string | null;
      };

      /**
       * @privateRemarks
       * Currently unused; for any future action effects.
       *
       * @hidden
       */
      efx?: Function;

      /**
       * The key code to activate menu items.
       */
      keyCode?: string;

      /**
       * A specific HTMLElement or selector string as the default focus target.
       */
      focusEl?: HTMLElement | string;

      /**
       * When true, any focus source derived from the associated `event` or defined `focusEl` is applied
       * automatically in response to menu item presses.
       */
      onPressApplyFocus?: boolean;

      /**
       * Custom transition options for duration and easing function reference. The default easing function is
       * `quintOut`.
       */
      transitionOptions?: {
         duration: number;
         easing: EasingReference;
      };
   }

   /**
    * All menu item type variations.
    */
   export type Items = Item.Label | Item.Separator | Item.Svelte;

   /**
    * Defines the variations of menu item data.
    */
   export namespace Item
   {
      /**
       * Common menu item data.
       */
      export interface Common<Item>
      {
         /**
          * If a boolean and false or a function that invoked returns a falsy value this item is not added.
          */
         condition?: boolean | (() => boolean);

         /**
          * A callback function to invoke; The object contains the item menu item data and an A11yFocusSource object
          * to potentially pass to a new application.
          */
         onPress?: (data?: {
            event?: KeyboardEvent | PointerEvent;
            item?: Item;
            focusSource?: A11yFocusSource;
         }) => void;
      }

      /**
       * Defines a standard menu item with label & potentially an icon.
       */
      export interface Label extends Common<Label>
      {
         /**
          * A text string that is passed through localization.
          */
         label: string;

         /**
          * A string containing font icon classes or an image / svg URL path to load.
          */
         icon?: string;

         /**
          * An image 'alt' text description for image icons.
          */
         imageAlt?: string;

         /**
          * Exclusivity guard: present only on other variants. Do not provide.
          * @internal
          */
         svelte?: never;

         /**
          * Exclusivity guard: present only on other variants. Do not provide.
          * @internal
          */
         separator?: never;
      }

      /**
       * Defines a separator between items.
       */
      export interface Separator extends Common<Separator>
      {
         /**
          * A menu item separator; only 'hr' supported.
          */
         separator: 'hr';

         /**
          * Exclusivity guard: present only on other variants. Do not provide.
          * @internal
          */
         label?: never;

         /**
          * Exclusivity guard: present only on other variants. Do not provide.
          * @internal
          */
         svelte?: never;

         /**
          * Exclusivity guard: present only on other variants. Do not provide.
          * @internal
          */
         icon?: never;

         /**
          * Exclusivity guard: present only on other variants. Do not provide.
          * @internal
          */
         imageAlt?: never;
      }

      /**
       * Defines an item that is a Svelte component.
       */
      export interface Svelte extends Common<Svelte>
      {
         /**
          * An embedded Svelte configuration object.
          */
         svelte: TJSSvelte.Config.Embed;

         /**
          * Exclusivity guard: present only on other variants. Do not provide.
          * @internal
          */
         label?: never;

         /**
          * Exclusivity guard: present only on other variants. Do not provide.
          * @internal
          */
         separator?: never;

         /**
          * Exclusivity guard: present only on other variants. Do not provide.
          * @internal
          */
         icon?: never;

         /**
          * Exclusivity guard: present only on other variants. Do not provide.
          * @internal
          */
         imageAlt?: never;
      }
   }
}

export {
   TJSMenuData
}
