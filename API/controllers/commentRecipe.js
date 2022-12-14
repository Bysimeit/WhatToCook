const pool = require('../models/database');
const CustomerRecipeModel = require('../models/customerRecipeDB');

module.exports.getAllCommentCustomer = async (req, res) => {
    const idText = req.query.idCustomer;
    const idCustomer = parseInt(idText);
    if(idCustomer === undefined){
        res.status(400).json("Données manquantes");
    } else {
        const client = await pool.connect();
        try {
            const result = await CustomerRecipeModel.getCommentCustomer(client, idCustomer);
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
}

module.exports.getCommentCustomer = async (req, res) => {
    const {idCustomerText, idRecipeText} = req.query;
    const idRecipe = parseInt(idRecipeText);
    const idCustomer = parseInt(idCustomerText);

    if(idCustomer === undefined || idRecipe === undefined){
        res.status(400).json("Données manquantes");
    } else {
        const client = await pool.connect();
        try {
            const result = await CustomerRecipeModel.getLine(client, idCustomer, idRecipe);
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
}

module.exports.getCommentRecipe = async (req, res) => {
    const idText = req.params.id;
    const idRecipe = parseInt(idText);

    if(idRecipe === undefined){
        res.status(400).json("Id recette manquant");
    } else {
        const client = await pool.connect();
        try {
            const result = await CustomerRecipeModel.getCommentRecipe(client, idRecipe);   
            if(result.rows[0] !== undefined){
                res.json(result.rows);
            } else {
                let result = ["Introuvable"];
                res.json(result);
            }
        } catch (e) {
            console.error(e);
            res.sendStatus(500);
        } finally {
            client.release();
        }
    }
}

module.exports.postComment = async (req, res) => {
    const {idCustomer, idRecipe, comment} = req.body;

    if(idCustomer === undefined || idRecipe === undefined || comment === undefined){
        res.status(400).json("Données manquantes");
    } else {
        const client = await pool.connect();
        try {
            await client.query("BEGIN"); 
            let result = await CustomerRecipeModel.getLine(client, idCustomer, idRecipe);
            if(result.rows[0] === undefined){
                await CustomerRecipeModel.postNewLine(client, idCustomer, idRecipe);
                await CustomerRecipeModel.updateComment(client, idCustomer, idRecipe, comment);
            } else if(result.rows[0].comment === '') {
                await CustomerRecipeModel.updateComment(client, idCustomer, idRecipe, comment);
            } else {
                res.status(400).json("Commentaire existant");
            }

            await client.query("COMMIT");
            res.sendStatus(204);
        } catch (e) {
            console.error(e);
            await client.query("ROLLBACK");
            res.sendStatus(500);
        } finally {
            client.release();
        }
    }
}

module.exports.updateComment = async (req, res) => {
    const {idCustomer, idRecipe, comment} = req.body;

    if(idCustomer === undefined || idRecipe === undefined){
        res.status(400).json("Données manquantes");
    } else {
        const client = await pool.connect();
        try {
            await client.query("BEGIN"); 
            let result = await CustomerRecipeModel.getLine(client, idCustomer, idRecipe);
            if(result.rows[0] !== undefined){
                await CustomerRecipeModel.updateComment(client, idCustomer, idRecipe, comment);
                await client.query("COMMIT");
                res.sendStatus(201);
            } else {
                res.status(400).json("Ligne inexistante");
            }    
        } catch (e) {
            console.error(e);
            await client.query("ROLLBACK");
            res.sendStatus(500);
        } finally {
            client.release();
        }
    }
}