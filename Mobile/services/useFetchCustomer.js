import axios from "react-native-axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { IP_API } from "./config";

export default function useFetchCustomer() {
    const loginFetch = async (email, password) => {
        const response = await axios.post(`${IP_API}/user`, {
            "email": email,
            "password": password
        });

        return {status: response.status, data: response.data};
    };

    const profileFetch = async (email) => {
        const token = await AsyncStorage.getItem("token");
        const response = await axios.get(`${IP_API}/customer/${email}`, { headers: {'Authorization': `Bearer ${token}` }});

        return {status: response.status, data: response.data};
    };

    const changePassword = async (oldPassword, newPassword, oldEmail) => {
        const token = await AsyncStorage.getItem("token");
        const response = await axios.patch(`${IP_API}/customer`, {
            "oldPassword": oldPassword,
            "newPassword": newPassword,
            "oldEmail": oldEmail
        }, { headers: {'Authorization': `Bearer ${token}` }});

        return {status: response.status};
    };

    const deleteCustomer = async (id) => {
        const token = await AsyncStorage.getItem("token");
        const response = await axios({
            method: "delete",
            url: `${IP_API}/customer`,
            data: {
                id
            },
            headers: {'Authorization': `Bearer ${token}` }
        });

        return {status: response.status};
    };

    const newCustomer = async (lastName, firstName, password, email) => {
        const response = await axios.post(`${IP_API}/customer`, {
            "lastName": lastName,
            "firstName": firstName,
            "password": password,
            "email": email
        });

        return {status: response.status};
    };

    const logoutFetch = async () => {
        await AsyncStorage.removeItem("token");
    };

    return {
        loginFetch,
        profileFetch,
        changePassword,
        deleteCustomer,
        newCustomer
    };
}