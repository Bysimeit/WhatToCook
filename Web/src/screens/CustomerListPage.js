import React, {useEffect, useState} from "react";
import MenuBar from "../composants/MenuBar";
import {useSelector, useDispatch} from 'react-redux';
import {useNavigate} from "react-router-dom";
import {getAllCustomer} from '../api/customer';
import penImg from '../pictures/crayon.png';
import trashImg from '../pictures/trash1.png';
import fridgeImg from '../pictures/fridge.png';
import tchatImg from '../pictures/tchat.png';
import researchImg from '../pictures/research.png';

export default function ClientAreaPage(){

    const token = useSelector((state) => state.user.token);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);

    function handleClickResearch(){
        
    } 

    function handleClickEdit(){
        
    } 

    function handleClickComment(){
        navigate("/comment");
    } 

    function handleClickFridge(){
        navigate("/fridge");
    } 

    function handleClickDelete(){
        
    } 

    useEffect(() => {
        if(token !== undefined && token !== ""){
            getAllCustomer(token).then((reponse) => {
                setUsers(reponse);
            });
        }    
    }, [token]);


    return(
        <div>
            <MenuBar/>
            <div className="core">
                <label htmlFor="research">Recherche : </label>
                <input type="research" id="research" onChange={(e) => handleClickResearch()}/>
                <button  onClick={() => handleClickResearch()}><img src={researchImg} className="researchListBtn" alt="research pictures"/></button>
                <table>
                    <tbody> 
                        <tr>
                            <td>ID</td>
                            <td>Email</td>
                            <td>Nom</td>
                            <td>Prénom</td>
                            <td>Actions</td>
                        </tr>
                        {users.map((user) => {
                            return ( 
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.email}</td>
                                <td>{user.name}</td>
                                <td>{user.firstname}</td>
                                <td>
                                    <button onClick={() => handleClickEdit()}><img src={penImg} className="imgBtn" alt="pen pictures"/></button>
                                    <button onClick={() => handleClickComment()}><img src={tchatImg} className="imgBtn" alt="tchat pictures"/></button>
                                    <button onClick={() => handleClickFridge()}><img src={fridgeImg} className="imgBtn" alt="fridge pictures"/></button>
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