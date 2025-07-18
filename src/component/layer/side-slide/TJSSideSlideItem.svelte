<script>
   import {
      getContext,
      tick }                     from '#svelte';

   import { TJSSvelte }          from '#runtime/svelte/util';
   import { localize }           from '#runtime/util/i18n';
   import { A11yHelper }         from '#runtime/util/a11y';
   import { CrossWindow }        from '#runtime/util/browser';
   import { isObject }           from '#runtime/util/object';

   import TJSSideSlideItemHost   from './TJSSideSlideItemHost.svelte';

   /** @type {boolean} */
   export let allowLocking = void 0;

   /** @type {boolean} */
   export let clickToOpen = void 0;

   /** @type {number} */
   export let duration = void 0;

   /** @type {(time: number) => number} */
   export let easingIn = void 0;

   /** @type {(time: number) => number} */
   export let easingOut = void 0;

   /**
    * The side slide item icon (Font awesome string) and a Svelte configuration object.
    *
    * @type {({
    *    icon: string | import('#runtime/svelte/util').TJSSvelte.Config.Embed,
    *    svelte: import('#runtime/svelte/util').TJSSvelte.Config.Embed,
    *    title?: string
    * })}
    */
   export let item = void 0;

   /** @type {'left' | 'right'} */
   export let side = void 0;

   // Provides a store for all items to share that is updated when an item is locked. When `clickToOpen` is false an
   // item can be locked w/ contextmenu click or key activation.
   const storeLocked = getContext('#side-slide-layer-item-locked');

   // Provides a store for all items to share and use to increment the item container z-index when pointer enters the
   // item icon. This allows each item that is being shown to always be on top regardless of item order.
   const storeOpenedItem = getContext('#side-slide-layer-item-opened');

   // Provides a store for all items to share and use to increment the item container z-index when pointer enters the
   // item icon. This allows each item that is being shown to always be on top regardless of item order.
   const storeZIndex = getContext('#side-slide-layer-item-z-index');

   // Tracks the locked state of any / other items.
   let isAnyLocked, isOtherLocked;

   // When not `clickToOpen` and `storeLocked` is undefined then no items are locked.
   $: isAnyLocked = !clickToOpen && $storeLocked !== void 0;

   // When not `clickToOpen` and `storeLocked` is not this item then another item is locked.
   $: isOtherLocked = !clickToOpen && $storeLocked !== void 0 && $storeLocked !== item;

   // Handles state change of `allowLocking`; when not allowed remove locked state.
   $: if (!allowLocking)
   {
      setOpened(false);
      locked = false;
      $storeLocked = void 0;
   }

   // Handles state change to `clickToOpen`.
   $: if (!clickToOpen)
   {
      // Flip the opened state to false whenever clickToOpen is false / changes state.
      setOpened(false);
   }
   else
   {
      // Ensure that locked state is removed when `clickToOpen` is true.
      locked = false;
      $storeLocked = void 0;
   }

   // If this item doesn't match the opened item store state then close this item.
   $: if ($storeOpenedItem !== item) { setOpened(false); }

   /**
    * Tracks current opened state over icon & panel.
    *
    * @type {boolean}
    */
   let opened = false;

   /**
    * Tracks current locked state that always keeps the item panel open.
    *
    * @type {boolean}
    */
   let locked = false;

   /** @type {HTMLButtonElement} */
   let buttonEl;

   /** @type {HTMLDivElement} */
   let containerEl, hostEl;

   /**
    * When opened by keyboard attempt to focus first child element in `hostEl`.
    */
   async function focusFirstChild()
   {
      await tick();

      // Focus first element in `hostEl` when opened by keyboard action.
      if (hostEl)
      {
         const firstFocusEl = A11yHelper.getFirstFocusableElement(hostEl);
         if (firstFocusEl)
         {
            firstFocusEl.focus();
         }
         else
         {
            containerEl.focus();
         }
      }
   }

   /**
    * Handles locking / unlocking items.
    *
    * @param {PointerEvent}  event - PointerEvent.
    */
   function onContextmenuButton(event)
   {
      event.preventDefault();
      event.stopPropagation();

      if (!allowLocking) { return; }

      if (!isOtherLocked && !clickToOpen)
      {
         if (locked)
         {
            $storeLocked = void 0;
            locked = false;
         }
         else
         {
            $storeLocked = item;
            locked = true;
            setOpened(true);

            // Focus first child element when coming from keyboard event.
            if (opened && event?.button !== 2) { focusFirstChild(); }
         }
      }
   }

   /**
    * Provides focus cycling inside the host element acting on `<Shift-Tab>` and if `firstFocusEl` is the actively
    * focused element then last focusable element is focused.
    *
    * @param {KeyboardEvent} event - Keyboard Event.
    */
   function onKeydownContainer(event)
   {
      switch (event.code)
      {
         case 'Escape':
            if (opened)
            {
               event.preventDefault();
               event.stopPropagation();
            }
            break;

         case 'Tab':
            if (hostEl)
            {
               // Collect all focusable elements from `hostEl`.
               const allFocusable = A11yHelper.getFocusableElements(hostEl);

               // Find first and last focusable elements.
               const firstFocusEl = allFocusable.length > 0 ? allFocusable[0] : void 0;
               const lastFocusEl = allFocusable.length > 0 ? allFocusable[allFocusable.length - 1] : void 0;

               // This component may be embedded in an alternate window.
               const activeElement = CrossWindow.getActiveElement(event);

               if (event.shiftKey)
               {
                  if (containerEl === activeElement && lastFocusEl)
                  {
                     lastFocusEl.focus();
                     event.preventDefault();
                     event.stopPropagation();
                  }
                  if (firstFocusEl === activeElement)
                  {
                     if (lastFocusEl && firstFocusEl !== lastFocusEl) { lastFocusEl.focus(); }

                     event.preventDefault();
                     event.stopPropagation();
                  }
               }
               else
               {
                  if (lastFocusEl === activeElement)
                  {
                     if (firstFocusEl && firstFocusEl !== lastFocusEl) { firstFocusEl.focus(); }

                     event.preventDefault();
                     event.stopPropagation();
                  }
               }
            }
            break;
      }
   }

   /**
    * Handles escaping from the host panel focus trapping via keyboard navigation / Escape key.
    *
    * @param {KeyboardEvent} event - Keyboard Event.
    */
   function onKeyupContainer(event)
   {
      if (event.code === 'Escape')
      {
         // When opened and focus is inside the host panel the first `<Escape>` key press will focus the button
         // element. This allows keyboard navigation to exit the focus trapping of the host panel.
         if (opened && A11yHelper.isFocusWithin(containerEl))
         {
            buttonEl.focus();

            event.preventDefault();
            event.stopPropagation();
         }
      }
   }

   /**
    * Handles flipping state on key press / up.
    *
    * @param {KeyboardEvent}  event - KeyboardEvent.
    */
   function onKeyupButton(event)
   {
      switch (event.code)
      {
         case 'Escape':
            if (!locked) { setOpened(false); }
            break;

         case 'Enter':
         {
            if (!isAnyLocked)
            {
               event.preventDefault();
               event.stopPropagation();

               setOpened(!opened);

               // Focus first child element.
               if (opened) { focusFirstChild(); }
            }

            break;
         }
      }
   }

   /**
    * Prevents disabled items when clicked / pointer down from becoming the active element.
    *
    * @param {PointerEvent}  event - PointerEvent.
    */
   function onPointerdownButton(event)
   {
      const isMouse = event.pointerType === 'mouse';

      if (isMouse && event.button !== 0) { return; }

      if (clickToOpen || (!isMouse && !isAnyLocked)) { setOpened(!opened); }
   }

   /**
    * Focuses the container element if there is no focus within a host element.
    *
    * @param {PointerEvent}  event - PointerEvent.
    */
   function onPointerdownContainer(event)
   {
      if (event.pointerType === 'mouse' && event.button !== 0) { return; }

      if (opened)
      {
         event.preventDefault();
         event.stopPropagation();

         // Only focus container when there isn't focus within an existing host panel.
         if (!A11yHelper.isFocusWithin(hostEl)) { containerEl.focus(); }
      }
   }

   /**
    * Triggered when the pointer enters the item button for mouse and when not `clickToOpen` or any item is locked.
    *
    * @param {PointerEvent} event - PointerEvent.
    */
   function onPointerenterButton(event)
   {
      // Ignore if not mouse or `clickToOpen` is true ignoring pointer entered.
      if (event.pointerType !== 'mouse' || clickToOpen || isAnyLocked) { return; }

      setOpened(true);
   }

   /**
    * After a small delay when the pointer leaves the item container only set opened to false if the container does not
    * have the `:hover` style property. This will keep the host panel open when the pointer / mouse travels from the
    * item icon to the panel itself.
    *
    * @param {PointerEvent} event - PointerEvent.
    */
   function onPointerleaveContainer(event)
   {
      // Ignore if not mouse or `clickToOpen` is true ignoring pointer leave.
      if (event.pointerType !== 'mouse' || clickToOpen || isAnyLocked) { return; }

      setTimeout(() =>
      {
         if (containerEl && !containerEl.matches(':hover')) { setOpened(false); }
      }, 80);
   }

   /**
    * Adjusts panel host open state.
    *
    * @param {boolean} state - New opened state.
    */
   function setOpened(state)
   {
      if (opened === state) { return; }

      if (state)
      {
         // Increment the z-index of the container to make it always on top.
         containerEl.style.zIndex = `${$storeZIndex++}`;

         // Give container silent focus such that keyboard navigation starts at the container.
         containerEl.focus();

         // Set the active opened item to this item allowing other independent items to close.
         $storeOpenedItem = item

         opened = true;
      }
      else
      {
         opened = false;
      }
   }
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div bind:this={containerEl}
     class=tjs-side-slide-layer-item-container
     class:left={side === 'left'}
     class:right={side === 'right'}
     class:opened={opened}
     on:keydown={onKeydownContainer}
     on:keyup={onKeyupContainer}
     on:pointerdown={onPointerdownContainer}
     on:pointerleave={onPointerleaveContainer}
     tabindex=-1>

   {#if opened && TJSSvelte.config.isConfigEmbed(item.svelte)}
      <TJSSideSlideItemHost bind:hostEl {duration} {item} {easingIn} {easingOut} {side} />
   {/if}

   <!-- The button capture div prevents pointer events from propagating when the button is disabled -->
   <div class=button-capture on:pointerdown={(event) => { if (isOtherLocked) { event.stopPropagation(); event.preventDefault(); } }}>
      <button bind:this={buttonEl}
              class=tjs-side-slide-layer-item
              class:locked={locked}
              title={localize(item.title)}
              on:keyup={onKeyupButton}
              on:contextmenu={onContextmenuButton}
              on:pointerdown={onPointerdownButton}
              on:pointerenter={onPointerenterButton}
              disabled={isOtherLocked}>
         {#if TJSSvelte.config.isConfigEmbed(item.icon)}
            <svelte:component this={item.icon.class} {...(isObject(item.icon.props) ? item.icon.props : {})} />
         {:else}
            <i class={item.icon}></i>
         {/if}
      </button>
   </div>
</div>

<style>
   .button-capture {
      pointer-events: all;
      user-select: none;
      -webkit-tap-highlight-color: var(--tjs-default-webkit-tap-highlight-color, transparent);
   }

   .tjs-side-slide-layer-item-container:focus-visible {
      outline: none;
   }

   .tjs-side-slide-layer-item-container.opened .tjs-side-slide-layer-item {
      border-color: var(--tjs-side-slide-layer-item-border-color-hover, red);
      color: var(--tjs-side-slide-layer-item-color-hover, rgba(255, 255, 255, 0.9));
   }

   .tjs-side-slide-layer-item-container.left, .tjs-side-slide-layer-item-container.left .tjs-side-slide-layer-item {
      border-radius: var(--tjs-side-slide-layer-item-border-radius-left, 20% 20% 50% 30%);
   }

   .tjs-side-slide-layer-item-container.right, .tjs-side-slide-layer-item-container.right .tjs-side-slide-layer-item {
      border-radius: var(--tjs-side-slide-layer-item-border-radius-right, 20% 30% 20% 50%);
   }

   .tjs-side-slide-layer-item {
      appearance: none;
      margin: 0;
      padding: 0;

      display: flex;
      align-items: center;
      justify-content: center;
      pointer-events: all;
      transition: var(--tjs-side-slide-layer-item-transition, all 200ms ease-in-out);

      background: var(--tjs-side-slide-layer-item-background, rgba(0, 0, 0, 0.3));
      border: var(--tjs-side-slide-layer-item-border, solid 2px black);
      box-shadow: var(--tjs-side-slide-layer-item-box-shadow, rgba(0, 0, 0, 0.35) 0px 5px 15px);
      color: var(--tjs-side-slide-layer-item-color, rgba(255, 255, 255, 0.7));
      cursor: var(--tjs-side-slide-layer-item-cursor, var(--tjs-cursor-pointer, pointer));
      font-size: var(--tjs-side-slide-layer-item-font-size, calc(var(--tjs-side-slide-layer-item-diameter, 30px) / 2.25));
      line-height: var(--tjs-side-slide-layer-item-diameter, 100%);
      overflow: var(--tjs-side-slide-layer-item-overflow, hidden);

      width: var(--tjs-side-slide-layer-item-diameter, 30px);
      height: var(--tjs-side-slide-layer-item-diameter, 30px);
   }

   .tjs-side-slide-layer-item.locked {
      border-style: dashed;
   }

   .tjs-side-slide-layer-item:disabled {
      pointer-events: none;
      cursor: default;
   }

   .tjs-side-slide-layer-item:focus-visible {
      outline: var(--tjs-side-slide-layer-item-outline-focus-visible, var(--tjs-default-outline-focus-visible, revert));
      transition: var(--tjs-side-slide-layer-item-transition-focus-visible, var(--tjs-default-transition-focus-visible));
   }

   i {
      margin: 0;
      padding: 0;
   }
</style>
