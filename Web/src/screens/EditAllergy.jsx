import React, {useState, useEffect} from "react";
import MenuBar from "../composants/MenuBar";
import {useSelector} from 'react-redux';
import {useNavigate} from "react-router-dom";
import {useParams} from "react-router-dom";
import {getAllergy, updateAllergy} from "../api/allergy"
import VImg from '../pictures/V.png';

export default function EdiAllergyPage(){

    const {id} = useParams();
    const token = useSelector((state) => state.user.token);
    const navigate = useNavigate();
    const [allergy, setAllergies] = useState("");

    function handleClickAdd(){
        console.log(allergy);
        updateAllergy(id, allergy, token);
        navigate(`/allergy`);
        window.location.reload(false);
    } 

    function handleEdit(value){
        console.log(allergy);
        setAllergies(value);
    }

    useEffect(() => {
        if(token !== undefined && token !== ""){
            getAllergy(id, token).then((response) => {             
                setAllergies(response);
            });
        }    
    }, [token]);

    return(
        <div>
            <MenuBar/>
            <div className="core">
                <p>Modifier le commentaire :</p>
                <textarea rows={4} value={allergy} onChange={(e) => handleEdit(e.target.value)}></textarea>
                <button onClick={() => handleClickAdd()}><img src={VImg} className="imgBtn" alt="add food"/></button>
            </div>      
        </div>
    );
}