import React from 'react'
import Grid from '@material-ui/core/Grid'
import makeStyles from '@material-ui/core/styles/makeStyles'
import PanelButtons from './PanelButtons'
import axios from 'axios'
import { message } from 'antd'
import { useStore } from '../../container/store'
import { APIRes } from '../../type'

const useStyles = makeStyles(theme => ({
    rootPanel: {
        paddingTop: 8,
        paddingBottom: 8,
        [theme.breakpoints.down("sm")]: {
            justifyContent: "flex-start"
        }
    }
}))

export default function Panel() {
    const classes = useStyles()
    const {appState, dispatch} = useStore()
    
    const onSave = async () => {
        message.loading("The map is saving ... ")
        const res = (await axios.post<APIRes>("/map", {map: appState.map, pois: appState.pois, rooms: appState.rooms, poisMoved: appState.poisMoved})).data
        if (res.success) {
            message.success(res.message)
            dispatch({type: "ON_SAVE", payload: res.data})
            return
        }
        message.error(res.message)   
    }


    return (
        <Grid container item justify="center" className={classes.rootPanel}>
            <PanelButtons onSave={onSave} />
        </Grid>
    )
}
