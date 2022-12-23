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

const getAllCustomerAllergy = async (id, token) => {
	
	try {
        const response = await axios({
            method: 'get',
            headers: {'Authorization': 'Bearer ' + token},
            url: `${API_URL}/food/${id}`,
        });

		const data = response.data
		return data;
		
	} catch (e) {
		switch (e.response.status) {
        case 400:
			throw new Error('Données manquantes pour la requête');
		case 404:
			throw new Error('Aucune allergies trouvées');
		default: 
			throw new Error('Une erreur s\'est produite, veuillez réessayer plus tard');
		}
	}
};

const postNewCustomerAllergy = async (idAllergies, idCustomer, token) => {
	
	try {
        const response = await axios({
            method: 'post',
            headers: {'Authorization': 'Bearer ' + token},
            url: `${API_URL}/food`,
            data: {
                idAllergies: idAllergies,
                idCustomer: idCustomer
            }
        });

		const data = response.data
		return data;
		
	} catch (e) {
		switch (e.response.status) {
        case 400:
			throw new Error('Données manquantes pour la requête');
		case 404:
			throw new Error('Aucune allergies trouvées');
		default: 
			throw new Error('Une erreur s\'est produite, veuillez réessayer plus tard');
		}
	}
};

export {getAllCustomerAllergy, postNewCustomerAllergy}