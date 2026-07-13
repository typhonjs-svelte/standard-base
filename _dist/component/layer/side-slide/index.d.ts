import * as _runtime_svelte_easing from '#runtime/svelte/easing';
import * as _runtime_svelte_util from '#runtime/svelte/util';
import { SvelteComponent } from 'svelte';

/**
 * Provides a component to display an absolutely positioned side layer in a parent element featuring a column of
 * icons that slide out panels defined as Svelte components.
 *
 */
declare class TJSSideSlideLayer extends SvelteComponent<
  {
    top?: string | number;
    zIndex?: number;
    duration?: number;
    items?: Iterable<{
      condition?: boolean | (() => boolean);
      icon: string | _runtime_svelte_util.TJSSvelte.Config.Embed;
      svelte: _runtime_svelte_util.TJSSvelte.Config.Embed;
      tooltip?: string;
    }>;
    allowLocking?: boolean;
    classes?: Iterable<string>;
    clickToOpen?: boolean;
    easingIn?: _runtime_svelte_easing.EasingReference;
    easingOut?: _runtime_svelte_easing.EasingReference;
    side?: 'left' | 'right';
    sideAbs?: boolean;
    styles?: {
      [key: string]: string | null;
    };
    tooltips?: boolean;
    tooltipDirection?: string;
    topUnit?: string;
  },
  {
    [evt: string]: CustomEvent<any>;
  },
  {}
> {}

/** Event / Prop / Slot type aliases for {@link TJSSideSlideLayer | associated component}. */
declare namespace TJSSideSlideLayer {
  /** Props type alias for {@link TJSSideSlideLayer | associated component}. */
  export type Props = {
    top?: string | number;
    zIndex?: number;
    duration?: number;
    items?: Iterable<{ condition?: boolean | (() => boolean); icon: any; svelte: any; tooltip?: string }>;
    allowLocking?: boolean;
    classes?: Iterable<string>;
    clickToOpen?: boolean;
    easingIn?: any;
    easingOut?: any;
    side?: 'left' | 'right';
    sideAbs?: boolean;
    styles?: { [key: string]: string };
    tooltips?: boolean;
    tooltipDirection?: string;
    topUnit?: string;
  };
  /** Events type alias for {@link TJSSideSlideLayer | associated component}. */
  export type Events = { [evt: string]: CustomEvent<any> };
  /** Slots type alias for {@link TJSSideSlideLayer | associated component}. */
  export type Slots = {};
}

export { TJSSideSlideLayer };
