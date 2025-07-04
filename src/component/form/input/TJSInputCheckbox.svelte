<script>
   /**
    * Provides a data driven checkbox input w/ label.
    *
    * ### CSS Variables:
    * ```
    * --tjs-input-appearance
    * --tjs-input-border
    * --tjs-input-border-radius
    * --tjs-input-border-disabled
    * --tjs-input-box-shadow-focus
    * --tjs-input-box-shadow-focus-visible
    * --tjs-input-cursor
    * --tjs-input-cursor-disabled
    * --tjs-input-flex
    * --tjs-input-outline-focus-visible
    * --tjs-input-outline-offset
    * --tjs-input-transition-focus-visible
    * --tjs-input-transition-hover
    *
    * --tjs-input-checkbox-appearance
    * --tjs-input-checkbox-background
    * --tjs-input-checkbox-border
    * --tjs-input-checkbox-border-radius
    * --tjs-input-checkbox-border-disabled
    * --tjs-input-checkbox-box-shadow-focus
    * --tjs-input-checkbox-box-shadow-focus-visible
    * --tjs-input-checkbox-cursor
    * --tjs-input-checkbox-cursor-disabled
    * --tjs-input-checkbox-diameter
    * --tjs-input-checkbox-flex
    * --tjs-input-checkbox-height
    * --tjs-input-checkbox-outline-hover
    * --tjs-input-checkbox-outline-focus-visible
    * --tjs-input-checkbox-outline-offset
    * --tjs-input-checkbox-transition-focus-visible
    * --tjs-input-checkbox-transition-hover
    * --tjs-input-checkbox-width
    * ```
    * @componentDocumentation
    */

   import { writable }                 from '#svelte/store';

   import { applyStyles }              from '#runtime/svelte/action/dom/style';
   import { isMinimalWritableStore }   from '#runtime/svelte/store/util';
   import { isObject }                 from '#runtime/util/object';

   import {
      TJSSlotLabel,
      TJSSlotLabelUtil }               from '#standard/component/label';

   export let input = void 0;

   export let enabled = void 0;
   export let label = void 0;
   export let readonly = void 0;
   export let store = void 0;
   export let styles = void 0;

   export let efx = void 0;

   // ----------------------------------------------------------------------------------------------------------------

   $: enabled = isObject(input) && typeof input.enabled === 'boolean' ? input.enabled :
    typeof enabled === 'boolean' ? enabled : true;

   $: label = isObject(input) && TJSSlotLabelUtil.isValid(input.label) ? input.label :
    TJSSlotLabelUtil.isValid(label) ? label : void 0;

   $: readonly = isObject(input) && typeof input.readonly === 'boolean' ? input.readonly :
    typeof readonly === 'boolean' ? readonly : false;

   $: store = isObject(input) && isMinimalWritableStore(input.store) ? input.store :
    isMinimalWritableStore(store) ? store : writable(void 0);

   $: styles = isObject(input) && isObject(input.styles) ? input.styles :
    isObject(styles) ? styles : void 0;

   $: efx = isObject(input) && typeof input.efx === 'function' ? input.efx :
    typeof efx === 'function' ? efx : () => {};
</script>

<TJSSlotLabel {label} {enabled} isPointer={true}>
   <div class=tjs-input-container use:efx use:applyStyles={styles} on:pointerdown>
      <input class=tjs-input
             type=checkbox
             bind:checked={$store}
             on:pointerdown
             disabled={!enabled}
             {readonly}
      />
   </div>
</TJSSlotLabel>

<style>
    /* TODO: cssVariable defaults */

    .tjs-input-container {
       display: grid;
       place-items: center;
       pointer-events: none;
       transform-style: preserve-3d;

       background: var(--tjs-input-checkbox-background, var(--tjs-input-background));
       border-radius: var(--tjs-input-checkbox-border-radius, var(--tjs-input-border-radius));
       flex: var(--tjs-input-checkbox-flex, 0 0 20px);
       margin: var(--tjs-input-checkbox-margin, var(--tjs-input-margin));
       width: var(--tjs-input-checkbox-diameter, var(--tjs-input-checkbox-width, 20px));
       height: var(--tjs-input-checkbox-diameter, var(--tjs-input-checkbox-height, 20px));
    }

    input {
       pointer-events: initial;
       display: inline-block;
       position: relative;

       /*TODO: hard coded Foundry CSS var as default*/
       accent-color: var(--tjs-input-checkbox-accent-color, var(--color-checkbox-checked));

       appearance: var(--tjs-input-checkbox-appearance, var(--tjs-input-appearance, auto));

       border: var(--tjs-input-checkbox-border, var(--tjs-input-border));
       border-radius: var(--tjs-input-checkbox-border-radius, var(--tjs-input-border-radius));

       margin: var(--tjs-input-checkbox-margin, 0);

       outline-offset: var(--tjs-input-checkbox-outline-offset, var(--tjs-input-outline-offset));

       cursor: var(--tjs-input-checkbox-cursor, var(--tjs-input-cursor, var(--tjs-cursor-pointer, pointer)));

       transform: translateZ(1px);
    }

    input:disabled {
       border: var(--tjs-input-checkbox-border-disabled, var(--tjs-input-border-disabled, none));
       cursor: var(--tjs-input-checkbox-cursor-disabled, var(--tjs-input-cursor-disabled, var(--tjs-cursor-default, default)));
       pointer-events: none;
    }

    input:focus {
       outline: var(--tjs-input-checkbox-outline-focus, var(--tjs-default-outline-focus, unset));
       box-shadow: var(--tjs-input-checkbox-box-shadow-focus, var(--tjs-input-box-shadow-focus, unset));
    }

    /* checkbox requires an additional `:hover:focus-visible` field to control outline when focused and hovering */
    input:hover:focus-visible {
       box-shadow: var(--tjs-input-checkbox-box-shadow-focus-visible, var(--tjs-default-box-shadow-focus-visible));
       outline: var(--tjs-input-checkbox-outline-focus-visible, var(--tjs-default-outline-focus-visible, revert));
       transition: var(--tjs-input-checkbox-transition-focus-visible, var(--tjs-default-transition-focus-visible));
    }

    input:focus-visible {
       box-shadow: var(--tjs-input-checkbox-box-shadow-focus-visible, var(--tjs-default-box-shadow-focus-visible));
       outline: var(--tjs-input-checkbox-outline-focus-visible, var(--tjs-default-outline-focus-visible, revert));
       transition: var(--tjs-input-checkbox-transition-focus-visible, var(--tjs-default-transition-focus-visible));
    }

    input:hover {
       box-shadow: var(--tjs-input-checkbox-box-shadow-hover, var(--tjs-default-box-shadow-hover));
       outline: var(--tjs-input-checkbox-outline-hover, var(--tjs-default-outline-hover, revert));
       transition: var(--tjs-input-checkbox-transition-hover, var(--tjs-default-transition-hover));
    }
</style>
