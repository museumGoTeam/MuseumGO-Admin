import { TEntityNumber } from "../../constants/types";

export interface IPos {
    x: number,
    y: number
}

export interface ICell {
    entity: TEntityNumber,
    originPos: Pos
    relativePos: Pos
}

export interface IPOI {
    name: string
    description?: string
    image?: string
    pos: Pos
}




