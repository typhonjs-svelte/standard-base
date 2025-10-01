export { default as TJSScrollContainer } from './TJSScrollContainer.svelte';

/**
 * @typedef {object} TJSScrollContainerData
 *
 * @property {boolean} [allowTabFocus=false] When true, the scroll container is keyboard navigation focusable.
 *
 * @property {import('svelte/store').Writable<number>} [scrollLeft] A Svelte store that serializes the scroll left
 * position of the scrollable container.
 *
 * @property {import('svelte/store').Writable<number>} [scrollTop] A Svelte store that serializes the scroll top
 * position of the scrollable container.
 *
 * @property {{ [key: string]: string | null }}  [styles] Inline styles to assign to the container.
 *
 * @property {import('#runtime/svelte/util').TJSSvelte.Config.Embed} [svelte] A svelte component configuration object
 * used as the content component when there is no slotted component defined.
 */
