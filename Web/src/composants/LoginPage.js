import React from "react";

import MenuBar from "./MenuBar";

import { Link } from "react-router-dom"

export default function LoginPage(){

    return(
        <body>
            <MenuBar/>
            <div className="core">
                <div className="loginPage">
                    <h2>Connexion</h2>
                    <form action="/ma-page-de-traitement" method="post">
                        <div>
                            <label for="mail">e-mail: </label>
                            <input type="email" id="mail" name="user_mail"/>
                        </div>
                        <div>
                            <label for="passWord">Mot de passe : </label>
                            <input type="password" id="passWord" name="user_passWord"></input>
                        </div>
                        <div class="loginButton">
                            <button type="submit">Connexion</button>
                        </div>
                    </form>
                </div>             
            </div>      
        </body>
    );
}

