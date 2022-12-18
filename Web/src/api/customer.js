import axios from 'axios';

import {API_URL} from './axiosBase';


const getAllCustomer = async () => {
	
	try {
		console.log("debut axios");
		const token = localStorage.getItem('token');
        const response = await axios({
            method: 'get',
            headers: {'Authorization': 'Bearer ' + token},
            url: `${API_URL}/customer/`,
        });

		console.log(response);

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

const getCustomer = async (email) => {
	
	try {
		console.log("debut axios");
		const token = localStorage.getItem('token');
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

const postNewCustomer = async (lastName, firstName, password, email) => {
	
	try {
		console.log("debut axios");
		const token = localStorage.getItem('token');
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

const updateCustomer = async (oldPassword , newPassword, oldEmail, newEmail) => {
	
	try {
		console.log("debut axios");
		const token = localStorage.getItem('token');
        let response;
		if(newPassword !== undefined){
			response = await axios({
				method: 'patch',
				headers: {'Authorization': 'Bearer ' + token},
				url: `${API_URL}/customer`,
				data: {
					oldPassword: oldPassword, 
					newPassword: newPassword, 
					oldEmail: oldEmail, 
				}
			});
		} else {
			response = await axios({
				method: 'patch',
				headers: {'Authorization': 'Bearer ' + token},
				url: `${API_URL}/customer`,
				data: {
					oldPassword: oldPassword, 
					newEmail: newEmail, 
					oldEmail: oldEmail, 
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
			throw new Error('Aucun mot de passe correspond à cette email');
		case 404:
			throw new Error('Aucun utilisatgeur avec cette email');
		default: 
			throw new Error('Une erreur s\'est produite, veuillez réessayer plus tard');
		}
	}
};

const deleteCustomer = async (id) => {
	
	try {
		console.log("debut axios");
		const token = localStorage.getItem('token');
        const response = await axios({
            method: 'delete',
            headers: {'Authorization': 'Bearer ' + token},
            url: `${API_URL}/customer`,
			data: {
				id: id,
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

export {getAllCustomer, getCustomer, postNewCustomer, updateCustomer, deleteCustomer}