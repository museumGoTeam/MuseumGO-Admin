import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import useArrayToComp from "../../hooks/useArrayToComp";

const useStyles = makeStyles((theme) => ({
  root: ({ width, height }: { width: number; height: number }) => ({
    width,
    height,
    position: "relative",
    margin: "auto",
    marginTop: 64,
  }),
}));



type CanvasProps = {
  width: number;
  height: number;
};

export default function Canvas({ width, height }: CanvasProps) {
  const classes = useStyles({ width, height });
  const cells = useArrayToComp();

  return <div className={classes.root}>{cells}</div>;
}
