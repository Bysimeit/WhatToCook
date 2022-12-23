import React, {useState, useEffect} from "react";
import MenuBar from "../composants/MenuBar";
import {useSelector} from 'react-redux';
import {useParams} from "react-router-dom";
import {getFridge, deleteFood, postNewFood} from "../api/fridge"
import trashImg from '../pictures/trash1.png';
import plusImg from "../pictures/plus.png";
import VImg from '../pictures/V.png';
import cancelImg from '../pictures/cancel.png';

export default function FridgePage(){

    const {id} = useParams();
    const token = useSelector((state) => state.user.token);
    const [foods, setFoods] = useState([]);
    const [newFood, setNewFood] = useState();
    const [isEdit, setIsEdit] = useState(false);
    let key = 1;

    function handleClickAdd(){
        setIsEdit(true);
    } 

    function handleClickValidFood(isValid){
        if(isValid){
            postNewFood(id, newFood.name, newFood.quantity, newFood.weight, newFood.date, token).then(() => {
                let newFoods = foods; 
                newFoods.push(newFood);
                setFoods(newFoods);
                alert("Ajout effectué");
                window.location.reload(false);
            }).catch(
                error => alert(error.message)
            );
            
        }
        setIsEdit(false);
    } 

    function handleClickDelete(idFood){
        deleteFood(id,idFood,token).then(() => {
            let newFoods = foods.filter((elem) => elem.id != idFood);
            setFoods(newFoods);
            alert("Suppression effectuée");
        }).catch(
            error => alert(error.message)
        );
        
    } 

    function editDate(newDate){
        newDate = new Date(newDate)
        const year = newDate.getFullYear();
        const month = newDate.getMonth() + 1;
        const day = newDate.getDay();
        const newFormat = `${day}/${month}/${year}`;
        setNewFood({...newFood, date: newFormat})
    } 

    useEffect(() => {
        if(token !== undefined && token !== ""){
            getFridge(id, token).then((food) => {
                setFoods(food);
            }).catch(
                error => alert(error.message)
            );
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
                            <td>Poids</td>
                            <td>Date Péremption</td>
                            <td></td>
                        </tr>
                        {isEdit == true &&
                            <tr key={"new"} className="commentArea">
                                <td><input onChange={(e) => setNewFood({...newFood, name: e.target.value})}></input></td>
                                <td><input type="number" onChange={(e) => setNewFood({...newFood, quantity: e.target.value})}></input></td>
                                <td><input type="number" onChange={(e) => setNewFood({...newFood, weight: e.target.value})}></input></td>
                                <td><input type="date" placeholder="dd/mm/yyyy" onChange={(e) => editDate(e.target.value)}></input></td>
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
                                    <td>{food.weight}</td>
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