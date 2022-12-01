// delete

module.exports.deleteRecipeCustomer = async (client, idRecipe) => {
    return await client.query("DELETE FROM Customer_Recipe WHERE idRecipe = $1",[idRecipe]);
}

module.exports.deleteCustomerRecipe = async (client, idCustomer) => {
    return await client.query("DELETE FROM Customer_Recipe WHERE idCustomer = $1",[idCustomer]);
}