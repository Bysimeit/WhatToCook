import React, {useState, useEffect} from "react";
import MenuBar from "../composants/MenuBar";
import researchImg from '../pictures/research.png';
import {useSelector} from 'react-redux';
import {useNavigate} from "react-router-dom";

export default function RecipeListAdminPage(){

    const token = useSelector((state) => state.user.token);
    const navigate = useNavigate();
    const [typeResearch, setTypeResearch] = useState(0);

    function handleResearch(value){
        setTypeResearch(value);
    }

    function handleClickResearch(){

    }

    function handleClickNewRecipe(){

    }

    return(
        <div>
            <MenuBar/>
            <div className="core">
                <label htmlFor="research">Recherche par type : </label>
                <input type="research" id="research" onChange={(e) => handleResearch(e.target.value)}/>
                <button  onClick={() => handleClickResearch()}><img src={researchImg} className="researchListBtn" alt="research pictures"/></button>
                <button  onClick={() => handleClickNewRecipe()}>Ajouter nouvelle recette</button>
            </div>      
        </div>
    );
}