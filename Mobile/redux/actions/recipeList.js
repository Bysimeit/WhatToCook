import { ADD_RECIPE, SET_RECIPES } from "./actionsType";

export function addRecipe(namerecipe, time, total, quoting, picture) {
    return {
        type: ADD_RECIPE,
        payload: {namerecipe, time, total, quoting, picture}
    };
}

export function setRecipes(recipes) {
    return {
        type: SET_RECIPES,
        payload: {recipes}
    }
}