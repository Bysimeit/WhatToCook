import axios from 'axios';

import {API_URL} from './axiosBase';


const getAllFood = async () => {
	
	try {
		console.log("debut axios");
		const token = localStorage.getItem('token');
        const response = await axios({
            method: 'get',
            headers: {'Authorization': 'Bearer ' + token},
            url: `${API_URL}/food`,
        });

		console.log(response);

		const data = response.data
		return data;
		
	} catch (e) {
		console.log(e);
		switch (e.response.status) {
		case 404:
			throw new Error('Aucune nourriture trouvée');
		default: 
			throw new Error('Une erreur s\'est produite, veuillez réessayer plus tard');
		}
	}
};

const postNewFood = async (name, allergy) => {
	
	try {
		console.log("debut axios");
		const token = localStorage.getItem('token');
        const response = await axios({
            method: 'post',
            headers: {'Authorization': 'Bearer ' + token},
            url: `${API_URL}/food`,
            data: {
                name: name,
                allergy: allergy, 
            }
        });

		console.log(response);

		const data = response.data
		return data;
		
	} catch (e) {
		console.log(e);
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

const updateFood = async (id, name, allergy) => {
	
	try {
		console.log("debut axios");
		const token = localStorage.getItem('token');
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

		console.log(response);

		const data = response.data
		return data;
		
	} catch (e) {
		console.log(e);
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

const deleteFood = async (id) => {
	
	try {
		console.log("debut axios");
		const token = localStorage.getItem('token');
        const response = await axios({
            method: 'delete',
            headers: {'Authorization': 'Bearer ' + token},
            url: `${API_URL}/food`,
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

export {getAllFood, postNewFood, updateFood, deleteFood}