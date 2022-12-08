import axios from "react-native-axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { IP_API } from "./config";

export default function useFetchFridge() {
    const foodFetch = async (id) => {
        const token = await AsyncStorage.getItem("token");
        const response = await axios.get(`${IP_API}/fridge/${id}`, { headers: {'Authorization': `Bearer ${token}` }});

        return {status: response.status, data: response.data};
    };

    const addFoodFetch = async (idCustomer, nameFood, quantity, weight) => {
        const token = await AsyncStorage.getItem("token");
        const response = await axios.post(`${IP_API}/fridge`, {
            "idCustomer": idCustomer,
            "nameFood": nameFood,
            "quantity": quantity,
            "weight": weight
        }, { headers: {'Authorization': `Bearer ${token}` }});

        return {status: response.status};
    };

    const deleteFoodFetch = async (idCustomer, idFood) => {
        const token = await AsyncStorage.getItem("token");
        const response = await axios.delete(`${IP_API}/fridge`, {
            "idCustomer": idCustomer,
            "idFood": idFood
        }, { headers: {'Authorization': `Bearer ${token}` }});

        return {status: response.status};
    };

    return {
        foodFetch,
        addFoodFetch,
        deleteFoodFetch
    };
}