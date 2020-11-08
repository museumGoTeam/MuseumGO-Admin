import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Panel from "../components/Panel/Panel";
import Canvas from "../components/Canvas/Canvas";
import { useGetMap } from "../hooks/useMapReq";
import { CANVAS_HEIGHT, CANVAS_WIDTH } from "../constants";


const useStyles = makeStyles((theme) => ({

}));

export default function MapP() {
  const classes = useStyles();
  const loading = useGetMap();

  if (loading) return <p>The map is going to be loaded ...</p>;

  return (
    <div>
      <Panel />
      <Canvas width={CANVAS_WIDTH} height={CANVAS_HEIGHT} />
    </div>
  );
}
