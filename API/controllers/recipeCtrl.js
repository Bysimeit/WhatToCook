const pool = require('../models/database');
const RecipeModel = require('../models/recipeDB');

module.exports.getListeRecipe = async (req, res) => {
    const type = req.type;
    const time = req.time;
    const allergies = req.allergies

    if(type === undefined || time === undefined || allergies === undefined){ //vérification utile si protection mobile?
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