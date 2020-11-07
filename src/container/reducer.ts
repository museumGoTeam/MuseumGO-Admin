import { IPOI, IPos } from "../components/Canvas/types";
import { TEntityNumber } from "../constants/types";
import { IAction, IAppState } from "./types";

export default function reducer(state: IAppState, action: IAction): IAppState {
  switch (action.type) {
    case "ON_INIT":
      const map = action.payload as TEntityNumber[][];
      return { ...state, map };
    case "ON_ENTITY_SELECT":
      const entitySelected = action.payload as TEntityNumber
      return { ...state, entitySelected}
    case "ON_ENTITY_INSERT":
      const poiInserted = action.payload as Partial<IPOI>
      return { ...state, pois: [...state.pois, ({name: poiInserted.name, pos: poiInserted.pos} as IPOI)]}
    case "ON_CELL_ASSIGN":
      const { x, y } = action.payload as IPos;
      const updatedPois = state.pois.filter(poi => {
        if (state.entitySelected !== 2) {
          return poi.pos === { x,y }
        }
        return poi
      })
      const updatedMap = state.map.map((row, originY) => {
        if (originY === y) {
          return row.map((entity, originX) => {
            if (originX === x) {
              return state.entitySelected;
            }
            return entity;
          });
        }
        return row;
      });
      return { ...state, map: updatedMap, pois: updatedPois}
  }
}
