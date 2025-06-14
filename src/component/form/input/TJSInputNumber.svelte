<script>
   /**
    * A number input type.
    *
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
    * --tjs-input-text-align
    * --tjs-input-transition-focus-visible
    * --tjs-input-value-invalid-color
    * --tjs-input-width
    *
    * --tjs-input-number-appearance
    * --tjs-input-number-background
    * --tjs-input-number-border
    * --tjs-input-number-border-radius
    * --tjs-input-number-border-disabled
    * --tjs-input-number-box-shadow-focus
    * --tjs-input-number-box-shadow-focus-visible
    * --tjs-input-number-caret-color
    * --tjs-input-number-color
    * --tjs-input-number-color-disabled
    * --tjs-input-number-cursor
    * --tjs-input-number-cursor-disabled
    * --tjs-input-number-flex
    * --tjs-input-number-font-family
    * --tjs-input-number-font-size
    * --tjs-input-number-height
    * --tjs-input-number-line-height
    * --tjs-input-number-outline-focus-visible
    * --tjs-input-number-outline-offset
    * --tjs-input-number-overflow
    * --tjs-input-number-padding
    * --tjs-input-number-placeholder-color
    * --tjs-input-number-text-align
    * --tjs-input-number-transition-focus-visible
    * --tjs-input-number-value-invalid-color
    * --tjs-input-number-width
    *
    * Webkit unique variables:
    * --tjs-input-number-webkit-inner-spin-button-appearance
    * --tjs-input-number-webkit-inner-spin-button-opacity
    * --tjs-input-number-webkit-outer-spin-button-appearance
    * --tjs-input-number-webkit-outer-spin-button-opacity
    * ```
    * @componentDocumentation
    */

   import { writable }        from '#svelte/store';

   import { applyStyles }     from '#runtime/svelte/action/dom/style';

   import {
      isMinimalWritableStore,
      isReadableStore }       from '#runtime/svelte/store/util';

   import { localize }        from '#runtime/util/i18n';
   import { isObject }        from '#runtime/util/object';

   import {
      TJSSlotLabel,
      TJSSlotLabelUtil }      from '#standard/component/label';

   export let input = void 0;

   export let enabled = void 0;
   export let label = void 0;
   export let options = void 0;
   export let max = void 0;
   export let min = void 0;
   export let placeholder = void 0;
   export let readonly = void 0;
   export let step = void 0;
   export let store = void 0;
   export let storeIsValid = void 0;
   export let styles = void 0;

   export let efx = void 0;

   const localOptions = {
      blurOnEnterKey: true,
      blurOnEscKey: false,
      cancelOnEscKey: false,
      innerSpinButton: false
   }

   let inputEl;

   // ----------------------------------------------------------------------------------------------------------------

   $: enabled = isObject(input) && typeof input.enabled === 'boolean' ? input.enabled :
    typeof enabled === 'boolean' ? enabled : true;

   $: label = isObject(input) && TJSSlotLabelUtil.isValid(input.label) ? input.label :
    TJSSlotLabelUtil.isValid(label) ? label : void 0;

   $: {
      options = isObject(input) && isObject(input.options) ? input.options :
       isObject(options) ? options : {};

      if (typeof options?.blurOnEnterKey === 'boolean') { localOptions.blurOnEnterKey = options.blurOnEnterKey; }
      if (typeof options?.blurOnEscKey === 'boolean') { localOptions.blurOnEscKey = options.blurOnEscKey; }
      if (typeof options?.cancelOnEscKey === 'boolean') { localOptions.cancelOnEscKey = options.cancelOnEscKey; }

      if (typeof options?.innerSpinButton === 'boolean') {
         // Also consider `readonly` state disabling inner spin buttons if true.
         localOptions.innerSpinButton = options.innerSpinButton && !readonly;
      }
   }

   $: max = isObject(input) && typeof input.max === 'number' ? input.max :
    typeof max === 'number' ? max : void 0;

   $: min = isObject(input) && typeof input.min === 'number' ? input.min :
    typeof min === 'number' ? min : void 0;

   $: placeholder = isObject(input) && typeof input.placeholder === 'string' ? localize(input.placeholder) :
    typeof placeholder === 'string' ? localize(placeholder) : void 0;

   $: readonly = isObject(input) && typeof input.readonly === 'boolean' ? input.readonly :
    typeof readonly === 'boolean' ? readonly : false;

   $: step = isObject(input) && typeof input.step === 'number' ? input.step :
    typeof step === 'number' ? step : void 0;

   $: store = isObject(input) && isMinimalWritableStore(input.store) ? input.store :
    isMinimalWritableStore(store) ? store : writable(void 0);

   $: storeIsValid = isObject(input) && isReadableStore(input.storeIsValid) ? input.storeIsValid :
    isReadableStore(storeIsValid) ? storeIsValid : writable(true);

   $: styles = isObject(input) && isObject(input.styles) ? input.styles :
    isObject(styles) ? styles : void 0;

   $: efx = isObject(input) && typeof input.efx === 'function' ? input.efx :
    typeof efx === 'function' ? efx : () => {};

   // ----------------------------------------------------------------------------------------------------------------

   /** @type {number|null} */
   let initialValue;

   /**
    * Save initial value on focus. Convert to number or null the same way that Svelte does for binding `value`.
    */
   function onFocusIn()
   {
      if (localOptions.cancelOnEscKey)
      {
         initialValue = inputEl.value === '' ? null : globalThis.parseFloat(inputEl.value);
      }
   }

   /**
    * Blur input on enter key down.
    *
    * @param {KeyboardEvent} event -
    */
   function onKeyDown(event)
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
         if (localOptions.cancelOnEscKey && (initialValue === null || typeof initialValue === 'number'))
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
</script>

