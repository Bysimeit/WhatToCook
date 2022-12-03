import axios from 'axios';
import jwt_decode from 'jwt-decode';

import {token, API_URL, instance} from './axiosBase';

const login = async (email, password) => {
	try {
        const rep = axios({
            method: 'post',
            url: '/user',
            data: {
                email: email,
                password: password
            }
        });
        
		token = rep.data;
		sessionStorage.setItem('token', token);
		const decoded = token == null ? null : jwt_decode(token);
		const status = decoded == null ? null : decoded.status;
		sessionStorage.setItem('status',status);

		instance =  axios.create({
			baseURL: API_URL,
			headers: {'Authorization': 'Bearer '+ token}
		});

		return token != null;
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

export default login;