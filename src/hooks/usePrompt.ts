import { IPos } from "../components/Canvas/types";
import { TEntityNumber } from "../constants/types";
import { useDispatch } from "../container/store";

export function useSaveEntity(): (entityNumber: TEntityNumber, pos: IPos) => void {
  const dispatch = useDispatch()
  return (entityNumber, pos) => {
    let value: string | null = null;
    if (entityNumber == 2) value = window.prompt("Point of interest name", undefined);
    if (entityNumber == 3 ) value = window.prompt("Room QR code", undefined);

    if (value !== null && entityNumber == 2) {
      dispatch({type: "ON_POI_INSERT", payload: {name: value, pos }})
      // TODO:  Insert to database
    } else if (value !== null && entityNumber == 3) {
      dispatch({type: "ON_ROOM_INSERT", payload: {qrcode: value, pos }})
      //TODO: Insert to database
    }

    return value
  };
}
