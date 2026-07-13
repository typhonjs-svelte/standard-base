import { SvelteComponent } from 'svelte';

/**
 * Provides an initial implementation to display image or video content from a given file path.
 *
 * You can either set the `url` prop or use {@link TJSFileSlotButton} and embed TJSMediaContent as a child.
 * A `url` context / store will be examined if it exists to obtain a file path to load.
 *
 * The following CSS variables control the associated styles with the default values:
 * ```
 * --tjs-media-content-background - transparent
 * --tjs-media-content-border - none
 * --tjs-media-content-border-radius - 0
 * --tjs-media-content-diameter - When defined used for height / width.
 * --tjs-media-content-height - 100px
 * --tjs-media-content-object-fit - contain
 * --tjs-media-content-width - 100px
 * ```
 */
declare class TJSMediaContent extends SvelteComponent<
  {
    media?: object;
    url?: string | URL;
    tooltip?: string;
    urlDefault?: string | URL;
    imgAlt?: string;
    tooltipDirection?: string;
    videoAutoplay?: boolean;
    videoLoop?: boolean;
    videoPlayOnHover?: boolean;
    videoMuted?: boolean;
    videoPlaybackRate?: number;
  },
  {
    [evt: string]: CustomEvent<any>;
  },
  {
    'video-fallback': {};
  }
> {}

/** Event / Prop / Slot type aliases for {@link TJSMediaContent | associated component}. */
declare namespace TJSMediaContent {
  /** Props type alias for {@link TJSMediaContent | associated component}. */
  export type Props = {
    media?: object;
    url?: string | URL;
    tooltip?: string;
    urlDefault?: string | URL;
    imgAlt?: string;
    tooltipDirection?: string;
    videoAutoplay?: boolean;
    videoLoop?: boolean;
    videoPlayOnHover?: boolean;
    videoMuted?: boolean;
    videoPlaybackRate?: number;
  };
  /** Events type alias for {@link TJSMediaContent | associated component}. */
  export type Events = { [evt: string]: CustomEvent<any> };
  /** Slots type alias for {@link TJSMediaContent | associated component}. */
  export type Slots = { 'video-fallback': {} };
}

export { TJSMediaContent };
