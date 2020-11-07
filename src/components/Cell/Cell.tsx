import React from "react";
import Tooltip from "@material-ui/core/Tooltip";
import useCellStyle from "../../hooks/useCellStyle";
import { useSaveEntity } from "../../hooks/useSaveEntity";
import { useStore } from "../../container/store";
import { ICell } from "../Canvas/types";
import { useGetPoi, useGetRoom } from "../../hooks/useGetEntity";

type CellProps = ICell;

export default function Cell(props: CellProps) {
  const { appState, dispatch } = useStore();
  const style = useCellStyle({ cell: props });
  const saveEntity = useSaveEntity(appState.entitySelected, props.originPos);

  const getPoi = useGetPoi();
  const getRoom = useGetRoom();


  const assignType = () =>
    dispatch({ type: "ON_CELL_ASSIGN", payload: props.originPos });

  const onClick = () => {
    if ([2,3].includes(appState.entitySelected)) {
      if (![2,3].includes(appState.map[props.originPos.y][props.originPos.x]))  saveEntity();
    }
    assignType();
  };
  const checkEntity = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (e.buttons === 1 && [0, 1].includes(appState.entitySelected))
      assignType();
  };

  if ([2, 3].includes(props.entity)) {
    let room;
    const poi = getPoi(props.originPos);
    if (!poi) room = getRoom(props.originPos);

    if (poi || room) {
      return (
        <Tooltip title={room ? room.qrcode : poi ? poi.name : ""}>
          <div style={style} onClick={onClick} onMouseEnter={checkEntity} />
        </Tooltip>
      );
    }
  }

  return <div style={style} onClick={onClick} onMouseEnter={checkEntity} />;
}
