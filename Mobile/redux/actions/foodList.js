import { ADD_FOOD, DELETE_FOOD, SET_FOOD } from "./actionsType";

export function addFood(id, name, quantity, weight, date) {
    return {
	    type: ADD_FOOD,
   		payload: {id, name, quantity, weight, date}
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
