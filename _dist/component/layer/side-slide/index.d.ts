import * as _runtime_svelte_easing from '#runtime/svelte/easing';
import * as _runtime_svelte_util from '#runtime/svelte/util';
import { SvelteComponent } from 'svelte';

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

export { TjsSideSlideLayer as TJSSideSlideLayer };
