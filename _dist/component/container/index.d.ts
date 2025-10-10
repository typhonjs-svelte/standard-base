import * as _runtime_svelte_util from '#runtime/svelte/util';
import * as _runtime_svelte_store_util from '#runtime/svelte/store/util';
import { SvelteComponent } from 'svelte';

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
    /** @type {import('#runtime/svelte/store/util').MinimalWritable<number>} */
    scrollLeft?: _runtime_svelte_store_util.MinimalWritable<number>;
    /** @type {import('#runtime/svelte/store/util').MinimalWritable<number>} */
    scrollTop?: _runtime_svelte_store_util.MinimalWritable<number>;
    /** @type {boolean} */
    allowTabFocus?: boolean;
    /** @type {boolean} */
    keyPropagate?: boolean;
    /** @type {(data: { event: KeyboardEvent | PointerEvent }) => void} */
    onContextMenu?: (data: { event: KeyboardEvent | PointerEvent }) => void;
    /** @type {{ [key: string]: string | null }} */
    styles?: { [key: string]: string | null };
  };
  /** Events type alias for {@link TjsScrollContainer | associated component}. */
  export type Events = { [evt: string]: CustomEvent<any> };
  /** Slots type alias for {@link TjsScrollContainer | associated component}. */
  export type Slots = { default: {} };
}

type TJSScrollContainerData = {
  /**
   * When true, the scroll container is keyboard navigation focusable.
   */
  allowTabFocus?: boolean;
  /**
   * By default, the scroll container stops propagation of all keys that are
   * related to keyboard scrolling accessibility. When true, the scroll container will not capture scrolling key events.
   */
  keyPropagate?: boolean;
  /**
   * Callback to handle context menu
   * presses.
   */
  onContextMenu?: (data: { event: KeyboardEvent | PointerEvent }) => void;
  /**
   * A Svelte store that serializes
   * the scroll left position of the scrollable container.
   */
  scrollLeft?: _runtime_svelte_store_util.MinimalWritable<number>;
  /**
   * A Svelte store that serializes
   * the scroll top position of the scrollable container.
   */
  scrollTop?: _runtime_svelte_store_util.MinimalWritable<number>;
  /**
   * Inline styles to assign to the container.
   */
  styles?: {
    [key: string]: string | null;
  };
  /**
   * A svelte component configuration object
   * used as the content component when there is no slotted component defined.
   */
  svelte?: _runtime_svelte_util.TJSSvelte.Config.Embed;
};

export { TjsScrollContainer as TJSScrollContainer, type TJSScrollContainerData };
