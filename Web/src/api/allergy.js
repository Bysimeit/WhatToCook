import axios from 'axios';

import {API_URL} from './axiosBase';


const getAllAllergy = async () => {
	
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
			throw new Error('Aucune allergies trouvées');
		default: 
			throw new Error('Une erreur s\'est produite, veuillez réessayer plus tard');
		}
	}
};

const postNewAllergy = async (name) => {
	
	try {
		console.log("debut axios");
		const token = localStorage.getItem('token');
        const response = await axios({
            method: 'post',
            headers: {'Authorization': 'Bearer ' + token},
            url: `${API_URL}/food`,
            data: {
                name: name
            }
        });

		console.log(response);

		const data = response.data
		return data;
		
	} catch (e) {
		console.log(e);
		switch (e.response.status) {
		case 400:
			throw new Error('Données manquantes pour la requête');
		default: 
			throw new Error('Une erreur s\'est produite, veuillez réessayer plus tard');
		}
	}
};

const updateAllergy = async (id, name) => {
	
	try {
		console.log("debut axios");
		const token = localStorage.getItem('token');
        const response = await axios({
            method: 'patch',
            headers: {'Authorization': 'Bearer ' + token},
            url: `${API_URL}/food`,
            data: {
                id: id,
                name: name
            }
        });

		console.log(response);

		const data = response.data
		return data;
		
	} catch (e) {
		console.log(e);
		switch (e.response.status) {
		case 400:
			throw new Error('Données manquantes pour la requête');
		default: 
			throw new Error('Une erreur s\'est produite, veuillez réessayer plus tard');
		}
	}
};

const deleteAllergy = async (id) => {
	
	try {
		console.log("debut axios");
		const token = localStorage.getItem('token');
        const response = await axios({
            method: 'delete',
            headers: {'Authorization': 'Bearer ' + token},
            url: `${API_URL}/food`,
            data: {
                id: id
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

export {getAllAllergy, postNewAllergy, updateAllergy, deleteAllergy}