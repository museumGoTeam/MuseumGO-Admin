import { TEntityNumber } from "../constants/types";
import { IAction, IAppState } from "./types";


export default function reducer(state: IAppState, action: IAction): IAppState {
    switch(action.type) {
        case "ON_INIT":
            console.log("Coucou")
            const map = action.payload as TEntityNumber[][]
            return {...state, map}
    }
}