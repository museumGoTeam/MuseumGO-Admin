import React from "react";
import Panel from "../components/Panel/Panel";
import Canvas from "../components/Canvas/Canvas";
import { useGetMap } from "../hooks/useMapReq";
import { CANVAS_HEIGHT, CANVAS_WIDTH } from "../constants";
import { useAppState } from "../container/store";



export default function MapP() {
  const appState = useAppState()
  const loading = useGetMap();

  if (loading) return <p>The map is going to be loaded ...</p>;

  console.log(appState.pois)


  return (
    <div>
      <Panel />
      <Canvas width={CANVAS_WIDTH} height={CANVAS_HEIGHT} />
    </div>
  );
}
