import { IPOI, IPos, IRoom } from "../components/Canvas/types";
import { TEntityNumber } from "../constants/types";
import { APIResGetMap } from "../type";
import { IAction, IAppState } from "./types";

export default function reducer(state: IAppState, action: IAction): IAppState {
  switch (action.type) {
    case "ON_INIT":
      const {map, pois, rooms} = action.payload as APIResGetMap;
      return { ...state, map, pois, rooms };
    case "ON_ENTITY_SELECT":
      const entitySelected = action.payload as TEntityNumber
      return { ...state, entitySelected}
    case "ON_POI_INSERT":
      const poiInserted = action.payload as Partial<IPOI>
      return { ...state, pois: [...state.pois, ({name: poiInserted.name, pos: poiInserted.pos} as IPOI)]}
    case "ON_ROOM_INSERT":
      const roomInserted = action.payload as IRoom
      return { ...state, rooms: [...state.rooms, roomInserted] }
    case "ON_CELL_ASSIGN":
      const { x, y } = action.payload as IPos;
      const updatedMap = state.map.map((row, originY) => {
        if (originY === y) {
          return row.map((entity, originX) => {
            if ([2,3].includes(entity)) return entity
            if (originX === x) {
              return state.entitySelected;
            }
            return entity;
          });
        }
        return row;
      });
      return { ...state, map: updatedMap}
  }
}
