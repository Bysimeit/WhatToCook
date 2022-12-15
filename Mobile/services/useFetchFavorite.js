import axios from "react-native-axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { IP_API } from "./config";

export default function useFetchFavorite() {
    const customerFavoriteFetch = async (idCustomer) => {
        const token = await AsyncStorage.getItem("token");
        const response = await axios.get(`${IP_API}/favorite/${idCustomer}`, { headers: {'Authorization': `Bearer ${token}` }});

        return {status: response.status, data: response.data};
    };

    return {
        customerFavoriteFetch
    };
}