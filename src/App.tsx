import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Grid from "@material-ui/core/Grid";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from '@material-ui/core/Typography'
import Panel from "./components/Panel/Panel";
import Canvas from "./components/Canvas/Canvas";
import { CANVAS_WIDTH, CANVAS_HEIGHT } from "./constants";
import { useGetMap } from "./hooks/useMapReq";

const useStyles = makeStyles((theme) => ({
  appRoot: {
    background:
      "linear-gradient(171deg, rgba(175,16,85,1) 0%, rgba(86,1,86,1) 100%)",
    height: "100vh",
  },
  title: {
    color: "white",
    fontWeight: "bold",
    marginBottom: 16
  }
}));

export default function App() {
  const classes = useStyles();
  const loading = useGetMap();

  if (loading) return <p>The map is going to be loaded ...</p>;

  return (
    <Grid container direction="column" alignItems="center" className={classes.appRoot}>
      <CssBaseline />
      <Typography variant="h4" className={classes.title}>MuseumGO Administrator Panel </Typography>
      <Panel />
      <Canvas width={CANVAS_WIDTH} height={CANVAS_HEIGHT} />
    </Grid>
  );
}
