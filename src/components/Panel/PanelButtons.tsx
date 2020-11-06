import React from 'react'
import PanelButton from './PanelButton'




export default function PanelButtons() {
    return (
        <div>
            <PanelButton label="WALL" indicatorColor="black" selected />
            <PanelButton label="POINT OF INTEEST" indicatorColor="red"  />
            <PanelButton label="ROOM" indicatorColor="green"  />
        </div>
    )
}
