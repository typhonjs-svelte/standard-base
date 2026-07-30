import { writable }           from '#svelte/store';

import { TJSPosition }        from '#runtime/svelte/store/position';
import { propertyStore }      from '#runtime/svelte/store/writable-derived';

/**
 * @import { Unsubscriber }               from 'svelte/store';
 *
 * @import { TJSPositionControlLayerAPI } from '../types';
 */

export class ControlStore
{
   /**
    * Defines the options used for {@link TJSPosition.set}.
    *
    * @type {Readonly<{immediateElementUpdate: boolean}>}
    */
   static #tjsPositionSetOptions = Object.freeze({ immediateElementUpdate: true });

   /**
    * @type {TJSPositionControlLayerAPI.Data.EntryInput}
    */
   #entry;

   #data = {
      isPrimary: false,
      resizing: false,
      selected: false
   };

   /** @type {TJSPosition} */
   #position;

   #stores;

   /**
    * @type {Unsubscriber[]}
    */
   #unsubscribe = [];

   /**
    * @param {TJSPositionControlLayerAPI.Data.EntryInput} entry -
    */
   constructor(entry)
   {
      this.#entry = entry;

      // To accomplish bidirectional updates Must ignore updates from the control position when set from the
      // target entry position.
      let ignoreRoundRobin = false;

      this.#position = TJSPosition.duplicate(entry.position, { calculateTransform: true });

      /**
       * Update entry position, but only when ignoring round-robin callback.
       */
      this.#unsubscribe.push(this.#position.subscribe((data) =>
      {
         if (!ignoreRoundRobin)
         {
            entry.position.set(data, ControlStore.#tjsPositionSetOptions);
         }
      }));

      /**
       * Sets the local control position store, but temporarily sets ignoreRoundRobin callback;
       */
      this.#unsubscribe.push(entry.position.subscribe((data) =>
      {
         ignoreRoundRobin = true;
         this.#position.set(data, ControlStore.#tjsPositionSetOptions);
         ignoreRoundRobin = false;
      }));

      const dataStore = writable(this.#data);

      this.#stores = {
         isPrimary: propertyStore(dataStore, 'isPrimary'),
         resizing: propertyStore(dataStore, 'resizing'),
         selected: propertyStore(dataStore, 'selected')
      };

      Object.freeze(this.#stores);
   }

   /** @returns {TJSPositionControlLayerAPI.Data.EntryInput} */
   get entry() { return this.#entry; }

   /** @returns {PropertyKey} */
   get id() { return this.#entry.id; }

   /** @returns {boolean} */
   get isPrimary() { return this.#data.isPrimary; }

   /** @returns {TJSPosition} Control position. */
   get position() { return this.#position; }

   /** @returns {boolean} */
   get resizing() { return this.#data.resizing; }

   /** @returns {boolean} */
   get selected() { return this.#data.selected; }

   get stores() { return this.#stores; }

   /**
    * @param {boolean} isPrimary -
    */
   set isPrimary(isPrimary)
   {
      this.#stores.isPrimary.set(isPrimary);
   }

   /**
    * @param {boolean} resizing -
    */
   set resizing(resizing)
   {
      this.#stores.resizing.set(resizing);
   }

   /**
    * @param {boolean} selected -
    */
   set selected(selected)
   {
      this.#stores.selected.set(selected);
   }

   /**
    * Cleans up all subscriptions and removes references to tracked entry data.
    */
   destroy()
   {
      if (this.#unsubscribe)
      {
         for (const unsubscribe of this.#unsubscribe) { unsubscribe(); }
      }

      this.#unsubscribe = void 0;
      this.#entry = void 0;
      this.#position = void 0;
   }
}
