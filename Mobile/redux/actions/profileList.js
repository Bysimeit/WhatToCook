import { ADD_PROFILE, SET_PROFILE } from "./actionsType";

export function addProfile(name, firstname, email) {
    return {
        type: ADD_PROFILE,
        payload: {name, firstname, email}
    };
}

export function setProfile(profile) {
    return {
        type: SET_PROFILE,
        payload: {profile}
    }
}