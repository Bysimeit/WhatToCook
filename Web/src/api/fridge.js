import axios from 'axios';

import {API_URL} from './axiosBase';


const getFridge = async (id, token) => {
	
	try {
		console.log("debut axios");
        const response = await axios({
            method: 'get',
            headers: {'Authorization': 'Bearer ' + token},
            url: `${API_URL}/fridge/${id}`,
        });

		console.log(response);

		const data = response.data
		return data;
		
	} catch (e) {
		console.log(e);
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
		console.log("debut axios");
        const response = await axios({
            method: 'post',
            headers: {'Authorization': 'Bearer ' + token},
            url: `${API_URL}/fridge`,
			data: {
                id: id,
                nameFood: nameFood, 
				quantity: quantity, 
				weight: weight, 
				date: date
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
			throw new Error('Echec de l\'ajout d\'aliment');
		default: 
			throw new Error('Une erreur s\'est produite, veuillez réessayer plus tard');
		}
	}
};

const deleteFood = async (idCustomer, idFood, token) => {
	
	try {
		console.log("debut axios");
        const response = await axios({
            method: 'delete',
            headers: {'Authorization': 'Bearer ' + token},
            url: `${API_URL}/fridge`,
			data: {
                idCustomer: idCustomer,
				idFood: idFood
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


export {getFridge, postNewFood, deleteFood}