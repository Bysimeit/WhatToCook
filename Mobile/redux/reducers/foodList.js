import { ADD_FOOD, DELETE_FOOD } from "../actions/actionsType";

initialStateFood = [
    {id: 0, title: "Salade", quantity: 2, weight: 150, expirationDate: "20/12/2022"},
    {id: 1, title: "Oeuf", quantity: 4, weight: 0, expirationDate: "20/12/2022"}
];

export const foodList = (state = initialStateFood, action) => {
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