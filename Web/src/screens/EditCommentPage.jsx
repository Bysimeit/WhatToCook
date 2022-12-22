import React, {useState, useEffect} from "react";
import MenuBar from "../composants/MenuBar";
import {useSelector, useDispatch} from 'react-redux';
import {useNavigate} from "react-router-dom";
import {useParams} from "react-router-dom";
import {getCommentCustomer, updateComment} from "../api/comment"
import VImg from '../pictures/V.png';

export default function EditCommentPage(){

    const {id, idRecipe} = useParams();
    const token = useSelector((state) => state.user.token);
    const navigate = useNavigate();
    const [comment, setComment] = useState(" ");

    function handleClickAdd(){
        console.log(comment);
        updateComment(id, idRecipe, comment, token);
        navigate(`/comment/${id}`);
        window.location.reload(false);
    } 

    function handleEdit(value){
        console.log(comment);
        setComment(value);
    }

    useEffect(() => {
        if(token !== undefined && token !== ""){
            getCommentCustomer(id, idRecipe, token).then((response) => {             
                setComment(response);
            });
        }    
    }, [token]);

    return(
        <div>
            <MenuBar/>
            <div className="core">
                <p>Modifier le commentaire :</p>
                <textarea rows={4} value={comment} onChange={(e) => handleEdit(e.target.value)}></textarea>
                <button className="fridgeBtn" onClick={() => handleClickAdd()}><img src={VImg} className="imgBtn" alt="add food"/></button>
            </div>      
        </div>
    );
}