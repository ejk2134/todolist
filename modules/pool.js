var Pool = require('pg').Pool;

var config = {
    host: 'localhost',
    port: 5432,
    database: 'todolist',
    max: 20
}

var pool = new Pool(config);
module.exports = pool;