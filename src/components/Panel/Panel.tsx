import React from 'react'
import Grid from '@material-ui/core/Grid'
import makeStyles from '@material-ui/core/styles/makeStyles'
import PanelButtons from './PanelButtons'
import axios from 'axios'
import { useAppState } from '../../container/store'

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
        const res = (await axios.post("/map/save", {cells: appState.map})).data
        console.log(res)
    }

    return (
        <Grid container justify="center" className={classes.rootPanel}>
            <PanelButtons onSave={onSave} />
        </Grid>
    )
}
