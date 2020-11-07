import { IPos, IPOI, ICell, IRoom} from "../components/Canvas/types";
import { TEntityNumber } from "../constants/types";
import { APIResGetMap } from "../type";

export interface IAppState {
    map: TEntityNumber[][]
    entitySelected: TEntityNumber
    isPoiFormOpen: boolean,
    pois: IPOI[]
    rooms: IRoom[]
}

export interface IAction {
    type: TActionsType,
    payload: TPayloadType
}

type TActionsType = "ON_INIT" | "ON_CELL_ASSIGN" | "ON_ENTITY_SELECT" | "ON_POI_INSERT" | "ON_ROOM_INSERT"
type TPayloadType = APIResGetMap | TEntityNumber[][] | TEntityNumber | ICell | IPos | Partial<IPOI> | IRoom