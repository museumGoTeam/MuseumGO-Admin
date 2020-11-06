import React from 'react'
import Grid from '@material-ui/core/Grid'
import makeStyles from '@material-ui/core/styles/makeStyles'
import PanelButtons from './PanelButtons'

const useStyles = makeStyles(theme => ({
    rootPanel: {
        paddingTop: 8,
        paddingBottom: 8
    }
}))

export default function Panel() {
    const classes = useStyles()
    return (
        <Grid container justify="center" className={classes.rootPanel}>
            <PanelButtons />
        </Grid>
    )
}
