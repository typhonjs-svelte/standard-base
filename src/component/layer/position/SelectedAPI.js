/**
 * @import { TJSPosition }    from '#runtime/svelte/store/position';
 * 
 * @import { ControlsData }   from './ControlsStore';
 * @import { ControlStore }   from './control/ControlStore';
 */

export class SelectedAPI
{
   /**
    * Stores the main ControlStore data object.
    *
    * @type {ControlsData}
    */
   #data;

   /**
    * Initial bounding rect when drag starts.
    *
    * @type {DOMRect}
    */
   #dragBoundingRect = new DOMRect();

   /**
    * Data to send selected control position instances.
    *
    * @type {{top: number, left: number}}
    */
   #dragUpdate = { top: 0, left: 0 };

   /**
    * @type {ControlStore}
    */
   #primaryControl;

   /**
    * @type {Map<PropertyKey, ControlStore>}
    */
   #selectedMap = new Map();

   /**
    * @type {Map<PropertyKey, TJSPosition.API.Transform.TransformData>}
    */
   #transformDataMap = new Map();

   /**
    * @type {Map<PropertyKey, Unsubscriber>}
    */
   #unsubscribeMap = new Map();

   /**
    * @type {(Map<
    *    PropertyKey,
    *    TJSPosition.API.Animation.QuickToCallback &
    *     { initialPosition?: TJSPosition.API.Data.TJSPositionData }
    * >)}
    */
   #quickToMap = new Map();

   /**
    * @param {ControlsData} data - The main ControlStore data object.
    *
    * @returns {[SelectedAPI, SelectedDragAPI]} New selected and selected drag API.
    */
   static create(data)
   {
      const selectedAPI = new SelectedAPI(data);

      /** @type {SelectedDragAPI} */
      const selectedDragAPI = {
         onStart: selectedAPI.#onDragStart.bind(selectedAPI),
         onMove: selectedAPI.#onDragMove.bind(selectedAPI)
      };

      Object.freeze(selectedDragAPI);

      return [selectedAPI, selectedDragAPI];
   }

   /**
    * @param {ControlsData} data - The main ControlStore data object.
    */
   constructor(data)
   {
      this.#data = data;
   }

