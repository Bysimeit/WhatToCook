import { ADD_RECIPE } from "../actions/actionsType";

initialState = [
    {id: 0, title: "Tiramusu", time: 30, price: 10, rate: 3, urlImage: "https://assets.afcdn.com/recipe/20161123/1509_w1024h1024c1cx1920cy2880.jpg"},
    {id: 1, title: "Lasagne", time: 50, price: 20, rate: 4, urlImage: "https://images.radio-canada.ca/v1/alimentation/recette/4x3/lasagne-25129.jpg"},
    {id: 2, title: "Salade grecque", time: 25, price: 15, rate: 5, urlImage: "https://assets.afcdn.com/recipe/20190704/94668_w1024h1024c1cx2736cy1824.jpg"}
];

export const recipeList = (state = initialState, action) => {
    switch(action.type) {
        case ADD_RECIPE:
            return [...state, {
                id: state.length,
                title: action.payload.title,
                time: action.payload.time,
                weight: action.payload.weight,
                rate: action.payload.rate,
                urlImage: action.payload.urlImage
            }];
        default:
            return state;
    }
}