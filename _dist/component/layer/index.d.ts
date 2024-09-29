import * as svelte_store from 'svelte/store';
import { TJSPosition } from '#runtime/svelte/store/position';
import { SvelteComponent } from 'svelte';
import * as _runtime_svelte_easing from '#runtime/svelte/easing';
import * as _runtime_svelte_util from '#runtime/svelte/util';

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
    enabled?: boolean;
    boundingRect?: any;
    validate?: boolean;
    /**
     * @type {ControlsStore}
     */
    controls?: ControlsStore;
    components?: any;
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
    /**
     * Additional inline styles to apply to the side slide layer. Useful for setting CSS variables.
     *
     * @type {Record<string, string>}
     */
    styles?: Record<string, string>;
  };
  /** Events type alias for {@link TjsSideSlideLayer | associated component}. */
  export type Events = { [evt: string]: CustomEvent<any> };
  /** Slots type alias for {@link TjsSideSlideLayer | associated component}. */
  export type Slots = {};
}

export { TjsPositionControlLayer as TJSPositionControlLayer, TjsSideSlideLayer as TJSSideSlideLayer };
