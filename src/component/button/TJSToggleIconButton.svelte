<script>
   /**
    * ### CSS Variables
    *
    * ```
    * --tjs-default-text-shadow-focus-hover: system default
    * --tjs-default-outline-focus-visible: undefined; global replacement for focus-visible outline.
    *
    * --tjs-button-background
    * --tjs-button-background-focus
    * --tjs-button-background-focus-visible
    * --tjs-button-background-hover
    * --tjs-button-background-selected
    * --tjs-button-border
    * --tjs-button-border-radius
    * --tjs-button-border-width
    * --tjs-button-box-shadow-focus-visible
    * --tjs-button-clip-path
    * --tjs-button-clip-path-focus
    * --tjs-button-clip-path-hover
    * --tjs-button-cursor-disabled
    * --tjs-button-diameter
    * --tjs-button-outline-focus-visible
    * --tjs-button-text-shadow-focus: undefined
    * --tjs-button-text-shadow-hover: undefined
    * --tjs-button-transition
    * --tjs-button-transition-focus-visible
    *
    * --tjs-icon-button-background
    * --tjs-icon-button-background-focus
    * --tjs-icon-button-background-focus-visible
    * --tjs-icon-button-background-hover
    * --tjs-icon-button-background-selected
    * --tjs-icon-button-border
    * --tjs-icon-button-border-radius
    * --tjs-icon-button-border-width
    * --tjs-icon-button-box-shadow-focus-visible
    * --tjs-icon-button-clip-path
    * --tjs-icon-button-clip-path-focus
    * --tjs-icon-button-clip-path-hover
    * --tjs-icon-button-diameter
    * --tjs-icon-button-outline-focus-visible
    * --tjs-icon-button-text-shadow-focus: undefined
    * --tjs-icon-button-text-shadow-hover: undefined
    * --tjs-icon-button-transition
    * --tjs-icon-button-transition-focus-visible
    * ```
    * @componentDocumentation
    */
   import { createEventDispatcher }    from '#svelte';

   import { inlineSvg }                from '#runtime/svelte/action/dom/inline-svg';
   import { applyStyles }              from '#runtime/svelte/action/dom/style';
   import { isMinimalWritableStore }   from '#runtime/svelte/store/util';
   import { AssetValidator }           from '#runtime/util/browser';
   import { localize }                 from '#runtime/util/i18n';
   import { isObject }                 from '#runtime/util/object';

   export let button = void 0;

   export let enabled = void 0;
   export let icon = void 0;
   export let title = void 0;
   export let titleSelected = void 0;
   export let store = void 0;
   export let styles = void 0;
   export let efx = void 0;
   export let keyCode = void 0;
   export let onPress = void 0;
   export let onClose = void 0;
   export let onContextMenu = void 0;
   export let clickPropagate = void 0;

   const dispatch = createEventDispatcher();

   const s_EFX_DEFAULT = () => {};

   // ----------------------------------------------------------------------------------------------------------------

   $: enabled = isObject(button) && typeof button.enabled === 'boolean' ? button.enabled :
    typeof enabled === 'boolean' ? enabled : true;
   $: icon = isObject(button) && typeof button.icon === 'string' ? button.icon :
    typeof icon === 'string' ? icon : void 0;
   $: title = isObject(button) && typeof button.title === 'string' ? button.title :
    typeof title === 'string' ? title : '';
   $: titleSelected = isObject(button) && typeof button.titleSelected === 'string' ? button.titleSelected :
    typeof titleSelected === 'string' ? titleSelected : '';
   $: store = isObject(button) && isMinimalWritableStore(button.store) ? button.store : isMinimalWritableStore(store) ?
    store : void 0;
   $: styles = isObject(button) && isObject(button.styles) ? button.styles :
    isObject(styles) ? styles : void 0;
   $: efx = isObject(button) && typeof button.efx === 'function' ? button.efx :
    typeof efx === 'function' ? efx : s_EFX_DEFAULT;
   $: keyCode = isObject(button) && typeof button.keyCode === 'string' ? button.keyCode :
    typeof keyCode === 'string' ? keyCode : 'Enter';

   $: onPress = isObject(button) && typeof button.onPress === 'function' ? button.onPress :
    typeof onPress === 'function' ? onPress : void 0;
   $: onClose = isObject(button) && typeof button.onClose === 'function' ? button.onClose :
    typeof onClose === 'function' ? onClose : void 0;
   $: onContextMenu = isObject(button) && typeof button.onContextMenu === 'function' ? button.onContextMenu :
    typeof onContextMenu === 'function' ? onContextMenu : void 0;

   $: clickPropagate = isObject(button) && typeof button.clickPropagate === 'boolean' ? button.clickPropagate :
    typeof clickPropagate === 'boolean' ? clickPropagate : false;

   let anchorEl;
   let selected = false;

   $: if (store) { selected = $store; }

   $: if (store && !enabled) { $store = false; }

   // Chose the current title when `selected` changes; if there is no `titleSelected` fallback to `title`.
   $: titleCurrent = selected && titleSelected !== '' ? titleSelected : title

   // ----------------------------------------------------------------------------------------------------------------

   let iconType;

   $:
   {
      const result = AssetValidator.parseMedia({ url: icon, mediaTypes: AssetValidator.MediaTypes.img_svg });
      iconType = result.valid ? result.elementType : 'font';
   }

   // ----------------------------------------------------------------------------------------------------------------

   /**
    * Handle click event.
    *
    * @param {MouseEvent}    event -
    */
   function onClick(event)
   {
      if (!enabled) { return; }

      selected = !selected;
      if (store) { store.set(selected); }

      if (typeof onPress === 'function') { onPress({ event, selected }); }

      dispatch('press', { event, selected });

      if (!clickPropagate)
      {
         event.preventDefault();
         event.stopPropagation();
      }
   }

   /**
    * @param {MouseEvent}   event -
    */
   function onContextMenuPress(event)
   {
      if (!enabled) { return; }

      if (typeof onContextMenu === 'function') { onContextMenu({ event }); }

      if (!clickPropagate)
      {
         event.preventDefault();
         event.stopPropagation();
      }
   }

   /**
    * In this case we can't set pointer-events: none for the div due to the slotted component, so process clicks on the
    * div in respect to clickPropagate.
    *
    * @param {MouseEvent} event -
    */
   function onClickDiv(event)
   {
      if (!enabled) { return; }

      if (!clickPropagate)
      {
         event.preventDefault();
         event.stopPropagation();
      }
   }

   /**
    * Handles `close:popup` event from any children components like TJSMenu.
    */
   function onClosePopup(event)
   {
      selected = false;
      if (store) { store.set(false); }

      if (typeof onClose === 'function') { onClose({ event, selected }); }

      // The close event was triggered from a key press, so focus the anchor element / button.
      if (typeof event?.detail?.keyboardFocus === 'boolean' && event.detail.keyboardFocus && anchorEl?.isConnected)
      {
         anchorEl.focus();

         event.stopPropagation();
         event.preventDefault();
      }
   }

   /**
    * Consume / stop propagation of key down when key codes match.
    *
    * @param {KeyboardEvent}    event -
    */
   function onKeydown(event)
   {
      if (!enabled) { return; }

      if (event.code === keyCode)
      {
         event.preventDefault();
         event.stopPropagation();
      }
   }

   /**
    * Handle press event if key codes match.
    *
    * @param {KeyboardEvent}    event -
    */
   function onKeyup(event)
   {
      if (!enabled) { return; }

      if (event.code === keyCode)
      {
         selected = !selected;
         if (store) { store.set(selected); }

         if (typeof onPress === 'function') { onPress({ event, selected }); }

         dispatch('press', { event, selected });

         event.preventDefault();
         event.stopPropagation();
      }
   }
