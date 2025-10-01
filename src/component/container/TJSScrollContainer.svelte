<script>
   /**
    * Provides a convenient scrollable container / DIV that always allows keyboard scroll navigation by stopping
    * propagation of page up / down key events when the active element is or is contained by the container.
    *
    * Auto serialization of scroll state is handled by providing a store / `scrollTop`.
    *
    * A main slot is provided for a content component, but a fallback allows a child content component to be defined
    * by the `class` and `props` fields in {@link TJSScrollContainerData}.
    *
    * @componentDocumentation
    */

   import { applyScroll }              from '#runtime/svelte/action/dom/properties';
   import { applyStyles }              from '#runtime/svelte/action/dom/style';
   import { isMinimalWritableStore }   from '#runtime/svelte/store/util';
   import { TJSSvelte }                from '#runtime/svelte/util';
   import { CrossWindow }              from '#runtime/util/browser';
   import { isObject }                 from '#runtime/util/object';

   /** @type {import('.').TJSScrollContainerData} */
   export let container = void 0;

   /** @type {boolean} */
   export let allowTabFocus = void 0;

   export let onContextMenu = void 0;

   /** @type {import('svelte/store').Writable<number>} */
   export let scrollLeft = void 0;

   /** @type {import('svelte/store').Writable<number>} */
   export let scrollTop = void 0;

   /** @type {{ [key: string]: string | null }} */
   export let styles = void 0;

   $: allowTabFocus = isObject(container) && typeof container.allowTabFocus === 'boolean' ? container.allowTabFocus :
    typeof allowTabFocus === 'boolean' ? allowTabFocus : false;

   $: onContextMenu = isObject(container) && typeof container.onContextMenu === 'function' ? container.onContextMenu :
    typeof onContextMenu === 'function' ? onContextMenu : void 0;

   $: scrollLeft = isObject(container) && isMinimalWritableStore(container.scrollLeft) ? container.scrollLeft :
    isMinimalWritableStore(scrollLeft) ? scrollLeft : void 0;

   $: scrollTop = isObject(container) && isMinimalWritableStore(container.scrollTop) ? container.scrollTop :
    isMinimalWritableStore(scrollTop) ? scrollTop : void 0;

   $: styles = isObject(container) && isObject(container.styles) ? container.styles :
    isObject(styles) ? styles : void 0;

   $: svelte = isObject(container) && TJSSvelte.config.isConfigEmbed(container.svelte) ? container.svelte : void 0;

   /** @type {HTMLElement} */
   let containerEl;

   /**
    * Handle context menu callback.
    *
    * @param {PointerEvent | KeyboardEvent}   event -
    */
   function onContextMenuPress(event)
   {
      if (typeof onContextMenu === 'function') { onContextMenu({ event }); }
   }

   /**
    * Stops propagation against any global key handlers when focus is inside the container for page up / down key
    * events.
    *
    * @param {KeyboardEvent}  event - A KeyboardEvent.
    */
   function onKeydown(event)
   {
      switch (event.code)
      {
         case 'ArrowDown':
         case 'ArrowLeft':
         case 'ArrowRight':
         case 'ArrowUp':
         case 'End':
         case 'Home':
         case 'PageDown':
         case 'PageUp':
         {
            const activeEl = CrossWindow.getActiveElement(event);
            if (activeEl === containerEl || containerEl.contains(activeEl))
            {
               // Stop propagation against any global key handlers when focus is inside the container.
               event.stopPropagation();
            }

            break;
         }
      }
   }

   /**
    * Stops propagation against any global key handlers when focus is inside the container for page up / down key
    * events.
    *
    * @param {KeyboardEvent}  event - A KeyboardEvent.
    */
   function onKeyup(event)
   {
      switch (event.code)
      {
         case 'ArrowDown':
         case 'ArrowLeft':
         case 'ArrowRight':
         case 'ArrowUp':
         case 'End':
         case 'Home':
         case 'PageDown':
         case 'PageUp':
         {
            const activeEl = CrossWindow.getActiveElement(event);
            if (activeEl === containerEl || containerEl.contains(activeEl))
            {
               event.stopPropagation();
            }

            break;
         }
      }
   }

   /**
    * Handles stopping propagation and silently focusing the container element so key commands function.
    *
    * @param {WheelEvent}  event - A WheelEvent.
    */
   function onWheel(event)
   {
      event.stopPropagation();

      const activeEl = CrossWindow.getActiveElement(event);
      if (activeEl !== containerEl && !containerEl.contains(activeEl)) { containerEl.focus(); }
   }
</script>

<!-- svelte-ignore a11y-no-noninteractive-element-interactions a11y-no-noninteractive-tabindex -->
<div class="tjs-scroll-container tjs-a11y-focusable"
     bind:this={containerEl}
     on:contextmenu={onContextMenuPress}
     on:keydown={onKeydown}
     on:keyup={onKeyup}
     on:wheel={onWheel}
     use:applyScroll={{ scrollLeft, scrollTop }}
     use:applyStyles={styles}
     role=region
     tabindex={allowTabFocus ? 0 : -1}>
   <slot>
      {#if svelte}
         <svelte:component this={svelte.class} {...(isObject(svelte.props) ? svelte.props : {})} />
      {/if}
   </slot>
</div>

<style>
   .tjs-scroll-container {
      display: var(--tjs-scroll-container-display, flex);
      flex: var(--tjs-scroll-container-flex, 1);
      flex-direction: var(--tjs-scroll-container-flex-direction, column);
      gap: var(--tjs-scroll-container-gap, 0.5rem);

      background: var(--tjs-scroll-container-background);
      border: var(--tjs-scroll-container-border);
      border-radius: var(--tjs-scroll-container-border-radius);

      overflow: var(--tjs-scroll-container-overflow, auto);
      overscroll-behavior: var(--tjs-scroll-container-overscroll-behavior, contain);

      /* For Firefox */
      scrollbar-width: var(--tjs-scroll-container-scrollbar-width, thin);
      scrollbar-color: var(--tjs-scroll-container-scrollbar-color, inherit);

      transition: var(--tjs-scroll-container-transition, all ease-in-out 0.2s);
   }

   .tjs-scroll-container:focus-visible {
      outline: var(--tjs-scroll-container-outline-focus-visible, 2px solid transparent);
      box-shadow: var(--tjs-scroll-container-box-shadow-focus-visible);
   }
</style>
