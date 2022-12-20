import React from "react";

import MenuBar from "../composants/MenuBar";

export default function ChangePassWord(){

    return(
        <div>
            <MenuBar/>
            <div className="core">         
                <div className="ChangePassWord">
                    <h2>Changement de mot de passe</h2>
                    <div>
                        <p>Ancien mot de passe : </p>
                        <input type="password" id="oldPassWord" name="user_passWord"></input>
                    </div>
                    <div>
                        <p>Nouveau mot de passe : </p>
                        <input type="password" id="newPassWord" name="user_passWord"></input>  
                    </div>
                    <div>
                        <p>Confirmer mot de passe : </p>
                        <input type="password" id="confirmNewPassWord" name="user_passWord"></input>
                    </div>
                    <input type="button" value="Confirmer"/>
                </div>
            </div>      
        </div>
    );
}