const pool = require('../models/database');
const RecipeModel = require('../models/recipeDB');
const StepModel = require('../models/stepDB');
const FoodModel = require('../models/foodDB');
const FoodQuantityModel = require('../models//foodQuantityDB');
const CustomerRecipeModel = require('../models//customerRecipeDB');

module.exports.getListeRecipe = async (req, res) => {
    const {type, time, allergies} = req.query;
    
    const client = await pool.connect();
    try {
        let result;
        if(type === undefined || time === undefined){
            result = await RecipeModel.getListRecipe(client);
        } else {
            const allergiesTab = allergies.split(',');
            result = await RecipeModel.getResearchRecipe(client, type, time, allergiesTab);
        }

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

module.exports.getRandomRecipe = async (req, res) => {
    const client = await pool.connect();
    
    try {
        let result;
        result = await RecipeModel.getRandomRecipe(client);
        
        let randomNumber = Math.random();
        let randomNumberBetween = Math.floor(randomNumber * result.rows[0].recipes) + 1;

        result = await RecipeModel.getDataRecipe(client, randomNumberBetween);

        if (result.rows !== undefined) {
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

module.exports.getDataRecipe = async (req, res) => {
    const idText = req.params.id;
    const id = parseInt(idText);

    if(id === undefined){ 
        res.sendStatus(400);
    } else {
        const client = await pool.connect();
        try {
            const result = await RecipeModel.getDataRecipe(client, id);
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

module.exports.postNewRecipe = async (req, res) => {
    const {name, time, type, picture, steps, foods} = req.body;

    if(name === undefined || time === undefined || type === undefined || steps === undefined || foods === undefined){ 
        res.sendStatus(400);
    } else {
        const client = await pool.connect();
        try {
            await client.query("BEGIN"); 
            let result = await RecipeModel.postNewRecipe(client, name, type, time, picture);

            if(result.rows !== undefined){
                const idRecipe = result.rows[0].id;

                for(let step of steps){
                    await StepModel.postNewStepRecipe(client, step, result.rows[0].id); 
                }
                                        
                for(let food of foods){
                    result = await FoodModel.getFood(client, food.name);
                    let rowCount = result.rowCount;
                    if(rowCount == 0){
                        result = await FoodModel.postNewFood(client, food.name, false, undefined);
                    }

                    if(food.quantity !== undefined && result.rows[0].id !== undefined){
                        let idFood = result.rows[0].id
                        await FoodQuantityModel.NewFoodQte(client, idRecipe, idFood, food.quantity);
                    } else {
                        res.sendStatus(404);
                    }
                }
                await client.query("COMMIT");
                res.sendStatus(201);

            } else {
                res.sendStatus(404);
            }
            
            
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
    const {id, name, time, type, picture, steps, foods} = req.body;

    if(id === undefined || name === undefined || time === undefined || type === undefined || steps === undefined || foods === undefined){ 
        res.sendStatus(400);
    } else {
        const client = await pool.connect();
        try {
            await client.query("BEGIN"); 
            await RecipeModel.updateRecipe(client, id,  name, type, time, picture);       
            await StepModel.deleteStepRecipe(client, id);

            for(let step of steps){
                await StepModel.postNewStepRecipe(client, step, id);
            }
                 
            await FoodQuantityModel.deleteFoodQteRecipe(client, id);
            for(let food of foods){
                let result = await FoodModel.getFood(client, food.name);
                let rowCount = result.rowCount;
                if(rowCount == 0){
                    result = await FoodModel.postNewFood(client, food.name, false, undefined);
                }
                        
                if(food.quantity !== undefined && result.rows[0].id !== undefined){
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