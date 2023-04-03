const pool = require('../models/database');
const CustomerModel = require('../models/customerDB');
const CustomerAllergyModel = require("../models/customerAllergyDB");
const CustomerRecipeModel = require("../models/customerRecipeDB");
const CustomerFoodModel = require("../models/customerFoodDB");
const { getHash } = require('../utils/utils');
const { compareHash } = require('../utils/utils');
const { mailer } = require('../utils/nodemailer');

module.exports.getAllCustomer = async (req, res) => {
    const client = await pool.connect();

    try{
        const {rows: customers} = await CustomerModel.getAllCustomer(client);
        if(customers !== undefined){
            res.json(customers);
        } else {
            res.sendStatus(404);
        }
    } catch (error){
        console.error(error);
        res.sendStatus(500);
    } finally {
        client.release();
    }
}

module.exports.getCustomer = async (req, res) => {
    const {email} = req.params;

    if(email === undefined){
        res.status(400).json("Email manquant");
    } else {
        const client = await pool.connect();
        try{
            const result = await CustomerModel.getDataCustomer(client, email);
            if(result.rows[0] !== undefined){
                res.json(result.rows);
            } else {
                res.sendStatus(404);
            }
        } catch (error){
            console.error(error);
            res.sendStatus(500);
        } finally {
            client.release();
        }
    }
    
}

module.exports.postNewCustomer = async (req, res) => {
    const {lastName, firstName, password, email} = req.body;

    if(lastName === undefined || firstName === undefined || password === undefined || email === undefined){
        res.status(400).json("Données manquantes");
    } else {
        const client = await pool.connect();
        try {
            await CustomerModel.postNewCustomer(client, email, firstName, lastName, await getHash(password));
            res.sendStatus(201);
        } catch (e) {
            console.error(e);
            res.sendStatus(500);
        } finally {
            client.release();
        }
    }
}

module.exports.updateCustomer = async (req, res) => {
    const {id , name, firstName, email} = req.body;

    if(id === undefined || name === undefined || firstName === undefined || email === undefined){
        res.status(400).json("Données manquantes");
    } else {
        const client = await pool.connect();
        try{
            await CustomerModel.updateCustomer(client, id , name, firstName, email);
            res.sendStatus(204); 
        } catch (error){
            console.error(error);
            res.sendStatus(500);
        } finally {
            client.release();
        }
    }    
}

module.exports.updatePasswordEmailCustomer = async (req, res) => {
    const {oldPassword , newPassword, oldEmail, newEmail} = req.body;


    if(oldPassword === undefined || oldEmail === undefined){
        res.status(400).json("Données manquantes");
    } else {
        const client = await pool.connect();
        try{
            if(newPassword !== undefined){
                const result = await CustomerModel.getDataCustomer(client, oldEmail);
                if(result.rows[0].password !== undefined){
                    if(await compareHash(oldPassword, result.rows[0].password)){
                        await CustomerModel.updatePasswordCustomer(client, oldEmail, await getHash(newPassword));
                        res.sendStatus(204); 
                    } else {
                        res.status(400).json("Mot de passe incorrecte");
                    } 
                } else {
                    res.sendStatus(404);
                }                     
            } else if(newEmail !== undefined){
                await CustomerModel.updateEmailCustomer(client, oldEmail, newEmail);
                res.sendStatus(204); 
            } else {
                res.sendStatus(400);
            }         
        } catch (error){
            console.error(error);
            res.sendStatus(500);
        } finally {
            client.release();
        }
    }    
}

module.exports.updatePasswordForgetCustomer = async (req, res) => {
    const {eMail} = req.body;

    if (eMail === undefined) {
        res.status(400).json("Données manquantes");
    } else {
        const client = await pool.connect();

        const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        const passwordLength = Math.floor(Math.random() * 4) + 5;
        let password = "";
        
        for (let i = 0; i < passwordLength; i++) {
            const randomIndex = Math.floor(Math.random() * charset.length);
            password += charset[randomIndex];
        }

        try {
            if (password !== undefined) {
                const result = await CustomerModel.getIfUserExit(client, eMail);
                if (result.rows[0].count == 1) {
                    await CustomerModel.updatePasswordCustomer(client, eMail, await getHash(password));
                    mailer(eMail, password);
                    res.sendStatus(204);
                } else {
                    res.sendStatus(404);
                }
            } else {
                res.sendStatus(400);
            }
        } catch (error) {
            console.error(error);
            res.sendStatus(500);
        } finally {
            client.release();
        }
    }
}

module.exports.deleteCustomer = async (req, res) => {
    const {id} = req.body;

    
    const client = await pool.connect();

    try{
        await client.query("BEGIN"); 
        await CustomerAllergyModel.deleteCustomerAllergy(client, id);
        await CustomerRecipeModel.deleteCustomerRecipe(client, id);
        await CustomerFoodModel.deleteAllFoodCustomer(client, id);
        await CustomerModel.deleteCustomer(client, id);
        await client.query("COMMIT");
        res.sendStatus(204);
    } catch (error){
        await client.query("ROLLBACK");
        console.error(error);
        res.sendStatus(500);
    } finally {
        client.release();
    }
}

