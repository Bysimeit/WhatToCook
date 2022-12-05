const pool = require('../models/database');
const AllergyModel = require('../models/allergyDB');
const CustomerAllergyModel = require('../models/customerAllergyDB');
const FoodModel = require('../models/foodDB');

module.exports.getAllAllergy = async (req, res) => {

    const client = await pool.connect();
    try {
        const result = await AllergyModel.getAllAllergy(client);
        if(result !== undefined){
            res.json(result);
        } else {
            res.sendStatus(404);
        }
            
    } catch (e) {
        console.error(e);
        res.sendStatus(500);
    } finally {
        client.release();
    }
}

module.exports.postNewAllergy = async (req, res) => {
    const {name} = req.body;

    if(name === undefined){
        res.sendStatus(400);
    } else {
        const client = await pool.connect();
        try {
            await AllergyModel.postNewAllergy(client, name);
            res.sendStatus(201);
        } catch (e) {
            console.error(e);
            res.sendStatus(500);
        } finally {
            client.release();
        }
    }
}

module.exports.updateAllergy = async (req, res) => {
    const {id, name} = req.body;

    
    const client = await pool.connect();
    
    try{
        await AllergyModel.updateAllergy(client, name, id);
        res.sendStatus(204);
    } catch (error){
        console.error(error);
        res.sendStatus(500);
    } finally {
        client.release();
    }
}

module.exports.deleteAllergy = async (req, res) => {
    const {id} = req.body;
    const client = await pool.connect();

    try{
        await client.query("BEGIN"); 
        await CustomerAllergyModel.deleteAllergyCustomer(client, id);
        await FoodModel.updateAllergy(client, id);
        await AllergyModel.deleteAllergy(client, id);
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
