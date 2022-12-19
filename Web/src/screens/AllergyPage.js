import React, {useEffect, useState} from "react";
import MenuBar from "../composants/MenuBar";
import {useSelector, useDispatch} from 'react-redux';
import {useNavigate} from "react-router-dom";
import {getAllAllergy} from '../api/allergy';
import penImg from '../pictures/crayon.png';
import trashImg from '../pictures/trash1.png';
import researchImg from '../pictures/research.png';
import plusImg from "../pictures/plus.png";

export default function ClientAreaPage(){

    const token = useSelector((state) => state.user.token);
    const navigate = useNavigate();
    const [allergies, setAllergies] = useState([]);
    let key = 1;

    function handleClickResearch(){
        
    } 

    function handleClickAdd(){
        
    } 

    function handleClickEdit(){
        
    } 

    function handleClickDelete(){
        
    } 

    useEffect(() => {
        if(token !== undefined && token !== ""){
            getAllAllergy(token).then((reponse) => {
                setAllergies(reponse);
            });
        }    
    }, [token]);


    return(
        <div>
            <MenuBar/>
            <div className="core">
                <label htmlFor="research">Recherche : </label>
                <input type="research" id="research" onChange={(e) => handleClickResearch()}/>
                <button onClick={() => handleClickResearch()}><img src={researchImg} className="researchListBtn" alt="research allergy"/></button>
                <button className="fridgeBtn" onClick={() => handleClickAdd()}><img src={plusImg} className="imgBtn" alt="add allergy"/></button>
                <table>
                    <tbody> 
                        <tr>
                            <td>Nom</td>
                            <td>Validé</td>
                            <td>Actions</td>
                        </tr>
                        {allergies.map((allergy) => {                           
                            return ( 
                            <tr key={allergy.id}>
                                <td>{allergy.name}</td>
                                <td>{(allergy.isvalidated) ? "oui" : "non"}</td>
                                <td>
                                    <button onClick={() => handleClickEdit()}><img src={penImg} className="imgBtn" alt="pen pictures"/></button>
                                    <button onClick={() => handleClickDelete()}><img src={trashImg} className="imgBtn" alt="trash pictures"/></button>
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