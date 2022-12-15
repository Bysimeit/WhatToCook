//get

module.exports.getLine = async (client, idCustomer, idRecipe) => {
    return await client.query(`
    SELECT
        *
    FROM
        Customer_Recipe 
    WHERE idCustomer = $1 AND idRecipe = $2`,[idCustomer, idRecipe]);
}

module.exports.getCommentRecipe = async (client, idRecipe) => {
    return await client.query(`
    SELECT
        comment
    FROM
        Customer_Recipe 
    WHERE idRecipe = $1`,[idRecipe]);
}

module.exports.getCommentCustomer = async (client, idCustomer) => {
    return await client.query(`
    SELECT
        comment
    FROM
        Customer_Recipe 
    WHERE idCustomer = $1 AND comment IS NOT NULL`,[idCustomer]);
}

module.exports.getFavoriteRecipe = async (client, idCustomer) => {
    return await client.query(`
    SELECT
        R.*,
        SUM (F.price) AS total
    FROM
        Recipe R
        INNER JOIN Customer_Recipe CR ON CR.idRecipe = R.id
        INNER JOIN Food_Quantity FQ ON FQ.idRecipe = R.id
        INNER JOIN Food F ON F.id = FQ.idFood
    WHERE CR.idCustomer = $1 AND CR.isFavorite = true GROUP BY R.id`,[idCustomer]);
}

//post 

module.exports.postNewLine = async (client, idCustomer, idRecipe) => {
    return await client.query("INSERT INTO Customer_Recipe(idCustomer, idRecipe) VALUES ($1,$2) RETURNING  idcustomer, idrecipe", [idCustomer, idRecipe]);
}

//update 

module.exports.updateIsFavorite = async (client, idCustomer, idRecipe, isFavorite) => {
    return await client.query("UPDATE Customer_Recipe SET isFavorite = $1 WHERE idCustomer = $2 AND idRecipe = $3", [isFavorite, idCustomer, idRecipe]);
}

module.exports.updateComment = async (client, idCustomer, idRecipe, comment) => {
    return await client.query("UPDATE Customer_Recipe SET comment = $1 WHERE idCustomer = $2 AND idRecipe = $3", [comment, idCustomer, idRecipe]);
}

// delete

module.exports.deleteRecipeCustomer = async (client, idRecipe) => {
    return await client.query("DELETE FROM Customer_Recipe WHERE idRecipe = $1",[idRecipe]);
}

module.exports.deleteCustomerRecipe = async (client, idCustomer) => {
    return await client.query("DELETE FROM Customer_Recipe WHERE idCustomer = $1",[idCustomer]);
}