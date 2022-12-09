import { ADD_PROFILE, SET_PROFILE } from "../actions/actionsType";

initialStateProfile = [];

export const profileList = (state = initialStateProfile, action) => {
    switch (action.type) {
        case ADD_PROFILE:
            return [...state, {
                name: action.payload.name,
                firstname: action.payload.firstname,
                email: action.payload.email
            }]
        case SET_PROFILE:
            state = action.payload.recipes
            return state;
        default:
            return state;
    }
};