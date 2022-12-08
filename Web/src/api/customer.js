import axios from 'axios';

import {API_URL} from './axiosBase';


const getCustomer = async (email) => {
	
	try {
		console.log("debut axios");
		const token = localStorage.getItem('token');
        const response = await axios({
            method: 'get',
            headers: {'Authorization': 'Bearer ' + token},
            url: `${API_URL}/customer/${email}`,
        });

		console.log(response);


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

export {getCustomer}