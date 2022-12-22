
//post

module.exports.NewFoodQte = async (client, idRecipe, idFood, quantity, unity) => {
    if(unity){
        return await client.query("INSERT INTO Food_Quantity(idRecipe, idFood, quantity, unit) VALUES ($1,$2,$3,$4)", [idRecipe, idFood, quantity, unity]);
    } else {
        return await client.query("INSERT INTO Food_Quantity(idRecipe, idFood, quantity) VALUES ($1,$2,$3)", [idRecipe, idFood, quantity]);
    }
}

//update

//delete

module.exports.deleteFoodQteRecipe = async (client, idRecipe) => {
    return await client.query("DELETE FROM Food_Quantity WHERE idRecipe = $1",[idRecipe]);
}

module.exports.deleteFoodQteFood = async (client, idFood) => {
    return await client.query("DELETE FROM Food_Quantity WHERE idFood = $1",[idFood]);
}
