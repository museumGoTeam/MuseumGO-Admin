import React, { createContext, PropsWithChildren, useContext, useReducer } from "react";
import reducer from "./reducer";
import { IAction, IAppState, TActionsType, TPayloadType } from "./types";

const initialValue: IAppState = {
  map: [],
  originPosSelected: undefined,
  poiPosSelected: undefined,
  entitySelected: 1,
  isPoiFormOpen: false,
  pois: []
};

const context = createContext<{
  appState: IAppState;
  dispatch: React.Dispatch<IAction>;
}>({ appState: initialValue, dispatch: () => null });

export const useAppState = () => {
  const { appState } = useContext(context);
  return appState;
};

export const useDispatch = () => {
  const { dispatch } = useContext(context);
  return dispatch;
};

export const useStore = () => {
  return useContext(context);
};

export default function StoreProvider({ children } : PropsWithChildren<any>) {
    const [appState, dispatch] = useReducer(reducer, initialValue)

    return <context.Provider value={{appState, dispatch}}>{children}</context.Provider>
}
