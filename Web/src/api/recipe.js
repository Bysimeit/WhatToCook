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

const getListRecipe = async (type, time, allergies, foods) => { //a finir
	
	try {
        const response = await axios({
            method: 'get',
            url: `${API_URL}/recipe/`,
			params: {
				type: type, 
				time: time, 
				allergies: allergies, 
				foods: foods
			}
        });

		const data = response.data
		return data;
		
	} catch (e) {
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
        const response = await axios({
            method: 'get',
            url: `${API_URL}/recipe/${id}`,
        });

		const data = response.data[0]
		return data;
		
	} catch (e) {
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

const postNewRecipe = async (formData, token) => {
	
	try {
		const response = await axios.post(`${API_URL}/recipe`, formData, {
			headers: {
				'Authorization': 'Bearer ' + token,
				'Content-Type': 'multipart/form-data'
			}
        });

		const data = response.data
		return data;
		
	} catch (e) {
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

const udpateRecipe = async (formData, token) => {
	
	try {
		const response = await axios.patch(`${API_URL}/recipe`, formData, {
			headers: {
				'Authorization': 'Bearer ' + token,
				'Content-Type': 'multipart/form-data'
			}
        });

		const data = response.data
		return data;
		
	} catch (e) {
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

const udpatePicture = async (picture, token) => {
	
	try {
        const response = await axios.patch(`${API_URL}/recipe/picture`, picture, {
			headers: {
				'Authorization': 'Bearer ' + token,
				'Content-Type': 'multipart/form-data'
			}
        });

		const data = response.data
		return data;
		
	} catch (e) {
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

const deleteRecipe = async (id, token) => {
	
	try {
        const response = await axios({
            method: 'delete',
			headers: {'Authorization': 'Bearer ' + token},
            url: `${API_URL}/recipe`,
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

export {getListRecipe, getDataRecipe, postNewRecipe, udpatePicture, udpateRecipe, deleteRecipe}