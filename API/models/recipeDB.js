
//get 

const e = require("express");
const { query } = require("express");

module.exports.getResearchRecipe = async (client, type, time, allergies) => {
    
    const requestSet = [];
    let request = `
    SELECT 
        R.id, 
        R.nameRecipe, 
        R.time, 
        R.picture,
        R.adddate,
        R.quoting,
        R.type,
        F.price
    FROM 
        Recipe R 
        INNER JOIN Food_Quantity FQ ON FQ.idRecipe = R.id 
        INNER JOIN Food F ON F.id = FQ.idFood 
        WHERE time <= ${time} AND type = ${type} AND (F.idAllergy is null OR F.idAllergy NOT IN ( 
            SELECT A.id 
            FROM Allergy A 
            WHERE (A.name) IN (`;
    for (let allergie of allergies) {
        requestSet.push(` '${allergie}' `);
    }
    request += requestSet.join();
    request += `)))`;
    console.log(request);
    return await client.query(request);
}

module.exports.getListRecipe = async(client) => {
    return await client.query(`
        SELECT 
            R.id, 
            R.nameRecipe, 
            R.time, 
            R.picture,
            R.adddate,
            R.quoting,
            R.type,
            F.price
        FROM 
            Recipe R 
            INNER JOIN Food_Quantity FQ ON FQ.idRecipe = R.id 
            INNER JOIN Food F ON F.id = FQ.idFood `);
}

module.exports.getDataRecipe = async (client, id) => {
    return await client.query(`
        SELECT 
            R.id, 
            R.nameRecipe, 
            R.time, 
            R.type, 
            R.picture, 
            R.quoting, 
            S.text, 
            F.name, 
            F.price,
            FQ.quantity 
        FROM 
            Recipe R 
            INNER JOIN food_quantity FQ ON FQ.idRecipe = R.id 
            INNER JOIN food F ON F.id = FQ.idFood 
            INNER JOIN step s on S.idRecipe = R.id 
            WHERE R.id  = $1 ;`,[id]);;
}

//post

module.exports.postNewRecipe = async (client, name, type, time, picture) => {
    if(picture === undefined){
        return await client.query("INSERT INTO Recipe(addDate, name, type, time) VALUES (CAST(NOW() AS DATE),$1,$2,$3) RETURNING id", [name, type, time]);
    }else{
        return await client.query("INSERT INTO Recipe(addDate, name, type, time, picture) VALUES (CAST(NOW() AS DATE),$1,$2,$3,$4) RETURNING id", [name, type, time, picture]);
    }
}

//update

module.exports.updateRecipe = async (client, idRecipe,  name, type, time, picture) => {
    if(picture === undefined){
        return await client.query("UPDATE Recipe SET nameRecipe = $1, type = $2, time = $3 WHERE id = $4", [name, type, time, idRecipe]);
    }else{
        return await client.query("UPDATE Recipe SET nameRecipe = $1, type = $2, time = $3, picture = $4 WHERE id = $5", [name, type, time, picture, idRecipe]);
    }
}

//delete

module.exports.deleteRecipe = async (client, idRecipe) => {
    return await client.query("DELETE FROM Recipe WHERE id = $1",[idRecipe]);
}
