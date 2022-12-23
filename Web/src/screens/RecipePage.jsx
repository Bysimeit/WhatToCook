import React, {useState, useEffect} from "react";
import MenuBar from "../composants/MenuBar";
import {getDataRecipe, udpateRecipe, udpatePicture} from "../api/recipe";
import {useSelector} from 'react-redux';
import {useParams} from "react-router-dom";
import trashImg from '../pictures/trash1.png';
import plusImg from "../pictures/plus.png";
import VImg from '../pictures/V.png';
import {API_URL} from "../api/axiosBase";

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
    const [newStep, setNewStep] = useState("");
    const [newFood, setNewFood] = useState({
        name: "",
        value: "",
        unity: ""
    });

    function handleClickSend(event){
        event.preventDefault();
        let foodsText = JSON.stringify(foods);
        console.log(foods);
        console.log(foodsText);
        let stepsText = JSON.stringify(recipe.steps);
        console.log(recipe.steps);
        console.log(stepsText);

        console.log(recipe.picture);

        const fromData = new FormData();
        fromData.append('id', recipe.id);
        fromData.append('name', recipe.namerecipe);
        fromData.append('time', recipe.time);
        fromData.append('type', recipe.type);
        fromData.append('stepsText', stepsText);
        fromData.append('foodsText', foodsText);
        fromData.append('picture', recipe.picture); 

        udpateRecipe(fromData, token);
    }

    function handleClickAddFood(isAdding){
        if(addFood){
            setFoods([...foods, newFood]);
        }
        setAddFood(isAdding);
    }

    function handleClickAddStep(isAdding){
        if(addStep){
            const newRecipe = recipe;
            newRecipe.steps.push(newStep);
            setRecipe(newRecipe);
        }
        setAddStep(isAdding);
    }

    function handleClickDeleteStep(index){
        let newSteps = recipe.steps.filter((step) => recipe.steps.indexOf(step) != index);
        setRecipe({...recipe, steps: newSteps});
    }   

    function handleClickDeleteFood(index){
        let newFoods = foods.filter((food) => foods.indexOf(food) != index);
        setFoods(newFoods);
    }

    function test(picture){
        setRecipe({...recipe, picture: picture});
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
                    stringOutput.push({value: `${data[i].value}`,unity: `${data[i].characters}`, name: `${data[i].name}`});
                }

                setFoods(stringOutput);
            });
        }
        
    }, [token]);

    return(
        <div>
            <MenuBar/>
            <div className="core">

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
                        name="jambon"
                        type="file"
                        accept={"image/*"}
                        onChange={(e) => test(e.target.files[0])}
                    />
                    {recipe.id !== 0 && <img src={`${API_URL}/upload/${recipe.id}.jpeg`} className="imgRecipe" alt="recipe pictures"/>}         
                </div>

                <div className="stepsArea">
                    <h2>Etapes à suivre :</h2>
                    {recipe.steps !== null && (recipe.steps.map((step) => {
                        return(
                            <div className="step" key={recipe.steps.indexOf(step)}>
                                <textarea value={step} onChange={(e) => setRecipe({...recipe, type: e.target.value})}/> 
                                <button className="commentListBtn" onClick={() => handleClickDeleteStep(recipe.steps.indexOf(step))}><img src={trashImg} className="imgBtn" alt="cancel pictures"/></button>                           
                            </div>
                        );
                    }))}
                    {addStep 
                    ?
                        <>
                            <textarea onChange={(e) => setNewStep(e.target.value)}/> 
                            <button className="addBtn" onClick={() => handleClickAddStep(false)}><img src={VImg} className="imgBtn" alt="add food"/></button>                      
                        </>
                    :   
                        <button className="addBtn" onClick={() => handleClickAddStep(true)}><img src={plusImg} className="imgBtn" alt="add food"/></button>
                    }
                </div>

                <div className="foodsArea">
                    <h2>Aliments requis :</h2>
                    <table>
                        <tbody>
                            <tr>
                                <td>Aliment</td>
                                <td>Quantité</td>
                                <td>Unité</td>
                                <td></td>
                            </tr>                                                   
                            {foods.map((food) => {
                                return (
                                    <tr key={food.name}>
                                        <td><input value={food.name} onChange={(e) => setRecipe({...foods, type: e.target.value})}/></td>
                                        <td><input value={food.value} onChange={(e) => setRecipe({...foods, type: e.target.value})}/></td>
                                        <td><input value={food.unity} onChange={(e) => setNewFood({...newFood, unity: e.target.unity})}/></td>
                                        <td>
                                            <button className="commentListBtn" onClick={() => handleClickDeleteFood(foods.indexOf(food))}><img src={trashImg} className="imgBtn" alt="cancel pictures"/></button>
                                        </td>
                                    </tr>
                                );
                            })}
                            {addFood 
                            ? 
                            <tr>
                                <td><input onChange={(e) => setNewFood({...newFood, name: e.target.value})}/></td>
                                <td><input onChange={(e) => setNewFood({...newFood, value: e.target.value})}/></td>
                                <td><input onChange={(e) => setNewFood({...newFood, unity: e.target.value})}/></td>
                                <td>                                            
                                    <button className="valideBtn" onClick={() => handleClickAddFood(false)}><img src={VImg} className="imgBtn" alt="valid pictures"/></button>
                                </td>
                            </tr>
                            : 
                            <tr>
                                <td></td>
                                <td><button className="addBtn" onClick={() => handleClickAddFood(true)}><img src={plusImg} className="imgBtn" alt="add food"/></button></td>
                                <td></td>
                            </tr>
                            }
                            
                        </tbody>
                    </table>
                </div>
                
                <button onClick={(e) => handleClickSend(e)}>Valider Modification</button>
            </div>      
        </div>
    );
}