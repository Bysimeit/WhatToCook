import React from "react";

import MenuBar from "../composants/MenuBar";
import Login from "../composants/Login";
import { login } from '../api/user';


export default function LoginPage(){

   

    return(
        <div>
            <MenuBar/>
            <Login/>
        </div>
    );
}

