import { IPOI, IPos, IRoom } from "../components/Canvas/types";
import { TEntityNumber } from "../constants/types";
import { useDispatch } from "../container/store";
import { useGetPoi, useGetRoom } from "./useGetEntity";

export function useSaveEntity(
  entityNumber: TEntityNumber,
  pos: IPos
): () => void {
  const dispatch = useDispatch();
  const getPoi = useGetPoi()
  const getRoom = useGetRoom()
  let isPoiExist: IPOI | undefined;
  let isRoomExist: IRoom | undefined;

  





  const saveEntity = async () => {
    if (isPoiExist || isRoomExist) return;
    let value: string | null = null;
    if (entityNumber === 2) value = window.prompt("Point of interest name", undefined);
    if (entityNumber === 3) value = window.prompt("Room QR code", undefined);

    if (value !== null && entityNumber === 2) {
      dispatch({ type: "ON_POI_INSERT", payload: { name: value, pos } });
    } else if (value !== null && entityNumber === 3) {
      dispatch({ type: "ON_ROOM_INSERT", payload: { qrcode: value, pos } });
    }
  };

  return saveEntity;
}
