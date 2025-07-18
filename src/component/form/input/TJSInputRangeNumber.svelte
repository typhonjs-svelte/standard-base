<script>
   /**
    * Provides a combined {@link TJSInputRange} / {@link TJSInputNumber} component with a single slotted label wrapper.
    * This is a convenience component enabling easy hook up of a range + number input from the same data source.
    *
    * There is no explicit layout defined. The `input` data is forwarded on to both range / number components with
    * the exception that `readonly` only applies to the number input.
    *
    * Note: The `efx` animation action applies to both the range / number inputs.
    *
    * @componentDocumentation
    */
   import { writable }                 from 'svelte/store';

   import { isMinimalWritableStore }   from '#runtime/svelte/store/util';
   import { isObject }                 from '#runtime/util/object';

   import {
      TJSSlotLabel,
      TJSSlotLabelUtil }               from '#standard/component/label';

   import TJSInputNumber               from './TJSInputNumber.svelte';
   import TJSInputRange                from './TJSInputRange.svelte';

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

   export let efxRange = void 0;
   export let efxNumber = void 0;

   // ----------------------------------------------------------------------------------------------------------------

   $: enabled = isObject(input) && typeof input.enabled === 'boolean' ? input.enabled :
    typeof enabled === 'boolean' ? enabled : true;

   $: label = isObject(input) && TJSSlotLabelUtil.isValid(input.label) ? input.label :
    TJSSlotLabelUtil.isValid(label) ? label : void 0;

   $: max = isObject(input) && typeof input.max === 'number' ? input.max :
    typeof max === 'number' ? max : 100;

   $: min = isObject(input) && typeof input.min === 'number' ? input.min :
    typeof min === 'number' ? min : 0;

   $: options = isObject(input) && isObject(input.options) ? input.options : isObject(options) ? options : {};

   $: readonly = isObject(input) && typeof input.readonly === 'boolean' ? input.readonly :
    typeof readonly === 'boolean' ? readonly : false;

   $: step = isObject(input) && typeof input.step === 'number' ? input.step :
    typeof step === 'number' ? step : 1;

   $: store = isObject(input) && isMinimalWritableStore(input.store) ? input.store :
    isMinimalWritableStore(store) ? store : writable(void 0);

   $: styles = isObject(input) && isObject(input.styles) ? input.styles :
    isObject(styles) ? styles : void 0;

   $: efxNumber = isObject(input) && typeof input.efxNumber === 'function' ? input.efxNumber :
    typeof efxNumber === 'function' ? efxNumber : () => {};

   $: efxRange = isObject(input) && typeof input.efxRange === 'function' ? input.efxRange :
    typeof efxRange === 'function' ? efxRange : () => {};
</script>

<TJSSlotLabel {label} {enabled}>
   <TJSInputRange label={false} {enabled} efx={efxRange} {max} {min} {options} {step} {store} {styles} />
   <TJSInputNumber label={false} {enabled} efx={efxNumber} {max} {min} {options} {readonly} {step} {store} {styles} />
</TJSSlotLabel>
