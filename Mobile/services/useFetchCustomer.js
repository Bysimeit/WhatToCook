import axios from "react-native-axios";
import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import authentification from "./authentification";

export default function useFetchCustomer() {
    const loginFetch = async (email, password) => {
        const response = await axios({
            method: "post",
            url: `http://192.168.0.132:3001/user`,
            data: {
                email,
                password
            }
        });

        return {status: response.status, data: response.data};
    };

    const profileFetch = async (email) => {
        const form = new URLSearchParams();
        form.append("email", email);
        const response = await axios({
            method: "get",
            url: `http://192.168.0.132:3001/customer/data`,
            headers: await authentification()
        });

        console.log(response.request)
        return {status: response.status, data: response.data};
    };

    const logoutFetch = async () => {
        await AsyncStorage.removeItem("token");
    };

    return {
        loginFetch,
        profileFetch
    };
};