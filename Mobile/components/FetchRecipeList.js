import React from 'react';
import useFetchRecipe from '../services/useFetchRecipe';
import { Alert } from 'react-native';

export default function FetchrecipeList() {
    const [stateRecipe, setStateRecipe] = React.useState(null);

    const { recipeFetch } = useFetchRecipe();
    const fillRecipeList = async () => {
        recipeFetch().then(async (result) => {
            if (result.status === 200) {
                setStateRecipe(result.data);
            }
        }).catch((e) => {
            Alert.alert("Erreur !", e.message);
        });
    };
    
    fillRecipeList();
}
