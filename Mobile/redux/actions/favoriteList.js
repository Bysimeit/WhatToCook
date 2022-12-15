import { ADD_FAVORITE, SET_FAVORITE, DELETE_FAVORITE } from "./actionsType";

export function addFavorite(id, namerecipe, time, total, quoting, picture) {
    return {
        type: ADD_FAVORITE,
        payload: {id, namerecipe, time, total, quoting, picture}
    };
}

export function setFavorite(favorites) {
    return {
        type: SET_FAVORITE,
        payload: {favorites}
    }
}

export function deleteFavorite(id) {
    return {
        type: DELETE_FAVORITE,
        payload: {id}
    }
}