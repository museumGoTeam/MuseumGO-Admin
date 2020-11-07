import React from 'react'
import PanelButton from './PanelButton'




export default function PanelButtons() {
    return (
        <div>
            <PanelButton label="FLOOR" indicatorColor="#d1d1d1" selected />
            <PanelButton label="WALL" indicatorColor="black" />
            <PanelButton label="POINT OF INTEEST" indicatorColor="red"  />
            <PanelButton label="ROOM" indicatorColor="green"  />
        </div>
    )
}
