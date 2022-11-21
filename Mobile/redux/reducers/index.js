import { combineReducers } from "redux";
import { foodList } from "./foodList";
import { recipeList } from "./recipeList";

export const rootReducers = combineReducers({
    foodList,
    recipeList
});
