<script>
   /**
    * Provides a component to display an absolutely positioned side layer in a parent element featuring a column of
    * icons that slide out panels defined as Svelte components.
    *
    * @componentDocumentation
    */

   import { setContext }            from 'svelte';
   import { writable }              from 'svelte/store';

   import {
      applyStyles,
      applyVisualEdgeInsets }       from '#runtime/svelte/action/dom/style';

   import { getEasingFunc }         from '#runtime/svelte/easing';
   import { TJSSvelte }             from '#runtime/svelte/util';

   import {
      isIterable,
      isObject }                    from '#runtime/util/object';

   import TJSSideSlideItem          from './TJSSideSlideItem.svelte';

   /**
    * An iterable list of side slide items including icon (Font awesome string), a Svelte configuration object, and
    * tooltip.
    *
    * You may provide a `condition` boolean or function that returns a boolean to hide the item. This is useful for
    * adding items / panels only visible for the GM amongst other conditional tests.
    *
    * @type {(Iterable<{
    *    condition?: boolean | (() => boolean)
    *    icon: string | import('#runtime/svelte/util').TJSSvelte.Config.Embed,
    *    svelte: import('#runtime/svelte/util').TJSSvelte.Config.Embed,
    *    tooltip?: string
    * }>)}
    */
   export let items = [];

   /**
    * Controls whether items can be locked when `clickToOpen` is false. By default, items can be locked.
    *
    * @type {boolean}
    */
   export let allowLocking = true;

   /**
    * An iterable list of additional classes to add to the main slide layer element
    *
    * @type {Iterable<string>}
    */
   export let classes = void 0;

   /**
    * When true items are only opened / closed by click / keyboard interaction.
    *
    * @type {boolean}
    */
   export let clickToOpen = false;

   /**
    * Duration of transition effect.
    *
    * @type {number}
    */
   export let duration = 200;

   /**
    * Either the name of a Svelte easing function or a Svelte compatible easing function.
    *
    * @type {import('#runtime/svelte/easing').EasingReference}
    */
   export let easingIn = 'linear';

   /**
    * Either the name of a Svelte easing function or a Svelte compatible easing function.
    *
    * @type {import('#runtime/svelte/easing').EasingReference}
    */
   export let easingOut = 'linear';

   /**
    * The side in layers parent element to display.
    *
    * @type {'left' | 'right'}
    */
   export let side = 'right';

   /**
    * Whether to apply absolute positioning for left / right layout.
    *
    * @type {boolean}
    */
   export let sideAbs = true;

   /**
    * Additional inline styles to apply to the side slide layer. Useful for setting CSS variables.
    *
    * @type {{ [key: string]: string | null }}
    */
   export let styles = void 0;

   /**
    * When true, tooltips are enabled.
    *
    * @type {boolean}
    */
   export let tooltips = true;

   /**
    * Tooltip direction
    *
    * @type {string}
    */
   export let tooltipDirection = void 0;

   /**
    * A valid CSS value for the `top` positioning attribute for the top of the side slide layer.
    *
    * When top is a number it will be treated as pixels unless `topUnit` is defined.
    *
    * @type {string | number}
    */
   export let top = 0;

   /**
    * When `top` is defined as a number and `topUnit` is defined then it is used to create the top style. This
    * facilitates creating a UI for editing side slide layer via a range input and separately storing the unit type.
    *
    * Examples are: `px`, `%`, `em`, `rem`. Either `px` or `%` make the most sense depending on the layout constraints.
    *
    * @type {string}
    */
   export let topUnit = void 0;

   /**
    * The z-index for the side slide layer inside the parent element.
    *
    * @type {number}
    */
   export let zIndex = 10;

   // Provides a store for all items to share that is updated when an item is locked. When `clickToOpen` is false an
   // item can be locked w/ contextmenu click or key activation.
   setContext('#side-slide-layer-item-locked', writable());

   // Provides a store for all items to share that is updated when an item opens. In cases for keyboard activation this
   // allows other items to close when the actively opened item differs.
   setContext('#side-slide-layer-item-opened', writable());

   // Provides a store for all items to share and use to increment the item container z-index when pointer enters the
   // item icon. This allows each item that is being shown to always be on top regardless of item order.
   setContext('#side-slide-layer-item-z-index', writable(1));

   /**
    * Stores the stacking context visual edge constraints.
    *
    * @type {import('svelte/store').Writable<import('#runtime/util/dom/style').StyleMetric.Data.BoxSides>}
    */
   const visualEdgeInsets = writable({ top: 0, right: 0, bottom: 0, left: 0 });

   /**
    * The actual easing functions after lookup or direct assignment if easing props are functions.
    *
    * @type {import('#runtime/svelte/easing').EasingFunction}
    */
   let actualEasingIn, actualEasingOut;

   /** @type {{ [key: string]: string | null }} */
   let allStyles;

   // Items after conditional filtering and verification.
   let filteredItems = [];

   $: {
      if (!isIterable(items))
      {
         throw new TypeError(`'TJSSideSlideLayer error: 'items' prop is not an iterable list.`);
      }

      const newItems = [];

      let cntr = -1;

      for (const item of items)
      {
         cntr++;

         if (!isObject(item))
         {
            throw new TypeError(`TJSSideSlideLayer error: 'items[${cntr}]' is not an object.`);
         }

         if (item.condition !== void 0 && typeof item.condition !== 'boolean' && typeof item.condition !== 'function')
         {
            throw new TypeError(`TJSSideSlideLayer error: 'items[${cntr}].condition' is not a boolean or function.`);
         }

         if (typeof item.icon !== 'string' && !TJSSvelte.config.isConfigEmbed(item.icon))
         {
            throw new TypeError(
             `TJSSideSlideLayer error: 'items[${cntr}].icon' is not a string or Svelte configuration object.`);
         }

         if (!TJSSvelte.config.isConfigEmbed(item.svelte))
         {
            throw new TypeError(
             `TJSSideSlideLayer error: 'items[${cntr}].svelte' is not a Svelte configuration object.`);
         }

         if (item.tooltip !== void 0 && typeof item.tooltip !== 'string')
         {
            throw new TypeError(`TJSSideSlideLayer error: 'items[${cntr}].tooltip' is not a string.`);
         }

         // Filter on any given condition.
         if (typeof item.condition === 'function' && !item.condition()) { continue; }
         if (typeof item.condition === 'boolean' && !item.condition) { continue; }

         newItems.push(item);
      }

      filteredItems = newItems;
   }

   $: {
      const newTop = typeof top === 'number' ? `${top}${typeof topUnit === 'string' ? topUnit : 'px'}` : top;
      const newZIndex = typeof zIndex === 'number' ? zIndex : 10;

      switch (side)
      {
         case 'left':
            allStyles = {
               left: sideAbs ? `${$visualEdgeInsets.left}px` : null,
               right: null,
               top: `calc(${$visualEdgeInsets.top}px + ${newTop})`,
               'z-index': newZIndex,
               ...(isObject(styles) ? styles : {})
            };
            break;

         case 'right':
            allStyles = {
               left: null,
               right: sideAbs ? `${$visualEdgeInsets.right}px` : null,
               top: `calc(${$visualEdgeInsets.top}px + ${newTop})`,
               'z-index': newZIndex,
               ...(isObject(styles) ? styles : {})
            };
            break;

         default:
            throw new Error(`'side' prop must be either 'left' or 'right'`);
      }
   }

   // Run this reactive block to set the actual `easingIn` function from string lookup or accept the function provided.
   $: actualEasingIn = getEasingFunc(easingIn);

   // Run this reactive block to set the actual `easingOut` function from string lookup or accept the function provided.
   $: actualEasingOut = getEasingFunc(easingOut);
</script>

<section class={`tjs-side-slide-layer${isIterable(classes) ? ` ${Array.from(classes).join(' ')}` : ''}`}
         use:applyStyles={allStyles}
         use:applyVisualEdgeInsets={{ sides: false, parent: { stackingContext: true }, store: visualEdgeInsets }}>
   {#each filteredItems as item (item.icon)}
      <TJSSideSlideItem {item} {allowLocking} {clickToOpen} {duration} easingIn={actualEasingIn} easingOut={actualEasingOut} {side} {tooltips} {tooltipDirection} />
   {/each}
</section>

<style>
   section {
      position: absolute;
      display: flex;
      flex-direction: column;
      gap: var(--tjs-side-slide-layer-item-gap, calc(var(--tjs-side-slide-layer-item-diameter, 30px) / 8));
      margin: var(--tjs-side-slide-layer-margin, 0);
   }
</style>
