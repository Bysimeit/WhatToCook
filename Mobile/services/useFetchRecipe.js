import axios from "react-native-axios";

import { IP_API } from "./config";

export default function useFetchRecipe() {
    const recipeFetch = async () => {
        const response = await axios.get(`${IP_API}/recipe`);

        return {status: response.status, data: response.data};
    };

    const recipeDataFetch = async (id) => {
        const response = await axios.get(`${IP_API}/recipe/${id}`);

        return {status: response.status, data: response.data};
    };

    const randomRecipeFetch = async () => {
        const response = await axios.get(`${IP_API}/randomrecipe`);

        return {status: response.status, data: response.data};
    };

    const recipeSearchFetch = async (type, time, allergies) => {
        const response = await axios.get(`${IP_API}/recipe?type=${type}&time=${time}&allergies=${allergies}`);

        return {status: response.status, data: response.data};
    };
    
    return {
        recipeFetch,
        recipeDataFetch,
        randomRecipeFetch,
        recipeSearchFetch
    };
}