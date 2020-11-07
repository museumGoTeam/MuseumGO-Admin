import React from "react";
import { ICell } from "../components/Canvas/types";
import { CELL_SIZE } from "../constants";
import { TEntityNumber } from "../constants/types";

export default function useCellStyle({
  cell,
}: {
  cell: ICell;
}): React.CSSProperties {

  const { entity, relativePos } = cell;

  return {
    position: "absolute",
    width: CELL_SIZE,
    height: CELL_SIZE,
    left: relativePos.x,
    top: relativePos.y,
    border: "1px solid black",
    backgroundColor: useRenderEntityColor(entity)
  };
}

function useRenderEntityColor(entity: TEntityNumber): string {
  switch (entity) {
    case 0:
      return "#d1d1d1";
    case 1:
      return "#000000";
    case 2:
      return "#ff0000";
    case 3:
      return "#00ff00";
  }
}
