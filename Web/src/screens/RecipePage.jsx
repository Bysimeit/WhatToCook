import React, {useState, useEffect} from "react";
import MenuBar from "../composants/MenuBar";
import {getDataRecipe, postNewRecipe, udpateRecipe} from "../api/recipe";
import {useSelector} from 'react-redux';
import {useNavigate, useParams} from "react-router-dom";
import trashImg from '../pictures/trash1.png';
import plusImg from "../pictures/plus.png";
import VImg from '../pictures/V.png';
import {API_URL} from "../api/axiosBase";

export default function RecipeListAdminPage(){

    const {id} = useParams();
    const navigate = useNavigate();
    const token = useSelector((state) => state.user.token);
    const [recipe, setRecipe] = useState({
        adddate: "",
        id: 0,
        namerecipe: "",
        picture: null,
        quoting: 0,
        time: 0,
        total: 0,
        type: 0});
    const [steps, setSteps] = useState([]);
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
        let stepsText = JSON.stringify(steps);
        const fromData = new FormData();
        
        if(id != 0){
            fromData.append('id', recipe.id);
        }
        
        fromData.append('name', recipe.namerecipe);
        fromData.append('time', recipe.time);
        fromData.append('type', recipe.type);
        fromData.append('stepsText', stepsText);
        fromData.append('foodsText', foodsText);
        fromData.append('picture', recipe.picture); 

        if(id == 0){
            postNewRecipe(fromData, token).then(() => {
                alert("Ajout effectué");
                navigate(`/recipe`);
                window.location.reload(false);
            }).catch(
                error => alert(error.message)
            );
        } else {
            udpateRecipe(fromData, token).then(() => {
                alert("Mise à jour effectué");
                navigate(`/recipe`);
                window.location.reload(false);
            }).catch(
                error => alert(error.message)
            );
        }
    }

    function handleClickAddFood(isAdding){   
        if(addFood){
            if(newFood.name === "" || newFood.value === "" || newFood.unity === ""){
                alert("Champs vide, ajout impossible");
            } else {
                setFoods([...foods, newFood]);
            }           
        }          
        setAddFood(isAdding); 
    }

    function handleClickAddStep(isAdding){

        if(addStep){
            if(newStep === ""){
                alert("Champs vide, ajout impossible");
            } else {
                const newSteps = steps;
                newSteps.push(newStep);
                setSteps(newSteps);   
            }          
        }          
        setAddStep(isAdding);    
    }

    function handleClickDeleteStep(index){
        let newSteps = steps.filter((step) => steps.indexOf(step) != index);
        setSteps(newSteps);
    }   

    function handleClickDeleteFood(index){
        let newFoods = foods.filter((food) => foods.indexOf(food) != index);
        setFoods(newFoods);
    }

    function test(picture){
        setRecipe({...recipe, picture: picture});
    }

    useEffect(() => {
        if(token !== undefined && token !== "" && id != 0){
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

                setSteps(reponse.steps);
                setFoods(stringOutput);
            }).catch(
                error => alert(error.message)
            );
        }
    }, [token]);

    return(
        <div>
            <MenuBar/>
            <div className="core">

                <div className="globalDataArea">
                    <div className="globalData">
                        <p>Nom : <input value={recipe.namerecipe} onChange={(e) => setRecipe({...recipe, namerecipe: e.target.value})}/></p>
                    </div>

                    <div className="globalData">
                        <p>Temps : <input  value={recipe.time} type="number" onChange={(e) => setRecipe({...recipe, time: e.target.value})}/> minutes</p>
                    </div>

                    <div className="globalData">
                        <p>Type : <input value={recipe.type} type="number" onChange={(e) => setRecipe({...recipe, type: e.target.value})}/></p>
                    </div>

                    <div className="globalData">
                        <p>Prix : {recipe.total} euros/personnes</p>
                    </div>        
                </div>

                <div className="pictureArea">
                    
                    <p className="titleImagePara">Image de la recette : </p><br/>
                    <p>
                        {recipe.id !== 0 && <img src={`${API_URL}/upload/${recipe.id}.jpeg`} className="imgRecipe" alt="recipe pictures"/>}                 
                        <input
                            className="customButtonUpload"
                            type="file"
                            accept={"image/*"}
                            onChange={(e) => test(e.target.files[0])}
                        />
                    </p>
                    
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
                                        <td><input className="inputQuantity" value={food.value} type="number" onChange={(e) => setRecipe({...foods, type: e.target.value})}/></td>
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
                                <td><input className="inputQuantity" type="number" onChange={(e) => setNewFood({...newFood, value: e.target.value})}/></td>
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

                <div className="stepsArea">
                    <h2 className="titleSteps">Etapes à suivre :</h2>
                    {steps[0] != undefined && (steps.map((step) => {
                        return(
                            <div className="step" key={steps.indexOf(step)}>
                                <textarea className="stepData" value={step} onChange={(e) => setRecipe({...recipe, type: e.target.value})}/> 
                                <button className="commentListBtn" onClick={() => handleClickDeleteStep(steps.indexOf(step))}><img src={trashImg} className="imgBtn" alt="cancel pictures"/></button>                           
                            </div>
                        );
                    }))}
                    {addStep 
                    ?
                        <>
                            <textarea className="stepData" onChange={(e) => setNewStep(e.target.value)}/> 
                            <button className="addBtn" onClick={() => handleClickAddStep(false)}><img src={VImg} className="imgBtn" alt="add food"/></button>                      
                        </>
                    :   
                        <button className="addBtn" onClick={() => handleClickAddStep(true)}><img src={plusImg} className="imgBtn" alt="add food"/></button>
                    }
                </div>
                
                {steps[0] != undefined && foods[0] != undefined && recipe.namerecipe != "" && recipe.type <= 3 && recipe.type >= 1 && recipe.time >= 1 && <button className="buttonValidModif" onClick={(e) => handleClickSend(e)}>Valider Modification</button>}
                
            </div>      
        </div>
    );
}