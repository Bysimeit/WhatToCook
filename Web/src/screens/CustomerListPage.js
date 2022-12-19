import React, {useEffect, useState} from "react";
import MenuBar from "../composants/MenuBar";
import {useSelector, useDispatch} from 'react-redux';
import {useNavigate} from "react-router-dom";
import {getAllCustomer} from '../api/customer';
import penImg from '../pictures/crayon.png';
import fridgeImg from '../pictures/fridge.png';
import tchatImg from '../pictures/tchat.png';
import trashImg from '../pictures/trash1.png';

export default function ClientAreaPage(){

    const token = useSelector((state) => state.user.token);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);

    function handleClickResearch(){
        
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
                <button>Ok</button>
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
                            <tr>
                                <td>{user.id}</td>
                                <td>{user.email}</td>
                                <td>{user.name}</td>
                                <td>{user.firstname}</td>
                                <td>
                                    <button><img src={penImg} className="customListBtn" alt="pen pictures" onClick={handleClickResearch}/></button>
                                    <button><img src={tchatImg} className="customListBtn" alt="tchat pictures" onClick={handleClickResearch}/></button>
                                    <button><img src={fridgeImg} className="customListBtn" alt="fridge pictures" onClick={handleClickResearch}/></button>
                                    <button><img src={trashImg} className="customListBtn" alt="trash pictures" onClick={handleClickResearch}/></button>
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