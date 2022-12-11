const pool = require('../models/database');
const FoodModel = require('../models/foodDB');
const CustomerRecipeModel = require('../models/customerRecipeDB');
const FoodQuantityModel = require('../models/foodQuantityDB');
const AllergyModel = require('../models/allergyDB');

module.exports.getFavoriteRecipe = async (req, res) => {
    const idTexte = req.params.id;
    const idCustomer = parseInt(idTexte);

    if(idCustomer === undefined){
        res.sendStatus(400);
    } else {
        const client = await pool.connect();
        try {
            const result = await CustomerRecipeModel.getFavoriteRecipe(client, idCustomer);
            if(result.rows !== undefined){
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
}

module.exports.postFavoriteRecipe = async (req, res) => {
    const {idCustomer, idRecipe} = req.body;

    if(idCustomer === undefined || idRecipe === undefined){
        res.sendStatus(400);
    } else {
        const client = await pool.connect();
        try {
            const result = await CustomerRecipeModel.postNewCustomerFood(client, idCustomer, idRecipe);
            if(result.rows !== undefined){
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
}

module.exports.deleteFavoriteRecipe = async (req, res) => {
    const {idCustomer, idRecipe} = req.body;

    
    const client = await pool.connect();
    try{
        await CustomerRecipeModel.deleteFavoriteRecipeRecipe(client, idCustomer, idRecipe);
        res.sendStatus(204);
    } catch (error){
        console.error(error);
        res.sendStatus(500);
    } finally {
        client.release();
    }
}