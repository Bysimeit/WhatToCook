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

//post

module.exports.postNewRecipe = async (client, name, time, picture, steps, foods) => {
    let idNewRecipe;
    if(picture === undefined){
        idNewRecipe = await client.query("INSERT INTO Recipe(name, time) VALUES ($1,$2) RETURNING id", [name, time]);
    }else{
        idNewRecipe = await client.query("INSERT INTO Recipe(name, time, picture) VALUES ($1,$2,$3) RETURNING id", [name, time, picture]);
    }

    for(let step of steps){
        await client.query("INSERT INTO Step(text, idRecipe) VALUES ($1,$2)", [step, idNewRecipe]);
    }

    for(let food of foods){
        
    }

    return 

}

//update

module.exports.updateRecipe = async (client, id) => {

}

//delete

module.exports.deleteRecipe = async (client, idRecipe) => {
    await client.query("DELETE FROM Customer_Recipe WHERE idRecipe = $1",[idRecipe]);
    await client.query("DELETE FROM Food_Quantity WHERE idRecipe = $1",[idRecipe]);
    await client.query("DELETE FROM Step WHERE idRecipe = $1",[idRecipe]);
    return await client.query("DELETE FROM Recipe WHERE id = $1",[idRecipe]);
}

module.exports.deleteFoodQte = async (client, idRecipe) => {
    return await client.query();
}

module.exports.deleteCustomerRecipe = async (client, idRecipe) => {
    return await client.query();
}

module.exports.deleteStep = async (client, idRecipe) => {
    return await client.query();
}
