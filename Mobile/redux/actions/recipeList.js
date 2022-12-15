import { ADD_RECIPE, SET_RECIPES } from "./actionsType";

export function addRecipe(id, namerecipe, time, total, quoting, picture) {
    return {
        type: ADD_RECIPE,
        payload: {id, namerecipe, time, total, quoting, picture}
    };
}

export function setRecipes(recipes) {
    return {
        type: SET_RECIPES,
        payload: {recipes}
    }
}