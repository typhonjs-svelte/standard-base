<script>
   /**
    * ### CSS Variables:
    * ```
    * --tjs-input-appearance
    * --tjs-input-background
    * --tjs-input-border
    * --tjs-input-border-radius
    * --tjs-input-border-disabled
    * --tjs-input-box-shadow-focus
    * --tjs-input-box-shadow-focus-visible
    * --tjs-input-caret-color
    * --tjs-input-color
    * --tjs-input-color-disabled
    * --tjs-input-cursor
    * --tjs-input-cursor-disabled
    * --tjs-input-flex
    * --tjs-input-font-family
    * --tjs-input-font-size
    * --tjs-input-height
    * --tjs-input-line-height
    * --tjs-input-padding
    * --tjs-input-placeholder-color
    * --tjs-input-outline-focus-visible
    * --tjs-input-outline-offset
    * --tjs-input-overflow
    * --tjs-input-range-align
    * --tjs-input-transition-focus-visible
    * --tjs-input-value-invalid-color
    * --tjs-input-width
    *
    * --tjs-input-range-appearance
    * --tjs-input-range-background
    * --tjs-input-range-border
    * --tjs-input-range-border-radius
    * --tjs-input-range-border-disabled
    * --tjs-input-range-box-shadow-focus
    * --tjs-input-range-box-shadow-focus-visible
    * --tjs-input-range-caret-color
    * --tjs-input-range-color
    * --tjs-input-range-color-disabled
    * --tjs-input-range-cursor
    * --tjs-input-range-cursor-disabled
    * --tjs-input-range-flex
    * --tjs-input-range-font-family
    * --tjs-input-range-font-size
    * --tjs-input-range-height
    * --tjs-input-range-line-height
    * --tjs-input-range-outline-focus-visible
    * --tjs-input-range-outline-offset
    * --tjs-input-range-overflow
    * --tjs-input-range-padding
    * --tjs-input-range-placeholder-color
    * --tjs-input-range-slider-track-box-shadow
    * --tjs-input-range-slider-track-box-shadow-focus
    * --tjs-input-range-text-align
    * --tjs-input-range-slider-thumb-box-shadow
    * --tjs-input-range-slider-thumb-box-shadow-focus
    * --tjs-input-range-transition-focus-visible
    * --tjs-input-range-value-invalid-color
    * --tjs-input-range-width
    * ```
    * @componentDocumentation
    */
   import { writable }                 from '#svelte/store';

   import { applyStyles }              from '#runtime/svelte/action/dom/style';
   import { isMinimalWritableStore }   from '#runtime/svelte/store/util';
   import { isObject }                 from '#runtime/util/object';
   import { CrossWindow }              from '#runtime/util/browser';

   import {
      TJSSlotLabel,
      TJSSlotLabelUtil }               from '#standard/component/label';

   export let input = void 0;

   export let enabled = void 0;
   export let label = void 0;
   export let options = void 0;
   export let max = void 0;
   export let min = void 0;
   export let readonly = void 0;
   export let step = void 0;
   export let store = void 0;
   export let styles = void 0;

   export let efx = void 0;

   const localOptions = {
      blurOnEnterKey: true,
      blurOnEscKey: false,
      cancelOnEscKey: false
   }

   /** @type {HTMLElement} */
   let inputEl;

   // ----------------------------------------------------------------------------------------------------------------

   $: enabled = isObject(input) && typeof input.enabled === 'boolean' ? input.enabled :
    typeof enabled === 'boolean' ? enabled : true;

   $: label = isObject(input) && TJSSlotLabelUtil.isValid(input.label) ? input.label :
    TJSSlotLabelUtil.isValid(label) ? label : void 0;

   $: max = isObject(input) && typeof input.max === 'number' ? input.max :
    typeof max === 'number' ? max : 100;

   $: min = isObject(input) && typeof input.min === 'number' ? input.min :
    typeof min === 'number' ? min : 0;

   $: {
      options = isObject(input) && isObject(input.options) ? input.options :
       isObject(options) ? options : {};

      if (typeof options?.blurOnEnterKey === 'boolean') { localOptions.blurOnEnterKey = options.blurOnEnterKey; }
      if (typeof options?.blurOnEscKey === 'boolean') { localOptions.blurOnEscKey = options.blurOnEscKey; }
      if (typeof options?.cancelOnEscKey === 'boolean') { localOptions.cancelOnEscKey = options.cancelOnEscKey; }
   }

   $: readonly = isObject(input) && typeof input.readonly === 'boolean' ? input.readonly :
    typeof readonly === 'boolean' ? readonly : false;

   $: step = isObject(input) && typeof input.step === 'number' ? input.step :
    typeof step === 'number' ? step : 1;

   $: store = isObject(input) && isMinimalWritableStore(input.store) ? input.store :
    isMinimalWritableStore(store) ? store : writable(void 0);

   $: styles = isObject(input) && isObject(input.styles) ? input.styles :
    isObject(styles) ? styles : void 0;

   $: efx = isObject(input) && typeof input.efx === 'function' ? input.efx :
    typeof efx === 'function' ? efx : () => {};

   // ----------------------------------------------------------------------------------------------------------------

   /** @type {number} */
   let initialValue;

   /**
    * Tracks the captured initial `pointerdown` time when `cancelOnEscKey` is active to prevent the subsequent `focusin`
    * event from storing the initial new value.
    */
   let initialPointerdownTime = 0;

   /**
    * Handle the case when keyboard navigation focuses the input element. Avoid setting initial value again based on
    * timing from `onPointerdown`.
    */
   function onFocusin()
   {
      const focusTime = performance.now();

      if (focusTime - initialPointerdownTime < 100) { return; }

      initialValue = localOptions.cancelOnEscKey ? globalThis.parseFloat(inputEl.value) : void 0;
   }

   /**
    * Handle various key options.
    *
    * @param {KeyboardEvent} event -
    */
   function onKeydown(event)
   {
      if (localOptions.blurOnEnterKey && event.code === 'Enter')
      {
         event.preventDefault();
         event.stopPropagation();

         initialValue = void 0;

         inputEl.blur();
         return;
      }

      if (event.code === 'Escape')
      {
         if (localOptions.cancelOnEscKey && typeof initialValue === 'number')
         {
            store.set(initialValue);
         }

         if (localOptions.blurOnEscKey)
         {
            event.preventDefault();
            event.stopPropagation();

            initialValue = void 0;
            inputEl.blur();
         }
      }
   }

   /**
    * When `cancelOnEscKey` is active capture the initial value before it changes and store current time to
    * avoid taking the initial value after focus.
    *
    * @param {PointerEvent} event -
    */
   function onPointerdown(event)
   {
      if (localOptions.cancelOnEscKey && inputEl !== CrossWindow.getActiveElement(event))
      {
         initialValue = globalThis.parseFloat(inputEl.value);
         initialPointerdownTime = performance.now();
      }
   }
