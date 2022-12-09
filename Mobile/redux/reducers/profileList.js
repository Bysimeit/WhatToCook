import { SET_PROFILE } from "../actions/actionsType";

initialStateProfile = [];

export const profileList = (state = initialStateProfile, action) => {
    switch (action.type) {
        case SET_PROFILE:
            state = action.payload.recipes
            return state;
        default:
            return state;
    }
};