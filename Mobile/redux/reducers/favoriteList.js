import { ADD_FAVORITE, SET_FAVORITE, DELETE_FAVORITE } from "../actions/actionsType";

initialStateFavorite = [];

export const favoriteList = (state = initialStateFavorite, action) => {
    switch(action.type) {
        case ADD_FAVORITE:
            return [...state, {
                id: action.payload.id,
                namerecipe: action.payload.namerecipe,
                time: action.payload.time,
                total: action.payload.total,
                quoting: action.payload.quoting,
                picture: action.payload.picture,
                price: action.payload.price
            }];
        case SET_FAVORITE:
            state = action.payload.favorites;
            return state;
        case DELETE_FAVORITE:
            return state.filter(t=>t.id!==action.payload.id);
        default:
            return state;
    }
}