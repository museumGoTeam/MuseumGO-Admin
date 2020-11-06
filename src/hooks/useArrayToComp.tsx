import React from 'react'
import Cell from '../components/Cell/Cell'
import { CELL_SIZE } from '../constants';
import { TEntityNumber } from "../constants/types";
import { useAppState } from "../container/store";


function iterateRow(row: TEntityNumber[], originY: number) {
    return row.map((cell, originX) => iterateCell(cell, originX, originY))
}

function iterateCell(cell: TEntityNumber, originX: number, originY: number) {
    const key = `${originY}-${originX}`
    const originPos = { x: originX, y: originY}
    const relativePos = {x: originX * CELL_SIZE, y: originY * CELL_SIZE}


    return (
        <Cell key={key} entity={cell} originPos={originPos} relativePos={relativePos} />
    )
}


export default function useArrayToComp() {
    const appState = useAppState()
    const cellsComp = appState.map.map(iterateRow)

    return cellsComp
}