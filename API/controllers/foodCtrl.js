const pool = require('../models/database');
const FoodModel = require('../models/foodDB');
const CustomerFoodModel = require('../models/customerFoodDB');
const FoodQuantityModel = require('../models/foodQuantityDB');
const AllergyModel = require('../models/allergyDB');

module.exports.getAllFood = async (req, res) => {
    
    const client = await pool.connect();
    try {
        const result = await FoodModel.getAllFood(client);
        if(result.rows[0] !== undefined){
            res.json(result.rows);
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
    const {name, allergy} = req.body;

    if(name === undefined){
        res.status(400).json("Nom de nourriture manquant");
    } else {
        const client = await pool.connect();
        try {
            if(allergy === undefined){
                await FoodModel.postNewFood(client, name, true, undefined);
            } else {
                const result = await AllergyModel.getAllergy(client, allergy); 
                if(result.rows[0].id !== undefined){
                    await FoodModel.postNewFood(client, name, true, result.rows[0].id);
                } else {
                    res.sendStatus(404);
                }            
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
    const {id, name, allergy} = req.body;

    if(id === undefined || name === undefined){
        res.status(400).json("Données manquantes");
    } else {
        const client = await pool.connect();
        try{
            await client.query("BEGIN");             
            if(allergy === undefined){
                await FoodModel.updateFood(client, id, name, undefined); 
            } else {
                const result = await AllergyModel.getAllergy(client, allergy); 
                if(result.rows[0].id !== undefined){
                    await FoodModel.updateFood(client, id, name, result.rows[0].id); 
                    await client.query("COMMIT");
                    res.sendStatus(204);
                } else {
                    res.sendStatus(404);
                }
            }                                     
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
        await FoodQuantityModel.deleteFoodQteFood(client, id);
        await FoodModel.deleteFood(client, id);
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