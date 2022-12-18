import axios from "react-native-axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { errorMessage } from "../utils/errorMessage";

import { IP_API } from "./config";

export default function useFetchFavorite() {
    const customerFavoriteFetch = async (idCustomer) => {
        try {
            const token = await AsyncStorage.getItem("token");
            const response = await axios.get(`${IP_API}/favorite/${idCustomer}`, { headers: {'Authorization': `Bearer ${token}` }});
    
            return {status: response.status, data: response.data};
        } catch (e) {
            const message = errorMessage(
                e.response.status,
                e.response.data,
                "Récupération des favoris de l'utilisateur"
            );

            throw new Error(message);
        }
    };

    const changeCustomerFavorite = async (idCustomer, idRecipe, isFavorite) => {
        try { 
            const token = await AsyncStorage.getItem("token");
            const response = await axios.patch(`${IP_API}/favorite`, {
                "idCustomer": idCustomer,
                "idRecipe": idRecipe,
                "isFavorite": isFavorite
            }, { headers: {'Authorization': `Bearer ${token}` }});
    
            return {status: response.status, data: response.data};
        } catch (e) {
            const message = errorMessage(
                e.response.status,
                e.response.data,
                "Changement de favoris"
            );

            throw new Error(message);
        }
    };

    return {
        customerFavoriteFetch,
        changeCustomerFavorite
    };
}