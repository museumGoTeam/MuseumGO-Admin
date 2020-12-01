import { IPOI, IRoom } from "../components/Canvas/types";
import { TEntityNumber } from "../constants/types";
import { APIResGetMap, APIUpdateMap } from "../type";
import { IAction, IAppState, AssignP } from "./types";

/**
 * 
 * @param state 
 * @param action 
 * 
 * @return state
 */
export default function reducer(state: IAppState, action: IAction): IAppState {
  switch (action.type) {
    /**
     * @param map  retrieved from the database
     * @param pois retrieved from the database
     * @param rooms retrieved from the database
     * 
     * @return the global  with the map, the pois and rooms qr code
     */
    case "ON_INIT":
      const { map, pois, rooms } = action.payload as APIResGetMap;
      return { ...state, map, pois, rooms };
      /**
       * @param entitySelected the entity which is selected when the admin click on the button panel ( 0, 1, 2, 3, 4, 6)
       * 
       * @return the global state and assign which entity will be inserted in the map
       */
    case "ON_ENTITY_SELECT":
      const entitySelected = action.payload as TEntityNumber;
      return { ...state, entitySelected };

    /**
     * @param poiToBeDragged the poi which is being dragged when the user make a right click on it 
     * 
     * @return the global state and assign the poi to the key entityDragigng
     */
    case "ON_ENTITY_BEGIN_DRAG":
      const poiToBeDragged = action.payload as IPOI;
      return { ...state, entityDragging: poiToBeDragged };

      /**
       * @param poiInserted poi which is inserted in the map (only its name)
       * @return the global state with the new asssignement in the array of pois, add the name and its pos but not its description and image
       */
    case "ON_POI_INSERT":
      const poiInserted = action.payload as Partial<IPOI>;
      return {
        ...state,
        pois: [
          ...state.pois,
          { name: poiInserted.name, pos: poiInserted.pos } as IPOI,
        ],
      };

    /**
     * @param roomInserted room which is inserted in the map ( only its name )
     * 
     * @return the global state with the new assignement in the array of rooms
     */
    case "ON_ROOM_INSERT":
      const roomInserted = action.payload as IRoom;
      return { ...state, rooms: [...state.rooms, roomInserted] };

    /**
     * @param poisSaved the points of interests that was saved when the admin clicked on the save button
     * @param roomSaved ths romms that was saved when thed admin clicked on the save button
     * 
     *  updatedPoids assignement : If a point of interest alread exist add the existing poi otherwise add the new poi
     *  updatedRooms assignement: same for the poi
     * 
     * @return the global state with the news pois and rooms qr code
     *  */  
    case "ON_SAVE":
      const {pois: poisSaved,rooms: roomsSaved} = action.payload as APIUpdateMap;
      const updatedPois = state.pois.map((poi) => {
        const poiFound = poisSaved.find(
          (poiSaved) => poiSaved.name === poi.name
        );
        return poiFound ? poiFound : poi;
      });
      const updatedRooms = state.rooms.map((room) => {
        const roomFound = roomsSaved.find(
          (roomSaved) => roomSaved.label === room.label
        );
        return roomFound ? roomFound : room;
      });
      return { ...state, pois: updatedPois, rooms: updatedRooms, poisMoved: [] };

    /**
     * @param entityToAssign the entity to assign on the map when clicked on a cell (0,1,2,3,4,6)
     * @param pos the position of the cell where the entity is assigned
     * @param isDropping verify if the assignment is when the admin has just finished a drag n drop
     * 
     * The reducer will loop over the two dimensionnal array
     * Check first if is it is a en of a drag n drop :
     *    - Yes: 
     *        - Reassign the previous cell of the entity which was moved by giving the 0 number ( floor )
     *        - Assign the entity in the new cell by
     *        - return the entity if they are not concerned by theses condition
     *    - No:
     *        - Do the same but it will not verify the position of the entity whixh is dragging
     * 
     * Is the user drop the entity, reassign the entityDragging key to @undefined
     *       
     * 
     * @return the global state updated
     */
    case "ON_CELL_ASSIGN":
      const { entityToAssign, pos, isDropping } = action.payload as AssignP;
      const { x, y } = pos;
      const updatedMap = state.map.map((row, originY) => {
        if (state.entityDragging && originY === state.entityDragging.pos.y &&isDropping) {
          return row.map((entity, originX) => {
            if ( state.entityDragging && originX === state.entityDragging.pos.x) {
              return 0;
            }
            if (originX === x && originY === y) return entityToAssign
            return entity;
          });
        } 
        if (originY === y) {
          return row.map((entity, originX) => {
            if (originX === x) {
              return entityToAssign;
            }
            return entity;
          });
        }
        return row;
      });
      return {
        ...state,
        map: updatedMap,
        entityDragging: isDropping ? undefined : state.entityDragging,
        pois: state.pois.map(poi => poi.pos.x === state.entityDragging?.pos.x && poi.pos.y === state.entityDragging.pos.y ? {...poi, pos: {x, y}} : poi),
        poisMoved: isDropping && state.entityDragging ? [...state.poisMoved, {...state.entityDragging, pos: {x,y}}] : state.poisMoved
      };
  }

  return state;
}
