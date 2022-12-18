import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import {Link} from "react-router-dom";
import {useNavigate} from "react-router-dom";
import picture from '../pictures/imgProfileDefault.jpg';
//import { Menu, SubMenu, Item } from "burger-menu";
//import 'burger-menu/lib/index.css';

export default function MenuBar() {

    const navigate = useNavigate();
    const token = useSelector((state) => state.user.token);
    let rightMenu;
    //let [isOpen, setIsOpen] = useState(false);

    function handleClick(){
        navigate("/Login");
    } 
    
    if(token == "" || token == undefined){
        rightMenu = <div className="buttons">
                        <button onClick={() => handleClick()}>Connexion</button>
                        <button>Inscrption</button>        
                    </div>;
    } else {
        rightMenu = <img src={picture} className="menuPicture" alt="photo de profile"/> ;
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
            {rightMenu}   
        </div>
    );

}
