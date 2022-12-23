import axios from 'axios';
import axiosRetry from "axios-retry";
import {API_URL} from './axiosBase';

axiosRetry(axios, {
	retries: 3,
	retryDelay: (retryCount) => {
	  return retryCount * 2000;
	},
	retryCondition: (error) => {
	  return error.response.status === 500;
	},
  });

const getAllFood = async (token) => {
	
	try {
        const response = await axios({
            method: 'get',
            headers: {'Authorization': 'Bearer ' + token},
            url: `${API_URL}/food`,
        });

		const data = response.data
		return data;
		
	} catch (e) {
		switch (e.response.status) {
		case 404:
			throw new Error('Aucune nourriture trouvée');
		default: 
			throw new Error('Une erreur s\'est produite, veuillez réessayer plus tard');
		}
	}
};

const postNewFood = async (name, allergy, token) => {
	
	try {
        const response = await axios({
            method: 'post',
            headers: {'Authorization': 'Bearer ' + token},
            url: `${API_URL}/food`,
            data: {
                name: name,
                allergy: allergy, 
            }
        });

		const data = response.data
		return data;
		
	} catch (e) {
		switch (e.response.status) {
        case 400:
			throw new Error('Données manquante pour l\'ajout');
		case 404:
			throw new Error('Aucune allergie trouvée avec ce nom');
		default: 
			throw new Error('Une erreur s\'est produite, veuillez réessayer plus tard');
		}
	}
};

const updateFood = async (id, name, allergy, token) => {
	
	try {
        const response = await axios({
            method: 'update',
            headers: {'Authorization': 'Bearer ' + token},
            url: `${API_URL}/food`,
            data: {
                id: id,
                name: name,
                allergy: allergy, 
            }
        });

		const data = response.data
		return data;
		
	} catch (e) {
		switch (e.response.status) {
        case 400:
			throw new Error('Données manquante pour l\'ajout');
		case 404:
			throw new Error('Aucune allergie trouvée avec ce nom');
		default: 
			throw new Error('Une erreur s\'est produite, veuillez réessayer plus tard');
		}
	}
};

const deleteFood = async (id, token) => {
	
	try {
        const response = await axios({
            method: 'delete',
            headers: {'Authorization': 'Bearer ' + token},
            url: `${API_URL}/food`,
            data: {
                id: id, 
            }
        });

		const data = response.data
		return data;
		
	} catch (e) {
		throw new Error('Une erreur s\'est produite, veuillez réessayer plus tard');
	}
};

export {getAllFood, postNewFood, updateFood, deleteFood}