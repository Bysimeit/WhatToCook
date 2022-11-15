const pool = require('../models/database');
const CustomerModel = require('../models/customerDB');

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
    const client = await pool.connect();
    //const {client:clientObj} = req.body;
    const {email, firstName, lastName, passWord} = req.body;

    try {
        console.log("start");
        //await client.query("BEGIN");
        const {rows} = await CustomerModel.postNewCustomer(client, email,firstName, lastName, passWord);
        //await client.query("COMMIT")
        res.sendStatus(201);
    } catch (e) {
        //await client.query("ROLLBACK");
        console.error(e);
        res.sendStatus(500);
    } finally {
        client.release();
    }
   }

module.exports.updatePassWordCustomer = async (req, res) => {
    const {id, passWord} = req.body;
    const client = await pool.connect();
    
    try{
        await CustomerModel.updatePassWordCustomer(id, passWord, client);
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
        await CustomerModel.updateEmailCustomer(id, mail, client);
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
    console.log(req.body.id);
    const client = await pool.connect();

    try{
        await CustomerModel.deleteCustomer(id, client);
        res.sendStatus(204);
    } catch (error){
        console.error(error);
        res.sendStatus(500);
    } finally {
        client.release();
    }
}

