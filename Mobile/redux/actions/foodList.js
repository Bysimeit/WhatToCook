import { ADD_FOOD, DELETE_FOOD, SET_FOOD } from "./actionsType";

export function addFood(name, quantity, weight, expirationDate) {
    return {
	    type: ADD_FOOD,
   		payload: {name, quantity, weight, expirationDate}
    };
}

export function deleteFood(id) {
    return {
	    type: DELETE_FOOD,
   		payload: {id}
    };
}

export function setFood(foods) {
    return {
        type: SET_FOOD,
        payload: {foods}
    };
}
