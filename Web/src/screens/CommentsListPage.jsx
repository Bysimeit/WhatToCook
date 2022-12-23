import React, {useState, useEffect} from "react";
import MenuBar from "../composants/MenuBar";
import {useParams} from "react-router-dom";
import {useSelector} from 'react-redux';
import {getAllCommentCustomer, updateComment, postComment} from '../api/comment';
import {getListRecipe} from '../api/recipe';
import {useNavigate} from "react-router-dom";
import penImg from '../pictures/crayon.png';
import trashImg from '../pictures/trash1.png';
import VImg from '../pictures/V.png';
import cancelImg from '../pictures/cancel.png';


export default function ListCommentsPage(){

    const {id} = useParams();
    const token = useSelector((state) => state.user.token);
    const navigate = useNavigate();
    const [listComments, setListComments] = useState([]);
    const [userNameTarget, setUserNameTarger] = useState();
    const [newCommentInterface, setNewCommentInterface] = useState(false);
    const [newComment, setNewComment] = useState('');
    const [listRecipe, setListRecipe] = useState([]);
    const [recipeTarget, setRecipeTarget] = useState(0);
    
    function handleNewComment(comment){
        setNewComment(comment);
    }

    function handleSelectRecipe(id){
        setRecipeTarget(id);      
    }

    function handleClickAddComment(){
        setNewCommentInterface(true);
    } 

    function handleClickValidComment(isValid){
        if(isValid){
            postComment(id, recipeTarget, newComment, token).then(() => {
                getAllCommentCustomer(id, token).then((reponse) => {
                    setListComments(reponse);         
                }).catch(
                    error => alert(error.message)
                )
            });
        }
        setNewCommentInterface(false);
    } 

    function handleClickEditComment(idRecipe, comment){
        navigate(`/comment/${id}/${idRecipe}`);
    } 

    function handleClickDeleteComment(idRecipe){
        updateComment(id, idRecipe, "", token).then(() => {
            let newCommentsList = listComments.filter((elem) => elem.idrecipe != idRecipe);
            setListComments(newCommentsList);
            alert("suppresion effecutée");
        }).catch(
            error => alert(error.message)
        );       
    } 

    useEffect(() => {
        if(token !== undefined && token !== ""){
            getAllCommentCustomer(id, token).then((reponse) => {
                setListComments(reponse);
            });
            getListRecipe(undefined, undefined, undefined, undefined).then((response) => {
                setListRecipe(response);
            });
        }    
    }, [token]);
    

    return(
        <div>
            <MenuBar/>
            <div className="core">
                <p>Commentaire de l'utilisateur : {userNameTarget}</p>
                <button onClick={() => handleClickAddComment()}>Ajouter un commentaire</button>
                    {newCommentInterface == true &&
                            <div key={0} className="commentArea">
                                <input onChange={(e) => handleNewComment(e.target.value)} className="comment" ></input>
                                <select onChange={(e) => handleSelectRecipe(e.target.value)}>
                                    <option key={0} value={0}></option>
                                        {listRecipe.map((item) => {
                                            return(
                                                <option key={item.id} value={item.id}>{item.namerecipe}</option>
                                            );
                                        })}
                                </select>
                                <button className="commentListBtn" onClick={() => handleClickValidComment(true)}><img src={VImg} className="imgBtn" alt="valid pictures"/></button>
                                <button className="commentListBtn" onClick={() => handleClickValidComment(false)}><img src={cancelImg} className="imgBtn" alt="cancel pictures"/></button>
                            </div>         
                    }
                    {listComments.map((data) => {
                        if(data.comment !== '' && data.comment !== " "){
                            return ( 
                                <div key={data.idrecipe} className="commentArea">
                                    
                                    <p className="comment">{data.comment}</p>
                                    
                                    <button className="commentListBtn" onClick={() => handleClickEditComment(data.idrecipe)}><img src={penImg} className="imgBtn" alt="pen pictures"/></button>
                                    <button className="commentListBtn" onClick={() => handleClickDeleteComment(data.idrecipe)}><img src={trashImg} className="imgBtn" alt="trash pictures"/></button>
                                </div>);
                        } 
                    })}
            </div>      
        </div>
    );
}