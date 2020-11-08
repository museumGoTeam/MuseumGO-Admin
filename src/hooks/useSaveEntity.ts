import { message } from "antd";
import { IPOI, IPos, IRoom } from "../components/Canvas/types";
import { TEntityNumber } from "../constants/types";
import { useDispatch } from "../container/store";
import { useGetPoi, useGetRoom } from "./useGetEntity";

export function useSaveEntity(
  entityNumber: TEntityNumber,
  pos: IPos
): () => boolean {
  const dispatch = useDispatch();
  const getPoi = useGetPoi()
  const getRoom = useGetRoom()

  const saveEntity = () => {
    let value: string | null = null;
    if (entityNumber === 2) {
      value = window.prompt("Point of interest name");
      if (value && value.length > 0) {
        const isExist = getPoi({name: value, type: "name"})
        if (isExist) {
          message.error("The point of interest already exist")
          return false
        }
        dispatch({ type: "ON_POI_INSERT", payload: { name: value, pos } });
        return true
      }
      return false
    }
    else if (entityNumber === 3) {
      value = window.prompt("Room label");
      if (value && value.length > 0) {
        const isExist = getRoom({type: "name", name: value})
        if (isExist) {
          message.error("The point of interest already exist")
          return false
        }
        dispatch({ type: "ON_ROOM_INSERT", payload: { label: value, pos } });
        return true
      }
      return false
    }
    return false
  };

  return saveEntity;
}
