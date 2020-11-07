import React from 'react'
import PanelButton from './PanelButton'
import { useDispatch } from '../../container/store'
import { TEntityNumber } from '../../constants/types'




export default function PanelButtons() {
    const dispatch = useDispatch()

    const onSelect = (entityNumber: TEntityNumber) => {
        dispatch({type: "ON_ENTITY_SELECT", payload: entityNumber })
    }

    return (
        <div>
            <PanelButton label="FLOOR" indicatorColor="#d1d1d1" entityNumber={0} onSelect={onSelect}/>
            <PanelButton label="WALL" indicatorColor="black" entityNumber={1} onSelect={onSelect} />
            <PanelButton label="POINT OF INTEREST" indicatorColor="red" entityNumber={2} onSelect={onSelect}  />
            <PanelButton label="ROOM" indicatorColor="green" entityNumber={3} onSelect={onSelect}  />
        </div>
    )
}
