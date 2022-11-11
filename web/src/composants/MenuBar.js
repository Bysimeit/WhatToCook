import React from "react";

import { Link } from "react-router-dom"

export default function MenuBar() {

    return (
        <div className="menu">
            <Link className="logo">WhatToCook</Link>
            <div className="test">
                <Link className="category">Recherche</Link>
                <h2>|</h2>
                <Link className="category">Top list</Link>
                <h2>|</h2>
                <Link className="category">Découverte</Link>
            </div>
            <div className="login">
                <button>Connexion</button>
                <button>Inscrption</button>        
            </div>
        </div>
    );

}
