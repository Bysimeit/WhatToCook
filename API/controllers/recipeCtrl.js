const pool = require('../models/database');
const RecipeModel = require('../models/recipeDB');
const StepModel = require('../models/stepDB');
const FoodModel = require('../models/foodDB');
const FoodQuantityModel = require('../models//foodQuantityDB');
const CustomerRecipeModel = require('../models//customerRecipeDB');
const {saveImage} = require('../models/imageManger');

const destFolderPictures = './upload';

module.exports.getListeRecipe = async (req, res) => {
    const {type, time, allergies, foods} = req.query;
    
    const client = await pool.connect();
    try {
        let result;

        let allergiesTab;
        if(allergies === undefined){ 
            allergiesTab = [0];
        } else {
            allergiesTab = allergies.split(',');
        }

        let foodsTab;
        if(foods === undefined){ 
            foodsTab = [0];
        } else {
            foodsTab = foods.split(',');
        }

        result = await RecipeModel.getResearchRecipe(client, type, time, allergiesTab, foodsTab);

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

module.exports.getRandomRecipe = async (req, res) => {
    const client = await pool.connect();
    
    try {
        let result;
        result = await RecipeModel.getRandomRecipe(client);
        
        let randomNumber = Math.random();
        let randomNumberBetween = Math.floor(randomNumber * result.rows[0].recipes) + 1;

        result = await RecipeModel.getDataRecipe(client, randomNumberBetween);

        if (result.rows[0] !== undefined) {
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
        res.status(400).json("Id recette manquant");
    } else {
        const client = await pool.connect();
        try {
            const result = await RecipeModel.getDataRecipe(client, id);
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

module.exports.postNewRecipe = async (req, res) => {
    const {name, time, type, stepsText, foodsText} = req.body;
    const {picture} = req.files;

    const foods = JSON.parse(foodsText);
    const steps = JSON.parse(stepsText);

    if(name === undefined || time === undefined || type === undefined || steps === undefined || foods === undefined){ 
        res.status(400).json("Données manquantes");
    } else {
        const client = await pool.connect();
        try {
            await client.query("BEGIN"); 
            let result = await RecipeModel.postNewRecipe(client, name, type, time);

            if(result.rows[0] !== undefined){
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

                if(picture !== undefined){
                    saveImage(picture[0].buffer, id, destFolderPictures);
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
    const {id, name, time, type, stepsText, foodsText} = req.body;
    const {picture} = req.files;

    const foods = JSON.parse(foodsText);
    const steps = JSON.parse(stepsText);

    if(id === undefined || name === undefined || time === undefined || type === undefined || steps === undefined || foods === undefined){ 
        res.status(400).json("Données manquantes");
    } else {
        const client = await pool.connect();
        try {
            await client.query("BEGIN"); 
            await RecipeModel.updateRecipe(client, id,  name, type, time);       
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
                        
                if(food.value !== undefined && result.rows[0].id !== undefined){
                    let idFood = result.rows[0].id
                    await FoodQuantityModel.NewFoodQte(client, id, idFood, food.value, food.unity);
                } else {
                    res.sendStatus(404);
                }
            }

            if(picture !== ""){
                saveImage(picture[0].buffer, id, destFolderPictures);
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


module.exports.udpatePicture = async (req, res) => {
    const {id} = req.body;
    const {picture} = req.files;

    if(picture === undefined){ 
        res.status(400).json("Données manquantes");
    } else {
        try{
            console.group(picture[0]);
            console.log(picture.buffer);
            saveImage(picture[0].buffer, id, destFolderPictures);
            res.sendStatus(204);
        } catch (error) {
            console.error(error);
            res.sendStatus(500);       
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