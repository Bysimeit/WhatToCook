import React from "react";

import MenuBar from "../composants/MenuBar";
import {useNavigate} from "react-router-dom";
import {useSelector} from 'react-redux';

export default function ListCommentsPage(){

    const user = useSelector((state) => state.user);
    const navigate = useNavigate();
    let listComments;

    

    return(
        <div>
            <MenuBar/>
            <div className="core">
                <p>Commentaire de l'utilisateur : {user.firstName}</p>
                <button>Ajouter un commentaire</button>
                {}
            </div>      
        </div>
    );
}