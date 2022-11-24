//get 

const { query } = require("express");

module.exports.getListRecipe = async (client, type, time, allergies) => {
    
    const requestSet = [];
    let request = `SELECT R.id, R.name, R.time, R.picture FROM Recipe R INNER JOIN Food_Quantity FQ ON FQ.idRecipe = R.id INNER JOIN Food F ON F.name = FQ.idFood WHERE time <= ${time} AND type = ${type} AND (`;
    for (let allergie of allergies) {
        requestSet.push(` '${allergie}' `);
    }
    request += requestSet.join();
    request += `) NOT IN (SELECT F.allergy WHERE F.allergy NOTNULL )`;
    console.log(request);
    return await client.query(request);
}

module.exports.postNewRecipe = async (client, id) => {

}

module.exports.updateRecipe = async (client, id) => {

}

//delete

module.exports.deleteRecipe = async (client, idRecipe) => {
    return await client.query("DELETE FROM Recipe WHERE id = $1",[idRecipe]);
}

module.exports.deleteFoodQte = async (client, idRecipe) => {
    return await client.query("DELETE FROM Food_Quantity WHERE id = $1",[idRecipe]);
}

module.exports.deleteCustomerRecipe = async (client, idRecipe) => {
    return await client.query("DELETE FROM Customer_Recipe WHERE id = $1",[idRecipe]);
}

module.exports.deleteRecipeStep = async (client, idRecipe) => {
    return await client.query("DELETE FROM Recipe_Step WHERE id = $1",[idRecipe]);
}

module.exports.deleteStep = async (client, idRecipe) => {
    return await client.query("DELETE FROM Step WHERE id = $1",[idRecipe]);
}