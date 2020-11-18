import React from 'react'
import makeStyles from '@material-ui/core/styles/makeStyles'
import Grid, { GridProps } from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles(theme => ({
    paper: {
        width: "50%",
        paddingBottom: 16,
        paddingLeft: 8,
        paddingRight: 8,
        [theme.breakpoints.down("md")]: {
            width: "initial"
        }
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
