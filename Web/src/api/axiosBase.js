const InternalIp = require("internal-ip");
const internalIp = InternalIp.v4.sync();

//const API_URL = `${internalIp}`;
const API_URL = `http://192.168.0.18:3001`;

export {API_URL};
