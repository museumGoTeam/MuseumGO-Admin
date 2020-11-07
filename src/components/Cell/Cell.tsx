import React from 'react'
import { useStore } from '../../container/store'
import useCellStyle from '../../hooks/useCellStyle'
import {useSaveEntity} from '../../hooks/usePrompt'
import { ICell } from '../Canvas/types'



type CellProps = ICell

export default function Cell(props: CellProps) {
    const { appState, dispatch } = useStore()
    const style = useCellStyle({cell: props})
    const prompt = useSaveEntity()


    const assignType = () => dispatch({type: "ON_CELL_ASSIGN", payload: props.originPos})
    const onClick = () => {
        if ([2,3].includes(appState.entitySelected)) {
            const value = prompt(appState.entitySelected, props.originPos)
            console.log(value)
        }
        assignType()
    }
    const checkEntity = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (e.buttons === 1 && [0,1].includes(appState.entitySelected)) assignType()
    }


    return (
        <div 
        style={style} 
        onClick={onClick}
        onMouseEnter={checkEntity} />
    )
}
