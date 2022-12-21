import axios from "react-native-axios";
import { errorMessage } from "../utils/errorMessage";

import { IP_API } from "./config";

export default function useFetchRecipe() {
    const recipeFetch = async () => {
        try {
            const response = await axios.get(`${IP_API}/recipe`);

            return {status: response.status, data: response.data};
        } catch (e) {
            const message = errorMessage(
                e.response.status,
                e.response.data,
                "Récupération recette"
            );

            throw new Error(message);
        }
    };

    const recipeDataFetch = async (id) => {
        try {
            const response = await axios.get(`${IP_API}/recipe/${id}`);

            return {status: response.status, data: response.data};
        } catch (e) {
            const message = errorMessage(
                e.response.status,
                e.response.data,
                "Récupération détail recette"
            );

            throw new Error(message);
        }
    };

    const randomRecipeFetch = async () => {
        try {
            const response = await axios.get(`${IP_API}/randomrecipe`);

            return {status: response.status, data: response.data};
        } catch (e) {
            const message = errorMessage(
                e.response.status,
                e.response.data,
                "Récupération recette aléatoire"
            );

            throw new Error(message); 
        }
    };

    const recipeSearchFetch = async (type, time, allergies, foods) => {
        try {
            const response = await axios.get(`${IP_API}/recipe?type=${type}&time=${time}&allergies=${allergies}&foods=${foods}`);

            return {status: response.status, data: response.data};
        } catch (e) {
            const message = errorMessage(
                e.response.status,
                e.response.data,
                "Recette"
            );

            throw new Error(message); 
        }
    };
    
    return {
        recipeFetch,
        recipeDataFetch,
        randomRecipeFetch,
        recipeSearchFetch
    };
}