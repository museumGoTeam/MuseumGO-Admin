import axios from "axios";
import { TEntityNumber } from "../constants/types";
import { useDispatch } from "../container/store";

export function useGetMap() {
  const dispatch = useDispatch();
  return async () => {
    const map: TEntityNumber[][] = (await axios.get("/map")).data;
    dispatch({ type: "ON_INIT", payload: map });
  };
}
