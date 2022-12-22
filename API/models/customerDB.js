
//get

module.exports.getAllCustomer = async (client) => {
    return await client.query("SELECT * FROM Customer ORDER BY id");
}

module.exports.getCustomer = async (client, mail) => {
    return await client.query("SELECT * FROM Customer WHERE email = $1 AND isAdmin = false",[mail]);
}

module.exports.getDataCustomer = async (client, mail) => {
    return await client.query("SELECT * FROM Customer WHERE email = $1",[mail]);
}


//post

module.exports.postNewCustomer = async (client, email, firstName, lastName, passWord) => {
    return await client.query("INSERT INTO Customer(email, firstName, name, passWord, isadmin) VALUES ($1,$2,$3,$4,$5) RETURNING id", [email, firstName, lastName, passWord, false]);
}

//update

module.exports.updateCustomer = async (client, id , name, firstName, email) => {
    return await client.query("UPDATE Customer SET email = $1, firstName = $2, name = $3 WHERE id =$4", [name, firstName, email, id]);
}

module.exports.updatePasswordCustomer = async (client, mail, newPassWord) => {
    return await client.query("UPDATE Customer SET passWord = $1 WHERE email =$2", [newPassWord, mail]);
}

module.exports.updateEmailCustomer = async (client, mail, newEmail) => {
    return await client.query("UPDATE Customer SET email = $1 WHERE email =$2", [newEmail, mail]);
}

//delete

module.exports.deleteCustomer = async (client, id) => {
    return await client.query("DELETE FROM Customer WHERE id = $1",[id]);
}