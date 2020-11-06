import React from 'react'
import Grid from '@material-ui/core/Grid'
import CssBaseline from '@material-ui/core/CssBaseline'
import Panel from './components/Panel/Panel'
import Canvas from './components/Canvas/Canvas'
import { CANVAS_WIDTH, CANVAS_HEIGHT } from './constants'
import { useGetMap } from './hooks/useMapReq'


export default function App() {
  const getMap = useGetMap()

  React.useEffect(() => {
    getMap()
  }, [])

  return (
    <Grid container direction="column">
      <CssBaseline />
      <Panel />
      <Canvas width={CANVAS_WIDTH} height={CANVAS_HEIGHT} />
    </Grid>
  )
}



