import { IPos, IPOI, ICell } from "../components/Canvas/types";
import { TEntityNumber } from "../constants/types";

export interface IAppState {
    map: TEntityNumber[][]
    originPosSelected: IPos | undefined
    poiPosSelected: IPos | undefined,
    entitySelected: TEntityNumber | undefined
    isPoiFormOpen: boolean,
    pois: IPOI[]
}

export interface IAction {
    type: TActionsType,
    payload: TPayloadType
}

type TActionsType = "ON_INIT"
type TPayloadType = TEntityNumber[][] | TEntityNumber | ICell | IPos