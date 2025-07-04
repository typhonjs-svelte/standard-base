<script>
   /**
    * Provides a slotted component wrapped in a label element. The `label` prop can either be a string or a Svelte
    * configuration object to be used as the label text. The label element uses `display: contents` which ignores the
    * label element and lays out the children as if the label element does not exist which is perfect for a grid layout.
    * Optionally, there are CSS variables available to change the `display` and additional flex layout configuration
    * possibilities.
    *
    * ### CSS Variables
    *
    * The following CSS variables control the associated styles with the default values:
    *
    * ```
    * For layout:
    * -----------------------------------------------------
    * --tjs-slot-label-display - contents
    * --tjs-slot-label-flex - unset
    * --tjs-slot-label-flex-direction - unset
    * --tjs-slot-label-flex-wrap - unset
    *
    * For text / string label:
    * -----------------------------------------------------
    * --tjs-slot-label-color - inherit
    * --tjs-slot-label-font-family - inherit
    * --tjs-slot-label-font-size - inherit
    * --tjs-slot-label-line-height - inherit
    * --tjs-slot-label-text-align - right
    * --tjs-slot-label-white-space - nowrap
    * ```
    * @componentDocumentation
    */

   import { TJSSvelte }          from '#runtime/svelte/util';
   import { localize }           from '#runtime/util/i18n';
   import { isObject }           from '#runtime/util/object';

   import { TJSSlotLabelUtil }   from './TJSSlotLabelUtil.js';

   export let label = void 0;

   /** @type {boolean} */
   export let enabled = void 0;

   /**
    * Set to `true` to use the `pointer` cursor over label.
    *
    * @type {boolean}
    */
   export let isPointer = void 0;

   $: label = TJSSlotLabelUtil.isValid(label) ? label : void 0;

   $: enabled = isObject(label) && typeof label.enabled === 'boolean' ? label.enabled :
    typeof enabled === 'boolean' ? enabled : true;

   $: isPointer = isObject(label) && typeof label.isPointer === 'boolean' ? label.isPointer :
    typeof isPointer === 'boolean' ? isPointer : false;
</script>

{#if label}
   <!-- svelte-ignore a11y-label-has-associated-control -->
   <label class=tjs-slot-label>
      {#if typeof label === 'string'}
         <span class=tjs-slot-label-span
               class:is-pointer={isPointer}
               class:disabled={!enabled}>
            {localize(label)}
         </span>
      {:else if TJSSvelte.config.isConfigEmbed(label)}
         <svelte:component this={label.class} {...(isObject(label.props) ? label.props : {})} {enabled} />
      {/if}

      <slot />
   </label>
{:else}
   <slot />
{/if}

<style>
   label {
      display: var(--tjs-slot-label-display, contents);

      align-items: var(--tjs-slot-label-align-items, center);
      cursor: var(--tjs-cursor-default, default);

      /* Unset, but available when 'display' is changed */
      flex: var(--tjs-slot-label-flex, unset);
      flex-direction: var(--tjs-slot-label-flex-direction, unset);
      flex-wrap: var(--tjs-slot-label-flex-wrap, unset);
      gap: var(--tjs-slot-label-gap, unset);
      justify-content: var(--tjs-slot-label-justify-content, unset);
   }

   span {
      color: var(--tjs-slot-label-span-color, inherit);
      font-family: var(--tjs-slot-label-span-font-family, inherit);
      font-size: var(--tjs-slot-label-span-font-size, inherit);
      line-height: var(--tjs-slot-label-span-line-height, inherit);
      text-align: var(--tjs-slot-label-span-text-align, right);
      white-space: var(--tjs-slot-label-span-white-space, nowrap);
   }

   span.is-pointer:not(.disabled) {
      cursor: var(--tjs-cursor-pointer, pointer);
   }

   span.disabled {
      cursor: var(--tjs-slot-label-cursor-disabled, var(--tjs-cursor-default, default));
      filter: var(--tjs-slot-label-filter-disabled, grayscale(100%) contrast(20%) brightness(120%));
   }
</style>
