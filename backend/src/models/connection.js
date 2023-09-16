const { createPool } = require('mysql2/promise');

const connection = createPool({
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  host: process.env.MYSQL_HOSTNAME,
  port: process.env.MYSQL_PORT,
  database: process.env.MYSQL_DATABASE,
  waitForConnections: true,
});

module.exports = connection;