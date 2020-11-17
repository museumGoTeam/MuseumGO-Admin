import React from "react";
import Tooltip from "@material-ui/core/Tooltip";
import useCellStyle from "../../hooks/useCellStyle";
import { useSaveEntity } from "../../hooks/useSaveEntity";
import { useStore } from "../../container/store";
import { ICell } from "../Canvas/types";
import { useGetPoi, useGetRoom } from "../../hooks/useGetEntity";
import {useHistory} from 'react-router-dom'

type CellProps = ICell;

export default function Cell(props: CellProps) {
  const { appState, dispatch } = useStore();
  const style = useCellStyle({ cell: props });
  const saveEntity = useSaveEntity(appState.entitySelected, props.originPos);
  const getPoi = useGetPoi();
  const getRoom = useGetRoom();
  const history = useHistory()


  const assignType = () =>
    dispatch({ type: "ON_CELL_ASSIGN", payload: props.originPos });

  const onClick = () => {
    let isSaved = true
    if (props.entity === 2) {
      const poi = getPoi({type: "pos", pos: props.originPos})
      poi && history.push(`/pointOfInterest/${poi._id}`)
      return
    } else if (props.entity === 3) {
      const room = getRoom({type: "pos", pos: props.originPos})
      room && history.push(`/room/${room._id}`)
    }
    if ([2,3].includes(appState.entitySelected)) {
      if (![2,3].includes(appState.map[props.originPos.y][props.originPos.x])) isSaved = saveEntity();
    } 
    isSaved && assignType();
  };
  const checkEntity = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (e.buttons === 1 && [0,1,5].includes(appState.entitySelected))
      assignType();
  };

  if ([2, 3].includes(props.entity)) {
    let room;
    const poi = getPoi({pos: props.originPos, type:"pos"});
    if (!poi) room = getRoom({pos: props.originPos, type: "pos"});
    if (poi || room) {
      return (
        <Tooltip title={room ? room.label : poi ? poi.name : ""}>
          <div style={style} onClick={onClick} onMouseEnter={checkEntity} />
        </Tooltip>
      );
    }
  }

  return <div style={style} onClick={onClick} onMouseEnter={checkEntity} />;
}
