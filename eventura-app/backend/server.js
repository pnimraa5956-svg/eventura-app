import mysql from 'mysql2';

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 3306,
  connectTimeout: 30000, // Wait up to 30 seconds for the remote connection
  ssl: {
    rejectUnauthorized: false
  }
});

connection.connect((err) => {
  if (err) {
    console.error('❌ Detailed Database connection error:', err);
    return;
  }
  console.log('✅ Connected to MySQL Database successfully!');
});

export default connection;