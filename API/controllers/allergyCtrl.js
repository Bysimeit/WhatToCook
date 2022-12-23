const pool = require('../models/database');
const AllergyModel = require('../models/allergyDB');
const CustomerAllergyModel = require('../models/customerAllergyDB');
const FoodModel = require('../models/foodDB');


/**
 * @swagger
 * components:
 *  schemas:
 *      Allergy:
 *          type: object
 *          properties:
 *              id:
 *                  type: integer
 *              name:
 *                  type: string
 *                  description: nom de l'allergie
 *
 */

/**
 * @swagger
 * components:
 *  responses:
 *      AllergiesNotFound:
 *          description: Aucune allergies ne se trouve dans la table Allergy
 *      AllergiesFound:
 *          description: Renvoie le tableau des allergies
 *          content:
 *               application/json:
 *                   schema:
 *                       $ref: '#/components/schemas/Allergy'
 *
 */


module.exports.getAllAllergy = async (req, res) => {

    const client = await pool.connect();
    try {
        const result = await AllergyModel.getAllAllergy(client);
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

/**
 * @swagger
 * components:
 *  responses:
 *      AllergiesIdNotFound:
 *          description: Aucune allergies avec cette ID ne se trouve dans la table Allergy
 *      AllergiesIdFound:
 *          description: Renvoie l'allergie correspondante
 *          content:
 *               application/json:
 *                   schema:
 *                       $ref: '#/components/schemas/Allergy'
 *
 */
module.exports.getAllergy = async (req, res) => {
    const idText = req.params.id;
    const idAllergy = parseInt(idText);

    if(idAllergy === undefined){
        res.status(400).json("Id allergy manquant");
    } else {
        const client = await pool.connect();
        try {
            const result = await AllergyModel.getAllergyId(client, idAllergy);
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

/**
 * @swagger
 * components:
 *  responses:
 *      NewAllergyCreated:
 *          description: Aucune allergies ne se trouve dans la table Allergy
 *  requestBodies:
 *      AllergyAAjoute:
 *          content:
 *              application/json:
 *                  schema:
 *                      properties:
 *                          name:
 *                              type: string
 *
 */

module.exports.postNewAllergy = async (req, res) => {
    const {name} = req.body;

    if(name === undefined){
        res.status(400).json("nom de recette manquant");
    } else {
        const client = await pool.connect();
        try {
            await AllergyModel.postNewAllergy(client, name);
            res.sendStatus(201);
        } catch (e) {
            console.error(e);
            res.sendStatus(500);
        } finally {
            client.release();
        }
    }
}

/**
 * @swagger
 * components:
 *  responses:
 *      AllergyUpdated:
 *          description: l'allergie cible a bien été mise à jour
 *  requestBodies:
 *      AllergyAUpdate:
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          name:
 *                              type: string
 *                          id:
 *                              type: integer
 *
 */

module.exports.updateAllergy = async (req, res) => {
    const {id, name} = req.body;

    if(id === undefined || name === undefined){
        res.status(400).json("Données manquantes");
    } else {
        const client = await pool.connect(); 
        try{
            await AllergyModel.updateAllergy(client, name, id);
            res.sendStatus(204);
        } catch (error){
            console.error(error);
            res.sendStatus(500);
        } finally {
            client.release();
        }
    }
}

/**
 * @swagger
 * components:
 *  responses:
 *      AllergyDeleted:
 *          description: Suppression bien effectuée
 */

module.exports.deleteAllergy = async (req, res) => {
    const {id} = req.body;
    const client = await pool.connect();

    try{
        await client.query("BEGIN"); 
        await CustomerAllergyModel.deleteAllergyCustomer(client, id);
        await FoodModel.updateAllergy(client, id);
        await AllergyModel.deleteAllergy(client, id);
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
