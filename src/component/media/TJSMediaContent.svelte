<script>
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
    * @componentDocumentation
    */

   import { getContext }      from 'svelte';

   import { clamp }           from '#runtime/math/util';
   import { inlineSvg }       from '#runtime/svelte/action/dom/inline-svg';
   import { isReadableStore } from '#runtime/svelte/store/util';
   import {
      AssetValidator,
      CrossWindow }           from '#runtime/util/browser';
   import { localize }        from '#runtime/util/i18n';
   import { isObject }        from '#runtime/util/object';

   /**
    * The `url` store potentially set from a parent component like `TJSFileSlotButton`.
    *
    * @type {import('svelte/store').Writable<URL>}
    */
   const storeURL = getContext('url');

   /**
    * The `url` store potentially set from a parent component like `TJSFileSlotButton`.
    *
    * @type {import('svelte/store').Writable<string>}
    */
   const storeURLString = getContext('urlString');

   /**
    * Only process image / video assets from AssetValidator / skip audio.
    *
    * @type {Set<string>}
    */
   const mediaTypes = new Set(['img', 'svg', 'video']);

   /**
    * @type {object}
    */
   export let media = void 0;

   /**
    * URL path / URL for media content.
    *
    * @type {string | URL}
    */
   export let url = void 0;

   /**
    * Default URL path / URL for media content when no URL is configured.
    *
    * @type {string | URL}
    */
   export let urlDefault = void 0;

   /**
    * Alternate image text.
    *
    * @type {string}
    */
   export let imgAlt = void 0;

   /**
    * A title for the media element.
    *
    * @type {string}
    */
   export let title = void 0;

   /**
    * Automatically start video playback; default: true
    *
    * @type {boolean}
    */
   export let videoAutoplay = void 0;

   /**
    * Automatically loop video; default: true
    *
    * @type {boolean}
    */
   export let videoLoop = void 0;

   /**
    * Play video on pointer hover.
    *
    * @type {boolean}
    */
   export let videoPlayOnHover = void 0;

   /**
    * Mute video playback audio; default: true
    *
    * @type {boolean}
    */
   export let videoMuted = void 0;

   /**
    * Video playback rate - clamped internally between 0 - 2.
    *
    * @type {number}
    */
   export let videoPlaybackRate = void 0;

   let parsed = void 0;

   let videoEl;

   // ----------------------------------------------------------------------------------------------------------------

   $: url = isObject(media) && (typeof media.url === 'string' || CrossWindow.isURL(media.url)) ? media.url :
    typeof url === 'string' || CrossWindow.isURL(url) ? url : void 0;

   $: urlDefault = isObject(media) && (typeof media.urlDefault === 'string' || CrossWindow.isURL(media.urlDefault)) ?
     media.urlDefault :
    typeof urlDefault === 'string' || CrossWindow.isURL(urlDefault) ? urlDefault : void 0;

   $: imgAlt = isObject(media) && typeof media.imgAlt === 'string' ? media.imgAlt :
    typeof imgAlt === 'string' ? imgAlt : void 0;

   $: videoAutoplay = isObject(media) && typeof media.videoAutoplay === 'boolean' ? media.videoAutoplay :
    typeof videoAutoplay === 'boolean' ? videoAutoplay : true;

   $: videoLoop = isObject(media) && typeof media.videoLoop === 'boolean' ? media.videoLoop :
    typeof videoLoop === 'boolean' ? videoLoop : true;

   $: videoMuted = isObject(media) && typeof media.videoMuted === 'boolean' ? media.videoMuted :
    typeof videoMuted === 'boolean' ? videoMuted : true;

   $: title = isObject(media) && typeof media.title === 'string' ? media.title :
    typeof title === 'string' ? title : void 0;

   $: {
      videoPlayOnHover = isObject(media) && typeof media.videoPlayOnHover === 'boolean' ? media.videoPlayOnHover :
       typeof videoPlayOnHover === 'boolean' ? videoPlayOnHover : false;

      videoAutoplay = !videoPlayOnHover;

      // Start / pause current play state based on `videoPlayOnHover`.
      if (videoPlayOnHover) { videoEl?.pause(); }
      else { videoEl?.play(); }
   }

   $: {
      const playbackRate = isObject(media) && typeof media.videoPlaybackRate === 'number' ? media.videoPlaybackRate :
       typeof videoPlaybackRate === 'number' ? videoPlaybackRate : void 0;

      // Ensure playback rate is clamped between 0.1 - 4.
      videoPlaybackRate = typeof playbackRate === 'number' ? clamp(playbackRate, 0.1, 4) : 1;
   }

   $: if (videoEl) { videoEl.playbackRate = videoPlaybackRate; }

   /**
    * First attempt to use the url prop or fallback to the store from context then parse the media type.
    */
   $: {
      const mediaTarget = url ??
       (isReadableStore(storeURL) ? $storeURL : void 0) ??
        (isReadableStore(storeURLString) ? $storeURLString : void 0);

      const result = AssetValidator.parseMedia({ url: mediaTarget, mediaTypes });

      // Validate that the result is a valid format / type otherwise fallback to `urlDefault` if provided.
      if (result?.valid)
      {
         parsed = result;
      }
      else if (urlDefault)
      {
         const resultDefault = AssetValidator.parseMedia({ url: urlDefault, mediaTypes });
         if (resultDefault?.valid)
         {
            parsed = resultDefault;
         }
      }
   }

   // ----------------------------------------------------------------------------------------------------------------

   /**
    * Handle starting the video player when `videoPlayerOnHover` is enabled.
    */
   function onPointerenter()
   {
      if (typeof videoPlayOnHover === 'boolean' && videoPlayOnHover) { videoEl.play(); }
   }

   /**
    * Handle pausing the video player when `videoPlayerOnHover` is enabled.
    */
   function onPointerleave()
   {
      if (typeof videoPlayOnHover === 'boolean' && videoPlayOnHover) { videoEl.pause(); }
   }
</script>

<div class=tjs-media-content>
    {#key parsed}
       {#if parsed?.elementType === 'svg'}
          <svg use:inlineSvg={parsed.src}></svg>
       {:else if parsed?.elementType === 'img'}
          <img src={parsed.src} alt={imgAlt} title={title} />
       {:else if parsed?.elementType === 'video'}
          <video bind:this={videoEl}
                 on:pointerenter={onPointerenter}
                 on:pointerleave={onPointerleave}
                 autoplay={videoAutoplay}
                 loop={videoLoop}
                 muted={videoMuted}
                 title={localize(title)}
                 tabindex=-1>  <!-- tabindex is necessary to prevent focus on Firefox -->
             <source src={parsed.src} type={`video/${parsed.extension}`}>

             <!-- Potentially use the default asset if an image as a fallback. -->
             <slot name=video-fallback />
          </video>
       {/if}
    {/key}
</div>

<style>
   div {
      display: block;

      height: var(--tjs-media-content-diameter, var(--tjs-media-content-height, 100px));
      width: var(--tjs-media-content-diameter, var(--tjs-media-content-width, 100px));

      background: var(--tjs-media-content-background, transparent);
      border: var(--tjs-media-content-border, none);
      border-radius: var(--tjs-media-content-border-radius, 0);
   }

   video, img, svg {
      position: relative;
      background: transparent;
      border: none;
      object-fit: var(--tjs-media-content-object-fit, contain);

      width: 100%;
      height: 100%;
   }
</style>
