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
    '/home/allex/Trybe/monitoria/trybeflix-project/sql/01-migration.sql',
    'utf8',
  );
  for (const query of migrationQuery.split('\n')) {
    await connection.query(query);
  }
};

resetDB().then(() => console.log('OK'));
