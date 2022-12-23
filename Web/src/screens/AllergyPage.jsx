import React, {useEffect, useState} from "react";
import MenuBar from "../composants/MenuBar";
import {useSelector} from 'react-redux';
import {useNavigate} from "react-router-dom";
import {getAllAllergy, deleteAllergy, postNewAllergy} from '../api/allergy';
import penImg from '../pictures/crayon.png';
import trashImg from '../pictures/trash1.png';
import plusImg from "../pictures/plus.png";
import VImg from '../pictures/V.png';
import cancelImg from '../pictures/cancel.png';

export default function ClientAreaPage(){

    const token = useSelector((state) => state.user.token);
    const navigate = useNavigate();
    const [allergies, setAllergies] = useState([]);
    const [newAllergyInterface, setNewAllergyInterface] = useState(false);
    const [newAllergy, setNewAllergy] = useState("");


    function handleClickAdd(){
        setNewAllergyInterface(true);
    } 

    function handleNewAllergy(name){
        setNewAllergy(name); 
    }

    function handleClickValidAllergy(isValid){
        if(isValid){
            if(newAllergy === ""){
                alert("champ vide, ajout impossible");
            } else {
                postNewAllergy(newAllergy, token).then(() => {
                    alert("allergie ajoutée");
                    getAllAllergy(token).then((reponse) => {
                        setAllergies(reponse);
                    }).catch(
                        error => alert(error.message)
                    );
                }).catch(
                    error => alert(error.message)
                );
            }
        }
        setNewAllergyInterface(false);
    }

    function handleClickEdit(id){
        navigate(`/allergy/${id}`)
    } 

    function handleClickDelete(id){
        deleteAllergy(id,token).then(() => {
            let newAllergies = allergies.filter((elem) => elem.id != id);
            alert("suppression effecutée");
            setAllergies(newAllergies);
        }).catch(
            error => alert(error.message)
        );      
    } 

    useEffect(() => {
        if(token !== undefined && token !== ""){
            getAllAllergy().then((reponse) => {
                setAllergies(reponse);
            }).catch(
                error => alert(error.message)
            );
        }    
    }, [token]);


    return(
        <div>
            <MenuBar/>
            <div className="core">
                <button className="fridgeBtn" onClick={() => handleClickAdd()}><img src={plusImg} className="imgBtn" alt="add allergy"/></button>
                <table>
                    <tbody> 
                        <tr>
                            <td>Nom</td>
                            <td>Actions</td>
                        </tr>
                        {newAllergyInterface == true &&
                            <tr key={0}>
                                <td><textarea rows={1} onChange={(e) => handleNewAllergy(e.target.value)} className="comment" ></textarea></td>
                                <td>
                                    <button className="commentListBtn" onClick={() => handleClickValidAllergy(true)}><img src={VImg} className="imgBtn" alt="valid pictures"/></button>
                                    <button className="commentListBtn" onClick={() => handleClickValidAllergy(false)}><img src={cancelImg} className="imgBtn" alt="cancel pictures"/></button>
                                </td>
                            </tr>         
                        }
                        {allergies.map((allergy) => {                           
                            return ( 
                            <tr key={allergy.id}>
                                <td>{allergy.name}</td>
                                <td>
                                    <button onClick={() => handleClickEdit(allergy.id)}><img src={penImg} className="imgBtn" alt="pen pictures"/></button>
                                    <button onClick={() => handleClickDelete(allergy.id)}><img src={trashImg} className="imgBtn" alt="trash pictures"/></button>
                                </td>
                            </tr>);
                        })}
                    </tbody>
                </table>              
                <button>Retour</button>
            </div>      
        </div>
    );
}