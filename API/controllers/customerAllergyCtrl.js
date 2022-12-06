const pool = require('../models/database');
const CustomerAllergyModel = require('../models/customerAllergyDB');

module.exports.getAllCustomerAllergy = async (req, res) => {
    const {idCustomer} = req.body;

    const client = await pool.connect();
    try {
        const result = await CustomerAllergyModel.getAllCustomerAllergy(client, idCustomer);
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

module.exports.postNewCustomerAllergy = async (req, res) => {
    const {idAllergies, idCustomer} = req.body;

    if(idAllergies === undefined || idCustomer === undefined){
        res.sendStatus(400);
    } else {
        const client = await pool.connect();
        try {
            await client.query("BEGIN"); 
            await CustomerAllergyModel.deleteCustomerAllergy(client, idCustomer);
            for (let idAllergy of idAllergies) {
                await CustomerAllergyModel.postNewCustomerAllergy(client, idCustomer, idAllergy);
            }
            await client.query("COMMIT");
            res.sendStatus(201);
        } catch (e) {
            await client.query("ROLLBACK");
            console.error(e);
            res.sendStatus(500);
        } finally {
            client.release();
        }
    }
}



