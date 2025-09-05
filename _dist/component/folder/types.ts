import type { MinimalWritable }  from '#runtime/svelte/store/util';
import type { TJSSvelte }        from '#runtime/svelte/util';

/**
 * Provides shared options and data between {@link TJSIconFolder} and {@link TJSSvgFolder}.
 */
export declare namespace TJSFolder {
   /**
    * Provides the data object passed to callback functions and triggered custom DOM events for folder state.
    */
   export type EventData = {
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
   }

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
   export interface DataIcon extends Data {
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
   export type InternalOptions = {
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
