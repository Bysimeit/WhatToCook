import { ADD_FOOD, DELETE_FOOD, SET_FOOD } from "../actions/actionsType";

initialStateFood = [];

export const foodList = (state = initialStateFood, action) => {
    switch(action.type) {
        case ADD_FOOD:
            return [...state, {
                id: state.length,
                name: action.payload.name,
                quantity: action.payload.quantity,
                weight: action.payload.weight,
                date: action.payload.date
            }];
        case DELETE_FOOD:
            return state.filter(t=>t.id!==action.payload.id);
        case SET_FOOD:
            return state = action.payload.foods;
        default:
            return state;
    }
}