/**
 * Internal selected drag API set as context `#pclSelectedDragAPI`.
 */
interface SelectedDragAPI {
   readonly onStart: () => void;

   /**
    * Custom event from internal draggable action.
    */
   readonly onMove: (event: CustomEvent<{ tX: number, tY: number }>) => void;
}

export {
   SelectedDragAPI
};
