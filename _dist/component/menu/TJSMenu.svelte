<script>
   /**
    * TJSMenu provides a menu component that can be slotted into toggle components like TJSToggleIconButton and
    * TJSToggleLabel.
    *
    * TJSMenu supports a flexible data driven way to construct the menu items. Depending on the item data that is passed
    * into the menu you can define 4 types of items: 'icon / label', 'image / label', 'class / Svelte component', and
    * 'separator / hr'. TJSMenu also accepts a main slot allowing the entire menu contents to be replaced with a custom
    * component as well as named slots `before` and `after` which place named components before or after the main menu
    * data driven items.
    *
    * ----------------------------------------------------------------------------------------------------------------
    * Exported props include:
    *
    * - `menu` ({@link TJSMenuData.Menu}): An object defining all properties of a menu including potentially data driven
    * minimal Svelte configuration objects (`slotAfter`, `slotBefore`, and `slotDefault`) providing default
    * component implementations.
    *
    * Or in lieu of passing the folder object you can assign these props directly:
    * - `items`: An iterable list of {@link TJSMenuData.Items}; defines data driven menu items.
    *
    * - `offset`: Optional X / Y offsets for the menu display.
    *
    * - `styles`: Styles to be applied inline via `applyStyles` action.
    *
    * - `efx`: Currently unused; for any future action effects.
    *
    * - `keyCode`: The key code to activate menu items.
    *
    * - `transitionOptions`: Custom transition options for duration and easing function.
    *
    * ----------------------------------------------------------------------------------------------------------------
    * ### Events
    *
    * There is a single that is fired and bubbled up through parent elements:
    *
    * - `close:popup` - A CustomEvent fired when the menu closes allowing any parent components to update state. The
    *                 `detail` data may have two optional fields of data including `keyboardFocus` / boolean if the
    *                  close action originated from keyboard navigation and the other is `target` / HTMLElement that is
    *                  the original event target for the close action.
    *
    * ----------------------------------------------------------------------------------------------------------------
    *
    * ### Styling
    * To style this component use `.tjs-menu` as the base selector.
    *
    * There are several local CSS variables that you can use to change the appearance dynamically. Either use
    * CSS props or pass in a `styles` object w/ key / value props to set to the details. The default fallback variables
    * target both TJSMenu and TJSContextMenu. The few `popup` defaults target first level overlaid components inside an
    * application.
    *
    * ### CSS Variables
    * ```
    * The following CSS variables are supported, but not defined by default:
    *
    * --tjs-menu-background - fallback: --tjs-default-menu-background; fallback: --tjs-default-popup-background; default: #23221d
    * --tjs-menu-border - fallback: --tjs-default-popup-border; default: 1px solid #000
    * --tjs-menu-border-radius - fallback: --tjs-default-popup-border-radius; default: 5px
    * --tjs-menu-box-shadow - fallback: --tjs-default-popup-box-shadow; default: 0 0 2px #000
    * --tjs-menu-primary-color - fallback: --tjs-default-menu-primary-color; fallback: --tjs-default-popup-primary-color; default: #b5b3a4
    * --tjs-menu-max-width - fallback: --tjs-default-menu-max-width; default: 360px
    * --tjs-menu-min-width - fallback: --tjs-default-menu-min-width; default: 20px
    * --tjs-menu-z-index - fallback: --tjs-default-popup-z-index; default: 100
    *
    * The following CSS variables define attributes for the data driven menu items.
    *
    * All menu items:
    * --tjs-menu-item-line-height - fallback: --tjs-default-menu-item-line-height; default: 2em
    * --tjs-menu-item-padding - fallback: --tjs-default-menu-item-padding; default: 0 0.5em 0 0
    *
    * Icon / Image menu items (considered a button item):
    * --tjs-menu-item-button-gap - fallback: --tjs-default-menu-item-button-gap; default: 0.25em
    * --tjs-menu-item-highlight-color - fallback: --tjs-default-menu-highlight-color; fallback: --tjs-default-popup-highlight-color; default: #f0f0e0
    * --tjs-menu-item-cursor-hover - fallback: --tjs-default-menu-cursor-hover; fallback: --tjs-cursor-pointer
    * --tjs-menu-item-text-shadow-focus-hover - fallback: --tjs-default-text-shadow-focus-hover; default: 0 0 8px red
    *
    * Specific targeting for the label of button items (allows control of wrapping / set `white-space` to `nowrap`):
    * --tjs-menu-item-label-overflow - fallback: --tjs-default-menu-item-label-overflow; default: hidden
    * --tjs-menu-item-label-text-overflow - fallback: --tjs-default-menu-item-label-text-overflow; default: ellipsis
    * --tjs-menu-item-label-white-space - fallback: --tjs-default-menu-item-label-white-space; default: undefined
    *
    * Icon menu item:
    * --tjs-menu-item-icon-height - fallback: --tjs-default-menu-item-icon-height; default: 1.25em
    * --tjs-menu-item-icon-width - fallback: --tjs-default-menu-item-icon-width; default: 1.25em
    *
    * Separator / HR:
    * --tjs-menu-hr-margin - fallback: --tjs-default-hr-margin; default: 0 0.25em
    * --tjs-menu-hr-border-top - fallback: --tjs-default-hr-border-top; default: 1px solid #555
    * --tjs-menu-hr-border-bottom - fallback: --tjs-default-hr-border-bottom; default: 1px solid #444
    * ```
    * @componentDocumentation
    */

   import {
      onDestroy,
      onMount }                  from 'svelte';

   import { inlineSvg }          from '#runtime/svelte/action/dom/inline-svg';
   import { applyStyles }        from '#runtime/svelte/action/dom/style';
   import { slideFade }          from '#runtime/svelte/transition';
   import { TJSSvelte }          from '#runtime/svelte/util';
   import { A11yHelper }         from '#runtime/util/a11y';
   import { AssetValidator }     from '#runtime/util/browser';
   import { getStackingContext } from '#runtime/util/dom/layout';
   import { localize }           from '#runtime/util/i18n';
   import { CrossRealm }         from '#runtime/util/realm';

   import {
      isIterable,
      isObject }                 from '#runtime/util/object';

   import {
      TJSFocusIndicator,
      TJSFocusWrap }             from '#standard/component/dom/focus';

   /** @type {import('./types').TJSMenuData.Menu} */
   export let menu = void 0;

   /** @type {Iterable<import('./types').TJSMenuData.Items> | (() => Iterable<import('./types').TJSMenuData.Items>)} */
   export let items = void 0;

   /** @type {HTMLElement | string} */
   export let focusEl = void 0;

   /** @type {{ x?: number, y?: number }} */
   export let offset = void 0;

   /** @type {{ [key: string]: string | null }} */
   export let styles = void 0;

   /** @type {Function} */
   export let efx = void 0;

   /** @type {string} */
   export let keyCode = void 0;

   /** @type {{ duration: number, easing: Function }} */
   export let transitionOptions = void 0;

   const s_DEFAULT_OFFSET = { x: 0, y: 0 };

   // Provides options to `A11yHelper.getFocusableElements` to ignore TJSFocusWrap by CSS class.
   const s_IGNORE_CLASSES = { ignoreClasses: ['tjs-focus-wrap'] };

   /**
    * @type {Window} The current active Window or `globalThis`.
    *
    * Supports registering to the active window / document body for when an underlying application is popped out in a
    * unique browser window.
    */
   let activeWindow

   /** @type {Iterable<import('./types').TJSMenuData.Items>} */
   let allItems;

   /**
    * When true, label only menu items will be indented.
    *
    * @type {boolean}
    */
   let hasIcon = false;

   $: {
      const itemFn = isObject(menu) && typeof menu.items === 'function' ? menu.items :
       typeof items === 'function' ? items : void 0;

      let itemList;

      if (itemFn)
      {
         itemList = itemFn();

         if (!isIterable(itemList))
         {
            throw new TypeError(`TJSMenu error: 'items' function did not return an iterable list.`);
         }
      }
      else
      {
          itemList = isObject(menu) && isIterable(menu.items) ? menu.items :
           isIterable(items) ? items : [];
      }

      hasIcon = false;

      const tempItems = [];

      let cntr = -1;

      for (const item of itemList)
      {
         cntr++;
         if (!isObject(item)) { throw new TypeError(`TJSMenu error: 'item[${cntr}]' is not an object.`); }

         // Filter items for any condition that prevents display.
         if (typeof item.condition === 'function' && !item.condition()) { continue; }
         if (typeof item.condition === 'boolean' && !item.condition) { continue; }

         let type;

         if (TJSSvelte.config.isConfigEmbed(item.svelte)) { type = 'class'; }
         else if (typeof item.icon === 'string')
         {
            const result = AssetValidator.parseMedia({ url: item.icon, mediaTypes: AssetValidator.MediaTypes.img_svg });
            type = result.valid ? result.elementType : 'font';

            hasIcon = true;
         }
         else if (item.icon === void 0 && typeof item.label === 'string') { type = 'label'; }
         else if (typeof item.separator === 'string')
         {
            if (item.separator !== 'hr')
            {
               throw new Error (
                `TJSMenu error: 'item[${cntr}]' has unknown separator type; only 'hr' is currently supported.`)
            }

            type = 'separator-hr';
         }

         if (type === void 0) { throw new TypeError(`TJSMenu error: Unknown type for 'item[${cntr}]'.`); }

         tempItems.push({ ...item, '#type': type });
      }

      allItems = tempItems;
   }

   $: focusEl = isObject(menu) && A11yHelper.isFocusSource(menu.focusEl) ? menu.focusEl :
    A11yHelper.isFocusSource(focusEl) ? focusEl : void 0;

   $: offset = isObject(menu) && isObject(menu.offset) ? menu.offset :
    isObject(offset) ? offset : s_DEFAULT_OFFSET;

   $: styles = isObject(menu) && isObject(menu.styles) ? menu.styles :
    isObject(styles) ? styles : void 0;

   $: efx = isObject(menu) && typeof menu.efx === 'function' ? menu.efx :
    typeof efx === 'function' ? efx : () => {};

   $: keyCode = isObject(menu) && typeof menu.keyCode === 'string' ? menu.keyCode :
    typeof keyCode === 'string' ? keyCode : 'Enter';

   $: transitionOptions = isObject(menu) && isObject(menu.transitionOptions) ? menu.transitionOptions :
    isObject(transitionOptions) ? transitionOptions : { duration: 120, easing: 'quintOut' };

   // Bound to the nav element / menu.
   let menuEl;

   // Stores if this context menu is closed.
   let closed = false;

   // Stores any associated `focusSource` options to pass to menu callbacks when menu was activated by keys.
   /** @type {import('#runtime/util/a11y').A11yFocusSource} */
   let focusSource = void 0;

   // Stores if menu has keyboard focus; detected on mount, when tab navigation occurs, and used to set `keyboardFocus`
   // for close event.
   let hasKeyboardFocus = false;

   // ----------------------------------------------------------------------------------------------------------------

   // Event bindings
   // Bind to `document.body` to receive pointer down & scroll wheel events to close the context menu.
   // Bind to 'window' to close context menu when browser window is blurred.

   onDestroy(() =>
   {
      // To support cases when the active window may be a popped out browser register directly.
      activeWindow?.document.body.removeEventListener('pointerdown', onClose, true);
      activeWindow?.document.body.removeEventListener('wheel', onClose, true);
      activeWindow?.removeEventListener('blur', onWindowBlur);
      activeWindow?.removeEventListener('resize', onWindowBlur);

      focusEl = void 0;
      focusSource = void 0;
   });

   onMount(() =>
   {
      // Store active window.
      activeWindow = CrossRealm.browser.getWindow(menuEl);

      // To support cases when the active window may be a popped out browser unregister directly.
      activeWindow.document.body.addEventListener('pointerdown', onClose, true);
      activeWindow.document.body.addEventListener('wheel', onClose, true);
      activeWindow.addEventListener('blur', onWindowBlur);
      activeWindow.addEventListener('resize', onWindowBlur);

      /** @type {HTMLElement} */
      const activeEl = activeWindow.document.activeElement;

      /** @type {HTMLElement} */
      const parentEl = menuEl.parentElement;

      // Determine if the parent element to the menu contains the active element and that it is explicitly focused
      // via `:focus-visible` / keyboard navigation. If so then explicitly focus the first menu item possible.
      if (CrossRealm.browser.isHTMLElement(parentEl) && CrossRealm.browser.isHTMLElement(activeEl) &&
       parentEl.contains(activeEl) && activeEl.matches(':focus-visible'))
      {
         const firstFocusEl = A11yHelper.getFirstFocusableElement(menuEl);

         if  (CrossRealm.browser.isHTMLElement(firstFocusEl) && !firstFocusEl.classList.contains('tjs-focus-wrap'))
         {
            firstFocusEl.focus();
            hasKeyboardFocus = true;
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

      // Create focus source from `focusEl` when provided and fallback to `activeEl` which is the previous active
      // element before menu is displayed.
      if (activeEl || focusEl)
      {
         const focusElements = [];

         if (focusEl) { focusElements.push(focusEl); }
         if (activeEl) { focusElements.push(activeEl); }

         focusSource = {
            focusEl: focusElements
         };
      }
   });

   // ----------------------------------------------------------------------------------------------------------------

   /**
    * Provides a custom transform allowing inspection of the element to change positioning styles based on the
    * height / width of the element and the containing stacking context element. This allows the menu to expand left or
    * right when the menu exceeds the bounds of the containing stacking context element.
    *
    * @param {HTMLElement} node - nav element.
    *
    * @returns {import('svelte/transition').TransitionConfig} Transition object.
    */
   function animate(node)
   {
      const result = getStackingContext(node.parentElement, activeWindow);
      if (!result?.node)
      {
         console.warn(`'TJSMenu.animate warning: Could not locate parent stacking context element.`);
         return;
      }

      const stackingContextRect = result?.node.getBoundingClientRect();
      const stackingContextRight = stackingContextRect.x + stackingContextRect.width;

      const nodeRect = node.getBoundingClientRect();
      const parentRect = node.parentElement.getBoundingClientRect();

      const adjustedOffset = {...s_DEFAULT_OFFSET, ...offset};

      node.style.top = `${adjustedOffset.y + parentRect.height}px`;

      // Check to make sure that the menu width does not exceed the right side of the stacking context element.
      // If not open to the right.
      if (parentRect.x + nodeRect.width < stackingContextRight)
      {
         node.style.left = `${adjustedOffset.x}px`;
         node.style.removeProperty('right');
      }
      else // Open left.
      {
         node.style.right = `${adjustedOffset.x}px`;
         node.style.removeProperty('left');
      }

      return slideFade(node, transitionOptions);
   }

   /**
    * Handles item `onPress` invocation and applying immediate focus automatically if a `truthy` result is not
    * returned as a result from the `onPress` callback signaling a focus continuation.
    *
    * @param {KeyboardEvent | PointerEvent}  event - Originating event.
    *
    * @param {import('./types').TJSMenuData.Menu.Item}  item - Target menu item.
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
    * @param {PointerEvent}    event - PointerEvent.
    *
    * @param {import('./types').TJSMenuData.Items} [item] - Menu item data.
    */
   function onClick(event, item)
   {
      handleOnPress(event, item);

      if (!closed)
      {
         closed = true;
         menuEl.dispatchEvent(new CustomEvent('close:popup', { bubbles: true, cancelable: true }));
      }
   }

   /**
    * Determines if a pointer event is pressed outside the menu which closes the menu. Use a bubbling custom event
    * `close:popup` and attach the original target. The TRL application shells will respond to this event to handle
    * any additional automatic focus management.
    *
    * @param {PointerEvent}   event - Pointer event from document body click.
    */
   async function onClose(event)
   {
      // Early out if the pointer down is inside the menu element.
      if (event.target === menuEl || menuEl?.contains(event.target)) { return; }

      if (event.target === menuEl?.parentElement || menuEl?.parentElement.contains(event.target)) { return; }

      if (!closed)
      {
         closed = true;

         menuEl?.dispatchEvent(new CustomEvent('close:popup', {
            bubbles: true,
            cancelable: true,
            detail: { target: event.target }
         }));
      }
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

      switch(event.code)
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
                  if (CrossRealm.browser.isHTMLElement(lastFocusEl) && firstFocusEl !== lastFocusEl)
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
         case 'Escape':
            if (!closed)
            {
               closed = true;
               menuEl?.dispatchEvent(new CustomEvent('close:popup',
                { bubbles: true, cancelable: true, detail: { keyboardFocus: hasKeyboardFocus } }));
            }

            event.preventDefault();
            event.stopPropagation();
            break;
      }
   }

   /**
    * Handle key presses on menu items.
    *
    * @param {KeyboardEvent}     event - KeyboardEvent.
    *
    * @param {import('./types').TJSMenuData.Items}   [item] - Menu item data.
    */
   function onKeyupItem(event, item)
   {
      if (event.code === keyCode)
      {
         handleOnPress(event, item);

         if (!closed)
         {
            closed = true;

            event.preventDefault();
            event.stopPropagation();

            menuEl?.dispatchEvent(new CustomEvent('close:popup',
             { bubbles: true, cancelable: true, detail: { keyboardFocus: hasKeyboardFocus } }));
         }
      }
   }

   /**
    * Closes menu when browser window is blurred.
    */
   function onWindowBlur()
   {
      if (!closed)
      {
         A11yHelper.applyFocusSource(focusSource);

         closed = true;
         menuEl?.dispatchEvent(new CustomEvent('close:popup', { bubbles: true, cancelable: true }));
      }
   }
</script>

<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<nav class=tjs-menu
     bind:this={menuEl}
     on:click|preventDefault|stopPropagation={() => null}
     on:keydown|stopPropagation={onKeydownMenu}
     on:keyup|preventDefault|stopPropagation={onKeyupMenu}
     on:pointerdown|stopPropagation={() => null}
     on:pointerup|stopPropagation={() => null}
     transition:animate|global
     use:applyStyles={styles}
     use:efx
     tabindex=-1
   >

   <!-- svelte-ignore a11y-no-noninteractive-element-to-interactive-role -->
   <ol class=tjs-menu-items role=menu>
      <!-- TJSMenu supports hosting a slot for menu content -->
      <slot>
         {#if TJSSvelte.config.isConfigEmbed(menu?.slotDefault)}
            <svelte:component this={menu.slotDefault.class} {...(isObject(menu?.slotDefault?.props) ? menu.slotDefault.props : {})} />
         {/if}
      </slot>

      {#if $$slots.before}
         <!-- svelte-ignore a11y-no-noninteractive-element-to-interactive-role -->
         <li class=tjs-menu-item
             on:click={(event) => onClick(event)}
             on:keyup={(event) => onKeyupItem(event)}
             role=menuitem
             tabindex=0>
            <TJSFocusIndicator absolute={true} />
            <slot name=before>
               {#if TJSSvelte.config.isConfigEmbed(menu?.slotBefore)}
                  <svelte:component this={menu.slotBefore.class} {...(isObject(menu?.slotBefore?.props) ? menu.slotBefore.props : {})} />
               {/if}
            </slot>
         </li>
      {/if}
      {#each allItems as item}
         {#if item['#type'] === 'class'}
            <!-- svelte-ignore a11y-no-noninteractive-element-to-interactive-role -->
            <li class="tjs-menu-item tjs-menu-item-button"
                on:click={(event) => onClick(event, item)}
                on:keyup={(event) => onKeyupItem(event, item)}
                role=menuitem
                tabindex=0>
               <TJSFocusIndicator absolute={true} />
               <svelte:component this={item.svelte.class} {...(isObject(item.svelte.props) ? item.svelte.props : {})} />
            </li>
         {:else if item['#type'] === 'font'}
            <!-- svelte-ignore a11y-no-noninteractive-element-to-interactive-role -->
            <li class="tjs-menu-item tjs-menu-item-button"
                 on:click={(event) => onClick(event, item)}
                 on:keyup={(event) => onKeyupItem(event, item)}
                 role=menuitem
                 tabindex=0>
               <TJSFocusIndicator absolute={true} />
               <i class={item.icon}></i>
               <span class=tjs-menu-item-label>{localize(item.label)}</span>
            </li>
         {:else if item['#type'] === 'img'}
            <!-- svelte-ignore a11y-no-noninteractive-element-to-interactive-role -->
            <li class="tjs-menu-item tjs-menu-item-button"
                 on:click={(event) => onClick(event, item)}
                 on:keyup={(event) => onKeyupItem(event, item)}
                 role=menuitem
                 tabindex=0>
               <TJSFocusIndicator absolute={true} />
               <img src={item.icon} alt={item.imageAlt}>
               <span class=tjs-menu-item-label>{localize(item.label)}</span>
            </li>
         {:else if item['#type'] === 'label'}
            <!-- svelte-ignore a11y-no-noninteractive-element-to-interactive-role -->
            <li class="tjs-menu-item tjs-menu-item-button"
                on:click={(event) => onClick(event, item)}
                on:keyup={(event) => onKeyupItem(event, item)}
                role=menuitem
                tabindex=0>
               <TJSFocusIndicator absolute={true} />
               <span class=tjs-menu-item-label class:has-icons={hasIcon}>{localize(item.label)}</span>
            </li>
         {:else if item['#type'] === 'separator-hr'}
            <hr>
         {:else if item['#type'] === 'svg'}
            <!-- svelte-ignore a11y-no-noninteractive-element-to-interactive-role -->
            <li class="tjs-menu-item tjs-menu-item-button"
                on:click={(event) => onClick(event, item)}
                on:keyup={(event) => onKeyupItem(event, item)}
                role=menuitem
                tabindex=0>
               <TJSFocusIndicator absolute={true} />
               <svg use:inlineSvg={{ src: item.icon }}></svg>
               <span class=tjs-menu-item-label>{localize(item.label)}</span>
            </li>
         {/if}
      {/each}
      {#if $$slots.after}
         <!-- svelte-ignore a11y-no-noninteractive-element-to-interactive-role -->
         <li class="tjs-menu-item tjs-menu-item-button"
             on:click={(event) => onClick(event)}
             on:keyup={(event) => onKeyupItem(event)}
             role=menuitem
             tabindex=0>
            <TJSFocusIndicator absolute={true} />
            <slot name=after>
               {#if TJSSvelte.config.isConfigEmbed(menu?.slotAfter)}
                  <svelte:component this={menu.slotAfter.class} {...(isObject(menu?.slotAfter?.props) ? menu.slotAfter.props : {})} />
               {/if}
            </slot>
         </li>
      {/if}
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

   .tjs-menu {
      position: absolute;
      width: max-content;
      height: max-content;

      background: var(--tjs-menu-background);
      border: var(--tjs-menu-border);
      border-radius: var(--tjs-menu-border-radius);
      box-shadow: var(--tjs-menu-box-shadow);
      color: var(--tjs-menu-color);
      font-size: var(--tjs-menu-font-size);
      max-width: var(--tjs-menu-max-width, 360px);
      min-width: var(--tjs-menu-min-width, 20px);

      text-align: start;

      /* Defines z-index in local stacking context */
      z-index: var(--tjs-menu-z-index, var(--tjs-default-popup-z-index, 100));
   }

   .tjs-menu:focus-visible {
      outline: var(--tjs-default-a11y-outline-focus-visible, 2px solid transparent);
   }

   .tjs-menu-items {
      margin: 0;
      padding: 0;
   }

   .tjs-menu-items hr {
      margin-block-start: 0;
      margin-block-end: 0;
      margin: var(--tjs-menu-hr-margin, var(--tjs-default-hr-margin, 0 0.25em));
      border-top: var(--tjs-menu-hr-border-top, var(--tjs-default-hr-border-top, 1px solid #555));
      border-bottom: var(--tjs-menu-hr-border-bottom, var(--tjs-default-hr-border-bottom, 1px solid #444));
   }

   .tjs-menu-item {
      display: flex;
      position: relative;

      align-items: center;
      border: var(--tjs-menu-item-border);
      line-height: var(--tjs-menu-item-line-height, 1em);
      margin: var(--tjs-menu-item-margin, 0);
      padding: var(--tjs-menu-item-padding, 0.5em);
   }

   /* Disable default outline for focus visible / within */
   .tjs-menu-item:focus-within, .tjs-menu-item:focus-visible {
      outline: none;
   }

   .tjs-menu-item i {
      text-align: center;
      width: var(--tjs-menu-item-icon-width, var(--tjs-default-menu-item-icon-width, 1.25em));
   }

   .tjs-menu-item img, .tjs-menu-item svg {
      width: var(--tjs-menu-item-icon-width, var(--tjs-default-menu-item-icon-width, 1.25em));
      height: var(--tjs-menu-item-icon-height, var(--tjs-default-menu-item-icon-height, 1.25em));
   }

   .tjs-menu-item-button {
      gap: var(--tjs-menu-item-button-gap, var(--tjs-default-menu-item-button-gap, 0.5em));
   }

   .tjs-menu-item-button:hover {
      background: var(--tjs-menu-item-background-highlight);
      border: var(--tjs-menu-item-border-highlight);
      color: var(--tjs-menu-item-color-highlight);
      cursor: var(--tjs-menu-item-cursor-hover, var(--tjs-cursor-pointer, pointer));
      text-shadow: var(--tjs-menu-item-text-shadow-focus-hover);
   }

   .tjs-menu-item-button:focus-visible, .tjs-menu-item-button:focus-within:has(:focus-visible) {
      background: var(--tjs-menu-item-background-highlight);
      border: var(--tjs-menu-item-border-highlight);
      color: var(--tjs-menu-item-color-highlight);
      text-shadow: var(--tjs-menu-item-text-shadow-focus-hover);
   }

   /* Enable focus indicator / TJSFocusIndicator */
   /* Note: the use of `has` pseudo-selector that requires a child with :focus-visible */
   .tjs-menu-item:focus-visible, .tjs-menu-item:focus-within:has(:focus-visible) {
      --tjs-focus-indicator-background: var(--tjs-menu-item-focus-indicator-background, currentColor);
   }

   .tjs-menu-item-label {
      overflow: var(--tjs-menu-item-label-overflow, var(--tjs-default-menu-item-label-overflow, hidden));
      text-overflow: var(--tjs-menu-item-label-text-overflow, var(--tjs-default-menu-item-label-text-overflow, ellipsis));
      white-space: var(--tjs-menu-item-label-white-space, var(--tjs-default-menu-item-label-white-space));
   }

   .tjs-menu-item-label.has-icons {
      padding-left: calc(var(--tjs-menu-item-icon-width, 1.25em) + var(--tjs-menu-item-button-gap, 0.5em));
   }
</style>
