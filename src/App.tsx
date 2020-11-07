import React from 'react'
import Grid from '@material-ui/core/Grid'
import CssBaseline from '@material-ui/core/CssBaseline'
import Panel from './components/Panel/Panel'
import Canvas from './components/Canvas/Canvas'
import { CANVAS_WIDTH, CANVAS_HEIGHT } from './constants'
import { useGetMap } from './hooks/useMapReq'
import { useAppState } from './container/store'


export default function App() {
  const loading = useGetMap()
  const appState = useAppState()
  if (loading) return <p>The map is going to be loaded ...</p>

  console.log("ROOMS: ",appState.rooms)
  console.log("POIS: ",appState.pois)

  return (
    <Grid container direction="column">
      <CssBaseline />
      <Panel />
      <Canvas width={CANVAS_WIDTH} height={CANVAS_HEIGHT} />
    </Grid>
  )
}



