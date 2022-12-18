import axios from "react-native-axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { errorMessage } from "../utils/errorMessage";

import { IP_API } from "./config";

export default function useFetchCustomer() {
    const loginFetch = async (email, password) => {
        try {
            const response = await axios.post(`${IP_API}/user`, {
                "email": email,
                "password": password
            });

            return {status: response.status, data: response.data};
        } catch (e) {
            const message = errorMessage(
                e.response.status,
                e.response.data,
                "Email ou mot de passe incorrect. Utilisateur"
            );

            throw new Error(message);
        }
    };

    const profileFetch = async (email) => {
        try {
            const token = await AsyncStorage.getItem("token");
            const response = await axios.get(`${IP_API}/customer/${email}`, { headers: {'Authorization': `Bearer ${token}`}});

            return {status: response.status, data: response.data};  
        } catch (e) {
            const message = errorMessage(
                e.response.status,
                e.response.data,
                "Récupération profil"
            );

            throw new Error(message);
        }
    };

    const changePassword = async (oldPassword, newPassword, oldEmail) => {
        try {
            const token = await AsyncStorage.getItem("token");
            const response = await axios.patch(`${IP_API}/customer`, {
                "oldPassword": oldPassword,
                "newPassword": newPassword,
                "oldEmail": oldEmail
            }, { headers: {'Authorization': `Bearer ${token}` }});

            return {status: response.status};
        } catch (e) {
            const message = errorMessage(
                e.response.status,
                e.response.data,
                "Changement de mot de passe"
            );

            throw new Error(message);
        }
    };

    const deleteCustomer = async (id) => {
        try {
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
        } catch (e) {
            const message = errorMessage(
                e.response.status,
                e.response.data,
                "Suppression utilisateur"
            );

            throw new Error(message);
        }
    };

    const newCustomer = async (lastName, firstName, password, email) => {
        try {
            const response = await axios.post(`${IP_API}/customer`, {
                "lastName": lastName,
                "firstName": firstName,
                "password": password,
                "email": email
            });
    
            return {status: response.status};
        } catch (e) {
            const message = errorMessage(
                e.response.status,
                e.response.data,
                "Nouveau utilisateur"
            );

            throw new Error(message);
        }
    };

    return {
        loginFetch,
        profileFetch,
        changePassword,
        deleteCustomer,
        newCustomer
    };
}