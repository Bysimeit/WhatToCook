//get

module.exports.getAllCustomerFood = async (client, idCustomer) => {
    return await client.query("SELECT CF.quantity, F.name, to_char(CF.date,'dd/MM/yyyy') AS date, CF.weight, F.id FROM Customer_Food CF INNER JOIN Food F ON F.id = CF.idFood WHERE idCustomer = $1",[idCustomer]);
}

//post

module.exports.postNewCustomerFood = async (client, idCustomer, idFood, quantity, weight, date) => {
    return await client.query("INSERT INTO Customer_Food(idCustomer, idFood, date, quantity, weight) VALUES ($1,$2,TO_DATE($3,'DD/MM/YYYY'),$4,$5) RETURNING idcustomer,idfood, to_char(date, 'dd/MM/yyyy')", [idCustomer, idFood, date, quantity, weight]);
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

