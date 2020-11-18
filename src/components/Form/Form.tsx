import React from 'react'
import makeStyles from '@material-ui/core/styles/makeStyles'
import Grid, { GridProps } from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles(theme => ({
    paper: {
        width: "50%",
        paddingTop: 16,
        paddingBottom: 16,
    },
}))

type FormProps = {
    title: string
}

export default function Form( { title, children, className }: React.PropsWithChildren<FormProps & GridProps>) {
    const classes = useStyles()
    return (
        <>
            <Grid item container direction="column" alignItems="center" component={Paper}  className={classes.paper}>
            <Typography variant="h5">{title}</Typography>
                {
                    children
                }
            </Grid>
        </>
    )
}
