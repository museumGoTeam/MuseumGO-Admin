import { IPos, IPOI, ICell } from "../components/Canvas/types";
import { TEntityNumber } from "../constants/types";

export interface IAppState {
    map: TEntityNumber[][]
    originPosSelected: IPos | undefined
    poiPosSelected: IPos | undefined,
    entitySelected: TEntityNumber
    isPoiFormOpen: boolean,
    pois: IPOI[]
}

export interface IAction {
    type: TActionsType,
    payload: TPayloadType
}

type TActionsType = "ON_INIT" | "ON_CELL_ASSIGN" | "ON_ENTITY_SELECT"
type TPayloadType = TEntityNumber[][] | TEntityNumber | ICell | IPos