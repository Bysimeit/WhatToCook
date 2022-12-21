import React, {useState, useEffect} from "react";
import MenuBar from "../composants/MenuBar";
import {getDataRecipe} from "../api/recipe";
import {useSelector} from 'react-redux';
import {useParams} from "react-router-dom";
import penImg from '../pictures/crayon.png';
import trashImg from '../pictures/trash1.png';
import plusImg from "../pictures/plus.png";
import VImg from '../pictures/V.png';
import cancelImg from '../pictures/cancel.png';

export default function RecipeListAdminPage(){

    const {id} = useParams();
    const token = useSelector((state) => state.user.token);
    const [recipe, setRecipe] = useState([]);



    useEffect(() => {
        if(token !== undefined && token !== ""){
            getDataRecipe(id).then((reponse) => {
                setRecipe(reponse);
                console.log(reponse);
            });
        }    
    }, [token]);

    return(
        <div>
            <MenuBar/>
            <div className="core">
                <p>Nous vous proposons de découvrir la recette suivante :</p>

                <div className="globalData">
                    <p>Nom : {recipe.namerecipe}</p>
                    <p>Temps : {recipe.time} minutes</p>
                    <p>Type : {recipe.type}</p>
                    <p>Prix : {recipe.total} euros/personnes</p>
                </div>

                <div className="stepsArea">
                    <h2>Etapes à suivre :</h2>
                    {recipe.steps.map((step) => {
                        return(
                            <p key={step}>{step}</p>

                        );
                    })}
                </div>

                <div className="foodsArea">
                    <h2>Aliments requis :</h2>
                    {}
                </div>
                
            </div>      
        </div>
    );
}