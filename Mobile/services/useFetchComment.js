import axios from "react-native-axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { errorMessage } from "../utils/errorMessage";

import { IP_API } from "./config";

export default function useFetchComment() {
    const fetchCommentRecipe = async (idRecipe) => {
        try {
            const response = await axios.get(`${IP_API}/comment/${idRecipe}`);

            return {status: response.status, data: response.data};
        } catch (e) {
            const message = errorMessage(
                e.response.status,
                e.response.data,
                "Récupération commentaires"
            );

            throw new Error(message);
        }
    };

    const updateCommentRecipe = async (idCustomer, idRecipe, comment) => {
        try {
            const token = await AsyncStorage.getItem("token");
            const response = await axios.patch(`${IP_API}/comment`, {
                "idCustomer": idCustomer,
                "idRecipe": idRecipe,
                "comment": comment
            }, { headers: {'Authorization': `Bearer ${token}` }});
    
            return {status: response.status};
        } catch (e) {
            const message = errorMessage(
                e.response.status,
                e.response.data,
                "Mise à jour d'un commentaire sur une recette"
            );

            throw new Error(message);
        }
    }

    const postCommentRecipe = async (idCustomer, idRecipe, comment) => {
        try {
            const token = await AsyncStorage.getItem("token");
            const response = await axios.post(`${IP_API}/comment`, {
                "idCustomer": idCustomer,
                "idRecipe": idRecipe,
                "comment": comment
            }, { headers: {'Authorization': `Bearer ${token}` }});

            return {status: response.status, data: response.data};
        } catch (e) {
            const message = errorMessage(
                e.response.status,
                e.response.data,
                "Ajout d'un commentaire sur une recette"
            );

            throw new Error(message);
        }
    };

    return {
        fetchCommentRecipe,
        updateCommentRecipe,
        postCommentRecipe
    };
}