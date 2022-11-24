const pool = require('../models/database');
const RecipeModel = require('../models/recipeDB');

module.exports.getListeRecipe = async (req, res) => {
    const type = req.body.type;
    const time = req.body.time;
    const allergies = req.body.allergies;
    console.log(type);
    console.log(time);
    console.log(allergies);

    if(type === undefined || time === undefined){ //vérification utile si protection mobile?
        res.sendStatus(400);
    } else {
        const client = await pool.connect();
        try {
            const result = await RecipeModel.getListRecipe(client, type, time, allergies);
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
}

module.exports.getListeRecipe = async (req, res) => {
    const {id} = req.body;
    const client = await pool.connect();

    try{
        await RecipeModel.deleteRecipe(client, id);
        await RecipeModel.deleteFoodQte(client, id);
        await RecipeModel.deleteCustomerRecipe(client, id);
        await RecipeModel.deleteRecipeStep(client, id);
        await RecipeModel.deleteStep(client, id);
        res.sendStatus(204);
    } catch (error){
        console.error(error);
        res.sendStatus(500);
    } finally {
        client.release();
    }
}