import express from 'express';
import cors from 'cors';
import mysql from 'mysql2';
import eventsRouter from './routes/events.js';
import bookingsRouter from './routes/bookings.js';

const app = express();
app.use(cors());
app.use(express.json());

// Database Connection
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 3306,
  connectTimeout: 30000,
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

// Routes
app.use('/api/events', eventsRouter);
app.use('/api/bookings', bookingsRouter);

// Start Server bound to 0.0.0.0 for Render
const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server running on port ${PORT}`);
});