const mysql = require('mysql');

const connection = mysql.createConnection({
  host: process.env.NODE_APP_HOST,
  user: process.env.NODE_APP_USER,
  password: process.env.NODE_APP_PASSWORD,
  database: process.env.NODE_APP_DATABASE,
});

module.exports = connection;