import { SvelteComponent } from 'svelte';
import { TJSPosition } from '#runtime/svelte/store/position';

/**
 * @privateRemarks
 * TODO: Add description
 *
 */
declare class TJSPositionControlLayer extends SvelteComponent<
  TJSPositionControlLayer.Props,
  TJSPositionControlLayer.Events,
  TJSPositionControlLayer.Slots
> {}

/** Event / Prop / Slot type aliases for {@link TJSPositionControlLayer | associated component}. */
declare namespace TJSPositionControlLayer {
  /** Props type alias for {@link TJSPositionControlLayer | associated component}. */
  export type Props = {
    /**
     * @type {TJSPositionControlLayerAPI.Data.EntryInput | Iterable<TJSPositionControlLayerAPI.Data.EntryInput> | undefined}
     */
    entries?:
      TJSPositionControlLayerAPI.Data.EntryInput | Iterable<TJSPositionControlLayerAPI.Data.EntryInput> | undefined;
    /**
     * Is the Position Control Layer enabled.
     *
     * @type {boolean}
     */
    enabled?: boolean;
    /**
     * The DOMRect that defines the bounds of
     *
     * @type {DOMRect}
     */
    boundingRect?: DOMRect;
    /**
     * Perform validation inside bounding rect of all entries.
     *
     * @type {boolean}
     */
    validate?: boolean;
    /**
     * @type {TJSPositionControlLayerAPI.Controls}
     */
    controls?: TJSPositionControlLayerAPI.Controls;
  };
  /** Events type alias for {@link TJSPositionControlLayer | associated component}. */
  export type Events = { [evt: string]: CustomEvent<any> };
  /** Slots type alias for {@link TJSPositionControlLayer | associated component}. */
  export type Slots = { default: {} };
}

declare namespace TJSPositionControlLayerAPI$1 {
  interface Controls {
    /**
     * Exports all or selected entry data w/ TJSPosition converted to a {@link TJSPosition.API.Data.TJSPositionData}
     * JSON object. An option to compact the position data will transform the minimum top / left of all entries as
     * the origin.
     *
     * @param [opts] - Optional parameters.
     *
     * @param [opts.compact=false] - When true, transform / compact position data.
     *
     * @param [opts.selected=false] - When true, export selected entries.
     *
     * @returns Width / height max extents & serialized entry data.
     */
    export<T extends Data.EntryExport = Data.EntryExport>({
      compact,
      selected,
    }?: {
      compact: boolean;
      selected: boolean;
    }): Data.Export<T>;
  }
  namespace Data {
    /**
     * Defines an exported entry managed by the position control layer via {@link Controls.export}.
     *
     *
     */
    interface EntryExport {
      id: PropertyKey;
      position: TJSPosition.API.Data.TJSPositionData;
    }
    /**
     * Identifies an entry managed by the position control layer.
     *
     * This interface acts as a minimal structural contract. Any object containing a
     * unique {@link id} and an associated {@link TJSPosition} instance may be used,
     * including an existing external or domain object that exposes these properties.
     */
    interface EntryInput {
      id: PropertyKey;
      position: TJSPosition;
    }
    /**
     * Defines the export data requested by the position control layer via {@link Controls.export}.
     */
    interface Export<T extends EntryExport = EntryExport> {
      /**
       * The bounding rect of max extents for the exported entry data.
       */
      boundingRect: DOMRect;
      /**
       * All requested entry export data.
       */
      entries: T[];
    }
  }
}

export { TJSPositionControlLayer, TJSPositionControlLayerAPI$1 as TJSPositionControlLayerAPI };
