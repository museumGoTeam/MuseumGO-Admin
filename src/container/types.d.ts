import { IPos, IPOI, ICell, IRoom } from "../components/Canvas/types";
import { TEntityNumber } from "../constants/types";
import { APIResGetMap, APIUpdateMap } from "../type";

export interface IAppState {
  map: TEntityNumber[][];
  entitySelected: TEntityNumber;
  isPoiFormOpen: boolean;
  pois: IPOI[];
  rooms: IRoom[];
  poisMoved: IPOI[]
  entityDragging: IPOI | undefined
}

export interface IAction {
  type: TActionsType;
  payload: TPayloadType;
}

type TActionsType =
  | "ON_INIT"
  | "ON_CELL_ASSIGN"
  | "ON_ENTITY_SELECT"
  | "ON_ENTITY_BEGIN_DRAG"
  | "ON_ENTITY_DROP"
  | "ON_POI_INSERT"
  | "ON_ROOM_INSERT"
  | "ON_SAVE";
type TPayloadType =
  | APIResGetMap
  | TEntityNumber[][]
  | TEntityNumber
  | ICell
  | IPos
  | Partial<IPOI>
  | IRoom
  | APIUpdateMap
  | AssignP;





export interface AssignP {
    entityToAssign: TEntityNumber
    pos: IPos,
    isDropping: boolean
}
