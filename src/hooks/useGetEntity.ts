import { IPOI, IPos, IRoom } from "../components/Canvas/types";
import { useAppState } from "../container/store";

interface IParams {
    pos?: IPos,
    name?: string,
    type?: "pos" | "name"
}

export function useGetPoi(): ({pos, type}: IParams) => IPOI | undefined {
    const appState = useAppState()

    return ({pos, name, type, }) => {
        if (type === "pos" && pos) return appState.pois.find(poi => poi.pos.x === pos.x && poi.pos.y === pos.y)
        else if (type === "name" && name ) return appState.pois.find(poi => poi.name === name)
        else return undefined
    }
}

export function useGetRoom(): (params: IParams) => IRoom | undefined {
    const appState = useAppState()
    return ({pos, name, type}) => {
      if (type === "pos" && pos) return appState.rooms.find(room => room.pos.x === pos.x && room.pos.y === pos.y)
      else if (type === "name" && name) return appState.rooms.find(room => room.label === name )
      else return undefined
    }
}