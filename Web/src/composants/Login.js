import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {loginAxios} from '../api/user';
import {getCustomer} from '../api/customer';
import {login} from '../store/userSlicer';


export default function Login(){

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const selector = useSelector((state) => state);  
    useEffect(() => {
        console.log(selector)
    }, [selector]);

    async function processLogin(){
        if(await loginAxios(email,password)){
            const data = await getCustomer(email);
            dispatch(login(data));          
        } else {
            console.log("erreur");
        };
    }

    function handleSubmit(event) {
        event.preventDefault();
        alert('Le nom a été soumis : ' + email + password);
        processLogin(); 
    }

    return(
        <div className="core">
            <div className="loginPage">
                <h2>Connexion</h2>
                <form>
                    <div>
                        <label htmlFor="mail">e-mail: </label>
                        <input type="email" id="mail" onChange={(e) => setEmail(e.target.value)}/>                       
                    </div>
                    <div>
                        <label htmlFor="passWord">Mot de passe : </label>
                        <input type="password" id="passWord" onChange={(e) => setPassword(e.target.value)}/>
                    </div>
                    <div className="loginButton">
                        <button type="submit" onClick={(e) => handleSubmit(e)}>Connexion</button>                        
                    </div>
                </form>
            </div>             
        </div>
    ); 
          
}