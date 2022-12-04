import axios from "react-native-axios";
import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function useFetchCustomer() {
    const loginFetch = async (email, password) => {
        const response = await axios({
            method: "post",
            url: `http://IP:3001/user`,
            data: {
                email,
                password
            }
        });

        return {status: response.status, data: response.data};
    };

    const logoutFetch = async () => {
        AsyncStorage.removeItem("token");
    };

    return {
        loginFetch
    };
};