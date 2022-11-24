const pool = require('../models/database');
const CustomerModel = require('../models/customerDB');
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
    const lastName = req.body.lastName;
    const firstName = req.body.firstName;
    const password = req.body.password;
    const email = req.body.email;
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

module.exports.updatePassWordCustomer = async (req, res) => {
    const {id, passWord} = req.body;
    const client = await pool.connect();
    
    try{
        await CustomerModel.updatePassWordCustomer(client, id, passWord);
        res.sendStatus(204);
    } catch (error){
        console.error(error);
        res.sendStatus(500);
    } finally {
        client.release();
    }
}
 
module.exports.updateEmailCustomer = async (req, res) => {
    const {id, mail} = req.body;
    const client = await pool.connect();
    
    try{
        await CustomerModel.updateEmailCustomer(client, id, mail);
        res.sendStatus(204);
    } catch (error){
        console.error(error);
        res.sendStatus(500);
    } finally {
        client.release();
    }
}

module.exports.deleteCustomer = async (req, res) => {
    const {id} = req.body;
    const client = await pool.connect();

    try{
        await CustomerModel.deleteCustomer(client, id);
        res.sendStatus(204);
    } catch (error){
        console.error(error);
        res.sendStatus(500);
    } finally {
        client.release();
    }
}

