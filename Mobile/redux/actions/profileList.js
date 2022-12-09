import { SET_PROFILE } from "./actionsType";

export function setProfile(profile) {
    return {
        type: SET_PROFILE,
        payload: {profile}
    }
}