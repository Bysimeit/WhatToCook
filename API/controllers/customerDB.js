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