<script>
   /**
    * TJSContextMenuImpl provides a context menu implementation component that is not meant to be directly used as it is
    * controlled as a single browser wide context menu from {@link TJSContextMenu} that is imported via:
    * `import { TJSContextMenu } from '#standard/application';` The front end for TJSContextMenuImpl processes data and
    * invokes / manages a single context menu.
    *
    * TJSContextMenuImpl supports a flexible data driven way to construct the menu items with the same format as
    * {@link TJSMenu}. Depending on the item data that is passed into the menu you can define 4 types of items:
    * 'icon / label', 'image / label', 'class / Svelte component', and 'separator / hr'. The main difference is that
    * TJSContextMenu does not support default or named slots.
    *
    * ### Exported props
    * - `menu` ({@link TJSMenuData.Menu}): An object defining all properties of a menu.
    *
    * Or in lieu of passing the folder object you can assign these props directly:
    *
    * - `items`: An iterable list of {@link TJSMenuData.Items}; defines data driven menu items.
    *
    * - `styles`: Styles to be applied inline via `applyStyles` action.
    *
    * - `efx`: Currently unused; for any future action effects.
    *
    * - `keyCode`: The key code to activate menu items.
    *
    * - `focusSource`: A `A11yFocusSource` object containing the target element to return focus to on close.
    *
    * - `transitionOptions`: Custom transition options for duration and easing function.
    *
    * ### Events
    *
    * There is a single that is fired and _not_ bubbled up through parent elements:
    * - `close`- Fired when the menu closes allowing {@link TJSContextMenu} to clean up resources.
    *
    * ### CSS Variables
    *
    * Styling: To style this component use `.tjs-context-menu` as the base selector.
    *
    * There are several local CSS variables that you can use to change the appearance dynamically. Either use
    * CSS props or pass in a `styles` object w/ key / value props to set to the details. The default fallback variables
    * target both TJSMenu and TJSContextMenu. The few `popover` defaults target components that independently pop over
    * other elements browser wide.
    *
    * ```
    * The following CSS variables are supported, but not defined by default
    * --tjs-context-menu-background - fallback: --tjs-default-menu-background; fallback: --tjs-default-popup-background; default: #23221d
    * --tjs-context-menu-border - fallback: --tjs-default-popup-border; default: 1px solid #000
    * --tjs-context-menu-border-radius - fallback: --tjs-default-popup-border-radius; default: 5px
    * --tjs-context-menu-box-shadow - fallback: --tjs-default-popup-box-shadow; default: 0 0 2px #000
    * --tjs-context-menu-primary-color - fallback: --tjs-default-menu-primary-color; fallback: --tjs-default-popup-primary-color; default: #b5b3a4
    * --tjs-context-menu-max-width - fallback: --tjs-default-menu-max-width; default: 360px
    * --tjs-context-menu-min-width - fallback: --tjs-default-menu-min-width; default: 20px
    *
    * The following CSS variables define attributes for the data driven menu items.
    *
    * All menu items:
    * --tjs-context-menu-item-line-height - fallback: --tjs-default-menu-item-line-height; default: 2em
    * --tjs-context-menu-item-padding - fallback: --tjs-default-menu-item-padding; default: 0 0.5em 0 0
    *
    * Icon / Image menu items (considered a button item):
    * --tjs-context-menu-item-button-gap - fallback: --tjs-default-menu-item-button-gap; default: 0.25em
    * --tjs-context-menu-item-highlight-color - fallback: --tjs-default-menu-highlight-color; fallback: --tjs-default-popup-highlight-color; default: #f0f0e0
    * --tjs-context-menu-item-text-shadow-focus-hover - fallback: --tjs-default-text-shadow-focus-hover; default: 0 0 8px red
    *
    * Specific targeting for the label of button items (allows control of wrapping / set `white-space` to `nowrap`):
    * --tjs-context-menu-item-label-overflow - fallback: --tjs-default-menu-item-label-overflow; default: hidden
    * --tjs-context-menu-item-label-text-overflow - fallback: --tjs-default-menu-item-label-text-overflow; default: ellipsis
    * --tjs-context-menu-item-label-white-space - fallback: --tjs-default-menu-item-label-white-space; default: undefined
    *
    * Icon menu item:
    * --tjs-context-menu-item-icon-height - fallback: --tjs-default-menu-item-icon-height; default: 1.25em
    * --tjs-context-menu-item-icon-width - fallback: --tjs-default-menu-item-icon-width; default: 1.25em
    *
    * Separator / HR:
    * --tjs-context-menu-hr-margin - fallback: --tjs-default-hr-margin; default: 0 0.25em
    * --tjs-context-menu-hr-border-top - fallback: --tjs-default-hr-border-top; default: 1px solid #555
    * --tjs-context-menu-hr-border-bottom - fallback: --tjs-default-hr-border-bottom; default: 1px solid #444
    * ```
    * @componentDocumentation
    * @internal
    */

   import {
      createEventDispatcher,
      onDestroy,
      onMount }               from '#svelte';

   import { inlineSvg }       from '#runtime/svelte/action/dom/inline-svg';
   import { applyStyles }     from '#runtime/svelte/action/dom/style';
   import { slideFade }       from '#runtime/svelte/transition';
   import { TJSSvelte }       from '#runtime/svelte/util';

   import { CrossRealm }      from '#runtime/util';
   import { A11yHelper }      from '#runtime/util/a11y';
   import { localize }        from '#runtime/util/i18n';
   import { isObject }        from '#runtime/util/object';

   import {
      TJSFocusIndicator,
      TJSFocusWrap }          from '#standard/component/dom/focus';

   export let id = '';

   export let x = 0;

   export let y = 0;

   export let offsetX = 2;

   export let offsetY = 2;

   /** @type {string[]} */
   export let classes = [];

   /**
    * When true, label only menu items will be indented.
    *
    * @type {boolean}
    */
   export let hasIcon = false;

   /**
    * @type {import('../types').TJSMenuData.Items[]}
    */
   export let items = [];

   /** @type {{ [key: string]: string | null }} */
   export let styles = void 0;

   /** @type {string} */
   export let keyCode = void 0;

   /** @type {import('#runtime/util/a11y').A11yFocusSource} */
   export let focusSource = void 0;

   /** @type {{ duration: number, easing: import('#runtime/svelte/easing').EasingFunction }} */
   export let transitionOptions = void 0;

   /**
    * @type {Window} The active window the context menu is displaying inside.
    */
   export let activeWindow = globalThis;

   /**
    * @type {number} Subtracted when menu is adjusted upwards and configured by the `alignBottom` option in
    *       `TJSContextMenu`.
    */
   export let targetElHeight = 0;

   /**
    * @type {number} Added when menu is adjusted leftward and configured by the `alignBottom` option in
    *       `TJSContextMenu`.
    */
   export let targetElWidth = 0;

   /**
    * This component. Set externally removing dependence on `current_component`.
    *
    * @type {import('svelte').SvelteComponent}
    * @internal
    */
   export let current_component = void 0;

   // Provides options to `A11yHelper.getFocusableElements` to ignore TJSFocusWrap by CSS class.
   const s_IGNORE_CLASSES = { ignoreClasses: ['tjs-focus-wrap'] };

   // Dispatches `close` event.
   const dispatch = createEventDispatcher();

   // Bound to the nav element / menu.
   let menuEl;

   // Stores if this context menu is closed.
   let closed = false;

   // ----------------------------------------------------------------------------------------------------------------

   // Event bindings
   // Bind to `document.body` to receive pointer down & scroll wheel events to close the context menu.
   // Bind to 'window' to close context menu when browser window is blurred.

   onDestroy(() =>
   {
      // To support cases when the active window may be a popped out browser register directly.
      activeWindow.document.body.removeEventListener('pointerdown', onClose, true);
      activeWindow.document.body.removeEventListener('wheel', onCloseWheel, true);
      activeWindow.removeEventListener('blur', onWindowBlur);
      activeWindow.removeEventListener('resize', onWindowBlur);

      focusSource = void 0;
   });

   onMount(() =>
   {
      // To support cases when the active window may be a popped out browser unregister directly.
      activeWindow.document.body.addEventListener('pointerdown', onClose, true);
      activeWindow.document.body.addEventListener('wheel', onCloseWheel, true);
      activeWindow.addEventListener('blur', onWindowBlur);
      activeWindow.addEventListener('resize', onWindowBlur);

      const keyboardFocus = focusSource?.source === 'keyboard';

      // If the focus options designate that the source of the context menu came from the keyboard then focus the first
      // menu item on mount.
      if (keyboardFocus)
      {
         const firstFocusEl = A11yHelper.getFirstFocusableElement(menuEl);

         if (CrossRealm.isHTMLElement(firstFocusEl) && !firstFocusEl.classList.contains('tjs-focus-wrap'))
         {
            firstFocusEl.focus();
         }
         else
         {
            // Silently focus the menu element so that keyboard handling functions.
            menuEl.focus();
         }
      }
      else
      {
         // Silently focus the menu element so that keyboard handling functions.
         menuEl.focus();
      }
   });

   // ----------------------------------------------------------------------------------------------------------------

   /**
    * Provides a custom animate callback allowing inspection of the element to change positioning styles based on the
    * height / width of the element and `document.body`. This allows the context menu to expand up when the menu
    * is outside the height bound of `document.body` and expand to the left if width is greater than `document.body`.
    *
    * @param {HTMLElement} node - nav element.
    *
    * @returns {import('svelte/transition').TransitionConfig} Transition object.
    */
   function animate(node)
   {
      // Must enable popout state in the action so that bounds checking below works.
      node.showPopover();

      const browserClientWidth = activeWindow.document.body.clientWidth;
      const browserClientHeight = activeWindow.document.body.clientHeight;

      const expandLeft = (x + node.clientWidth) > browserClientWidth;
      const expandUp = (y + node.clientHeight) > browserClientHeight;

      const adjustedX = expandLeft ? Math.min(x + offsetX + targetElWidth, browserClientWidth) :
       Math.max(x - offsetX, 0);

      const adjustedY = expandUp ? Math.min(y + offsetY - targetElHeight, browserClientHeight) :
       Math.max(y - offsetY, 0);

      node.style.top = expandUp ? null : `${adjustedY}px`;
      node.style.bottom = expandUp ? `${browserClientHeight - adjustedY}px` : null;

      node.style.left = expandLeft ? null : `${adjustedX}px`;
      node.style.right = expandLeft ? `${browserClientWidth - adjustedX}px` : null;

      return slideFade(node, transitionOptions);
   }

   /**
    * Handles item `onPress` invocation and applying immediate focus automatically if a `truthy` result is not
    * returned as a result from the `onPress` callback signaling a focus continuation.
    *
    * @param {KeyboardEvent | PointerEvent}  event - Originating event.
    *
    * @param {import('../types').TJSMenuData.Menu.Item}  item - Target menu item.
    */
   function handleOnPress(event, item)
   {
      if (!event) { return; }

      if (typeof item?.onPress === 'function')
      {
         Promise.resolve(item.onPress({ event, item, focusSource })).then((result) =>
         {
            // Coerce result to boolean.
            const focusDeferred = !!result;

            // Potentially apply focus source automatically if no deferral signaled.
            if (!focusDeferred) { A11yHelper.applyFocusSource(focusSource); }
         });
      }
      else
      {
         // Apply focus immediately.
         A11yHelper.applyFocusSource(focusSource);
      }
   }

   /**
    * Invokes a function on click of a menu item then fires the `close` event and automatically runs the outro
    * transition and destroys the component.
    *
    * @param {PointerEvent} event - PointerEvent.
    *
    * @param {import('../types').TJSMenuData.Items} item - Function to invoke on click.
    */
   function onClick(event, item)
   {
      handleOnPress(event, item);

      if (!closed)
      {
         dispatch('close:contextmenu');
         closed = true;
         TJSSvelte.util.outroAndDestroy(current_component);
      }
   }

   /**
    * Determines if a pointer pressed to the document body closes the context menu. If the click occurs outside the
    * context menu then fire the `close` event and run the outro transition then destroy the component.
    *
    * @param {PointerEvent | MouseEvent}  event - Pointer or mouse event from document body click / scroll wheel.
    *
    * @param {boolean}                    [isWheel=false] - True when scroll wheel; do not perform 2nd early out test.
    */
   function onClose(event, isWheel = false)
   {
      // Early out if the pointer down is inside the menu element.
      if (event.target === menuEl || menuEl?.contains(event.target)) { return; }

      // Early out if the event page X / Y is the same as this context menu.
      if (!isWheel && Math.floor(event.pageX) === x && Math.floor(event.pageY) === y) { return; }

      if (!closed)
      {
         dispatch('close:contextmenu');
         closed = true;
         TJSSvelte.util.outroAndDestroy(current_component);
      }
   }

   /**
    * Provides an explicit function for direct event registration.
    *
    * @param {WheelEvent}  event -
    */
   function onCloseWheel(event)
   {
      onClose(event, true);
   }

   /**
    * Handle key commands for closing the menu ('Esc') and reverse focus cycling via 'Shift-Tab'. Also stop propagation
    * for the key code assigned for menu item selection ('Enter').
    *
    * @param {KeyboardEvent}  event - KeyboardEvent.
    */
   function onKeydownMenu(event)
   {
      // Handle menu item keyCode selection.
      if (event.code === keyCode)
      {
         event.stopPropagation();
         return;
      }

      switch (event.code)
      {
         case 'Tab':
            event.stopPropagation();

            // Handle reverse focus cycling with `<Shift-Tab>`.
            if (event.shiftKey)
            {
               // Collect all focusable elements from `elementRoot` and ignore TJSFocusWrap.
               const allFocusable = A11yHelper.getFocusableElements(menuEl, s_IGNORE_CLASSES);

               // Find first and last focusable elements.
               const firstFocusEl = allFocusable.length > 0 ? allFocusable[0] : void 0;
               const lastFocusEl = allFocusable.length > 0 ? allFocusable[allFocusable.length - 1] : void 0;

               // Only cycle focus to the last keyboard focusable app element if `elementRoot` or first focusable
               // element is the active element.
               if (menuEl === activeWindow.document.activeElement ||
                firstFocusEl === activeWindow.document.activeElement)
               {
                  if (CrossRealm.isHTMLElement(lastFocusEl) && firstFocusEl !== lastFocusEl)
                  {
                     lastFocusEl.focus();
                  }

                  event.preventDefault();
               }
            }

            break;

         default:
            // Any other key stop propagation preventing any global key handlers from responding.
            event.stopPropagation();
            break;
      }
   }

   /**
    * Handle key commands for closing the menu ('Esc') and reverse focus cycling via 'Shift-Tab'. Also stop propagation
    * for the key code assigned for menu item selection ('Enter').
    *
    * @param {KeyboardEvent}  event - KeyboardEvent.
    */
   function onKeyupMenu(event)
   {
      switch (event.code)
      {
         case 'ContextMenu':
         case 'Escape':
            event.preventDefault();
            event.stopPropagation();

            if (!closed)
            {
               let localFocusSource = focusSource;

               // Note: Due to the differences between browsers a small delay is added before applying any previous
               // focus source. Browsers like Firefox will trigger a `contextmenu` event in response to the keyboard
               // `ContextMenu` event and this will be received by any previous focus source which is not desired.
               setTimeout(() =>
               {
                  A11yHelper.applyFocusSource(localFocusSource);
                  localFocusSource = void 0;
               }, 50);

               closed = true;
               dispatch('close:contextmenu');
               TJSSvelte.util.outroAndDestroy(current_component);
            }
            break;
      }
   }

   /**
    * Handle key presses on menu items.
    *
    * @param {KeyboardEvent}     event - KeyboardEvent.
    *
    * @param {import('./types').TJSMenuData.Items}   item - Menu item data.
    */
   function onKeyupItem(event, item)
   {
      if (event.code === keyCode)
      {
         handleOnPress(event, item);

         if (!closed)
         {
            closed = true;
            dispatch('close:contextmenu');
            TJSSvelte.util.outroAndDestroy(current_component);

            event.preventDefault();
            event.stopPropagation();
         }
      }
   }

   /**
    * Closes context menu when browser window is blurred.
    */
   function onWindowBlur()
   {
      if (!closed)
      {
         A11yHelper.applyFocusSource(focusSource);

         dispatch('close:contextmenu');
         closed = true;
         TJSSvelte.util.outroAndDestroy(current_component);
      }
   }
