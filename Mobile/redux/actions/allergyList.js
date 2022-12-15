import { ADD_ALLERGY, SET_ALLERGY } from "./actionsType";

export function addAllergy(id, name) {
    return {
        type: ADD_ALLERGY,
        payload: {id, name}
    };
}

export function setAllergy(allergies) {
    return {
        type: SET_ALLERGY,
        payload: {allergies}
    };
}