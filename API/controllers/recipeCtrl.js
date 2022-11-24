const pool = require('../models/database');
const RecipeModel = require('../models/recipeDB');

module.exports.getListeRecipe = async (req, res) => {
    const type = req.body.type;
    const time = req.body.time;
    const allergies = req.body.allergies;

    if(type === undefined || time === undefined){ 
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

module.exports.postNewRecipe = async (req, res) => {
    const {name} = req.body;
    const {time} = req.body;
    const {picture} = req.body;
    const {steps} = req.body;
    const {foods} = req.body;

    if(name === undefined || time === undefined || type === undefined || steps === undefined || foods === undefined){ 
        res.sendStatus(400);
    } else {
        const client = await pool.connect();
        try {
            const result = await RecipeModel.postNewRecipe(client, name, time, picture, steps, foods);
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

module.exports.deleteRecipe = async (req, res) => { //en fonction des paramètre choisi d'office la bonne fonction ?
    const {id} = req.body;
    const client = await pool.connect();

    try{
        await client.query("BEGIN");     
        await RecipeModel.deleteRecipe(client, id);
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