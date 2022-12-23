import React, {useState, useEffect} from "react";
import MenuBar from "../composants/MenuBar";
import {useSelector} from 'react-redux';
import {useParams} from "react-router-dom";
import {useNavigate} from "react-router-dom";
import {getCustomer, updateCustomer} from "../api/customer"
import VImg from '../pictures/V.png';

export default function EditCommentPage(){

    const {email} = useParams();
    const token = useSelector((state) => state.user.token);
    const navigate = useNavigate();
    const [user, setUser] = useState([]);

    function handleChangeEmail(newEmail){
        setUser({...user, email: newEmail});
    }

    function handleChangeName(newName){
        setUser({...user, name: newName});
    }

    function handleChangeFirstName(newFirstName){
        setUser({...user, firstname: newFirstName});
    }

    function handleClickValide(){
        updateCustomer(user.id, user.name, user.firstname, user.email, token).then(() => {
            navigate(`/customer`);
            alert("Modification effectuée");
            window.location.reload(false);
        }).catch(
            error => alert(error.message)
        );        
    }

    useEffect(() => {
        if(token !== undefined && token !== ""){
            getCustomer(email, token).then((response) => {
                setUser(response[0]);
            }).catch(
                error => alert(error.message)
            );
        }    
    }, [token]);

    return(
        <div>
            <MenuBar/>
            <div className="core">
                <label>
                    ID{user.id}
                </label>
                <br></br>
                <label>
                    Nom :
                    <textarea rows={1} type="text" name="name" value={user.name} onChange={(e) => handleChangeName(e.target.value)}/>
                </label>

                <label>
                    Prénom :
                    <textarea rows={1} type="text" name="firstName" value={user.firstname} onChange={(e) => handleChangeFirstName(e.target.value)}/>
                </label>

                <label>
                    Email :
                    <textarea rows={1} type="text" name="email" value={user.email} onChange={(e) => handleChangeEmail(e.target.value)}/>
                </label>

                <button onClick={() => handleClickValide()}><img src={VImg} className="imgBtn" alt="add user"/></button>
            </div>      
        </div>
    );
}
