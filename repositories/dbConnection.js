const Pool = require('pg').Pool;
const { dbConnection } =require('../config');
const pool = new Pool(dbConnection);

module.exports = pool;
