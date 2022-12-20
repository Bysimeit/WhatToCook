import React, {useState, useEffect} from "react";
import MenuBar from "../composants/MenuBar";
import {useSelector, useDispatch} from 'react-redux';
import {useParams} from "react-router-dom";
import {getFridge} from "../api/fridge"
import penImg from '../pictures/crayon.png';
import trashImg from '../pictures/trash1.png';
import plusImg from "../pictures/plus.png";

export default function FridgePage(){

    const {id} = useParams();
    const token = useSelector((state) => state.user.token);
    const [foods, setFoods] = useState([]);
    let key = 1;

    function handleClickAdd(){
        
    } 

    function handleClickEdit(){
        
    } 

    function handleClickDelete(){
        
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
                        {foods.map((food) => {
                            return ( 
                                <tr key={key++}>
                                    <td>{food.name}</td>
                                    <td>{food.quantity}</td>
                                    <td>{food.date}</td>
                                    <td>
                                        <button className="fridgeBtn" onClick={() => handleClickEdit()}><img src={penImg} className="imgBtn" alt="edit food"/></button>
                                        <button className="fridgeBtn" onClick={() => handleClickDelete()}><img src={trashImg} className="imgBtn" alt="delete food"/></button>
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