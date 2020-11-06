import React from 'react'
import makeStyles from "@material-ui/core/styles/makeStyles";
import { useAppState } from '../../container/store';

const useStyles = makeStyles((theme) => ({
    root: ({ width, height }: { width: number; height: number }) => ({
      width,
      height,
      position: "relative",
      marginRight: 64,
    }),
  }));

type CanvasProps = {
    width: number,
    height: number
}

export default function Canvas({ width, height }: CanvasProps) {
    const classes = useStyles({ width, height });
    const appState = useAppState()

    
    return (
        <div>
            
        </div>
    )
}