</script>

<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<nav id={id}
     class="tjs-context-menu {classes.join(' ')}"
     bind:this={menuEl}
     on:contextmenu|preventDefault|stopPropagation
     on:click|preventDefault|stopPropagation
     on:keydown|stopPropagation={onKeydownMenu}
     on:keyup|preventDefault|stopPropagation={onKeyupMenu}
     popover=manual
     transition:animate|global
     use:applyStyles={styles}
     tabindex=-1>

    <!-- svelte-ignore a11y-no-noninteractive-element-to-interactive-role -->
    <ol class=tjs-context-menu-items role=menu>
        {#each items as item}
            {#if item['#type'] === 'class'}
                <!-- svelte-ignore a11y-no-noninteractive-element-to-interactive-role -->
                <li class="tjs-context-menu-item tjs-context-menu-item-button"
                    on:click={(event) => onClick(event, item)}
                    on:keyup={(event) => onKeyupItem(event, item)}
                    role=menuitem
                    tabindex=0>
                    <TJSFocusIndicator absolute={true} />
                    <svelte:component this={item.svelte.class} {...(isObject(item.svelte.props) ? item.svelte.props : {})} />
                </li>
            {:else if item['#type'] === 'font'}
                <!-- svelte-ignore a11y-no-noninteractive-element-to-interactive-role -->
                <li class="tjs-context-menu-item tjs-context-menu-item-button"
                    on:click={(event) => onClick(event, item)}
                    on:keyup={(event) => onKeyupItem(event, item)}
                    role=menuitem
                    tabindex=0>
                    <TJSFocusIndicator absolute={true} />
                    <i class={item.icon}></i>
                    <span class=tjs-context-menu-item-label>{localize(item.label)}</span>
                </li>
            {:else if item['#type'] === 'img'}
                <!-- svelte-ignore a11y-no-noninteractive-element-to-interactive-role -->
                <li class="tjs-context-menu-item tjs-context-menu-item-button"
                    on:click={(event) => onClick(event, item)}
                    on:keyup={(event) => onKeyupItem(event, item)}
                    role=menuitem
                    tabindex=0>
                    <TJSFocusIndicator absolute={true} />
                    <img src={item.icon} alt={item.imageAlt}>
                    <span class=tjs-context-menu-item-label>{localize(item.label)}</span>
                </li>
            {:else if item['#type'] === 'label'}
                <!-- svelte-ignore a11y-no-noninteractive-element-to-interactive-role -->
                <li class="tjs-context-menu-item tjs-context-menu-item-button"
                    on:click={(event) => onClick(event, item)}
                    on:keyup={(event) => onKeyupItem(event, item)}
                    role=menuitem
                    tabindex=0>
                    <TJSFocusIndicator absolute={true} />
                    <span class=tjs-context-menu-item-label class:has-icons={hasIcon}>{localize(item.label)}</span>
                </li>
            {:else if item['#type'] === 'separator-hr'}
                <hr>
            {:else if item['#type'] === 'svg'}
               <!-- svelte-ignore a11y-no-noninteractive-element-to-interactive-role -->
               <li class="tjs-context-menu-item tjs-context-menu-item-button"
                   on:click={(event) => onClick(event, item)}
                   on:keyup={(event) => onKeyupItem(event, item)}
                   role=menuitem
                   tabindex=0>
                  <TJSFocusIndicator absolute={true} />
                  <svg use:inlineSvg={{ src: item.icon }}></svg>
                  <span class=tjs-context-menu-item-label>{localize(item.label)}</span>
               </li>
            {/if}
        {/each}
    </ol>
    <TJSFocusWrap elementRoot={menuEl} />
</nav>

<style>
    /**
     * Allow click through any `svg` element.
     */
    svg {
        pointer-events: none;
    }

    .tjs-context-menu {
        position: fixed;
        width: fit-content;
        height: max-content;
        overflow: hidden;

        margin: 0;
        inset: unset;

        background: var(--tjs-context-menu-background);
        border: var(--tjs-context-menu-border);
        border-radius: var(--tjs-context-menu-border-radius);
        box-shadow: var(--tjs-context-menu-box-shadow);
        color: var(--tjs-context-menu-color);
        font-size: var(--tjs-context-menu-font-size);
        max-width: var(--tjs-context-menu-max-width, 360px);
        min-width: var(--tjs-context-menu-min-width, 20px);
        padding: var(--tjs-context-menu-padding, 0);

        text-align: start;
    }

    .tjs-context-menu:focus-visible {
        outline: var(--tjs-default-a11y-outline-focus-visible, 2px solid transparent);
    }

    .tjs-context-menu-items {
        list-style: none;
        margin: 0;
        padding: 0;
    }

    .tjs-context-menu-items hr {
        margin-block-start: 0;
        margin-block-end: 0;
        margin: var(--tjs-context-menu-hr-margin, var(--tjs-default-hr-margin, 0 0.25em));
        border-top: var(--tjs-context-menu-hr-border-top, var(--tjs-default-hr-border-top, 1px solid #555));
        border-bottom: var(--tjs-context-menu-hr-border-bottom, var(--tjs-default-hr-border-bottom, 1px solid #444));
    }

    .tjs-context-menu-item {
        display: flex;
        position: relative;

        align-items: center;
        border: var(--tjs-context-menu-item-border);
        line-height: var(--tjs-context-menu-item-line-height, 1em);
        margin: var(--tjs-context-menu-item-margin, 0);
        padding: var(--tjs-context-menu-item-padding, 0.5em);
    }

    /* Disable default outline for focus visible / within */
    .tjs-context-menu-item:focus-within, .tjs-context-menu-item:focus-visible {
        outline: var(--tjs-default-a11y-outline-focus-visible, 2px solid transparent);
    }

    .tjs-context-menu-item i {
        text-align: center;
        width: var(--tjs-context-menu-item-icon-width, var(--tjs-default-menu-item-icon-width, 1.25em));
    }

    .tjs-context-menu-item img, .tjs-context-menu-item svg {
        width: var(--tjs-context-menu-item-icon-width, var(--tjs-default-menu-item-icon-width, 1.25em));
        height: var(--tjs-context-menu-item-icon-height, var(--tjs-default-menu-item-icon-height, 1.25em));
    }

    .tjs-context-menu-item-button {
        gap: var(--tjs-context-menu-item-button-gap, var(--tjs-default-menu-item-button-gap, 0.5em));
    }

    .tjs-context-menu-item-button:hover {
        background: var(--tjs-context-menu-item-background-highlight);
        border: var(--tjs-context-menu-item-border-highlight);
        color: var(--tjs-context-menu-item-color-highlight);
        cursor: var(--tjs-context-menu-item-cursor-hover, var(--tjs-cursor-pointer, pointer));
        text-shadow: var(--tjs-context-menu-item-text-shadow-focus-hover);
    }

    .tjs-context-menu-item-button:focus-visible, .tjs-context-menu-item-button:focus-within:has(:focus-visible) {
        background: var(--tjs-context-menu-item-background-highlight);
        border: var(--tjs-context-menu-item-border-highlight);
        color: var(--tjs-context-menu-item-color-highlight);
        text-shadow: var(--tjs-context-menu-item-text-shadow-focus-hover);
    }

    /* Enable focus indicator for focus-within */
    /* Note: the use of `has` pseudo-selector that requires a child with :focus-visible */
    .tjs-context-menu-item:focus-visible, .tjs-context-menu-item:focus-within:has(:focus-visible) {
       --tjs-focus-indicator-background: var(--tjs-context-menu-item-focus-indicator-background, currentColor);
    }

    .tjs-context-menu-item-label {
        overflow: var(--tjs-context-menu-item-label-overflow, var(--tjs-default-menu-item-label-overflow, hidden));
        text-overflow: var(--tjs-context-menu-item-label-text-overflow, var(--tjs-default-menu-item-label-text-overflow, ellipsis));
        white-space: var(--tjs-context-menu-item-label-white-space, var(--tjs-default-menu-item-label-white-space));
    }

    .tjs-context-menu-item-label.has-icons {
       padding-left: calc(var(--tjs-context-menu-item-icon-width, 1.25em) + var(--tjs-context-menu-item-button-gap, 0.5em));
    }
</style>
