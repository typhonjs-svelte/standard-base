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
       * The data driven menu item list or a function that returns a menu item list.
       */
      items?: Iterable<Items> | (() => Iterable<Items>);

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
       * A specific HTMLElement or selector string as the explicit focus target. Note: that the menu components will
       * automatically resume focus with the originating component / element by default. Only provide `focusEl` to
       * explicitly focus a given target.
       */
      focusEl?: HTMLElement | string;

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
       * Defines the return result from item `onPress` callback functions regarding applying any focus source.
       * A `falsy` result immediately applies the detected focus source before the menu mounting. Returning `true`
       * indicates that focus continuation via {@link A11yFocusSource} is handled by the callback.
       */
      export type OnPressResult = boolean | void | undefined;

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
          * A callback function to invoke; The data object contains the originating event, menu item data, and an
          * {@link A11yFocusSource} object to potentially handle later in a continuation of user interaction.
          *
          * To defer immediate application of the {@link A11yFocusSource} return `true` indicating a focus continuation.
          */
         onPress?: (data?: {
            event?: KeyboardEvent | PointerEvent;
            item?: Item;
            focusSource?: A11yFocusSource;
         }) => OnPressResult | Promise<OnPressResult>;
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
         separator: string;

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
