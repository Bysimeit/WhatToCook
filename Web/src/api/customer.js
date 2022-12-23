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

const getAllCustomer = async (token) => {
	
	try {
        const response = await axios({
            method: 'get',
            headers: {'Authorization': 'Bearer ' + token},
            url: `${API_URL}/customer`,
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

const getCustomer = async (email, token) => {
	
	try {
        const response = await axios({
            method: 'get',
            headers: {'Authorization': 'Bearer ' + token},
            url: `${API_URL}/customer/${email}`,
        });

		const data = response.data;
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

const postNewCustomer = async (lastName, firstName, password, email, token) => {
	
	try {
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

const updateCustomer = async (id , name, firstName, email, token) => {
	
	try{
		const response = await axios({
			method: 'patch',
			headers: {'Authorization': 'Bearer ' + token},
			url: `${API_URL}/customer/edit`,
			data: {
				id: id, 
				name: name, 
				firstName: firstName, 
				email: email
			}
		});

		const data = response.data
		return data;
	} catch(e) {
		switch (e.response.status) {
		case 400:
			throw new Error('Aucun mot de passe correspond à cette email');
		default: 
			throw new Error('Une erreur s\'est produite, veuillez réessayer plus tard');
		}
	}
	
}


const updateEmailPasswordCustomer = async (oldPassword , newPassword, oldEmail, newEmail, token) => {
	
	try {
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

		const data = response.data
		return data;
		
	} catch (e) {
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

const deleteCustomer = async (id, token) => {
	
	try {
        const response = await axios({
            method: 'delete',
            headers: {'Authorization': 'Bearer ' + token},
            url: `${API_URL}/customer`,
			data: {
				id: id,
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

export {getAllCustomer, getCustomer, postNewCustomer, updateCustomer, updateEmailPasswordCustomer, deleteCustomer}