import React from 'react'
import Grid from '@material-ui/core/Grid'
import makeStyles from '@material-ui/core/styles/makeStyles'
import { message } from 'antd'
import PanelButtons from './PanelButtons'
import axios from 'axios'
import { useAppState } from '../../container/store'
import { APIRes } from '../../type'

const useStyles = makeStyles(theme => ({
    rootPanel: {
        paddingTop: 8,
        paddingBottom: 8
    }
}))

export default function Panel() {
    const classes = useStyles()
    const appState = useAppState()
    
    const onSave = async () => {
        message.loading("The map is saving ... ")
        const poiNames = appState.pois.map(poi => poi.name)
        const roomsQRCodes = appState.rooms.map(room => room.qrcode)
        const res = (await axios.post<APIRes>("/map", {cells: appState.map, pois:poiNames , rooms: roomsQRCodes})).data
        if (res.success) message.success(res.message)
        else message.error(res.message)   
    }

    return (
        <Grid container justify="center" className={classes.rootPanel}>
            <PanelButtons onSave={onSave} />
        </Grid>
    )
}
