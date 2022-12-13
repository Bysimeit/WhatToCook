import axios from "react-native-axios";
import AsyncStorage from '@react-native-async-storage/async-storage';

import { IP_API } from "./config";

export default function useFetchAllergy() {
    const allAllergyFetch = async () => {
        const response = await axios.get(`${IP_API}/allergy`);

        return {status: response.status, data: response.data};
    };

    const customerAllergyFetch = async (idCustomer) => {
        const token = await AsyncStorage.getItem("token");
        const response = await axios.get(`${IP_API}/customerAllergy/${idCustomer}`,
        { headers: {'Authorization': `Bearer ${token}`}});

        return {status: response.status, data: response.data};
    };

    const customerChangeAllergy = async (idCustomer, idAllergies) => {
        const token = await AsyncStorage.getItem("token");
        const response = await axios.post(`${IP_API}/customerAllergy`, {
            "idCustomer": idCustomer,
            idAllergies
        }, { headers: {'Authorization': `Bearer ${token}` }});

        return {status: response.status};
    };

    return {
        allAllergyFetch,
        customerAllergyFetch,
        customerChangeAllergy
    };
}