const pool = require('../models/database');
const CustomerRecipeModel = require('../models/customerRecipeDB');

module.exports.getAllCommentCustomer = async (req, res) => {
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

module.exports.getCommentRecipe = async (req, res) => {
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

module.exports.updateFavoriteRecipe = async (req, res) => {
    const {idCustomer, idRecipe, isFavorite} = req.body;

    if(idCustomer === undefined || idRecipe === undefined || isFavorite === undefined){
        res.sendStatus(400);
    } else {
        const client = await pool.connect();
        try {
            let result = await CustomerRecipeModel.getLine(client, idCustomer, idRecipe);
            if(result.rows === undefined){
                result = await CustomerRecipeModel.postNewLine(client, idCustomer, idRecipe);
            } 
            if(result.rows === undefined){
                result = await CustomerRecipeModel.updateIsFavorite(client, idCustomer, idRecipe, isFavorite);
                res.sendStatus(204);
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