import axios from "react-native-axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { errorMessage } from "../utils/errorMessage";

import { IP_API } from "./config";

export default function useFetchAllergy() {
    const allAllergyFetch = async () => {
        try {
            const response = await axios.get(`${IP_API}/allergy`);

            return {status: response.status, data: response.data};
        } catch (e) {
            const message = errorMessage(
                e.response.status,
                e.response.data,
                "Allergies"
            );

            throw new Error(message);
        }
    };

    const customerAllergyFetch = async (idCustomer) => {
        try {
            const token = await AsyncStorage.getItem("token");
            const response = await axios.get(`${IP_API}/customerAllergy/${idCustomer}`,
            { headers: {'Authorization': `Bearer ${token}`}});
    
            return {status: response.status, data: response.data};
        } catch (e) {
            const message = errorMessage(
                e.response.status,
                e.response.data,
                "Récupération des allergies utilisateur"
            );

            throw new Error(message);
        }
    };

    const customerChangeAllergy = async (idCustomer, idAllergies) => {
        try {
            const token = await AsyncStorage.getItem("token");
            const response = await axios.post(`${IP_API}/customerAllergy`, {
                "idCustomer": idCustomer,
                idAllergies
            }, { headers: {'Authorization': `Bearer ${token}` }});
    
            return {status: response.status};
        } catch (e) {
            const message = errorMessage(
                e.response.status,
                e.response.data,
                "Changement allergies"
            );

            throw new Error(message);
        }
    };

    return {
        allAllergyFetch,
        customerAllergyFetch,
        customerChangeAllergy
    };
}