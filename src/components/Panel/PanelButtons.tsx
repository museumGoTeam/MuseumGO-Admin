import React from "react";
import makeStyles from '@material-ui/core/styles/makeStyles'
import PanelButton from "./PanelButton";
import { useDispatch } from "../../container/store";
import { TEntityNumber } from "../../constants/types";
import Button from "../UI/Button";


const useStyles = makeStyles(theme => ({
    rootPanelButtons: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        [theme.breakpoints.down("sm")]: {
            flexDirection: "column",
            alignSelf: "flex-start",
        }
    }
}))

type PanelButtonsProps = {
  onSave: () => void;
};

export default function PanelButtons({ onSave }: PanelButtonsProps) {
  const classes = useStyles()
  const dispatch = useDispatch();

  const onSelect = (entityNumber: TEntityNumber) => {
    dispatch({ type: "ON_ENTITY_SELECT", payload: entityNumber });
  };

  return (
    <div className={classes.rootPanelButtons}>
      <PanelButton
        label="FLOOR"
        description="Draw a floor in the grid"
        indicatorColor="#d1d1d1"
        entityNumber={0}
        onSelect={onSelect}
      />
      <PanelButton
        label="WALL"
        description="Draw a wall in the grid"
        indicatorColor="black"
        entityNumber={1}
        onSelect={onSelect}
      />
      <PanelButton
        label="POINT OF INTEREST"
        description="Insert a point of interest in the grid"
        indicatorColor="red"
        entityNumber={2}
        onSelect={onSelect}
      />
      <PanelButton
        label="ROOM"
        description="Insert a room qr code in the grid"
        indicatorColor="green"
        entityNumber={3}
        onSelect={onSelect}
      />
      <PanelButton
        label="DOOR"
        description="Insert a door in the grid"
        indicatorColor="brown"
        entityNumber={4}
        onSelect={onSelect}
      />
      <Button label="SAVE" color="primary" onClick={onSave} />
    </div>
  );
}
