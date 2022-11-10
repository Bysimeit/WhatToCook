const express = require('express');
const app = express();
const port = 3001;
require('dotenv').config()

app.get('/', (req, res) => {
    res.send(process.env.port);
});

app.listen(port, () => {
    console.log(`API listening at http://localhost:${port}`);
});