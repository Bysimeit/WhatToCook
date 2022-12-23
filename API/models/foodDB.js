//get

module.exports.getFood = async (client, name) => {
    return await client.query("SELECT * FROM Food WHERE name = $1",[name]);;
}

module.exports.getAllFood = async (client) => {
    return await client.query("SELECT * FROM Food");;
}

//post

module.exports.postNewFood = async (client, name, isValidated, idAllergy) => {
    if(idAllergy === undefined){
        return await client.query("INSERT INTO Food(name, isValidated) VALUES ($1,$2) RETURNING id", [name, isValidated]);
    } else {
        return await client.query("INSERT INTO Food(name, isValidated, idAllergy) VALUES ($1,$2,$3) RETURNING id", [name, isValidated, idAllergy]);
    }
}

//update 

module.exports.updateFood = async (client, id, name, idAllergy) => {
    if(idAllergy === undefined){
        return await client.query("UPDATE Food SET name = $1, idAllergy = null, isValidated = true WHERE id = $2", [name, id]);
    } else {
        return await client.query("UPDATE Food SET name = $1, idAllergy = $2, isValidated = true WHERE id = $3", [name, idAllergy, id]);
    }
    
}

module.exports.updateAllergyFood = async (client, id) => {
    return await client.query("UPDATE Food SET idallergy = null WHERE idallergy = $1", [id]);
}

//delete

module.exports.deleteFood = async (client, id) => {
    return await client.query("DELETE FROM Food WHERE id = $1",[id]);
}