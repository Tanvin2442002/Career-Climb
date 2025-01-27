const postgres = require('postgres');

const connnectionString = process.env.DATABASE_URL;
const sql = postgres(connnectionString);

module.exports = sql;