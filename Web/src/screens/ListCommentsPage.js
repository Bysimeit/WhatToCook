import React, {useState, useEffect} from "react";
import MenuBar from "../composants/MenuBar";
import {useNavigate} from "react-router-dom";
import {useSelector} from 'react-redux';
import {getCommentCustomer} from '../api/comment';
import penImg from '../pictures/crayon.png';
import trashImg from '../pictures/trash1.png';

export default function ListCommentsPage(){

    const token = useSelector((state) => state.user.token);
    const [listComments, setListComments] = useState([]);
    const [userNameTarget, setUserNameTarger] = useState('');
    let key = 1;
    
    function handleClickAddComment(){
        
    } 

    function handleClickEditComment(){
        
    } 

    function handleClickDeleteComment(){
        
    } 

    useEffect(() => {
        if(token !== undefined && token !== ""){
            getCommentCustomer(1, token).then((reponse) => {
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
                        if(data.comment !== ''){
                            return ( 
                                <div key={key++} className="commentArea">
                                    <p className="comment">{data.comment}</p>
                                    <button className="commentListBtn" onClick={() => handleClickEditComment()}><img src={penImg} className="imgBtn" alt="pen pictures"/></button>
                                    <button className="commentListBtn" onClick={() => handleClickDeleteComment()}><img src={trashImg} className="imgBtn" alt="pen pictures"/></button>
                                </div>);
                        }
          
                    })}
            </div>      
        </div>
    );
}