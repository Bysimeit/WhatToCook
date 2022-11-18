import { ADD_FOOD, DELETE_FOOD } from "./actionsType";

export function addFood(title, quantity, weight, expirationDate) {
    return {
	    type: ADD_FOOD,
   		payload: {title, quantity, weight, expirationDate}
    };
}

export function deleteFood(id) {
    return {
	    type: DELETE_FOOD,
   		payload: {id}
    };
}
