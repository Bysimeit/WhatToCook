import axios from "react-native-axios";
import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function useFetchCustomer() {
    const loginFetch = async (email, password) => {
        const response = await axios.post(`http://192.168.0.132:3001/user`, {
            "email": email,
            "password": password
        });

        return {status: response.status, data: response.data};
    };

    const profileFetch = async (email) => {
        const token = await AsyncStorage.getItem("token");
        const response = await axios.get(`http://192.168.0.132:3001/customer/${email}`, { headers: {'Authorization': `Bearer ${token}` }});

        return {status: response.status, data: response.data};
    };

    const changePassword = async (oldPassword, newPassword, oldEmail) => {
        const token = await AsyncStorage.getItem("token");
        const response = await axios.patch(`http://192.168.0.132:3001/customer`, {
            "oldPassword": oldPassword,
            "newPassword": newPassword,
            "oldEmail": oldEmail
        }, { headers: {'Authorization': `Bearer ${token}` }});

        return {status: response.status};
    };

    const deleteCustomer = async (id) => {
        const token = await AsyncStorage.getItem("token");
        const response = await axios.delete(`http://192.168.0.132:3001/customer`, {
            "id": id
        }, { headers: {'Authorization': `Bearer ${token}` }});

        return {status: response.status};
    };

    const newCustomer = async (lastName, firstName, password, email) => {
        const response = await axios.post(`http://192.168.0.132:3001/customer`, {
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
};