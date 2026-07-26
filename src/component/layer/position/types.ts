import type { Writable }    from 'svelte/store';

import type { TJSPosition } from '#runtime/svelte/store/position';

declare namespace TJSPositionControlLayerAPI {
   export interface Controls {
      

   }

   /**
    * Identifies an entry managed by the position control layer.
    *
    * This interface acts as a minimal structural contract. Any object containing a
    * unique {@link id} and an associated {@link TJSPosition} instance may be used,
    * including an existing external or domain object that exposes these properties.
    */
   export interface Entry {
      id: PropertyKey;

      position: TJSPosition;
   }
}

export { TJSPositionControlLayerAPI };