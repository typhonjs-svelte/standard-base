<script>
   import { getContext }      from '#svelte';

   import {
      ClipboardAccess,
      CrossWindow }           from '#runtime/util/browser';

   import { ripple }          from '#standard/action/animate/composable';

   import {
      TJSIconButton,
      TJSToggleIconButton }   from '#standard/component/button';

   import TJSColordButton     from '../TJSColordButton.svelte';

   const internalState = getContext('#tjs-color-picker-state');

   const buttonState = internalState.buttonState;

   const {
      enabled,
      hasAddons,
      hasEyeDropper} = internalState.stores;

   const { currentColorString } = internalState.colorState.stores;

   /**
    * Defines the button data for TJSIconButton launching the EyeDropper API and assigning any result to `colorState`.
    */
   const eyeDropperButton = {
      icon: 'fas fa-eye-dropper',
      keyCode: 'Space',
      onPress: async () =>
      {
         try
         {
            // Use the `sectionEl` owner document / window as this component could be in a separate window.
            const EyeDropperCtor = CrossWindow.getWindow(sectionEl).EyeDropper;

            /** @type {EyeDropper} */
            const eyeDropper = new EyeDropperCtor();
            const colorSelectionResult = await eyeDropper.open();

            if (typeof colorSelectionResult?.sRGBHex === 'string')
            {
               internalState.colorState.setColor(colorSelectionResult.sRGBHex);
            }
         }
         catch (err) { /**/ }
      }
   };

   /** @type {HTMLElement} */
   let sectionEl;

   /**
    * Copy current color string to clipboard.
    *
    * @privateRemarks
    * TODO Eventbus: If / when an app eventbus is added trigger UI notification message
    */
   function onPress()
   {
      ClipboardAccess.writeText($currentColorString, CrossWindow.getWindow(sectionEl));
   }
</script>

<section bind:this={sectionEl}>
    <TJSColordButton on:press={onPress}
                     color={$currentColorString}
                     enabled={$enabled}
                     efx={ripple({ keyCode: 'Space' })}
                     keyCode={'Space'}
    />

    {#if $hasEyeDropper}
        <TJSIconButton button={eyeDropperButton}
                       enabled={$enabled}
                       efx={ripple({ keyCode: 'Space' })} />
    {/if}

    {#if $hasAddons}
        {#each $buttonState as button}
            {#if button.isToggle}
                <TJSToggleIconButton {button}
                                     enabled={$enabled}
                                     efx={ripple({ keyCode: 'Space' })}
                                     keyCode={'Space'} />
            {:else}
                <TJSIconButton {button}
                               enabled={$enabled}
                               efx={ripple({ keyCode: 'Space' })}
                               keyCode={'Space'} />
            {/if}
        {/each}
    {/if}
</section>

<style>
    section {
        display: flex;
        flex: 1;

        background: var(--tjs-color-picker-overlay-background, rgba(0, 0, 0, 0.1));
        border: var(--tjs-input-number-border, var(--tjs-input-border));
        border-radius: 0.25em;

        --tjs-icon-button-border: var(--tjs-input-border);
        --tjs-icon-button-border-width: 2px;
    }

    @container tjs-color-picker-container (min-width: 0) {
        section {
            padding: min(4px, 1.5cqw);
            gap: min(8px, 2cqw);
        }
    }

    @container tjs-color-picker-container (min-width: 235px) {
        section {
            font-size: calc(0.175em + 5cqi);
        }
    }
</style>
