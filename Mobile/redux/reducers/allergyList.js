import { ADD_ALLERGY, SET_ALLERGY } from "../actions/actionsType";

initialAllergy = [];

export const allergyList = (state = initialAllergy, action) => {
    switch(action.type) {
        case ADD_ALLERGY:
            return [...state, {
                id: action.payload.id,
                status: action.payload.status
            }];
        case SET_ALLERGY:
            return state = action.payload.allergies;
        default:
            return state;
    }
}