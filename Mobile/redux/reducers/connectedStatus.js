import { ADD_CONNECTED, SET_CONNECTED } from "../actions/actionsType";

initialConnection = [];

export const connectedStatus = (state = initialConnection, action) => {
    switch(action.type) {
        case ADD_CONNECTED:
            return [...state, {
                id: action.payload.id,
                status: action.payload.status
            }];
        case SET_CONNECTED:
            return state = action.payload.connected;
        default:
            return state; 
    }
}