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
    name: string
    description?: string
    image?: string
    pos: IPos
}

export interface IRoom {
    qrcode: string
    pos: IPos
}




