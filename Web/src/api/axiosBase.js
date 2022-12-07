import axios from "axios";

const API_URL = "http://192.168.0.18:3001";
let token = localStorage.getItem('token');

let instance =  axios.create({
	baseURL: API_URL,
	headers: {'Authorization': 'Bearer '+ token}

});

export {token, API_URL, instance};
