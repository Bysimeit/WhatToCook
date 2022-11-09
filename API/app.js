const express = require('express');
const app = express();
const port = 3001;

app.get('/', (req, res) => {
    res.send('API Running...');
});

app.listen(port, () => {
    console.log(`API listening at http://localhost:${port}`);
});