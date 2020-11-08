import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import CssBaseline from '@material-ui/core/CssBaseline'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'

const useStyles = makeStyles((theme) => ({
  layoutRoot: {
    background:
      "linear-gradient(171deg, rgba(175,16,85,1) 0%, rgba(86,1,86,1) 100%)",
    height: "100vh",
  },
  title: {
    color: "white",
    fontWeight: "bold",
    marginBottom: 16,
  },
}));

export default function Layout({ children } : React.PropsWithChildren<any>) {
  const classes = useStyles()
  return (
    <Grid container direction="column" alignItems="center" className={classes.layoutRoot}>
        <CssBaseline />
        <Typography variant="h4" className={classes.title}>MuseumGO Administrator Panel </Typography>
        {
            children
        }
    </Grid>
  )


};

