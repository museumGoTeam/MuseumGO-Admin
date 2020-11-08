import { IMap, IPOI, IRoom } from "./components/Canvas/types";
import { TEntityNumber } from "./constants/types";

export interface APIRes {
    message: boolean
    success: boolean
    data: IMap
}

export interface APIResGetMap {
    map: TEntityNumber[][],
    pois: IPOI[],
    rooms: IRoom[]
}