</script>

<TJSSlotLabel {label} {enabled}>
   <div class=tjs-input-container use:efx use:applyStyles={styles} on:pointerdown>
      <input class=tjs-input
             type=range
             bind:this={inputEl}
             bind:value={$store}
             disabled={!enabled}
             {min}
             {max}
             {readonly}
             {step}
             on:focusin={onFocusin}
             on:keydown={onKeydown}
             on:pointerdown|capture={onPointerdown}
      />
   </div>
</TJSSlotLabel>

<style>
    .tjs-input-container {
        display: block;
        pointer-events: none;
        transform-style: preserve-3d;

        background: var(--tjs-input-range-background);
        border-radius: var(--tjs-input-range-border-radius, var(--tjs-input-border-radius));
        flex: var(--tjs-input-range-flex, var(--tjs-input-flex));
        margin: var(--tjs-input-range-margin, var(--tjs-input-margin));
        height: var(--tjs-input-range-height, var(--tjs-input-height));
        width: var(--tjs-input-range-width, var(--tjs-input-width));
    }

    input {
        pointer-events: initial;
        display: inline-block;
        position: relative;

        appearance: var(--tjs-input-range-appearance, var(--tjs-input-appearance, unset));

        background: transparent;

        border: var(--tjs-input-range-border, var(--tjs-input-border));
        border-radius: var(--tjs-input-range-border-radius, var(--tjs-input-border-radius));

        width: 100%;
        height: 100%;

        padding: var(--tjs-input-range-padding, var(--tjs-input-padding, initial));

        color: var(--tjs-input-range-color, var(--tjs-input-color, inherit));
        caret-color: var(--tjs-input-range-caret-color, var(--tjs-input-caret-color));
        font-family: var(--tjs-input-range-font-family, var(--tjs-input-font-family, inherit));
        font-size: var(--tjs-input-range-font-size, var(--tjs-input-font-size, inherit));
        line-height: var(--tjs-input-range-line-height, var(--tjs-input-line-height, inherit));
        outline-offset: var(--tjs-input-range-outline-offset, var(--tjs-input-outline-offset));
        text-align: var(--tjs-input-range-text-align, var(--tjs-input-range-align));

        cursor: var(--tjs-input-range-cursor, var(--tjs-input-cursor, var(--tjs-cursor-pointer, pointer)));

        transform: translateZ(1px);
    }

    input:disabled {
       border: var(--tjs-input-range-border-disabled, var(--tjs-input-border-disabled, none));
       color: var(--tjs-input-range-color-disabled, var(--tjs-input-color-disabled, revert));
       cursor: var(--tjs-input-range-cursor-disabled, var(--tjs-input-cursor-disabled, var(--tjs-cursor-default, default)));
       filter: var(--tjs-input-range-filter-disabled, var(--tjs-input-filter-disabled, grayscale(100%) contrast(20%) brightness(140%)));
       pointer-events: none;
    }

    input::-webkit-slider-runnable-track {
       box-shadow: var(--tjs-input-range-slider-track-box-shadow, revert);
    }

    input::-webkit-slider-thumb {
       box-shadow: var(--tjs-input-range-slider-thumb-box-shadow, revert);
    }

    input:focus {
       box-shadow: var(--tjs-input-range-box-shadow-focus, var(--tjs-input-box-shadow-focus, unset));
    }

    input:focus::-webkit-slider-runnable-track {
       box-shadow: var(--tjs-input-range-slider-track-box-shadow-focus, revert);
    }

    input:focus::-webkit-slider-thumb {
       box-shadow: var(--tjs-input-range-slider-thumb-box-shadow-focus, revert);
    }

    input:focus-visible {
        box-shadow: var(--tjs-input-range-box-shadow-focus-visible, var(--tjs-input-box-shadow-focus-visible, unset));
        outline: var(--tjs-input-range-outline-focus-visible, var(--tjs-input-outline-focus-visible));
        transition: var(--tjs-input-range-transition-focus-visible, var(--tjs-input-transition-focus-visible));
    }

    input::placeholder {
        color: var(--tjs-input-range-placeholder-color, var(--tjs-input-placeholder-color, inherit));
    }
</style>
