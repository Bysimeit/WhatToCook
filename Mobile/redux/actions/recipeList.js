import { ADD_RECIPE } from "./actionsType";

export function addRecipe(title, time, price, rate, urlImage) {
    return {
        type: ADD_RECIPE,
        payload: {title, time, price, rate, urlImage}
    };
}