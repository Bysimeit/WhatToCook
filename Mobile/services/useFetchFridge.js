import axios from "react-native-axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { errorMessage } from "../utils/errorMessage";

import { IP_API } from "./config";

export default function useFetchFridge() {
    const foodFetch = async (id) => {
        try {
            const token = await AsyncStorage.getItem("token");
            const response = await axios.get(`${IP_API}/fridge/${id}`, { headers: {'Authorization': `Bearer ${token}` }});
    
            return {status: response.status, data: response.data};
        } catch (e) {
            const message = errorMessage(
                e.response.status,
                e.response.data,
                "Erreur lors de la récupération du frigo."
            );

            throw new Error(message);
        }
    };

    const addFoodFetch = async (idCustomer, nameFood, quantity, weight, date) => {
        try {
            const token = await AsyncStorage.getItem("token");
            const response = await axios.post(`${IP_API}/fridge`, {
                "idCustomer": idCustomer,
                "nameFood": nameFood,
                "quantity": quantity,
                "weight": weight,
                "date": date
            }, { headers: {'Authorization': `Bearer ${token}` }});
    
            return {status: response.status, data: response.data};
        } catch (e) {
            const message = errorMessage(
                e.response.status,
                e.response.data,
                "Ajout d'un aliment"
            );

            throw new Error(message);
        }
    };

    const deleteFoodFetch = async (idCustomer, idFood) => {
        try {
            const token = await AsyncStorage.getItem("token");
            const response = await axios({
                method: "delete",
                url: `${IP_API}/fridge`,
                data: {
                    idCustomer,
                    idFood
                },
                headers: {'Authorization': `Bearer ${token}` }
            });
    
            return {status: response.status};
        } catch (e) {
            const message = errorMessage(
                e.response.status,
                e.response.data,
                "Suppression profil"
            );

            throw new Error(message);
        }
    };

    return {
        foodFetch,
        addFoodFetch,
        deleteFoodFetch
    };
}