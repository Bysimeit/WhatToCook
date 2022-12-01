//get

module.exports.getAllCustomerFood = async (client, idCustomer) => {

    return await client.query("SELECT CF.quantity, F.name, F.id FROM Customer_Food CF INNER JOIN Food F ON F.id = CF.idFood WHERE idCustomer = $1",[idCustomer]);
}

//post

module.exports.postNewCustomerFood = async (client, idCustomer, idFood, quantity) => {
    return await client.query("INSERT INTO Customer_Food(idCustomer, idFood, date, quantity) VALUES ($1,$2,CAST(NOW() AS DATE),$3)", [idCustomer, idFood, quantity]);
}

//update

//delete

module.exports.deleteCustomerFood = async (client, idFood, idCustomer) => {
    return await client.query("DELETE FROM Customer_Food WHERE idFood = $1 AND idCustomer = $2",[idFood, idCustomer]);
}

module.exports.deleteFoodCustomer = async (client, idFood) => {
    return await client.query("DELETE FROM Customer_Food WHERE idFood = $1",[idFood]);
}

module.exports.deleteAllFoodCustomer = async (client, idCustomer) => {
    return await client.query("DELETE FROM Customer_Food WHERE idCustomer = $1",[idCustomer]);
}

