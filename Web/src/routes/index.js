import React from 'react';
import {
    BrowserRouter,
    Routes,
    Route
} from 'react-router-dom';

import WelcomePage from '../screens/WelcomePage';
import LoginPage from '../screens/LoginPage';
import ClientAreaPage from '../screens/ClientAreaPage';
import ChangePassWord from '../screens/ChangePassWordPage';


const Router = () => {
    return(
        <BrowserRouter>
            <Routes>
            <Route path="/" element={<WelcomePage/>} />
            <Route path="/Connexion" element={<LoginPage/>}/>
            
            {/* pour le test interne*/}
            <Route path="/Admin" element={<ClientAreaPage/>}/>
            <Route path="/ChangePassword" element={<ChangePassWord/>} />
            </Routes>
        </BrowserRouter>
    );
};

export default Router;