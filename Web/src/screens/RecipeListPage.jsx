import React, { useState, useEffect } from "react";
import MenuBar from "../composants/MenuBar";
import researchImg from '../pictures/research.png';
import { useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { getListRecipe } from '../api/recipe';

import WhiteStar from '../pictures/white-star.png';
import Timer from '../pictures/timer.png';

//import RecipeTile from "../composants/RecipeTile";

export default function RecipeListAdminPage() {

    const token = useSelector((state) => state.user.token);
    const navigate = useNavigate();
    const [typeResearch, setTypeResearch] = useState(0);

    const [recipes, setRecipes] = useState([]);

    function handleResearch(value) {
        setTypeResearch(value);
    }

    function handleClickResearch() {

    }

    function handleClickNewRecipe() {

    }

    function handleClickRecipeInfo(recipe) {
        navigate(`/recipe/${recipe}`);
    }

    useEffect(() => {
        getListRecipe().then((response) => {
            setRecipes(response);
        });
    }, []);

    return (
        <div>
            <MenuBar/>
            <div className="core">
                <label htmlFor="research">Recherche par type : </label>
                <input type="research" id="research" onChange={(e) => handleResearch(e.target.value)}/>
                <button onClick={() => handleClickResearch()}><img src={researchImg} className="researchListBtn" alt="research pictures"/></button>
                <button onClick={() => handleClickNewRecipe()}>Ajouter nouvelle recette</button>

                <div className="tileContainer">
                    {
                        recipes.map((recipe) => {
                            return (
                                <div key={recipes.indexOf(recipe)} className="tileRecipe" onClick={() => handleClickRecipeInfo(recipe.id)}>
                                    <img src={recipe.picture} className='tileRecipeImg'/>
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