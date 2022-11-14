const Router = require('./routes')
const express = require('express');
const app = express();
const port = 3001;

require('dotenv').config()

app.use(express.json());
app.use(Router);

app.listen(port, () => {
    console.log(`API listening at http://localhost:${port}`);
});