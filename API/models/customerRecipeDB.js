//get

module.exports.getFavoriteRecipe = async (client, idCustomer) => {
    return await client.query(`
    SELECT
        R.*
    FROM
        Recipe R
        INNER JOIN Customer_recipe CR ON CR.idRecipe = R.id
    WHERE CR.idCustomer = $1`,[idCustomer]);
}

//post 

module.exports.postNewCustomerFood = async (client, idCustomer, idRecipe) => {
    return await client.query("INSERT INTO Customer_Recipe(idCustomer, idRecipe) VALUES (1,3) RETURNING  idcustomer, idrecipe", [idCustomer, idRecipe]);
}

// delete

module.exports.deleteFavoriteRecipeRecipe = async (client, idCustomer, idRecipe) => {
    return await client.query("DELETE FROM Customer_Recipe WHERE idRecipe = $1 AND idCustomer = $2",[idRecipe, idCustomer]);
}

module.exports.deleteRecipeCustomer = async (client, idRecipe) => {
    return await client.query("DELETE FROM Customer_Recipe WHERE idRecipe = $1",[idRecipe]);
}

module.exports.deleteCustomerRecipe = async (client, idCustomer) => {
    return await client.query("DELETE FROM Customer_Recipe WHERE idCustomer = $1",[idCustomer]);
}