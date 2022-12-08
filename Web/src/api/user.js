import axios from 'axios';

import {API_URL, instance} from './axiosBase';


const loginAxios = async (email, password) => {
	
	try {
		console.log("debut axios");
		localStorage.setItem('token', undefined);
        const response = await axios({
            method: 'post',
            url: `${API_URL}/user`,
            data: {
                email: email,
                password: password
            }
        });

        
		const token = response.data;
		console.log(token);
		localStorage.setItem('token', token);

		/*instance =  axios.create({
			baseURL: API_URL,
			headers: {'Authorization': 'Bearer '+ token}
		});*/

		return token != null;
	} catch (e) {
		console.log(e);
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

export {loginAxios}