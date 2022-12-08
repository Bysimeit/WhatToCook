import { ADD_RECIPE, SET_RECIPES } from "../actions/actionsType";

initialStateRecipe = [];

export const recipeList = (state = initialStateRecipe, action) => {
    switch(action.type) {
        case ADD_RECIPE:
            return [...state, {
                id: state.length,
                namerecipe: action.payload.namerecipe,
                time: action.payload.time,
                total: action.payload.total,
                quoting: action.payload.quoting,
                picture: action.payload.picture
            }];
        case SET_RECIPES:
            state = action.payload.recipes;
            return state;
        default:
            return state;
    }
}