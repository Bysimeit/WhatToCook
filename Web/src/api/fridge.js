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

const getFridge = async (id, token) => {
	
	try {
        const response = await axios({
            method: 'get',
            headers: {'Authorization': 'Bearer ' + token},
            url: `${API_URL}/fridge/${id}`,
        });

		const data = response.data
		return data;
		
	} catch (e) {
		switch (e.response.status) {
		case 400:
			throw new Error('Id utilateur manquant');
		case 404:
			throw new Error('Aucun frigo avec cette email');
		default: 
			throw new Error('Une erreur s\'est produite, veuillez réessayer plus tard');
		}
	}
};


const postNewFood = async (id, nameFood, quantity, weight, date, token) => {
	
	try {
        const response = await axios({
            method: 'post',
            headers: {'Authorization': 'Bearer ' + token},
            url: `${API_URL}/fridge`,
			data: {
                idCustomer: id,
                nameFood: nameFood, 
				quantity: quantity, 
				weight: weight, 
				date: date
            }
        });

		const data = response.data
		return data;
		
	} catch (e) {
		switch (e.response.status) {
		case 400:
			throw new Error('Données manquantes');
		case 404:
			throw new Error('Echec de l\'ajout d\'aliment');
		default: 
			throw new Error('Une erreur s\'est produite, veuillez réessayer plus tard');
		}
	}
};

const deleteFood = async (idCustomer, idFood, token) => {
	
	try {
        const response = await axios({
            method: 'delete',
            headers: {'Authorization': 'Bearer ' + token},
            url: `${API_URL}/fridge`,
			data: {
                idCustomer: idCustomer,
				idFood: idFood
            }
        });

		const data = response.data
		return data;
		
	} catch (e) {
		throw new Error('Une erreur s\'est produite, veuillez réessayer plus tard');
	}
};


export {getFridge, postNewFood, deleteFood}