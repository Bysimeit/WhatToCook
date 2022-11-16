import React from "react";

import MenuBar from "./MenuBar";

import { Link } from "react-router-dom"

export default function LoginPage(){

    return(
        <div>
            <MenuBar/>
            <div className="core">
                <div className="loginPage">
                    <h2>Connexion</h2>
                    <form action="/ma-page-de-traitement" method="post">
                        <div>
                            <label htmlFor="mail">e-mail: </label>
                            <input type="email" id="mail" name="userMail"/>
                        </div>
                        <div>
                            <label htmlFor="passWord">Mot de passe : </label>
                            <input type="password" id="passWord" name="userPassWord"></input>
                        </div>
                        <div className="loginButton">
                            <button type="submit">Connexion</button>
                        </div>
                    </form>
                </div>             
            </div>      
        </div>
    );
}

