<script>
   import { onDestroy }    from 'svelte';

   import { slideFade }    from '#runtime/svelte/transition';
   import { CrossWindow }  from '#runtime/util/browser';
   import { isObject }     from '#runtime/util/object';

   /** @type {HTMLDivElement} */
   export let hostEl;

   /** @type {number} */
   export let duration;

   /** @type {(time: number) => number} */
   export let easingIn;

   /** @type {(time: number) => number} */
   export let easingOut;

   /** @type {{ icon: string, svelte: import('#runtime/svelte/util').TJSSvelte.Config.Embed, title?: string }} */
   export let item;

   /** @type {'left' | 'right'} */
   export let side;

   onDestroy(() =>
   {
      // Handle the case when the panel is being destroyed and focus transfers to the `document.body`; focus parent
      // container instead.
      if (CrossWindow.getActiveElement(hostEl) === CrossWindow.getDocument(hostEl)?.body)
      {
         hostEl?.parentElement?.focus();
      }
   })
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div bind:this={hostEl}
     class=tjs-side-slide-layer-item-host
     class:left={side === 'left'}
     class:right={side === 'right'}
     in:slideFade={{ axis: 'x', duration, easingSlide: easingIn }}
     out:slideFade={{ axis: 'x', duration, easingSlide: easingOut }}>
   <svelte:component this={item.svelte.class} {...(isObject(item.svelte.props) ? item.svelte.props : {})} />
</div>

<style>
   .tjs-side-slide-layer-item-host {
      position: absolute;
      pointer-events: all;
      width: fit-content;
      height: fit-content;

      padding: var(--tjs-side-slide-layer-item-host-padding, 10px);

      background: var(--tjs-side-slide-layer-item-host-background, linear-gradient(135deg, rgba(52, 51, 52, 0.9) 10%, rgba(15, 14, 28, 0.9) 90%));
      border: var(--tjs-side-slide-layer-item-host-border, solid 2px black);
      box-shadow: var(--tjs-side-slide-layer-item-host-box-shadow, var(--tjs-side-slide-layer-item-box-shadow, rgba(0, 0, 0, 0.35) 0px 5px 15px));
      color: var(--tjs-side-slide-layer-item-host-color, white);

      transition: var(--tjs-side-slide-layer-item-transition, all 200ms ease-in-out)
   }

   .tjs-side-slide-layer-item-host.left {
      left: calc(var(--tjs-side-slide-layer-item-diameter, 30px) + 2px);
      border-radius: var(--tjs-side-slide-layer-item-host-border-radius-left, 5% 10% 20% 5%);
   }

   .tjs-side-slide-layer-item-host.right {
      right: calc(var(--tjs-side-slide-layer-item-diameter, 30px) + 2px);
      border-radius: var(--tjs-side-slide-layer-item-host-border-radius-right, 5% 5% 10% 20%);
   }
</style>
