//get 

module.exports.getListRecipe = async (client, type, time, allergies) => {
    
    const request = "SELECT name, time, picture FROM Recipe WHERE time <= $1 AND type = $2 ";
    for (allergie of allergies) {
        
    }
    return await client.query();
}