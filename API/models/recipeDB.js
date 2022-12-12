
//get 

const e = require("express");
const { query } = require("express");

module.exports.getResearchRecipe = async (client, type, time, allergies) => {
    
    const requestSet = [];
    let request = `
    SELECT
        R.*,
        F.idallergy
    FROM
        Recipe R
        INNER JOIN Food_Quantity FQ ON FQ.idRecipe = R.id
        INNER JOIN Food F ON F.id = FQ.idFood
    WHERE R.time <= 50 AND R.type = 3 AND R.id NOT IN (
        SELECT
            R.id
        FROM
            Recipe R
            INNER JOIN Food_Quantity FQ ON FQ.idRecipe = R.id
            INNER JOIN Food F ON F.id = FQ.idFood
        WHERE F.idAllergy is null OR F.idAllergy IN (`;
    for (let allergie of allergies) {
        requestSet.push(` '${allergie}' `);
    }
    request += requestSet.join();
    request += `))`;

    return await client.query(request);
}

module.exports.getRandomRecipe = async(client) => {
    return await client.query(`SELECT count(*) AS recipes FROM recipe`);
}

module.exports.getListRecipe = async(client) => {
    return await client.query(`
    SELECT
        R.*,
        SUM (F.price) AS total
    FROM
        Recipe R
        INNER JOIN Food_Quantity FQ ON FQ.idRecipe = R.id
        INNER JOIN Food F ON F.id = FQ.idFood
    GROUP BY R.id;`);
}

module.exports.getDataRecipe = async (client, id) => {
    return await client.query(`
    SELECT
        R.*,
        array_agg((FQ.quantity, f.name)) AS foods,
        (SELECT array_agg(s.text) AS steps FROM step s WHERE s.idrecipe = r.id),
        SUM (F.price) AS total
    FROM
        recipe R
        JOIN food_quantity fq ON R.id = fq.idrecipe
        JOIN food f ON fq.idfood = f.id
    WHERE
        R.id = $1
    GROUP BY
        R.id`,[id]);
}

//post

module.exports.postNewRecipe = async (client, name, type, time, picture) => {
    if(picture === undefined){
        return await client.query(`
            INSERT INTO 
                Recipe(addDate, name, type, time) 
            VALUES (CAST(NOW() AS DATE),$1,$2,$3) RETURNING id`, [name, type, time]);
    }else{
        return await client.query(`
            INSERT INTO 
                Recipe(addDate, name, type, time, picture) 
            VALUES (CAST(NOW() AS DATE),$1,$2,$3,$4) RETURNING id`, [name, type, time, picture]);
    }
}

//update

module.exports.updateRecipe = async (client, idRecipe,  name, type, time, picture) => {
    if(picture === undefined){
        return await client.query(`UPDATE Recipe SET nameRecipe = $1, type = $2, time = $3 WHERE id = $4`, [name, type, time, idRecipe]);
    }else{
        return await client.query(`UPDATE Recipe SET nameRecipe = $1, type = $2, time = $3, picture = $4 WHERE id = $5`, [name, type, time, picture, idRecipe]);
    }
}

//delete

module.exports.deleteRecipe = async (client, idRecipe) => {
    return await client.query(`DELETE FROM Recipe WHERE id = $1`,[idRecipe]);
}
