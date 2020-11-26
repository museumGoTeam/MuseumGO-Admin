import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Tooltip from "@material-ui/core/Tooltip";
import Button from "../UI/Button";
import { TEntityNumber } from "../../constants/types";
import { useAppState } from "../../container/store";

const useStyles = makeStyles((theme) => ({
  buttonWrapper: {
    [theme.breakpoints.up("sm")]: {
      marginRight: 4,
      marginLeft: 4,
    },
    [theme.breakpoints.down("sm")]: {
      marginTop: 4,
      marginBottom:4
    }
  },
  button: ({
    color,
    selected,
  }: {
    color: string;
    selected: boolean | undefined;
  }) => ({
    backgroundColor: selected ? color : "white",
    color: !selected ? color : "white",
    "&:hover": {
      backgroundColor: selected ? color : "white",
    },
  }),

}));

type PanelButtonProps = {
  label: string;
  description: string;
  indicatorColor: string;
  entityNumber: TEntityNumber;
  onSelect: (entityNumber: TEntityNumber) => void;
};

export default function PanelButton({
  label,
  description,
  indicatorColor,
  entityNumber,
  onSelect,
}: PanelButtonProps) {
  const appState = useAppState();
  const entitySelected = appState.entitySelected;

  const classes = useStyles({
    color: indicatorColor,
    selected: entitySelected === entityNumber,
  });

  return (
    <Tooltip title={description} className={classes.buttonWrapper}>
      <div>
        <Button
          variant="text"
          label={label}
          onClick={() => onSelect(entityNumber)}
          className={classes.button}
        />
      </div>
    </Tooltip>
  );
}
