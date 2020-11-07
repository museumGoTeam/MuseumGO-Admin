import React from "react";
import axios from "axios";
import { useDispatch } from "../container/store";
import { APIResGetMap } from "../type";

export function useGetMap(): boolean {
  const [loading, setLoading] = React.useState(true);
  const dispatch = useDispatch();

  React.useEffect(() => {
    const getMap = async () => {
      const res: APIResGetMap = (await axios.get("/map")).data;
      dispatch({ type: "ON_INIT", payload: res });
      setLoading(false)
    };
    getMap()
  }, []);

  return loading;
}
