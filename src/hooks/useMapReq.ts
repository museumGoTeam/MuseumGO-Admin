import React from "react";
import axios from "axios";
import { TEntityNumber } from "../constants/types";
import { useDispatch } from "../container/store";

export function useGetMap(): boolean {
  const [loading, setLoading] = React.useState(true);
  const dispatch = useDispatch();

  React.useEffect(() => {
    const getMap = async () => {
      const map: TEntityNumber[][] = (await axios.get("/map")).data;
      dispatch({ type: "ON_INIT", payload: map });
      setLoading(false)
    };
    getMap()
  }, []);

  return loading;
}
