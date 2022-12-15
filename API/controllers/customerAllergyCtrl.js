const pool = require('../models/database');
const CustomerAllergyModel = require('../models/customerAllergyDB');
const { compareSync } = require('bcrypt');

module.exports.getAllCustomerAllergy = async (req, res) => {
    const idText = req.params.id;
    const idCustomer = parseInt(idText);

    if(idCustomer === undefined){
        res.status(400).json("Id client manquant");
    } else {
        const client = await pool.connect();
        try {
            const result = await CustomerAllergyModel.getAllCustomerAllergy(client, idCustomer);
            res.json(result.rows);
                
        } catch (e) {
            console.error(e);
            res.sendStatus(500);
        } finally {
            client.release();
        }
    }
    
}

module.exports.postNewCustomerAllergy = async (req, res) => {
    const {idAllergies, idCustomer} = req.body;

    if(idCustomer === undefined) {
        res.status(400).json("Id client manquant");
    } else {
        const client = await pool.connect();
        try {
            await client.query("BEGIN"); 
            await CustomerAllergyModel.deleteCustomerAllergy(client, idCustomer);
            if (idAllergies !== undefined) {
                for (let idAllergy of idAllergies) {
                    await CustomerAllergyModel.postNewCustomerAllergy(client, idCustomer, idAllergy);
                }
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



