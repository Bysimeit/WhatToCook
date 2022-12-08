const pool = require('../models/database');
const CustomerFoodModel = require('../models/customerFoodDB');
const FoodModel = require('../models/foodDB');

module.exports.getAllFood = async (req, res) => {
    const idTexte = req.params.id;
    const idCustomer = parseInt(idTexte);

    if(idCustomer === undefined){ 
        res.sendStatus(400);
    } else {
        const client = await pool.connect();
        try {
            const result = await CustomerFoodModel.getAllCustomerFood(client, idCustomer);
            if(result.rows !== undefined) {
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

module.exports.postNewFoodCustomer = async (req, res) => {
    const {idCustomer, nameFood, quantity, weight} = req.body;

    if(idCustomer === undefined || nameFood === undefined || quantity === undefined || weight === undefined) {
        res.sendStatus(400);
    } else {
        const client = await pool.connect();
        try {
            await client.query("BEGIN");         
            let result = await FoodModel.getFood(client, nameFood); //vérifier résult ?
            if(result.rowCount == 0){     
                result = await FoodModel.postNewFood(client, nameFood, false);              
            }       
            let idFood = result.rows[0].id;
            result = await CustomerFoodModel.postNewCustomerFood(client, idCustomer, idFood, quantity, weight);
            if(result.rows !== undefined){
                await client.query("COMMIT");
                res.json(result.rows);
            } else {
                res.sendStatus(404);
            }
            console.log(result);
            
        } catch (e) {
            await client.query("ROLLBACK");
            console.error(e);
            res.sendStatus(500);
        } finally {
            client.release();
        }
    }
}

module.exports.deleteFood = async (req, res) => {
    const {idCustomer, idFood} = req.body;

    
    const client = await pool.connect();

    try{
        await CustomerFoodModel.deleteCustomerFood(client, idFood, idCustomer);
        res.sendStatus(204);
    } catch (error){
        console.error(error);
        res.sendStatus(500);
    } finally {
        client.release();
    }
}

