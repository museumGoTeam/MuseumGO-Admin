import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Button from "../UI/Button";

const useStyles = makeStyles((theme) => ({
  rootPanelButton: ({
    color,
    selected,
  }: {
    color: string;
    selected: boolean | undefined;
  }) => ({
    marginRight: 4,
    marginLeft: 4,
    backgroundColor: selected ? color : "white",
    color: !selected ? color : "white"
  }),
}));

type PanelButtonProps = {
  label: string;
  indicatorColor: string;
  selected?: boolean;
};

export default function PanelButton({
  label,
  indicatorColor,
  selected,
}: PanelButtonProps) {
  const classes = useStyles({ color: indicatorColor, selected });

  return <Button label={label} className={classes.rootPanelButton} />;
}