<TJSSlotLabel {label} {enabled}>
   <div class=tjs-input-container use:efx use:applyStyles={styles} on:pointerdown>
       <input class=tjs-input
              type=number
              bind:this={inputEl}
              bind:value={$store}
              class:inner-spin-button={localOptions.innerSpinButton}
              class:is-value-invalid={!$storeIsValid}
              max={max}
              min={min}
              step={step}
              disabled={!enabled}
              {placeholder}
              {readonly}
              on:focusin={onFocusIn}
              on:keydown={onKeyDown}
       />
   </div>
</TJSSlotLabel>

<style>
    .tjs-input-container {
        display: block;
        pointer-events: none;
        transform-style: preserve-3d;

        background: var(--tjs-input-number-background, var(--tjs-input-background));
        border-radius: var(--tjs-input-number-border-radius, var(--tjs-input-border-radius));
        flex: var(--tjs-input-number-flex, var(--tjs-input-flex));
        margin: var(--tjs-input-number-margin, var(--tjs-input-margin));
        height: var(--tjs-input-number-height, var(--tjs-input-height));
        width: var(--tjs-input-number-width, var(--tjs-input-width));
    }

    .is-value-invalid {
        color: var(--tjs-input-number-value-invalid-color, var(--tjs-input-value-invalid-color, red));
    }

    input {
        pointer-events: initial;
        display: inline-block;
        position: relative;

        /* For Firefox `textfield` is the default to remove inner spin buttons. Set to `auto` to show them. */
        appearance: var(--tjs-input-number-appearance, var(--tjs-input-appearance, textfield));

        background: transparent;

        border: var(--tjs-input-number-border, var(--tjs-input-border));
        border-radius: var(--tjs-input-number-border-radius, var(--tjs-input-border-radius));

        width: 100%;
        height: 100%;

        padding: var(--tjs-input-number-padding, var(--tjs-input-padding, initial));

        color: var(--tjs-input-number-color, var(--tjs-input-color, inherit));
        caret-color: var(--tjs-input-number-caret-color, var(--tjs-input-caret-color));
        font-family: var(--tjs-input-number-font-family, var(--tjs-input-font-family, inherit));
        font-size: var(--tjs-input-number-font-size, var(--tjs-input-font-size, inherit));
        line-height: var(--tjs-input-number-line-height, var(--tjs-input-line-height, inherit));
        outline-offset: var(--tjs-input-number-outline-offset, var(--tjs-input-outline-offset));
        text-align: var(--tjs-input-number-text-align, var(--tjs-input-text-align));

        cursor: var(--tjs-input-number-cursor, var(--tjs-input-cursor, var(--tjs-cursor-text, text)));

        transform: translateZ(1px);
    }

    input:disabled {
       border: var(--tjs-input-number-border-disabled, var(--tjs-input-border-disabled, none));
       color: var(--tjs-input-number-color-disabled, var(--tjs-input-color-disabled, revert));
       cursor: var(--tjs-input-number-cursor-disabled, var(--tjs-input-cursor-disabled, var(--tjs-cursor-default, default)));
       pointer-events: none;
    }

    input:focus {
        box-shadow: var(--tjs-input-number-box-shadow-focus, var(--tjs-input-box-shadow-focus, unset));
    }

    input:focus-visible {
        box-shadow: var(--tjs-input-number-box-shadow-focus-visible, var(--tjs-input-box-shadow-focus-visible, unset));
        outline: var(--tjs-input-number-outline-focus-visible, var(--tjs-input-outline-focus-visible));
        transition: var(--tjs-input-number-transition-focus-visible, var(--tjs-input-transition-focus-visible));
    }

    input::placeholder {
        color: var(--tjs-input-number-placeholder-color, var(--tjs-input-placeholder-color, inherit));
    }

    /* For Webkit */
    input::-webkit-inner-spin-button {
        appearance: var(--tjs-input-number-webkit-inner-spin-button-appearance, inherit);
        opacity: var(--tjs-input-number-webkit-inner-spin-button-opacity, inherit);
    }

    input::-webkit-outer-spin-button {
        appearance: var(--tjs-input-number-webkit-outer-spin-button-appearance, inherit);
        opacity: var(--tjs-input-number-webkit-outer-spin-button-opacity, inherit);
    }

    /* `localOptions` support classes ------------------------------------------------------------------------------- */

    /* `localOptions.innerSpinButton` true */
    input.inner-spin-button {
       --tjs-input-number-appearance: auto;
       --tjs-input-number-webkit-inner-spin-button-appearance: auto;
    }
</style>
