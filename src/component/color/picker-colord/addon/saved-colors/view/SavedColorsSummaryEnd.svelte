<script>
   import { getContext }    from '#svelte';

   import { ripple }        from '#standard/action/animate/composable';
   import { TJSIconButton } from '#standard/component/button';

   const internalState = getContext('#tjs-color-picker-state');

   const { enabled } = internalState.stores;

   const savedColorsState = internalState.addOnState.get('saved-colors').savedColorsState;

   let sectionEl;

   const buttonAdd = {
      icon: 'fas fa-plus',
      efx: ripple({ keyCode: 'Space' }),
      keyCode: 'Space'
   };

   const buttonDeleteAll = {
      icon: 'fas fa-trash',
      efx: ripple({ keyCode: 'Space' }),
      keyCode: 'Space'
   };

   function onAdd()
   {
      internalState.addOnState.get('saved-colors').savedColorsState.addColor();

      // Open details content.
      sectionEl.dispatchEvent(new CustomEvent('open', { bubbles: true }))
   }

   function onDeleteAll()
   {
      savedColorsState.deleteAll();
   }

   // Close details content when saved color state is empty.
   $: if (sectionEl && $savedColorsState.length === 0)
   {
      sectionEl.dispatchEvent(new CustomEvent('close', { bubbles: true }))
   }
</script>

<section bind:this={sectionEl}>
    <TJSIconButton button={buttonAdd}
                   on:press={onAdd}
                   enabled={$enabled} />

    <TJSIconButton button={buttonDeleteAll}
                   on:press={onDeleteAll}
                   enabled={$enabled} />
</section>

<style>
    section {
        display: flex;
        gap: 0.1em;
        margin-left: auto;
        padding: 0 2px;
    }

    @container tjs-color-picker-container (min-width: 0) {
        section {
            padding: min(2px, 0.5cqw);
        }
    }
</style>
