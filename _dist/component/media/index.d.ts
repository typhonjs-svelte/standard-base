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
  TJSMediaContent.Props,
  TJSMediaContent.Events,
  TJSMediaContent.Slots
> {}

/** Event / Prop / Slot type aliases for {@link TJSMediaContent | associated component}. */
declare namespace TJSMediaContent {
  /** Props type alias for {@link TJSMediaContent | associated component}. */
  export type Props = {
    /**
     * @type {object}
     */
    media?: object;
    /**
     * URL path / URL for media content.
     *
     * @type {string | URL}
     */
    url?: string | URL;
    /**
     * A tooltip for the media element.
     *
     * @type {string}
     */
    tooltip?: string;
    /**
     * Default URL path / URL for media content when no URL is configured.
     *
     * @type {string | URL}
     */
    urlDefault?: string | URL;
    /**
     * Alternate image text.
     *
     * @type {string}
     */
    imgAlt?: string;
    /**
     * The tooltip direction for the media element.
     *
     * @type {string}
     */
    tooltipDirection?: string;
    /**
     * Automatically start video playback; default: true
     *
     * @type {boolean}
     */
    videoAutoplay?: boolean;
    /**
     * Automatically loop video; default: true
     *
     * @type {boolean}
     */
    videoLoop?: boolean;
    /**
     * Play video on pointer hover.
     *
     * @type {boolean}
     */
    videoPlayOnHover?: boolean;
    /**
     * Mute video playback audio; default: true
     *
     * @type {boolean}
     */
    videoMuted?: boolean;
    /**
     * Video playback rate - clamped internally between 0 - 2.
     *
     * @type {number}
     */
    videoPlaybackRate?: number;
  };
  /** Events type alias for {@link TJSMediaContent | associated component}. */
  export type Events = { [evt: string]: CustomEvent<any> };
  /** Slots type alias for {@link TJSMediaContent | associated component}. */
  export type Slots = { 'video-fallback': {} };
}

export { TJSMediaContent };
