import React, {useEffect, useState} from "react";
import MenuBar from "../composants/MenuBar";
import {useSelector} from 'react-redux';
import {useNavigate} from "react-router-dom";
import {getAllCustomer, getCustomer, deleteCustomer} from '../api/customer';
import penImg from '../pictures/crayon.png';
import trashImg from '../pictures/trash1.png';
import fridgeImg from '../pictures/fridge.png';
import tchatImg from '../pictures/tchat.png';
import researchImg from '../pictures/research.png';

export default function ClientAreaPage(){

    const token = useSelector((state) => state.user.token);
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [research, setResearch] = useState(null);

    function handleResearch(value){
        setResearch(value);
    }
    
    function handleClickResearch(){
        getCustomer(research,token).then((response) =>{
            setUsers(response);
        });
    }

    function handleClickEdit(id){
        console.log(id);
    } 

    function handleClickComment(id){
        navigate(`/comment/${id}`);
    } 

    function handleClickFridge(id){
        navigate(`/fridge/${id}`);
    } 

    function handleClickDelete(id){
        deleteCustomer(id,token);
        let newUsers = users.filter((elem) => elem.id != id);
        setUsers(newUsers);
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
                <input type="research" id="research" onChange={(e) => handleResearch(e.target.value)}/>
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
                                    <button onClick={() => handleClickEdit(user.id)}><img src={penImg} id={user.id} className="imgBtn" alt="pen pictures"/></button>
                                    <button onClick={() => handleClickComment(user.id)}><img src={tchatImg} className="imgBtn" alt="tchat pictures"/></button>
                                    <button onClick={() => handleClickFridge(user.id)}><img src={fridgeImg} className="imgBtn" alt="fridge pictures"/></button>
                                    <button onClick={() => handleClickDelete(user.id)}><img src={trashImg} className="imgBtn" alt="trash pictures"/></button>
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