import { IPOI, IPos, IRoom } from "../components/Canvas/types";
import { useAppState } from "../container/store";

export function useGetPoi(pos: IPos): () => IPOI | undefined {
    const appState = useAppState()
    return () => appState.pois.find(poi => poi.pos.x == pos.x && poi.pos.y == pos.y)
}

export function useGetRoom(pos: IPos): () => IRoom | undefined {
    const appState = useAppState()
    return () => appState.rooms.find(room => room.pos.x == pos.x && room.pos.y == pos.y)
}