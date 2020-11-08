import React from 'react'
import makeStyles from '@material-ui/core/styles/makeStyles'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles(theme => ({
    formRoot: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    paper: {
        height: 400,
        width: 500
    },
    title: {

    }
}))

type FormProps = {
    title: string
}

export default function Form( { title, children }: React.PropsWithChildren<FormProps>) {
    const classes = useStyles()
    return (
        <Grid container className={classes.formRoot}>
            <Grid item container direction="column" alignItems="center" component={Paper} className={classes.paper}>
                <Typography variant="h5">{title}</Typography>
                {
                    children
                }
            </Grid>
        </Grid>
    )
}
