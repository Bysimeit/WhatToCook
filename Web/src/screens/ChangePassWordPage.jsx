import React, {useState} from "react";
import MenuBar from "../composants/MenuBar";
import {useSelector} from 'react-redux';
import {useNavigate} from "react-router-dom";
import {updateEmailPasswordCustomer} from '../api/customer';

export default function ChangePassWord(){

    const token = useSelector((state) => state.user.token);
    const email = useSelector((state) => state.user.email);  
    const [oldPassWord, setOldPassWord] = useState("");
    const [newPassWord, setNewPassWord] = useState("");
    const [newPassWordConfirm, setNewPassWordConfirm] = useState("");
    const navigate = useNavigate();

    function handleSubmit(){
        if(newPassWord !== newPassWordConfirm){
            alert("les deux nouveaux mots de passes ne sont pas identique")
        } else if(oldPassWord === ""){
            alert("ancien mot de passe manquant");
        } else if(newPassWord === ""){
            alert("Aucun nouveau de passe entré");
        } else {
            updateEmailPasswordCustomer(oldPassWord, newPassWord, email, undefined, token).then(() => {
                alert("mot de passe modifié"); 
                navigate(`/admin`);
            }).catch(
                error => alert(error.message)
            );
            
        }        
    }

    return(
        <div>
            <MenuBar/>
            <div className="core">         
                <div className="ChangePassWord">
                    <h2>Changement de mot de passe</h2>
                    <div>
                        <p>Ancien mot de passe : </p>
                        <input type="password" id="oldPassWord" onChange={(e) => (setOldPassWord(e.target.value))} name="user_passWord"></input>
                    </div>
                    <div>
                        <p>Nouveau mot de passe : </p>
                        <input type="password" id="newPassWord" onChange={(e) => (setNewPassWord(e.target.value))} name="user_passWord"></input>  
                    </div>
                    <div>
                        <p>Confirmer mot de passe : </p>
                        <input type="password" id="confirmNewPassWord" onChange={(e) => (setNewPassWordConfirm(e.target.value))} name="user_passWord"></input>
                    </div>
                    <input type="button" onClick={() => handleSubmit()} value="Confirmer"/>
                </div>
            </div>      
        </div>
    );
}