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

const getAllCommentCustomer = async (idCustomer, token) => {
	
	try {
        const response = await axios({
            method: 'get',
            headers: {'Authorization': 'Bearer ' + token},
            url: `${API_URL}/comment`,
            params: {
                idCustomer: idCustomer,
            }
        });

		const data = response.data
		return data;
		
	} catch (e) {
		switch (e.response.status) {
		case 404:
			throw new Error('Aucun utilisatgeur avec cette email');
		default: 
			throw new Error('Une erreur s\'est produite, veuillez réessayer plus tard');
		}
	}
};

const getCommentCustomer = async (idCustomer, idRecipe, token) => {
	
	try {
        const response = await axios({
            method: 'get',
            headers: {'Authorization': 'Bearer ' + token},
            url: `${API_URL}/comment/target`,
            params: {
                idCustomerText: idCustomer,
				idRecipeText: idRecipe
            }
        });

		const data = response.data[0].comment;
		return data;
		
	} catch (e) {
		switch (e.response.status) {
		case 404:
			throw new Error('Aucun utilisatgeur avec cette email');
		default: 
			throw new Error('Une erreur s\'est produite, veuillez réessayer plus tard');
		}
	}
};

const getCommentRecipe = async (idRecipe, token) => {
	
	try {
        const response = await axios({
            method: 'get',
            headers: {'Authorization': 'Bearer ' + token},
            url: `${API_URL}/comment/${idRecipe}`,
        });

		const data = response.data
		return data;
		
	} catch (e) {
		switch (e.response.status) {
		case 400:
			throw new Error('Email non identifié');
		case 404:
			throw new Error('Aucun utilisatgeur avec cette email');
		default: 
			throw new Error('Une erreur s\'est produite, veuillez réessayer plus tard');
		}
	}
};

const postComment = async (idCustomer, idRecipe, comment, token) => {
	
	try {
		const response = await axios({
			method: 'post',
			headers: {'Authorization': 'Bearer ' + token},
			url: `${API_URL}/comment`,
			data: {
				idCustomer: idCustomer, 
				idRecipe: idRecipe,
				comment: comment
			}
		});

		const data = response.data
		return data;
		
	} catch (e) {
		switch (e.response.status) {
		case 400:
			throw new Error('Données manquante pour l\'ajout');
		default: 
			throw new Error('Une erreur s\'est produite, veuillez réessayer plus tard');
		}
	}
};

const updateComment = async (idCustomer, idRecipe, comment, token) => {
	
	try {
		let response;
		if(comment == ""){
			response = await axios({
				method: 'patch',
				headers: {'Authorization': 'Bearer ' + token},
				url: `${API_URL}/comment`,
				data: {
					idCustomer: idCustomer, 
					idRecipe: idRecipe
				}
			});
		} else {
			response = await axios({
				method: 'patch',
				headers: {'Authorization': 'Bearer ' + token},
				url: `${API_URL}/comment`,
				data: {
					idCustomer: idCustomer, 
					idRecipe: idRecipe,
					comment: comment
				}
			});
		}

		const data = response.data
		return data;
		
	} catch (e) {
		switch (e.response.status) {
		case 400:
			throw new Error('Données manquante pour l\'ajout');
		default: 
			throw new Error('Une erreur s\'est produite, veuillez réessayer plus tard');
		}
	}
};

export {getAllCommentCustomer, getCommentCustomer, getCommentRecipe, postComment, updateComment}