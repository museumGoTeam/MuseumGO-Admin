import React from "react";
import Tooltip from "@material-ui/core/Tooltip";
import useCellStyle, {renderEntityColor} from "../../hooks/useCellStyle";
import { useSaveEntity } from "../../hooks/useSaveEntity";
import { useStore } from "../../container/store";
import { ICell } from "../Canvas/types";
import { useGetPoi, useGetRoom } from "../../hooks/useGetEntity";
import {useHistory} from 'react-router-dom'
import { TEntityNumber } from "../../constants/types";
import Axios from "axios";
import { APIRes } from "../../type";

type CellProps = ICell;

export default function Cell(props: CellProps) {
  const { appState, dispatch } = useStore();
  const [styleDrag, setStyleDrag] = React.useState<React.CSSProperties | undefined>(undefined)
  const style = useCellStyle({ cell: props })
  const saveEntity = useSaveEntity(appState.entitySelected, props.originPos);
  const getPoi = useGetPoi();
  const getRoom = useGetRoom();
  const history = useHistory()


  const assignType = (entityToAssign: TEntityNumber, isDropping: boolean) =>
    dispatch({ type: "ON_CELL_ASSIGN", payload: {entityToAssign, pos: props.originPos, isDropping} });


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
    isSaved && assignType(appState.entitySelected, false);
  };
  const checkEntity = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if(e.buttons === 2 && [6].includes(appState.entitySelected) && appState.entityDragging) {
      setStyleDrag({...style, backgroundColor: renderEntityColor(2)})
    }
    if (e.buttons === 1 && ![2,3].includes(appState.entitySelected))
      assignType(appState.entitySelected, false);
  };
  const onDragBegin = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if ([6].includes(appState.entitySelected) && e.buttons === 2 ) {
      const poi = getPoi({type: "pos", pos: props.originPos})
      poi && dispatch({type: "ON_ENTITY_BEGIN_DRAG", payload: poi })
    }
  }

  const onMouseLeaveDrag = () => {
    if (appState.entityDragging) {
      setStyleDrag({...style, backgroundColor: renderEntityColor(props.entity) })
    }

  }

  const onDrop = async () => {
    if (appState.entityDragging) {
      assignType(2, true)
    }
  }


  if (props.entity === 2) {
    console.log(props.originPos)
  }

  if ([2, 3].includes(props.entity)) {
    let room;
    const poi = getPoi({pos: props.originPos, type:"pos"});
    if (!poi) room = getRoom({pos: props.originPos, type: "pos"});
    if (poi || room) {
      return (
        <Tooltip title={room ? room.label : poi ? poi.name : ""}>
          <div style={style} onClick={onClick} onMouseEnter={checkEntity} onMouseDown={onDragBegin} />
        </Tooltip>
      );
    }
  }

  return <div style={{...style, ...(appState.entityDragging ? styleDrag : {})}} onClick={onClick} onMouseEnter={checkEntity} onMouseUp={onDrop} onMouseLeave={onMouseLeaveDrag} />;
}
