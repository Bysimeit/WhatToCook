import { ADD_FOOD, DELETE_FOOD } from "../actions/actionsType";

initialState = [{id: 0, title: "Add new food", quantity: 2, weight: 150, expirationDate: "20/12/2022"}];

export const foodList = (state = initialState, action) => {
    switch(action.type) {
        case ADD_FOOD:
            return [...state, {
                id: state.length,
                title: action.payload.title,
                quantity: action.payload.quantity,
                weight: action.payload.weight,
                expirationDate: action.payload.expirationDate
            }];
        case DELETE_FOOD:
            return state.filter(t=>t.id!==action.payload.id);
        default:
            return state;
    }
}