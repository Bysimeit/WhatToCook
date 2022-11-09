const pg = require('pg');
const Pool = pg.Pool;

const pool = new Pool({
    user: '',
    host: '',
    database: '',
    password: '',
    port: 
});

module.exports = pool;