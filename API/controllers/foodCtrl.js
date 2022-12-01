const pool = require('../models/database');
const FoodModel = require('../models/foodDB');
const CustomerFoodModel = require('../models/customerFoodDB');
const FoodQuantityModel = require('../models/foodQuantityDB');
const AllergyModel = require('../models/allergyDB');
const { all } = require('../routes');

module.exports.getAllFood = async (req, res) => {
    
    const client = await pool.connect();
    try {
        const result = await FoodModel.getAllFood(client);
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

module.exports.postNewFood = async (req, res) => {
    const {name} = req.body;
    const {allergy} = req.body;

    if(name === undefined){
        res.sendStatus(400);
    } else {
        const client = await pool.connect();
        try {
            if(allergy === undefined){
                await FoodModel.postNewFood(client, name, true, undefined);
            } else {
                const result = await AllergyModel.getAllergy(client, allergy); //result nécessaire ?
                await FoodModel.postNewFood(client, name, true, result.rows[0].id);
            }
            res.sendStatus(201);
        } catch (e) {
            console.error(e);
            res.sendStatus(500);
        } finally {
            client.release();
        }
    }
}

module.exports.updateFood = async (req, res) => {
    const {id} = req.body;
    const {name} = req.body;
    const {allergy} = req.body;

    if(id === undefined || name === undefined){
        res.sendStatus(400);
    } else {
        const client = await pool.connect();
        try{
            await client.query("BEGIN");             
            if(allergy === undefined){
                await FoodModel.updateFood(client, id, name, undefined); 
            } else {
                const result = await AllergyModel.getAllergy(client, allergy); //result nécessaire ?
                await FoodModel.updateFood(client, id, name, result.rows[0].id); 
            }            
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
}

module.exports.deleteFood = async (req, res) => {
    const {id} = req.body;
    const client = await pool.connect();

    try{
        await client.query("BEGIN"); 
        await CustomerFoodModel.deleteFoodCustomer(client, id);
        console.log("ok");
        await FoodQuantityModel.deleteFoodQteFood(client, id);
        console.log("ok");
        await FoodModel.deleteFood(client, id);
        console.log("ok");
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