import React from 'react'
import Grid from '@material-ui/core/Grid'
import CssBaseline from '@material-ui/core/CssBaseline'
import Panel from './components/Panel/Panel'


export default function App() {
  return (
    <Grid container direction="column">
      <CssBaseline />
      <Panel />
    </Grid>
  )
}



