<script>
   import { getContext }   from '#svelte';
   import { writable }     from '#svelte/store';

   import { isFocused }    from '#runtime/svelte/action/dom/focus';
   import { CrossRealm }   from '#runtime/util/realm';

   const internalState = getContext('#tjs-color-picker-state');

   const { enabled, firstFocusEl, isPopup } = internalState.stores;

   const focused = writable(false);

   /**
    * Handle forwarding on focus to any first focusable element set when in popup mode.
    */
   $: if ($isPopup && $focused && CrossRealm.browser.isHTMLElement($firstFocusEl))
   {
      $firstFocusEl.focus();
   }
</script>

<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
<div class=tjs-color-picker-last-focus
     tabindex={$enabled ? 0 : null}
     use:isFocused={focused}>
</div>

<style>
    div:focus {
        outline: transparent;
    }
</style>
