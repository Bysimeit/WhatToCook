//get

module.exports.getStep = async (client, idRecipe, text) => {
    return await client.query("SELECT * FROM Step WHERE idRecipe = $1 AND text = $2",[idRecipe,text]);
}

//post

module.exports.postNewStepRecipe = async (client, step, idNewRecipe) => {
    return await client.query("INSERT INTO Step(text, idRecipe) VALUES ($1,$2)", [step, idNewRecipe]);
}

//delete

module.exports.deleteStepRecipe = async (client, idRecipe) => {
    return await client.query("DELETE FROM Step WHERE idRecipe = $1",[idRecipe]);
}