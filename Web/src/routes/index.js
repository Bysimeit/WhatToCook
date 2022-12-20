import React from 'react';
import {
    BrowserRouter,
    Routes,
    Route
} from 'react-router-dom';

import WelcomePage from '../screens/WelcomePage';
import LoginPage from '../screens/LoginPage';
import ClientAreaPage from '../screens/ClientAreaPage';
import ListCommentsPage from '../screens/CommentsListPage';
import ListCustomerPage from '../screens/CustomerListPage';
import FridgePage from '../screens/FridgePage';
import AllergyPage from '../screens/AllergyPage';
import ListRecipePage from '../screens/RecipeListPage';
import ChangePassWord from '../screens/ChangePassWordPage';
import Protected from '../composants/PrivateRoute';


const Router = () => {
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<WelcomePage/>} />
                <Route path="/login" element={<LoginPage/>}/>

                {/*<Protected token={}></Protected>*/}
                <Route path="/customer" element={<ListCustomerPage/>}/>
                <Route path="/comment/:id" element={<ListCommentsPage/>}/>
                <Route path="/recipe" element={<ListRecipePage/>}/>
                <Route path="/fridge/:id" element={<FridgePage/>}/>
                <Route path="/allergy" element={<AllergyPage/>}/>
                <Route path="/admin" element={<ClientAreaPage/>}/>
                <Route path="/changePassword" element={<ChangePassWord/>} />     
                
            </Routes>
        </BrowserRouter>
    );
};

export default Router;