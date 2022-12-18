import './App.css';
import Router from './routes';
import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {verifTokenAxios} from './api/user';
import {login, setToken} from './store/userSlicer';

function App() {

  const dispatch = useDispatch();
  const selector = useSelector((state) => state);  

  useEffect(() => {
    let token = localStorage.getItem('token');
    
    if(token != null && token != undefined){
      refreshPage(token); 
    }  
  }, []);

  //a supprimer a la fin
  useEffect(() => {
    console.log(selector);
  }, [selector]);
  
  async function refreshPage(token){  
      let response = await verifTokenAxios(token);
      
      if(response.status == 200){
        dispatch(setToken(token));
        dispatch(login(response.data));     
      } else {
        localStorage.removeItem('token');
      }
  }       


  return (
    <div>
      <Router/>
    </div>
  );
}

export default App;