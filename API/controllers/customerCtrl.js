const pool = require('../models/database');
const CustomerModel = require('../models/customerDB');
const CustomerAllergyModel = require("../models/customerAllergyDB");
const CustomerRecipeModel = require("../models/customerRecipeDB");
const CustomerFoodModel = require("../models/customerFoodDB");
const {getHash} = require('../utils/utils');

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

module.exports.postNewCustomer = async (req, res) => {
    const {lastName} = req.body;
    const {firstName} = req.body;
    const {password} = req.body;
    const {email} = req.body;

    if(lastName === undefined || firstName === undefined || password === undefined || email === undefined){
        res.sendStatus(400);
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

module.exports.updatePasswordEmailCustomer = async (req, res) => {
    const {id, passWord, email} = req.body;
    const client = await pool.connect();
    
    if(passWord === undefined && email === undefined){
        res.sendStatus(400);
    } else {
        try{
            if(email === undefined === undefined){
                await CustomerModel.updatePassWordCustomer(client, id, passWord);
            } else {
                await CustomerModel.updateEmailCustomer(client, id, mail);
            }
            res.sendStatus(204);
        } catch (error){
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
        await CustomerModel.deleteCustomer(client, id);
        await CustomerAllergyModel.deleteCustomerAllergy(client, id);
        await CustomerRecipeModel.deleteCustomerRecipe(client, id);
        await CustomerFoodModel.deleteAllFoodCustomer(client, id);
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

