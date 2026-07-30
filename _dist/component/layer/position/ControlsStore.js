import { writable }        from 'svelte/store';

import { TJSPosition }     from '#runtime/svelte/store/position';
import { propertyStore }   from '#runtime/svelte/store/writable-derived';
import {
   isIterable,
   isObject,
   isPropertyKey }         from '#runtime/util/object';

import { ControlStore }    from './control/ControlStore.js';

import { SelectedAPI }     from './SelectedAPI.js';

/**
 * @import {
 *    Subscriber,
 *    Unsubscriber }                      from 'svelte/store';
 *
 * @import { TJSPositionControlLayerAPI } from './types';
 *
 * @import { SelectedDragAPI }            from './types-local';
 */

/**
 * @implements {TJSPositionControlLayerAPI.Controls}
 */
export class ControlsStore
{
   /**
    * @type {ControlStore[]}
    */
   #controls = [];

   /**
    * @type {Map<PropertyKey, ControlStore>}
    */
   #controlMap = new Map();

   /**
    * @type {ControlsData}
    */
   #data = {
      boundingRect: void 0,
      enabled: false,
      validate: true
   };

   /** @type {SelectedAPI} */
   #selectedAPI;

   /** @type {SelectedDragAPI} */
   #selectedDragAPI;

   #stores;

   /**
    * Stores the subscribers.
    *
    * @type {Subscriber<ControlStore[]>[]}
    */
   #subscriptions = [];

   /**
    * Creates a new instance of ControlsStore and the selected drag API.
    *
    * @returns {[ControlsStore, object]} New instance of ControlsStore.
    */
   static create()
   {
      const controlsStore = new ControlsStore();

      let selectedDragAPI;

      [controlsStore.#selectedAPI, selectedDragAPI] = SelectedAPI.create(controlsStore.#data);

      controlsStore.#selectedDragAPI = selectedDragAPI;

      return [controlsStore, selectedDragAPI];
   }

   constructor()
   {
      const dataStore = writable(this.#data);

      this.#stores = {
         boundingRect: propertyStore(dataStore, 'boundingRect'),
         enabled: propertyStore(dataStore, 'enabled'),
         validate: propertyStore(dataStore, 'validate')
      };

      Object.freeze(this.#stores);
   }

   /**
    * @returns {DOMRect} Returns any validation bounding rect.
    */
   get boundingRect() { return this.#data.boundingRect; }

   /**
    * @returns {boolean} Returns enabled state.
    */
   get enabled() { return this.#data.enabled; }

   /**
    * @returns {SelectedAPI} Selected API
    */
   get selected() { return this.#selectedAPI; }

   /**
    * @returns {*} Stores.
    */
   get stores() { return this.#stores; }

   /**
    * @returns {boolean} Returns if on-drag validation is enabled.
    */
   get validate() { return this.#data.validate; }

   /**
    * @param {DOMRect|void}  boundingRect - Assigns the validation bounding rect.
    */
   set boundingRect(boundingRect) { this.#stores.boundingRect.set(boundingRect); }

   /**
    * @param {boolean}  enabled - New enabled state.
    */
   set enabled(enabled) { this.#stores.enabled.set(enabled); }

   /**
    * @param {boolean}  validate - New on-drag validation state.
    */
   set validate(validate) { this.#stores.validate.set(validate); }

   /**
    * Exports all or selected entry data w/ TJSPosition converted to a {@link TJSPosition.API.Data.TJSPositionData}
    * JSON object. An option to compact the position data will transform the minimum top / left of all entries as
    * the origin.
    *
    * @param {object}   [opts] - Optional parameters.
    *
    * @param {boolean}  [opts.compact=false] - Transform / compact position data.
    *
    * @param {boolean}  [opts.selected=false] - When true export selected entries.
    *
    * @returns {TJSPositionControlLayerAPI.Data.Export} Width / height max extents & serialized entry data.
    */
   export({ compact = false, selected = false } = {})
   {
      /** @type {TJSPositionControlLayerAPI.Data.EntryExport[]} */
      const entries = [];

      let maxWidth = Number.MIN_SAFE_INTEGER;
      let maxHeight = Number.MIN_SAFE_INTEGER;

      let minLeft = Number.MAX_SAFE_INTEGER;
      let minTop = Number.MAX_SAFE_INTEGER;

      if (!compact)
      {
         for (const control of selected ? this.selected.values() : this.values())
         {
            const position = control.entry.position.toJSON();

            const boundingRect = control.position.transform.boundingRect;

            if (boundingRect.right > maxWidth) { maxWidth = boundingRect.right; }
            if (boundingRect.bottom > maxHeight) { maxHeight = boundingRect.bottom; }

            if (boundingRect.left < minLeft) { minLeft = boundingRect.left; }
            if (boundingRect.top < minTop) { minTop = boundingRect.top; }

            entries.push(Object.assign({}, control.entry, { position }));
         }
      }
      else
      {
         // TODO: Currently compacting only handles positions greater than 0, 0 origin.
         let localMinTop = Number.MAX_SAFE_INTEGER;
         let localMinLeft = Number.MAX_SAFE_INTEGER;

         // Find minimum left and top;
         for (const control of selected ? this.selected.values() : this.values())
         {
            const boundingRect = control.position.transform.boundingRect;

            if (boundingRect.left < localMinLeft) { localMinLeft = boundingRect.left; }
            if (boundingRect.top < localMinTop) { localMinTop = boundingRect.top; }
         }

         for (const control of selected ? this.selected.values() : this.values())
         {
            const position = control.position.toJSON();

            // Adjust for localMinLeft / localMinTop.
            position.left -= localMinLeft;
            position.top -= localMinTop;

            const boundingRect = control.position.transform.boundingRect;

            const right = boundingRect.right - localMinLeft;
            const bottom = boundingRect.bottom - localMinTop;

            if (right > maxWidth) { maxWidth = right; }
            if (bottom > maxHeight) { maxHeight = bottom; }

            entries.push(Object.assign({}, control.entry, { position }));
         }

         if (entries.length)
         {
            minLeft = 0;
            minTop = 0;
         }
      }

      // Construct bounding rect for
      const boundingRect = new DOMRect(
         minLeft === Number.MAX_SAFE_INTEGER ? 0 : minLeft,
         minTop === Number.MAX_SAFE_INTEGER ? 0 : minTop,
         maxWidth === Number.MIN_SAFE_INTEGER ? 0 : maxWidth,
         maxHeight === Number.MIN_SAFE_INTEGER ? 0 : maxHeight
      );

      return {
         boundingRect,
         entries
      };
   }

   /**
    * @returns {IterableIterator<PropertyKey>} Keys for all controls.
    */
   keys()
   {
      return this.#controlMap.keys();
   }

   /**
    * Updates the tracked entries data. Each entry must be an object containing a unique `id` property and an
    * instance of TJSPosition as the `position` property.
    *
    * @param {Iterable<TJSPositionControlLayerAPI.Data.EntryInput>} entries - Iterable list of entry data objects.
    */
   updateEntries(entries)
   {
      const controlMap = this.#controlMap;
      const selected = this.#selectedAPI;

      const removeIDs = new Set(controlMap.keys());

      if (isIterable(entries))
      {
         for (const entry of entries)
         {
            this.#updateEntry(entry, removeIDs);
         }
      }
      else if (isObject(entries))
      {
         this.#updateEntry(/** @type {TJSPositionControlLayerAPI.Data.EntryInput} */ entries, removeIDs);
      }

      for (const id of removeIDs)
      {
         const control = controlMap.get(id);

         selected.removeById(id);
         controlMap.delete(id);

         // Remove subscriptions to TJSPosition instances.
         if (control) { control.destroy(); }
      }

      this.#controls = [...controlMap.values()];

      this.#updateSubscribers();
   }

   /**
    * @param {TJSPositionControlLayerAPI.Data.EntryInput} entry -
    *
    * @param {Set<PropertyKey>} removeIDs -
    */
   #updateEntry(entry, removeIDs)
   {
      const controlMap = this.#controlMap;
      const selected = this.#selectedAPI;

      const entryId = entry.id;

      if (!isPropertyKey(entryId))
      {
         throw new Error(`updateComponents error: entry data does not have a defined 'id' property key.`);
      }

      if (!(entry.position instanceof TJSPosition))
      {
         throw new Error(`updateComponents error: entry data does not have a valid 'position' property.`);
      }

      if (controlMap.has(entryId))
      {
         const control = controlMap.get(entryId);

         // Evaluate if the entry TJSPosition instance has changed.
         if (control.entry.position !== entry.position)
         {
            // Remove old control
            selected.removeById(entryId);
            controlMap.delete(entryId);
            control.destroy();

            controlMap.set(entry.id, new ControlStore(entry));
         }
         else
         {
            removeIDs.delete(entryId);
         }
      }
      else
      {
         controlMap.set(entry.id, new ControlStore(entry));
      }
   }

   /**
    * @returns {IterableIterator<ControlStore>} All controls.
    */
   values()
   {
      return this.#controlMap.values();
   }

// -------------------------------------------------------------------------------------------------------------------

   #updateSubscribers()
   {
      const subscriptions = this.#subscriptions;

      // Early out if there are no subscribers.
      if (subscriptions.length > 0)
      {
         for (let cntr = 0; cntr < subscriptions.length; cntr++) { subscriptions[cntr](this.#controls); }
      }
   }

   /**
    * @param {Subscriber<ControlStore[]>} handler - Callback function that is invoked on
    * update / changes.
    *
    * @returns {Unsubscriber} Unsubscribe function.
    */
   subscribe(handler)
   {
      this.#subscriptions.push(handler); // add handler to the array of subscribers

      handler(this.#controls);           // call handler with current value

      // Return unsubscribe function.
      return () =>
      {
         const index = this.#subscriptions.findIndex((sub) => sub === handler);
         if (index >= 0) { this.#subscriptions.splice(index, 1); }
      };
   }
}

/**
 * @typedef {object} ControlsData
 *
 * @property {DOMRect} boundingRect -
 *
 * @property {boolean} enabled -
 *
 * @property {boolean} validate -
 */
