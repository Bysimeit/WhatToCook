require("dotenv").config();
const process = require('process');
const jwt = require('jsonwebtoken');

const pool = require('../models/database');
const UserModel = require('../models/userDB');

module.exports.login = async (req, res) => {
    const {email, password} = req.body;
    
    if(email === undefined || password === undefined){
        res.status(400).json("Données manquantes");
    } else {
        const client = await pool.connect();
        try {
            const result = await UserModel.getAccount(client, email, password);
            if(result.userType !== undefined || result.value !== undefined){
                const {userType, value} = result;
                if (userType === "inconnu") {
                    res.sendStatus(404);
                } else if (userType === "admin") {
                    const {id, nom} = value;
                    const payload = {status: userType, value: {id, nom}};
                    const token = jwt.sign(
                        payload,
                        process.env.SECRET_TOKEN,
                        {expiresIn: '1d'} //se mettre d'accord sur délait de connexion
                    );              
                    res.json(token);

                } else {
                    const {id, nom, prenom} = value;
                    const payload = {status: userType, value: {id, nom, prenom}};
                    const token = jwt.sign(
                        payload,
                        process.env.SECRET_TOKEN,
                        {expiresIn: '1d'} //se mettre d'accord sur délait de connexion
                    );
                    res.json(token);
                }
            } else {
                res.sendStatus(404);
            }
            
        } catch (error) {
            console.error(error);
            res.sendStatus(500);
        } finally {
            client.release();
        }
    }
}