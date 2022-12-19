import axios from 'axios';

import {API_URL} from './axiosBase';

const getCommentCustomer = async (id, token) => {
	
	try {
		console.log("debut axios " + id);
        const response = await axios({
            method: 'get',
            headers: {'Authorization': 'Bearer ' + token},
            url: `${API_URL}/comment`,
            params: {
                idCustomer: id,
            }
        });

		console.log(response.data);

		const data = response.data
		return data;
		
	} catch (e) {
		console.log(e);
		switch (e.response.status) {
		case 404:
			throw new Error('Aucun utilisatgeur avec cette email');
		default: 
			throw new Error('Une erreur s\'est produite, veuillez réessayer plus tard');
		}
	}
};

const getCommentRecipe = async (email, token) => {
	
	try {
		console.log("debut axios");
        const response = await axios({
            method: 'get',
            headers: {'Authorization': 'Bearer ' + token},
            url: `${API_URL}/customer/${email}`,
        });

		const data = response.data
		return data;
		
	} catch (e) {
		console.log(e);
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

const updateComment = async (lastName, firstName, password, email, token) => {
	
	try {
		console.log("debut axios");
        const response = await axios({
            method: 'post',
            headers: {'Authorization': 'Bearer ' + token},
            url: `${API_URL}/customer`,
			data: {
				lastName: lastName, 
				firstName: firstName, 
				password: password, 
				email: email
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
		default: 
			throw new Error('Une erreur s\'est produite, veuillez réessayer plus tard');
		}
	}
};

export {getCommentCustomer, getCommentRecipe, updateComment}