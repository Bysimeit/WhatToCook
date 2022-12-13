import React from "react";
import {useSelector} from 'react-redux';
import {Link} from "react-router-dom";
import {useNavigate} from "react-router-dom";
import picture from '../pictures/imgProfileDefault.jpg';

export default function MenuBar() {

    const navigate = useNavigate();
    const selector = useSelector((state) => state);
    
    function handleClick(){
        navigate("/Login")
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
            {localStorage.getItem('token') == null
                ?   <div className="buttons">
                        <button onClick={() => handleClick()}>Connexion</button>
                        <button>Inscrption</button>        
                    </div>

                :   <img src={picture} className="menuPicture" alt="photo de profile"/>
            }
            
        </div>
    );

}
