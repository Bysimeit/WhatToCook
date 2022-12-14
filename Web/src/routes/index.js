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
import EditCommentsPage from '../screens/EditCommentPage';
import ListCustomerPage from '../screens/CustomerListPage';
import EditCustomerPage from '../screens/EditCustomerPage';
import FridgePage from '../screens/FridgePage';
import AllergyPage from '../screens/AllergyPage';
import EditAllergyPage from '../screens/EditAllergy';
import ListRecipePage from '../screens/RecipeListPage';
import RecipePage from '../screens/RecipePage';
import ChangePassWord from '../screens/ChangePassWordPage';
import {useSelector} from 'react-redux';

const Router = () => {

    const token = useSelector((state) => state.user.token);

    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<WelcomePage/>} />
                <Route path="/login" element={<LoginPage/>}/>

                {token !== "" && token !== undefined &&
                <>
                    <Route path="/customer" element={<ListCustomerPage/>}/>
                    <Route path="/customer/:email" element={<EditCustomerPage/>}/>
                    <Route path="/comment/:id" element={<ListCommentsPage/>}/>
                    <Route path="/comment/:id/:idRecipe" element={<EditCommentsPage/>}/>
                    <Route path="/recipe" element={<ListRecipePage/>}/>
                    <Route path="/recipe/:id" element={<RecipePage/>}/>
                    <Route path="/fridge/:id" element={<FridgePage/>}/>
                    <Route path="/allergy" element={<AllergyPage/>}/>
                    <Route path="/allergy/:id" element={<EditAllergyPage/>}/>
                    <Route path="/admin" element={<ClientAreaPage/>}/>
                    <Route path="/changePassword" element={<ChangePassWord/>} />  
                </>
                }
                
            </Routes>
        </BrowserRouter>
    );
};

export default Router;