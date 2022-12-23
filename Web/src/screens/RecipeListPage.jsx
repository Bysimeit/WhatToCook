import React, {useState, useEffect} from "react";
import MenuBar from "../composants/MenuBar";
import researchImg from '../pictures/research.png';
import {useNavigate} from "react-router-dom";
import {getListRecipe} from '../api/recipe';
import {API_URL} from "../api/axiosBase";

import WhiteStar from '../pictures/white-star.png';
import Timer from '../pictures/timer.png';

export default function RecipeListAdminPage() {

    const navigate = useNavigate();
    const [typeResearch, setTypeResearch] = useState(0);
    const [recipes, setRecipes] = useState([]);

    function handleResearch(value) {
        setTypeResearch(value);
    }

    function handleClickResearch() {
        if(typeResearch <= 0 || typeResearch > 3){
            getListRecipe().then((response) => {   
                setRecipes(response);
                setTypeResearch(0);
            }).catch(
                error => alert(error.message)
            );;
        } else {
            getListRecipe(typeResearch).then((response) => {   
                setRecipes(response);
            }).catch(
                error => alert(error.message)
            );;
        }    
    }

    function handleClickNewRecipe() {
        navigate(`/recipe/0`);
    }

    function handleClickRecipeInfo(recipe) {
        navigate(`/recipe/${recipe}`);
    }

    useEffect(() => {
        getListRecipe().then((response) => {
            setRecipes(response);
        }).catch(
            error => alert(error.message)
        );
    }, []);

    return (
        <div>
            <MenuBar/>
            <div className="core">
                <label htmlFor="research">Recherche par type : </label>
                <input type="number" id="research" value={typeResearch} onChange={(e) => handleResearch(e.target.value)}/>
                <button onClick={() => handleClickResearch()}><img src={researchImg} className="researchListBtn" alt="research pictures"/></button>
                <button onClick={() => handleClickNewRecipe()}>Ajouter nouvelle recette</button>

                <div className="tileContainer">
                    {
                        recipes.map((recipe) => {
                            return (
                                <div key={recipes.indexOf(recipe)} className="tileRecipe" onClick={() => handleClickRecipeInfo(recipe.id)}>
                                    <img src={`${API_URL}/upload/${recipe.id}.jpeg`} className='tileRecipeImg'/>
                                    <div className='tileRecipeContent'>
                                        <div className='tileRecipeTitle'>
                                            <p className="tilePara">
                                                {recipe.namerecipe}
                                            </p>
                                            <div className="tilePara">
                                                <p>
                                                    <img src={Timer} className="tileStarImg"/>
                                                    {recipe.time} minutes 
                                                </p>
                                                <p className="tileParaSub">
                                                    {recipe.total} €
                                                </p>
                                            </div>
                                        </div>
                                        <div className="tileViewFav">
                                            <p className="tileFavText">
                                                {recipe.quoting}
                                                <img src={WhiteStar} className="tileStarImg"/>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    }
                </div>
            </div>      
        </div>
    );
}