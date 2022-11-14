//get

module.exports.getAllCustomer = async (client) => {
    return await client.query("SELECT * FROM Customer");
}

module.exports.getCustomer = async (mail, passWord, client) => {
    return await client.query("SELECT * FROM Customer WHERE email = $1 AND passWord = $2",[mail, passWord]);
}

//post

module.exports.postNewCustomer = async (email, firstName, lastName, password, client) => {
    return await client.query("INSERT INTO Customer(email, firstName, lastName, password) VALUES ($1,$2,$3,$4) RETURNING id", [email, firstName, lastName, password]);
}

//update

module.exports.updatePassWordCustomer = async (id, newPassWord, client) => {
    return await client.query("UPDATE Customer SET passWord = $1 WHERE id =$2", [newPassWord, id]);
}

module.exports.updateEmailCustomer = async (id, newEmail, client) => {
    return await client.query("UPDATE Customer SET email = $1 WHERE id =$2", [newEmail, id]);
}

//delete

module.exports.deleteCustomer = async (id, client) => {
    return await client.query("DELETE FROM Customer WHERE id = $1",[id]);
}