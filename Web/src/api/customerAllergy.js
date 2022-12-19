import axios from 'axios';

import {API_URL} from './axiosBase';


const getAllCustomerAllergy = async (id, token) => {
	
	try {
		console.log("debut axios");
        const response = await axios({
            method: 'get',
            headers: {'Authorization': 'Bearer ' + token},
            url: `${API_URL}/food/${id}`,
        });

		console.log(response);

		const data = response.data
		return data;
		
	} catch (e) {
		console.log(e);
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
		console.log("debut axios");
        const response = await axios({
            method: 'post',
            headers: {'Authorization': 'Bearer ' + token},
            url: `${API_URL}/food`,
            data: {
                idAllergies: idAllergies,
                idCustomer: idCustomer
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
		case 404:
			throw new Error('Aucune allergies trouvées');
		default: 
			throw new Error('Une erreur s\'est produite, veuillez réessayer plus tard');
		}
	}
};

export {getAllCustomerAllergy, postNewCustomerAllergy}