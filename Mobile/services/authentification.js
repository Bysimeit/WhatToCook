import AsyncStorage from "@react-native-async-storage/async-storage";

export default async function authentification() {
    const token = await AsyncStorage.getItem("token");
    if (token) {
        return { 'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': `Bearer ${token}` };
    } else {
        return {};
    }
}