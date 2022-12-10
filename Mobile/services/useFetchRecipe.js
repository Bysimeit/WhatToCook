import axios from "react-native-axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

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

    /*
    const randomRecipeFetch = async () => {
        const response = await 
    };
    */
    
    return {
        recipeFetch,
        recipeDataFetch
        //randomRecipeFetch
    };
};