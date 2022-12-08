import React from "react";

import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"

export default function MenuBar() {

    let navigate = useNavigate();
    
    function handleClick(){
        navigate("/Connexion")
    }

    return (
        <div className="menu">
            <Link to={"/"} className="logo">WhatToCook</Link>
            <div className="options">
                <Link className="option">Recherche</Link>
                <h2>|</h2>
                <Link className="option">Top list</Link>
                <h2>|</h2>
                <Link className="option">Découverte</Link>
            </div>
            <div className="buttons">
                <button onClick={() => handleClick()}>Connexion</button>
                <button>Inscrption</button>        
            </div>
        </div>
    );

}
