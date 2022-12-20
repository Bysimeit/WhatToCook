import React, {useState, useEffect} from "react";
import MenuBar from "../composants/MenuBar";
import {useParams} from "react-router-dom";
import {useSelector} from 'react-redux';
import {getCommentCustomer, updateComment} from '../api/comment';
import penImg from '../pictures/crayon.png';
import trashImg from '../pictures/trash1.png';

export default function ListCommentsPage(){

    const {id} = useParams();
    const token = useSelector((state) => state.user.token);
    const [listComments, setListComments] = useState([]);
    const [userNameTarget, setUserNameTarger] = useState('');
    let key = 1; 
    
    function handleClickAddComment(){
        
    } 

    function handleClickEditComment(idRecipe, comment){
        
    } 

    function handleClickDeleteComment(idRecipe){
        console.log(id);
        console.log(idRecipe);
        updateComment(id, idRecipe, "", token);
        setListComments((prev) => {
            console.log(prev);
            prev.map(item => {
                if(item.idRecipe == idRecipe){
                    item = null;
                }         
            });
            console.log(prev);
        });
    } 

    function udpateList(idRecipe){
        
    }

    useEffect(() => {
        if(token !== undefined && token !== ""){
            getCommentCustomer(id, token).then((reponse) => {
                setListComments(reponse);
            });
        }    
    }, [token]);
    

    return(
        <div>
            <MenuBar/>
            <div className="core">
                <p>Commentaire de l'utilisateur : {userNameTarget}</p>
                <button onClick={() => handleClickAddComment()}>Ajouter un commentaire</button>
                    {listComments.map((data) => {
                        if(data.comment !== '' && data.comment !== " "){
                            return ( 
                                <div key={data.idrecipe} className="commentArea">
                                    <p className="comment">{data.comment}</p>
                                    <button className="commentListBtn" onClick={() => handleClickEditComment(data.idRecipe, data.comment)}><img src={penImg} className="imgBtn" alt="pen pictures"/></button>
                                    <button className="commentListBtn" onClick={() => handleClickDeleteComment(data.idrecipe)}><img src={trashImg} className="imgBtn" alt="trash pictures"/></button>
                                </div>);
                        }
          
                    })}
            </div>      
        </div>
    );
}