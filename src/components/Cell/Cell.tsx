import React from "react";
import Tooltip from "@material-ui/core/Tooltip";
import useCellStyle from "../../hooks/useCellStyle";
import { useSaveEntity } from "../../hooks/usePrompt";
import { useStore } from "../../container/store";
import { ICell } from "../Canvas/types";
import {useGetPoi, useGetRoom} from "../../hooks/useGetEntity";

type CellProps = ICell;

export default function Cell(props: CellProps) {
  const { appState, dispatch } = useStore();
  const style = useCellStyle({ cell: props });
  const saveEntity = useSaveEntity();
  const poi = useGetPoi(props.originPos)
  const room = useGetRoom(props.originPos)

  const assignType = () =>
    dispatch({ type: "ON_CELL_ASSIGN", payload: props.originPos });
  const onClick = () => {
    if ([2, 3].includes(appState.entitySelected)) {
      saveEntity(appState.entitySelected, props.originPos);
    }
    assignType();
  };
  const checkEntity = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (e.buttons === 1 && [0, 1].includes(appState.entitySelected))
      assignType();
  };



  return (
    <Tooltip title={poi ? poi.name : room ? room.qrcode : ""} disableHoverListener={!poi && !room}>
      <div style={style} onClick={onClick} onMouseEnter={checkEntity} />
    </Tooltip>
  );
}
