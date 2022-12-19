import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Link} from "react-router-dom";
import {useNavigate} from "react-router-dom";
import picture from '../pictures/imgProfileDefault.jpg';
import {setToken} from '../store/userSlicer';

export default function MenuBar() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const token = useSelector((state) => state.user.token);
    const [isMenuVisible, setMenuVisible] = useState(false);

    function handleClick() {
        navigate("/Login");
    } 

    function changeVisibility() {
        if (isMenuVisible) {
            setMenuVisible(false);
        } else {
            setMenuVisible(true);
        }
    }

    function onClickAccount() {
        navigate("/admin");
        setMenuVisible(false);
    }
    function onClickFavorites() {
        setMenuVisible(false);
    }
    function onClickFridge() {
        navigate("/fridge");
        setMenuVisible(false);
    }
    function onClickLogOut() {
        navigate("/");
        dispatch(setToken(""));
        localStorage.removeItem('token');
        setMenuVisible(false);
    }

    function isShow() {
        if (isMenuVisible) {
            return (
                <div className='detailMenu'>
                    <div className='itemMenuDetail' onClick={() => onClickAccount()}>Compte</div>
                    <div className='itemMenuDetail' onClick={() => onClickFavorites()}>Favoris</div>
                    <div className='itemMenuDetail' onClick={() => onClickFridge()}>Mon frigo</div>
                    <div className='itemMenuDetail' onClick={() => onClickLogOut()}>Se déconnecter</div>
                </div>
            );
        }
    }

    function showMenu() {
        if (token === "" || token === undefined) {
            return <div className="buttons">
                        <button onClick={() => handleClick()}>Connexion</button>
                        <button>Inscrption</button>
                    </div>;
        } else {
            return (
                <div className='imageMenu'>
                    <img src={picture} className="menuPicture" alt="photo de profile" onClick={changeVisibility}/>
                    {isShow()}
                </div>
            );
        }
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
            {showMenu()}
        </div>
    );
}
