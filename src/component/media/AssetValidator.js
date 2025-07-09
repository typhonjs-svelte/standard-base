import {
   CrossWindow,
   URLParser } from '#runtime/util/browser';

/**
 * Provides a utility to validate media file types and determine the appropriate HTML element type for rendering.
 *
 * @privateRemarks
 * TODO: This is the initial implementation and is only used locally in {@link TJSMediaContent}.
 *
 * A few refinements are needed to make this a general utility in `#runtime/util/browser`.
 */
export class AssetValidator
{
   /** Supported media types. */
   static #allMediaTypes = new Set(['audio', 'img', 'svg', 'video']);

   /** Supported audio extensions. */
   static #audioExtensions = new Set(['mp3', 'wav', 'ogg', 'aac', 'flac', 'webm']);

   /** Supported image extensions. */
   static #imageExtensions = new Set(['jpg', 'jpeg', 'png', 'gif', 'bmp', 'svg', 'webp']);

   /** Supported SVG extensions. */
   static #svgExtensions = new Set(['svg']);

   /** Supported video extensions. */
   static #videoExtensions = new Set(['mp4', 'webm', 'ogg']);

   /**
    * Parses the provided file path to determine the media type and validity based on the file extension. Certain
    * extensions can be excluded in addition to filtering by specified media types.
    *
    * @privateRemarks
    * TODO: create type information when made public.
    *
    * @param {object}      options - Options.
    *
    * @param {string | URL}   options.url - The URL of the media asset to validate.
    *
    * @param {Set<string>} [options.exclude] - A set of file extensions to exclude from validation.
    *
    * @param {Set<('audio' | 'img' | 'svg' | 'video')>} [options.mediaTypes] - A set of media types to validate against
    *        including: `audio`, `img`, `svg`, `video`. Defaults to all media types if not specified.
    *
    * @param {boolean}     [options.raiseException] - When true exceptions are thrown.
    *
    * @param {string}      [options.routePrefix] - An additional route / URL prefix to add in constructing URL.
    *
    * @returns {({
    *    url: string | URL,
    *    valid: false
    * } |
    * {
    *    src: string | URL,
    *    url: URL,
    *    extension: string,
    *    elementType: 'img' | 'video' | 'audio',
    *    valid: true
    * })} The parsed asset information containing the file path, extension, element type, and whether the parsing is
    * valid for the file extension is supported and not excluded.
    *
    * @throws {TypeError} If the provided `url` is not a string or URL, `routePrefix` is not a string,
    *         `exclude` is not a Set, or `mediaTypes` is not a Set.
    */
   static parseMedia({ url, routePrefix, exclude, mediaTypes = this.#allMediaTypes, raiseException = false })
   {
      const throws = typeof raiseException === 'boolean' ? raiseException : true;

      if (typeof url !== 'string' && !CrossWindow.isURL(url))
      {
         if (throws) { throw new TypeError(`'url' is not a string or URL instance.`); }
         else { return { url, valid: false }; }
      }

      if (routePrefix !== void 0 && typeof routePrefix !== 'string')
      {
         if (throws) { throw new TypeError(`'routePrefix' is not a string.`); }
         else { return { url, valid: false }; }
      }

      if (exclude !== void 0 && !CrossWindow.isSet(exclude))
      {
         if (throws) { throw new TypeError(`'exclude' is not a Set.`); }
         else { return { url, valid: false }; }
      }

      if (!CrossWindow.isSet(mediaTypes))
      {
         if (throws) { throw new TypeError(`'mediaTypes' is not a Set.`); }
         else { return { url, valid: false }; }
      }

      const targetURL = typeof url === 'string' ? URLParser.parse({ url, routePrefix }) : url;

      if (!targetURL)
      {
         if (throws) { throw new TypeError(`'url' is invalid.`); }
         else { return { url, valid: false }; }
      }

      const extensionMatch = targetURL.pathname.match(/\.([a-zA-Z0-9]+)$/);
      const extension = extensionMatch ? extensionMatch[1].toLowerCase() : null;

      const isExcluded = CrossWindow.isSet(exclude) ? exclude.has(extension) : false;

      let elementType = null;
      let valid = false;

      if (extension && !isExcluded)
      {
         if (this.#svgExtensions.has(extension) && mediaTypes.has('svg'))
         {
            elementType = 'svg';
            valid = true;
         }
         else if (this.#imageExtensions.has(extension) && mediaTypes.has('img'))
         {
            elementType = 'img';
            valid = true;
         }
         else if (this.#videoExtensions.has(extension) && mediaTypes.has('video'))
         {
            elementType = 'video';
            valid = true;
         }
         else if (this.#audioExtensions.has(extension) && mediaTypes.has('audio'))
         {
            elementType = 'audio';
            valid = true;
         }
      }

      return {
         src: url,
         url: targetURL,
         extension,
         elementType,
         valid
      };
   }
}
