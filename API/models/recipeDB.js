
//get 

module.exports.getResearchRecipe = async (client, type, time, allergies, foods) => {
    
    const requestSet = [];
    let request = `
    SELECT
        R.*,
        sum(CAST(F.price AS decimal(6,2))) AS total
    FROM
        Recipe R
        INNER JOIN Food_Quantity FQ ON FQ.idRecipe = R.id
        INNER JOIN Food F ON F.id = FQ.idFood`;
    if(type !== undefined && time !== undefined){
        request += ` WHERE R.time <= $1 AND R.type = $2`;   
    } else if(type === undefined && time !== undefined){
        request += ` WHERE R.time <= $1`;
    } else if(time === undefined && type !== undefined){
        request += ` WHERE R.type = $1`;
    } 
    
    if(allergies[0] != 0){
        if(type === undefined && time === undefined){
            request += ` WHERE ` ;
        } else {
            request += ` AND  ` ;
        }
        request += `R.id NOT IN (
            SELECT
                R.id
            FROM
                Recipe R
                INNER JOIN Food_Quantity FQ ON FQ.idRecipe = R.id
                INNER JOIN Food F ON F.id = FQ.idFood
            WHERE F.idAllergy IN (`;
        for (let allergie of allergies) {
            requestSet.push(` '${allergie}' `);
        }
        request += requestSet.join();
        request += `)) `;
    } 

    if(foods[0] != 0){
        if(type === undefined && time === undefined && allergies[0] == 0){
            request += ` WHERE ` ;
        } else {
            request += ` AND  ` ;
        }
        request += `R.id IN (
            SELECT
                R.id
            FROM
                Recipe R
                INNER JOIN Food_Quantity FQ ON FQ.idRecipe = R.id
                INNER JOIN Food F ON F.id = FQ.idFood
            WHERE F.name IN (`;
        for (let food of foods) {
            requestSet.push(` '${food}' `);
        }
        request += requestSet.join();
        request += `)) `;
    } 
    
    request += ` GROUP BY R.id`

    if(type !== undefined && time !== undefined){
        return await client.query(request, [time, type]);  
    } else if(type === undefined && time !== undefined){
        return await client.query(request, [time]);
    } else if(time === undefined && type !== undefined){
        return await client.query(request, [type]);
    } else {
        return await client.query(request);
    }

}

module.exports.getRandomRecipe = async(client) => {
    return await client.query(`SELECT count(*) AS recipes FROM recipe`);
}

module.exports.getDataRecipe = async (client, id) => {
    return await client.query(`
    SELECT
        R.*,
        array_agg((FQ.quantity, FQ.unit, f.name)) AS foods,
        (SELECT array_agg(s.text) AS steps FROM step s WHERE s.idrecipe = r.id),
        sum(CAST(F.price AS decimal(6,2))) AS total
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
