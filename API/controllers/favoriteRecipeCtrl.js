const pool = require('../models/database');
const CustomerRecipeModel = require('../models/customerRecipeDB');

module.exports.getFavoriteRecipe = async (req, res) => {
    const idTexte = req.params.id;
    const idCustomer = parseInt(idTexte);

    if(idCustomer === undefined){
        res.status(400).json("Id client manquant");
    } else {
        const client = await pool.connect();
        try {
            const result = await CustomerRecipeModel.getFavoriteRecipe(client, idCustomer);
            res.json(result.rows);
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
        res.status(400).json("Données manquantes");
    } else {
        const client = await pool.connect();
        try {
            await client.query("BEGIN"); 
            let result = await CustomerRecipeModel.getLine(client, idCustomer, idRecipe);
            if(result.rows[0] === undefined){
                result = await CustomerRecipeModel.postNewLine(client, idCustomer, idRecipe);
            } 
            
            if(result.rows[0] !== undefined){
                result = await CustomerRecipeModel.updateIsFavorite(client, idCustomer, idRecipe, isFavorite);  
                await client.query("COMMIT");
                res.sendStatus(204);    
            } else {
                res.sendStatus(404);
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