   /**
    * @param {ControlStore}   control - A control store.
    *
    * @param {boolean}        setPrimary - Make added control the primary control.
    */
   add(control, setPrimary = true)
   {
      const controlId = control.id;

      if (this.#selectedMap.has(controlId)) { return; }

      this.#selectedMap.set(controlId, control);
      this.#quickToMap.set(controlId, control.position.animate.quickTo(['top', 'left'], { duration: 0.1 }));

      if (setPrimary && this.#primaryControl)
      {
         this.#primaryControl.isPrimary = false;
         this.#primaryControl = void 0;
      }

      if (setPrimary)
      {
         control.isPrimary = true;
         this.#primaryControl = control;
      }

      control.selected = true;

      const unsubscribe = control.position.stores.transform.subscribe(
       (data) => this.#transformDataMap.set(controlId, data));

      this.#unsubscribeMap.set(controlId, unsubscribe);
   }

   clear()
   {
      if (this.#primaryControl)
      {
         this.#primaryControl.isPrimary = false;
         this.#primaryControl = void 0;
      }

      for (const control of this.#selectedMap.values())
      {
         const unsubscribe = this.#unsubscribeMap.get(control.id);
         if (typeof unsubscribe === 'function') { unsubscribe(); }

         control.selected = false;
      }

      this.#transformDataMap.clear();
      this.#unsubscribeMap.clear();
      this.#quickToMap.clear();
      this.#selectedMap.clear();
   }

   /**
    * @returns {IterableIterator<[PropertyKey, ControlStore]>} Selected control entries iterator.
    */
   entries()
   {
      return this.#selectedMap.entries();
   }

   /**
    * @returns {ControlStore} The primary control store.
    */
   getPrimary()
   {
      return this.#primaryControl;
   }

   /**
    * @returns {IterableIterator<PropertyKey>} Selected control keys iterator.
    */
   keys()
   {
      return this.#selectedMap.keys();
   }

   /**
    * @param {CustomEvent}   event - DragEvent.
    */
   #onDragMove(event)
   {
      let { tX, tY } = event.detail;

      const dragUpdate = this.#dragUpdate;

      const validationRect = this.#data.boundingRect;
      const validate = this.#data.validate;

      if (validate && validationRect)
      {
         const boundingRect = this.#dragBoundingRect;

         let x = boundingRect.x + tX;
         let y = boundingRect.y + tY;
         const left = boundingRect.left + tX;
         const right = boundingRect.right + tX;
         const bottom = boundingRect.bottom + tY;
         const top = boundingRect.top + tY;

         const initialX = x;
         const initialY = y;

         if (bottom > validationRect.bottom) { y += validationRect.bottom - bottom; }
         if (right > validationRect.right) { x += validationRect.right - right; }
         if (top < 0) { y += Math.abs(top); }
         if (left < 0) { x += Math.abs(left); }

         tX -= initialX - x;
         tY -= initialY - y;
      }

      // Add adjusted total X / Y added to initial positions for each control position.
      for (const quickTo of this.#quickToMap.values())
      {
         dragUpdate.left = quickTo.initialPosition.left + tX;
         dragUpdate.top = quickTo.initialPosition.top + tY;
         dragUpdate.bogus = false;

         quickTo(dragUpdate);
      }
   }

   #onDragStart()
   {
      for (const controlId of this.keys())
      {
         const control = this.#selectedMap.get(controlId);
         const quickTo = this.#quickToMap.get(controlId);
         quickTo.initialPosition = control.position.get();
      }

      this.getBoundingRect(this.#dragBoundingRect);
   }

   /**
    * @param {ControlStore}   control - A control store.
    */
   remove(control)
   {
      if (this.#primaryControl === control)
      {
         this.#primaryControl.isPrimary = false;
         this.#primaryControl = void 0;
      }

      const controlId = control.id;

      if (this.#selectedMap.delete(controlId))
      {
         const unsubscribe = this.#unsubscribeMap.get(controlId);
         this.#unsubscribeMap.delete(controlId);

         if (typeof unsubscribe === 'function') { unsubscribe(); }

         this.#transformDataMap.delete(controlId);
         this.#quickToMap.delete(controlId);

         control.selected = false;
      }
   }

   /**
    * @param {PropertyKey}   controlId - An ID for a control store to remove.
    */
   removeById(controlId)
   {
      if (this.#primaryControl?.id === controlId)
      {
         this.#primaryControl.isPrimary = false;
         this.#primaryControl = void 0;
      }

      const control = this.#selectedMap.get(controlId);

      if (control)
      {
         const unsubscribe = this.#unsubscribeMap.get(controlId);
         this.#unsubscribeMap.delete(controlId);

         if (typeof unsubscribe === 'function') { unsubscribe(); }

         this.#transformDataMap.delete(controlId);
         this.#quickToMap.delete(controlId);
         this.#selectedMap.delete(controlId);

         control.selected = false;
      }
   }

   /**
    * @param {ControlStore} control -
    */
   setPrimary(control)
   {
      if (this.#primaryControl && this.#primaryControl !== control)
      {
         this.#primaryControl.isPrimary = false;
         this.#primaryControl = void 0;
      }

      this.#primaryControl = control;
      control.isPrimary = true;
   }

   /**
    * Processes all selected controls transformed bounds to create a single combined bounding rect.
    *
    * @param {DOMRect} [boundingRect] - A DOMRect to store calculations or one will be created.
    *
    * @returns {DOMRect} Bounding rect.
    */
   getBoundingRect(boundingRect = new DOMRect())
   {
      let maxX = Number.MIN_SAFE_INTEGER;
      let maxY = Number.MIN_SAFE_INTEGER;
      let minX = Number.MAX_SAFE_INTEGER;
      let minY = Number.MAX_SAFE_INTEGER;

      for (const transformData of this.#transformDataMap.values())
      {
         const controlRect = transformData.boundingRect;

         if (controlRect.right > maxX) { maxX = controlRect.right; }
         if (controlRect.left < minX) { minX = controlRect.left; }
         if (controlRect.bottom > maxY) { maxY = controlRect.bottom; }
         if (controlRect.top < minY) { minY = controlRect.top; }
      }

      boundingRect.x = minX;
      boundingRect.y = minY;
      boundingRect.width = maxX - minX;
      boundingRect.height = maxY - minY;

      return boundingRect;
   }

   /**
    * @returns {IterableIterator<ControlStore>} Selected controls iterator.
    */
   values()
   {
      return this.#selectedMap.values();
   }
}
