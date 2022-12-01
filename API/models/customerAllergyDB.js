//get

module.exports.getAllCustomerAllergy = async (client, idCustomer) => {
    return await client.query("SELECT * FROM Customer_Allergy WHERE idCustomer = $1",[idCustomer]);;
}

//post

module.exports.postNewCustomerAllergy = async (client, idCustomer, idAllergy) => {
    return await client.query("INSERT INTO Customer_Allergy(idAllergy, idCustomer) VALUES ($1,$2)", [idAllergy, idCustomer]);
}

//update

module.exports.updateAllergy = async (client, newName, oldName) => {
    return await client.query("UPDATE Customer_Allergy SET idAllergy = $1 WHERE idAllergy =$2", [newName, oldName]);
}


//delete

module.exports.deleteCustomerAllergy = async (client, idCustomer) => {
    return await client.query("DELETE FROM Customer_Allergy WHERE idCustomer = $1",[idCustomer]);
}

module.exports.deleteAllergyCustomer = async (client, idAllergy) => {
    return await client.query("DELETE FROM Customer_Allergy WHERE idAllergy = $1",[idAllergy]);
}