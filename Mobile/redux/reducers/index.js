import { combineReducers } from "redux";
import { foodList } from "./foodList";
import { recipeList } from "./recipeList";
import { profileList } from "./profileList";

export const rootReducers = combineReducers({
    foodList,
    recipeList,
    profileList
});
