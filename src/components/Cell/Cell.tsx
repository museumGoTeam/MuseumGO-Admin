import React from 'react'
import useCellStyle from '../../hooks/useCellStyle'
import { ICell } from '../Canvas/types'



type CellProps = ICell

export default function Cell(props: CellProps) {
    const style = useCellStyle({cell: props})

    return (
        <div style={style} />
    )
}