</script>

<!-- svelte-ignore a11y-click-events-have-key-events a11y-interactive-supports-focus -->
<div class=tjs-toggle-icon-button
     class:disabled={!enabled}
     on:click={onClickDiv}
     on:close:popup={onClosePopup}
     use:applyStyles={styles}
     role=button>
   <!-- svelte-ignore a11y-missing-attribute -->
   <button bind:this={anchorEl}
      class:selected
      on:click={onClick}
      on:contextmenu={onContextMenuPress}
      on:keydown={onKeydown}
      on:keyup={onKeyup}
      on:click
      on:contextmenu
      tabindex={enabled ? 0 : null}
      title={localize(titleCurrent)}
      use:efx={{ enabled }}>
      {#if icon}
         {#if iconType === 'font'}
            <i class={`icon ${icon}`} class:selected></i>
         {:else if iconType === 'img'}
            <img src={icon} alt="" class=icon class:selected>
         {:else if iconType === 'svg'}
            <svg use:inlineSvg={{ src: icon }} class=icon class:selected></svg>
         {/if}
      {/if}
   </button>
   {#if selected}
      <slot/>
   {/if}
</div>

<style>
   div {
      display: block;
      position: relative;
      flex: 0 0 var(--tjs-icon-button-diameter, var(--tjs-button-diameter, 2em));
      height: var(--tjs-icon-button-diameter, var(--tjs-button-diameter, 2em));
      width: var(--tjs-icon-button-diameter, var(--tjs-button-diameter, 2em));
      align-self: center;
      text-align: center;
      user-select: none;
      -webkit-tap-highlight-color: var(--tjs-default-webkit-tap-highlight-color, transparent);
   }

   div.disabled button {
      color: #4b4a44; /* TODO replace with cssVariables default */
      cursor: var(--tjs-button-cursor-disabled, var(--tjs-cursor-default, default));
   }

   div.disabled button:hover {
      background: none;
      clip-path: none;
      text-shadow: none;
   }

   button {
      display: inline-block;
      pointer-events: initial;
      position: relative;

      width: 100%;
      height: 100%;

      appearance: var(--tjs-icon-button-appearance, none);
      background: var(--tjs-icon-button-background, var(--tjs-button-background));
      border: var(--tjs-icon-button-border, var(--tjs-button-border));
      border-radius: var(--tjs-icon-button-border-radius, var(--tjs-button-border-radius, 50%));
      border-width: var(--tjs-icon-button-border-width, var(--tjs-button-border-width));
      clip-path: var(--tjs-icon-button-clip-path, var(--tjs-button-clip-path, none));
      color: var(--tjs-icon-button-color, currentColor);
      cursor: var(--tjs-cursor-pointer, pointer);
      margin: var(--tjs-icon-button-margin);
      padding: var(--tjs-icon-button-padding, 20%);
      transform-style: preserve-3d;
      transition: var(--tjs-icon-button-transition, var(--tjs-button-transition, background 0.2s ease-in-out, clip-path 0.2s ease-in-out));
      text-decoration: none;
      user-select: none;
   }

   button:focus {
      background: var(--tjs-icon-button-background-focus, none);
      box-shadow: var(--tjs-icon-button-box-shadow-focus, none);
      outline: var(--tjs-icon-button-outline-focus, none);
      text-shadow: var(--tjs-icon-button-text-shadow-focus, var(--tjs-button-text-shadow-focus, var(--tjs-default-text-shadow-focus-hover)));
      clip-path: var(--tjs-icon-button-clip-path-focus, var(--tjs-icon-button-clip-path, var(--tjs-button-clip-path-focus, var(--tjs-button-clip-path, none))));
   }

   button:focus-visible {
      background: var(--tjs-icon-button-background-focus-visible, var(--tjs-button-background-focus-visible));
      box-shadow: var(--tjs-icon-button-box-shadow-focus-visible, var(--tjs-button-box-shadow-focus-visible, var(--tjs-default-box-shadow-focus-visible)));
      outline: var(--tjs-icon-button-outline-focus-visible, var(--tjs-button-outline-focus-visible, var(--tjs-default-outline-focus-visible, revert)));
      transition: var(--tjs-icon-button-transition-focus-visible, var(--tjs-button-transition-focus-visible, var(--tjs-default-transition-focus-visible)));
   }

   button:hover {
      background: var(--tjs-icon-button-background-hover, var(--tjs-button-background-hover));
      clip-path: var(--tjs-icon-button-clip-path-hover, var(--tjs-icon-button-clip-path, var(--tjs-button-clip-path-hover, var(--tjs-button-clip-path, none))));
      color: var(--tjs-icon-button-color-hover, currentColor);
      text-shadow: var(--tjs-icon-button-text-shadow-hover, var(--tjs-button-text-shadow-hover, var(--tjs-default-text-shadow-focus-hover)));
   }

   button.selected {
      background: var(--tjs-icon-button-background-selected, var(--tjs-button-background-selected));
      clip-path: var(--tjs-icon-button-clip-path-selected, var(--tjs-icon-button-clip-path, var(--tjs-button-clip-path-selected, none)));
   }

   .icon {
      display: inline-flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 100%;
      border-radius: var(--tjs-icon-button-border-radius, var(--tjs-button-border-radius, 50%));
      transform: translateZ(1px);
   }
</style>
