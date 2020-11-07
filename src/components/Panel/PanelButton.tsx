import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Button from "../UI/Button";
import { TEntityNumber } from "../../constants/types";
import { useAppState } from "../../container/store";

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
    color: !selected ? color : "white",
    "&:hover": {
      backgroundColor: selected ? color : "white"
    }
  }),
}));

type PanelButtonProps = {
  label: string;
  indicatorColor: string;
  entityNumber: TEntityNumber;
  onSelect: (entityNumber: TEntityNumber) => void
}

export default function PanelButton({
  label,
  indicatorColor,
  entityNumber,
  onSelect
}: PanelButtonProps) {
  const appState = useAppState()
  const entitySelected = appState.entitySelected

  const classes = useStyles({ color: indicatorColor, selected: entitySelected === entityNumber });

  return <Button label={label}  onClick={() => onSelect(entityNumber)}  className={classes.rootPanelButton} />;
}
