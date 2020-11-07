import React from 'react'
import useCellStyle from '../../hooks/useCellStyle'
import { ICell } from '../Canvas/types'
import { ICellState } from './type'



type CellProps = ICell

export default function Cell(props: CellProps) {
    const [state, setState] = React.useState<ICellState>({isHovering: false})
    const style = useCellStyle({cell: props, cellState: state })



    const onHover = () => setState({ ...state, isHovering: true })
    const onLeaveHover = () => setState({ ...state, isHovering: false })


    return (
        <div 
        style={style} 
        onMouseOver={onHover}
        onMouseLeave={onLeaveHover} />
    )
}
