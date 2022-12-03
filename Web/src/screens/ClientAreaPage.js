import React from "react";

import MenuBar from "../composants/MenuBar";
import picture from '../pictures/imgProfileDefault.jpg';

export default function ClientAreaPage(){

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
                        <p>Nom : ...</p>
                        <p>Prénom : ...</p>
                        <p>Email : ...</p>
                        <input type="button" disabled="disabled" value="Changer Mot de passe"/>
                    </div>

                    <div className="adminSide">
                        <h3>Vous êtes connecté en tant qu'administrateur</h3>
                        <input type="button" value="Gestion Comptes"/>
                        <input type="button" value="Gestion Recettes"/>
                    </div>
                </div>
                <div className="buttom">
                    <input type="button" value="Se déconnecter"/>
                    <input type="button" value="Supprimer Compte"/>
                </div>
            </div>      
        </div>
    );
}