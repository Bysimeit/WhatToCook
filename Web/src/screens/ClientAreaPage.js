import React from "react";
import MenuBar from "../composants/MenuBar";
import picture from '../pictures/imgProfileDefault.jpg';
import {useSelector, useDispatch} from 'react-redux';
import {useNavigate} from "react-router-dom";
import {setToken} from '../store/userSlicer';

export default function ClientAreaPage(){

    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    let adminSide;

    function handleClickLogOut(){
        navigate("/");
        dispatch(setToken(null));
        localStorage.removeItem('token');
    } 
    
    if(user.isAdmin){
        adminSide = <div className="adminSide">
            <h3>Vous êtes connecté en tant qu'administrateur</h3>
            <input type="button" value="Gestion Comptes"/>
            <input type="button" value="Gestion Recettes"/>
        </div>
    }

    return(
        <div>
            <MenuBar/>
            <div className="core">
                <div className="ClientArea">
                    <div className="imgArea">
                        <img src={picture} className="mainUserPicture" alt="photo de profile"/>
                        <br/>
                        <input type="button" disabled="disabled" value="Changer de photo"/>
                    </div>

                    <div className="userInformations">
                        <p>Nom : {useSelector((state) => state.user.name)}</p>
                        <p>Prénom : {useSelector((state) => state.user.firstName)}</p>
                        <p>Email : {useSelector((state) => state.user.email)}</p>
                        <input type="button" disabled="disabled" value="Changer Mot de passe"/>
                    </div>

                    {adminSide}
                </div>
                <div className="buttom">
                    <input type="button" onClick={() => handleClickLogOut()} value="Se déconnecter"/>
                    <input type="button" value="Supprimer Compte"/>
                </div>
            </div>      
        </div>
    );
}