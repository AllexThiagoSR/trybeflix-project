const { createPool } = require('mysql2/promise');

const connection = createPool({
  user: process.env.MYSQL_USER || 'root',
  password: process.env.MYSQL_PASSWORD || 'password',
  host: process.env.MYSQL_HOSTNAME || 'localhost',
  port: process.env.MYSQL_PORT || 3306,
  waitForConnections: true,
});
const fs = require('fs/promises');

const resetDB = async () => {
  const migrationQuery = await fs.readFile(
    '../sql/01-migration.sql',
    'utf8',
  );
  const seedQuery = await fs.readFile(
    '../sql/02-seed.sql',
    'utf8',
  );
  for (const query of migrationQuery.split(';\n')) {
    await connection.query(query);
  }
  for (const query of seedQuery.split(';\n')) {
    await connection.query(query);
  }
};

const reset = () => {
  resetDB();
};

module.exports = { reset };
