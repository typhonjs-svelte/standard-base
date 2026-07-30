import type { TJSPosition } from '#runtime/svelte/store/position';

declare namespace TJSPositionControlLayerAPI {
   export interface Controls {
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
      export<T extends Data.EntryExport = Data.EntryExport>({ compact, selected }?:
       { compact: boolean, selected: boolean }): Data.Export<T>;
   }

   export namespace Data {
      /**
       * Defines an exported entry managed by the position control layer via {@link Controls.export}.
       *
       *
       */
      export interface EntryExport {
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
      export interface EntryInput {
         id: PropertyKey;

         position: TJSPosition;
      }

      /**
       * Defines the export data requested by the position control layer via {@link Controls.export}.
       */
      export interface Export<T extends EntryExport = EntryExport> {
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

export { TJSPositionControlLayerAPI };
