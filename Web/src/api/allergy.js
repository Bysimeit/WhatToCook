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

const getAllAllergy = async () => {
	
	try {
        const response = await axios({
            method: 'get',
            url: `${API_URL}/allergy`,
        });

		const data = response.data
		return data;
		
	} catch (e) {
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
        const response = await axios({
            method: 'get',
            url: `${API_URL}/allergy/${id}`,
        });

		const data = response.data[0].name;
		return data;
		
	} catch (e) {
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
        const response = await axios({
            method: 'post',
            headers: {'Authorization': 'Bearer ' + token},
            url: `${API_URL}/allergy`,
            data: {
                name: name
            }
        });

		const data = response.data
		return data;
		
	} catch (e) {
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
        const response = await axios({
            method: 'patch',
            headers: {'Authorization': 'Bearer ' + token},
            url: `${API_URL}/allergy`,
            data: {
                id: id,
                name: name
            }
        });

		const data = response.data
		return data;
		
	} catch (e) {
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
        const response = await axios({
            method: 'delete',
            headers: {'Authorization': 'Bearer ' + token},
            url: `${API_URL}/allergy`,
            data: {
                id: id
            }
        });

		const data = response.data
		return data;
		
	} catch (e) {
		throw new Error('Une erreur s\'est produite, veuillez réessayer plus tard');
	}
};

export {getAllAllergy, getAllergy, postNewAllergy, updateAllergy, deleteAllergy}