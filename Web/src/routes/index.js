import React from 'react';
import {
    BrowserRouter,
    Routes,
    Route
} from 'react-router-dom';

import WelcomePage from '../screens/WelcomePage';
import LoginPage from '../screens/LoginPage';
import ClientAreaPage from '../screens/ClientAreaPage';
import ListCommentsPage from '../screens/ListCommentsPage';

import ChangePassWord from '../screens/ChangePassWordPage';
import Protected from '../composants/PrivateRoute';


const Router = () => {
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<WelcomePage/>} />
                <Route path="/login" element={<LoginPage/>}/>
                <Route path="/comment" element={<ListCommentsPage/>}/>
                
                {/*<Protected token={}></Protected>*/}
                    <Route path="/admin" element={<ClientAreaPage/>}/>
                    <Route path="/changePassword" element={<ChangePassWord/>} />
                
            </Routes>
        </BrowserRouter>
    );
};

export default Router;