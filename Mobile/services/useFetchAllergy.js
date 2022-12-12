import axios from "react-native-axios";

import { IP_API } from "./config";

export default function useFetchAllergy() {
    const allAllergyFetch = async () => {
        const response = await axios.get(`${IP_API}/allergy`);

        return {status: response.status, data: response.data};
    };

    return {
        allAllergyFetch
    };
}