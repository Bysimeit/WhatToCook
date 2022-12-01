//get

module.exports.getAllAllergy = async (client) => {
    return await client.query("SELECT * FROM Allergy");;
}

module.exports.getAllergy = async (client, name) => {
    return await client.query("SELECT * FROM Allergy WHERE name = $1", [name]);
}

//post

module.exports.postNewAllergy = async (client, name) => {
    return await client.query("INSERT INTO Allergy(name) VALUES ($1) RETURNING id", [name]);
}

//update

module.exports.updateAllergy = async (client, name, id) => {
    return await client.query("UPDATE Allergy SET name = $1 WHERE id = $2", [name, id]);
}

//delete

module.exports.deleteAllergy = async (client, id) => {
    return await client.query("DELETE FROM Allergy WHERE id = $1",[id]);
}