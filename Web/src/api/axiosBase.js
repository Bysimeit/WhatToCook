import axios from "axios";

const API_URL = "http://localhost:3001";
let token = sessionStorage.getItem('token');

let instance =  axios.create({
	baseURL: API_URL,
	headers: {'Authorization': 'Bearer '+ token}

});

export {token, API_URL, instance};
