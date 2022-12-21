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
import { func } from "prop-types";

export default function RecipeListAdminPage(){

    const {id} = useParams();
    const token = useSelector((state) => state.user.token);
    const [recipe, setRecipe] = useState({steps: []});

    function handleClickEdit(id){

    }

    function handleClickDelete(id){

    }

    function handleClickEditPicture(){

    }

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

                <div className="globalDataArea">
                    <div className="globalData">
                        <p>Nom : {recipe.namerecipe}</p>
                        <button onClick={() => handleClickEdit(recipe.namerecipe)}><img src={penImg} className="imgBtn" alt="pen pictures"/></button>
                    </div>

                    <div className="globalData">
                        <p>Temps : {recipe.time} minutes</p>
                        <button onClick={() => handleClickEdit(recipe.time)}><img src={penImg} className="imgBtn" alt="pen pictures"/></button>
                    </div>

                    <div className="globalData">
                        <p>Type : {recipe.type}</p>
                        <button onClick={() => handleClickEdit(recipe.type)}><img src={penImg} className="imgBtn" alt="pen pictures"/></button>
                    </div>

                    <div className="globalData">
                        <p>Prix : {recipe.total} euros/personnes</p>
                        <button onClick={() => handleClickEdit(recipe.total)}><img src={penImg} className="imgBtn" alt="pen pictures"/></button>
                    </div>

                    
                </div>

                <div className="pictureArea">
                    <img src={recipe.picture} className="imgRecipe" alt="recipe pictures"/>
                    <button onClick={() => handleClickEditPicture()}>Modifier image</button>
                </div>

                <div className="stepsArea">
                    <h2>Etapes à suivre :</h2>
                    {recipe.steps.map((step) => {
                        return(
                            <div className="step" key={step}>
                                <p>{step}</p>
                                <button onClick={() => handleClickEdit(step)}><img src={penImg} className="imgBtn" alt="pen pictures"/></button>
                                <button onClick={() => handleClickDelete(step)}><img src={trashImg} className="imgBtn" alt="trash pictures"/></button>
                            </div>
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