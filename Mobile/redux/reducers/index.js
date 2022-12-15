import { combineReducers } from "redux";
import { foodList } from "./foodList";
import { recipeList } from "./recipeList";
import { profileList } from "./profileList";
import { connectedStatus } from "./connectedStatus";
import { allergyList } from "./allergyList";

export const rootReducers = combineReducers({
    foodList,
    recipeList,
    profileList,
    connectedStatus,
    allergyList
});
