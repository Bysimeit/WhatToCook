import React from 'react';
import useFetchRecipe from '../services/useFetchRecipe';

export default function FetchrecipeList() {
    const [stateRecipe, setStateRecipe] = React.useState(null);

    const { recipeFetch } = useFetchRecipe();
    const fillRecipeList = async () => {
        recipeFetch().then(async (result) => {
            if (result.status === 200) {
                setStateRecipe(result.data);
            }
        });
    };
    fillRecipeList();
    
    //return stateRecipe;
}
