import { TEntityNumber } from "../../constants/types";

export interface IPos {
    x: number,
    y: number
}

export interface ICell {
    entity: TEntityNumber,
    originPos: IPos
    relativePos: IPos
}

export interface IPOI {
    _id: string,
    name: string
    description?: string
    image?: string | File
    pos: IPos
}

export interface IRoom {
    _id: string,
    label: string
    pos: IPos
}

export interface IMap {
    map: TEntityNumber[][],
    pois: IPOI[],
    rooms: IRoom[]
}




