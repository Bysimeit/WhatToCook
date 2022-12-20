import axios from 'axios';

import {API_URL} from './axiosBase';

const getCommentCustomer = async (idCustomer, token) => {
	
	try {
		console.log("debut axios ");
        const response = await axios({
            method: 'get',
            headers: {'Authorization': 'Bearer ' + token},
            url: `${API_URL}/comment`,
            params: {
                idCustomer: idCustomer,
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

const getCommentRecipe = async (idRecipe, token) => {
	
	try {
		console.log("debut axios");
        const response = await axios({
            method: 'get',
            headers: {'Authorization': 'Bearer ' + token},
            url: `${API_URL}/comment/${idRecipe}`,
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

const updateComment = async (idCustomer, idRecipe, comment, token) => {
	
	try {
		console.log("debut axios");
		console.log(idCustomer);
		console.log(idRecipe);
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