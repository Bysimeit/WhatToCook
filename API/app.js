const Router = require('./routes');
const express = require('express');
const bp = require('body-parser');
const cors = require('cors');
const app = express();
const port = 3001;

const InternalIp = require("internal-ip");
const internalIp = InternalIp.v4.sync();

app.use(cors());
app.use(express.json());
app.use(bp.json());
app.use(bp.urlencoded({ extended: true}));

app.use(Router);

/*app.listen(port,() => {
    console.log(`API listening at http://localhost:${port}`);
});*/

//demander si ok

app.listen(port, internalIp,() => {
    console.log(`API listening at http://${internalIp}:${port}`);
});