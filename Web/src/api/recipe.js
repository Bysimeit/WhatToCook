import axios from 'axios';

import {API_URL} from './axiosBase';


const getListRecipe = async (email, password) => { //a finir
	
	try {
		console.log("debut axios");
		localStorage.setItem('token', undefined);
        const response = await axios({
            method: 'get',
            url: `${API_URL}/recipe/`,
        });

        
		console.log(response);

		const data = response.data
		return data;
		
	} catch (e) {
		console.log(e);
		switch (e.response.status) {
		case 400:
			throw new Error('L\'email et le mot de passe sont obligatoires');
		case 404:
			throw new Error('L\'email ou/et le mot de passe est/sont incorrect(s)');
		default: 
			throw new Error('Une erreur s\'est produite, veuillez réessayer plus tard');
		}
	}
};

const getDataRecipe = async (id) => {
	
	try {
		console.log("debut axios");
		localStorage.setItem('token', undefined);
        const response = await axios({
            method: 'get',
            url: `${API_URL}/recipe/${id}`,
        });

        
		console.log(response);

		const data = response.data
		return data;
		
	} catch (e) {
		console.log(e);
		switch (e.response.status) {
		case 400:
			throw new Error('L\'id est obligatoires');
		case 404:
			throw new Error('Recette introuvable');
		default: 
			throw new Error('Une erreur s\'est produite, veuillez réessayer plus tard');
		}
	}
};

const postNewRecipe = async (name, time, type, picture, steps, foods) => {
	
	try {
		console.log("debut axios");
		localStorage.setItem('token', undefined);
        const response = await axios({
            method: 'post',
			headers: {'Authorization': 'Bearer ' + token},
            url: `${API_URL}/recipe`,
            data: {
                name: name, 
                time: time, 
                type: type, 
                picture: picture, 
                steps: steps, 
                foods: foods
            }
        });

        console.log(response);

		const data = response.data
		return data;
		
	} catch (e) {
		console.log(e);
		switch (e.response.status) {
		case 400:
			throw new Error('Données manquantes');
		case 404:
			throw new Error('Echec de la création de recette');
		default: 
			throw new Error('Une erreur s\'est produite, veuillez réessayer plus tard');
		}
	}
};

const udpateRecipe = async (id, name, time, type, picture, steps, foods) => {
	
	try {
		console.log("debut axios");
		localStorage.setItem('token', undefined);
        const response = await axios({
            method: 'patch',
			headers: {'Authorization': 'Bearer ' + token},
            url: `${API_URL}/recipe`,
            data: {
                id: id,
                name: name, 
                time: time, 
                type: type, 
                picture: picture, 
                steps: steps, 
                foods: foods
            }
        });

        console.log(response);

		const data = response.data
		return data;
		
	} catch (e) {
		console.log(e);
		switch (e.response.status) {
		case 400:
			throw new Error('Données manquantes');
		case 404:
			throw new Error('Echec de la création de recette');
		default: 
			throw new Error('Une erreur s\'est produite, veuillez réessayer plus tard');
		}
	}
};

const deleteRecipe = async (id) => {
	
	try {
		console.log("debut axios");
		localStorage.setItem('token', undefined);
        const response = await axios({
            method: 'delete',
			headers: {'Authorization': 'Bearer ' + token},
            url: `${API_URL}/recipe`,
            data: {
                id: id,
            }
        });

        
		console.log(response);

		const data = response.data
		return data;
		
	} catch (e) {
		console.log(e);
		throw new Error('Une erreur s\'est produite, veuillez réessayer plus tard');
	}
};

export {getListRecipe, getDataRecipe, postNewRecipe, udpateRecipe, deleteRecipe}