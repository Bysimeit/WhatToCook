import React, {useState, useEffect} from "react";
import MenuBar from "../composants/MenuBar";
import {useSelector, useDispatch} from 'react-redux';
import {useParams} from "react-router-dom";
import {getFridge, deleteFood} from "../api/fridge"
import penImg from '../pictures/crayon.png';
import trashImg from '../pictures/trash1.png';
import plusImg from "../pictures/plus.png";
import VImg from '../pictures/V.png';
import cancelImg from '../pictures/cancel.png';

export default function FridgePage(){

    const {id} = useParams();
    const token = useSelector((state) => state.user.token);
    const [foods, setFoods] = useState([]);
    const [newFood, setNewFood] = useState(false);
    let key = 1;

    function handleClickAdd(){
        setNewFood(true);
    } 

    function handleClickValidFood(isValid){
        if(isValid){

        }
        setNewFood(false);
    } 

    function handleClickDelete(idFood){
        //deleteFood(id,idFood,token);
        let newFoods = foods.filter((elem) => elem.id != idFood);
        setFoods(newFoods);
    } 

    useEffect(() => {
        if(token !== undefined && token !== ""){
            getFridge(1, token).then((food) => {
                setFoods(food);
            });
        }    
    }, [token]);

    return(
        <div>
            <MenuBar/>
            <div className="core">
                <p>Ajouter</p>
                <button className="fridgeBtn" onClick={() => handleClickAdd()}><img src={plusImg} className="imgBtn" alt="add food"/></button>
                <table>
                    <tbody>
                        <tr>
                            <td>Nom Aliment</td>
                            <td>Qté</td>
                            <td>Date Péremption</td>
                            <td></td>
                        </tr>
                        {newFood == true &&
                            <tr key={"new"} className="commentArea">
                                <td><input></input></td>
                                <td><input></input></td>
                                <td><input></input></td>
                                <td>
                                    <button className="commentListBtn" onClick={() => handleClickValidFood(true)}><img src={VImg} className="imgBtn" alt="valid pictures"/></button>
                                    <button className="commentListBtn" onClick={() => handleClickValidFood(false)}><img src={cancelImg} className="imgBtn" alt="cancel pictures"/></button>
                                </td>
                            </tr>         
                        }      
                        {foods.map((food) => {
                            return ( 
                                <tr key={key++}>
                                    <td>{food.name}</td>
                                    <td>{food.quantity}</td>
                                    <td>{food.date}</td>
                                    <td>
                                        <button className="fridgeBtn" onClick={() => handleClickDelete(food.id, key)}><img src={trashImg} className="imgBtn" alt="delete food"/></button>
                                    </td>
                                </tr>           
                            );
                        })}
                    </tbody>
                </table>
            </div>      
        </div>
    );
}