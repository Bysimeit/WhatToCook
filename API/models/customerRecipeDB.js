//get

module.exports.getLine = async (client, idCustomer, idRecipe) => {
    return await client.query(`
    SELECT
        CR.*
    FROM
        Customer_Recipe CR
    WHERE CR.idCustomer = $1 AND CR.idRecipe = $2`,[idCustomer, idRecipe]);
}

module.exports.getCommentRecipe = async (client, idCustomer) => {
    return await client.query(`
    SELECT
        CF.comment
    FROM
        Recipe R
        INNER JOIN Customer_Recipe CR ON CR.idRecipe = R.id
    WHERE CR.idCustomer = $1 AND isFavorite = true`,[idCustomer]);
}

module.exports.getFavoriteRecipe = async (client, idCustomer) => {
    return await client.query(`
    SELECT
        R.*
    FROM
        Recipe R
        INNER JOIN Customer_Recipe CR ON CR.idRecipe = R.id
    WHERE CR.idCustomer = $1 AND isFavorite = true`,[idCustomer]);
}

//post 

module.exports.postNewLine = async (client, idCustomer, idRecipe) => {
    return await client.query("INSERT INTO Customer_Recipe(idCustomer, idRecipe) VALUES (1,3) RETURNING  idcustomer, idrecipe", [idCustomer, idRecipe]);
}

//update 

module.exports.updateIsFavorite = async (client, idCustomer, idRecipe, isFavorite) => {
    return await client.query("UPDATE Customer_Recipe SET isFavorite = $1 WHERE CR.idCustomer = $2 AND CR.idRecipe = $3", [isFavorite, idCustomer, idRecipe]);
}

module.exports.updateComment = async (client, idCustomer, idRecipe, comment) => {
    return await client.query("UPDATE Customer_Recipe SET comment = $1 WHERE CR.idCustomer = $2 AND CR.idRecipe = $3", [comment, idCustomer, idRecipe]);
}

// delete

module.exports.deleteRecipeCustomer = async (client, idRecipe) => {
    return await client.query("DELETE FROM Customer_Recipe WHERE idRecipe = $1",[idRecipe]);
}

module.exports.deleteCustomerRecipe = async (client, idCustomer) => {
    return await client.query("DELETE FROM Customer_Recipe WHERE idCustomer = $1",[idCustomer]);
}