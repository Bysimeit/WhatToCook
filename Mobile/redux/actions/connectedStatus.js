import { ADD_CONNECTED, SET_CONNECTED } from "./actionsType";

export function addConnected(id, status) {
    return {
        type: ADD_CONNECTED,
        payload: {id, status}
    };
}

export function setConnected(connected) {
    return {
        type: SET_CONNECTED,
        payload: {connected}
    };
}