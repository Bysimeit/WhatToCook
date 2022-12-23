import axios from 'axios';

import {API_URL} from './axiosBase';


const getAllAllergy = async () => {
	
	try {
		console.log("debut axios");
        const response = await axios({
            method: 'get',
            url: `${API_URL}/allergy`,
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

const getAllergy = async (id) => {
	
	try {
		console.log("debut axios");
        const response = await axios({
            method: 'get',
            url: `${API_URL}/allergy/${id}`,
        });

		console.log(response.data[0]);

		const data = response.data[0].name;
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

const postNewAllergy = async (name, token) => {
	
	try {
		console.log("debut axios");
        const response = await axios({
            method: 'post',
            headers: {'Authorization': 'Bearer ' + token},
            url: `${API_URL}/allergy`,
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

const updateAllergy = async (id, name, token) => {
	
	try {
		console.log("debut axios");
        const response = await axios({
            method: 'patch',
            headers: {'Authorization': 'Bearer ' + token},
            url: `${API_URL}/allergy`,
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

const deleteAllergy = async (id, token) => {
	
	try {
		console.log("debut axios");
        const response = await axios({
            method: 'delete',
            headers: {'Authorization': 'Bearer ' + token},
            url: `${API_URL}/allergy`,
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

export {getAllAllergy, getAllergy, postNewAllergy, updateAllergy, deleteAllergy}