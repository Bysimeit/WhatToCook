import React, {useState, useEffect} from "react";
import MenuBar from "../composants/MenuBar";
import {getDataRecipe, udpateRecipe} from "../api/recipe";
import {useSelector} from 'react-redux';
import {useParams} from "react-router-dom";
import trashImg from '../pictures/trash1.png';
import plusImg from "../pictures/plus.png";
import VImg from '../pictures/V.png';

export default function RecipeListAdminPage(){

    const {id} = useParams();
    const token = useSelector((state) => state.user.token);
    const [recipe, setRecipe] = useState({
        adddate: "",
        id: 0,
        namerecipe: "",
        picture: null,
        quoting: 0,
        steps: [],
        time: 0,
        total: 0,
        type: 0});
    const [foods, setFoods] = useState([]);
    const [addStep, setAddStep] = useState(false);
    const [addFood, setAddFood] = useState(false);

    function handleClickSend(){
        const formData = new FormData();
        formData.append('id', recipe.id);
        formData.append('name', recipe.namerecipe);
        formData.append('time', recipe.time);
        formData.append('type', recipe.type);
        formData.append('steps', recipe.steps);
        formData.append('foods', foods);
        formData.append('picture', recipe.picture);   

        udpateRecipe(formData, token);
    }

    function handleClickAddFood(newFood){
        setAddFood();
    }

    function handleClickAddStep(newStep){
        setAddStep();
    }

    function handleClickDeleteStep(index){
        let newSteps = recipe.steps.filter((step) => recipe.steps.indexOf(step) != index);
        setRecipe({...recipe, steps: newSteps});
    }   

    function handleClickDeleteFood(index){
        let newFoods = foods.filter((food) => foods.indexOf(food) != index);
        setFoods(newFoods);
    }

    function handleClickEditPicture(){

    }

    useEffect(() => {
        if(token !== undefined && token !== ""){
            getDataRecipe(id).then((reponse) => {
                setRecipe(reponse);

                let data = [];

                const newString = reponse.foods;

                const regex = /\((\d+),(.*?),(.*?)\)/g;
                const regex2 = /\\"/g;
                let match;

                while ((match = regex.exec(newString)) !== null) {
                    const value = match[1];
                    const characters = match[2].replace(regex2, '');
                    const name = match[3].replace(regex2, '');
                    
                    data.push({ value, characters, name });
                }

                let stringOutput = [];
                for (let i = 0; i < data.length; i++) {
                    stringOutput.push(`${data[i].value} ${data[i].characters} ${data[i].name}`);
                }
                console.log(stringOutput);

                setFoods(stringOutput);
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
                        <p>Nom : </p>
                        <input value={recipe.namerecipe} onChange={(e) => setRecipe({...recipe, name: e.target.value})}/>                    
                    </div>

                    <div className="globalData">
                        <p>Temps : <input  value={recipe.time} onChange={(e) => setRecipe({...recipe, time: e.target.value})}/> minutes</p>     
                    </div>

                    <div className="globalData">
                        <p>Type : <input value={recipe.type} onChange={(e) => setRecipe({...recipe, type: e.target.value})}/></p>
                    </div>

                    <div className="globalData">
                        <p>Prix : {recipe.total} euros/personnes</p>
                    </div>        
                </div>

                <div className="pictureArea">
                    <p>Image :</p>
                    <input
                        type={"file"}
                        accept={"image/*"}
                        value={recipe.picture}
                        onChange={(e) => setRecipe({...recipe, picture: e.target.value})}
                    />
                    <img src={recipe.picture} className="imgRecipe" alt="recipe pictures"/>
                    <button onClick={() => handleClickEditPicture()}>Modifier image</button>
                </div>

                <div className="stepsArea">
                    <h2>Etapes à suivre :</h2>
                    {recipe.steps.map((step) => {
                        console.log(step);
                        return(
                            <div className="step" key={recipe.steps.indexOf(step)}>
                                <textarea value={step} onChange={(e) => setRecipe({...recipe, type: e.target.value})}/> 
                                <button className="commentListBtn" onClick={() => handleClickDeleteStep(recipe.steps.indexOf(step))}><img src={trashImg} className="imgBtn" alt="cancel pictures"/></button>                           
                            </div>
                        );
                    })}
                    <button className="addBtn" onClick={() => handleClickAddStep()}><img src={plusImg} className="imgBtn" alt="add food"/></button>
                </div>

                <div className="foodsArea">
                    <h2>Aliments requis :</h2>
                    {foods.map((food) => {
                        return (
                            <div key={food}>
                                <input value={food} onChange={(e) => setRecipe({...recipe, type: e.target.value})}/> 
                                <button className="commentListBtn" onClick={() => handleClickDeleteFood(foods.indexOf(food))}><img src={trashImg} className="imgBtn" alt="cancel pictures"/></button>                         
                            </div>
                        );
                    })}
                    <button className="addBtn" onClick={() => handleClickAddFood()}><img src={plusImg} className="imgBtn" alt="add food"/></button>
                </div>
                
                <button onClick={() => handleClickSend()}>Valider Modification</button>
            </div>      
        </div>
    );
}