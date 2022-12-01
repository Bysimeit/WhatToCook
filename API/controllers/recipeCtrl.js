const pool = require('../models/database');
const RecipeModel = require('../models/recipeDB');
const StepModel = require('../models/stepDB');
const FoodModel = require('../models/foodDB');
const FoodQuantityModel = require('../models//foodQuantityDB');
const CustomerRecipeModel = require('../models//customerRecipeDB');

module.exports.getListeRecipe = async (req, res) => {
    const {type} = req.body;
    const {time} = req.body;
    const {allergies} = req.body;

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

module.exports.getDataRecipe = async (req, res) => {
    const {id} = req.body;

    if(id === undefined){ 
        res.sendStatus(400);
    } else {
        const client = await pool.connect();
        try {
            const result = await RecipeModel.getDataRecipe(client, id);
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
    const {type} = req.body;
    const {picture} = req.body;
    const {steps} = req.body;
    const {foods} = req.body;

    if(name === undefined || time === undefined || type === undefined || steps === undefined || foods === undefined){ 
        res.sendStatus(400);
    } else {
        const client = await pool.connect();
        try {
            await client.query("BEGIN"); 
            let result = await RecipeModel.postNewRecipe(client, name, type, time, picture);
            const idRecipe = result.rows[0].id;

            for(let step of steps){
                result = await StepModel.postNewStepRecipe(client, step, result.rows[0].id);
            }
                                    
            for(let food of foods){
                result = await FoodModel.getFood(client, food.name);
                if(result !== undefined){
                    let rowCount = result.rowCount;
                    if(rowCount == 0){
                        result = await FoodModel.postNewFood(client, food.name, false, undefined);
                    }
                } else {
                    res.sendStatus(404);
                }   

                if(food.quantity !== undefined){
                    let idFood = result.rows[0].id
                    await FoodQuantityModel.NewFoodQte(client, idRecipe, idFood, food.quantity);
                } else {
                    res.sendStatus(404);
                }
            }
            await client.query("COMMIT");
            res.sendStatus(201);
            
        } catch (error) {
            await client.query("ROLLBACK");
            console.error(error);
            res.sendStatus(500);
        } finally {
            client.release();
        }
    }
}

module.exports.udpateRecipe = async (req, res) => {
    const {id} = req.body;
    const {name} = req.body;
    const {time} = req.body;
    const {type} = req.body;
    const {picture} = req.body;
    const {steps} = req.body;
    const {foods} = req.body;

    if(id === undefined || name === undefined || time === undefined || type === undefined || steps === undefined || foods === undefined){ 
        res.sendStatus(400);
    } else {
        const client = await pool.connect();
        try {
            await client.query("BEGIN"); 
            let result = await RecipeModel.updateRecipe(client, id,  name, type, time, picture); 
            
            await StepModel.deleteStepRecipe(client, id);

            for(let step of steps){
                result = await StepModel.postNewStepRecipe(client, step, id);   
            }
                 
            await FoodQuantityModel.deleteFoodQteRecipe(client, id);
            for(let food of foods){
                result = await FoodModel.getFood(client, food.name);
                if(result !== undefined){ //résult nécessaire ?
                    let rowCount = result.rowCount;
                    if(rowCount == 0){
                        result = await FoodModel.postNewFood(client, food.name, false, undefined);
                    }
                } else {
                    res.sendStatus(404);
                }
                        
                if(food.quantity !== undefined){
                    let idFood = result.rows[0].id
                    await FoodQuantityModel.NewFoodQte(client, id, idFood, food.quantity);
                } else {
                    res.sendStatus(404);
                }
            }
                    
            await client.query("COMMIT");
            res.sendStatus(204);
            
        } catch (error) {
            await client.query("ROLLBACK");
            console.error(error);
            res.sendStatus(500);
        } finally {
            client.release();
        }
    }

}


module.exports.deleteRecipe = async (req, res) => { 
    const {id} = req.body;
    const client = await pool.connect();

    try{
        await client.query("BEGIN");   
        await CustomerRecipeModel.deleteRecipeCustomer(client, id);
        await FoodQuantityModel.deleteFoodQteRecipe(client, id);
        await StepModel.deleteStepRecipe(client, id);  
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