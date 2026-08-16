import express from 'express';
import cors from 'cors';
import db from './db.js';
import eventsRouter from './routes/events.js';
import bookingsRouter from './routes/bookings.js';

const app = express();
app.use(cors());
app.use(express.json());

// Test Database Connection on Startup
try {
  const connection = await db.getConnection();
  console.log('✅ Connected to MySQL Database successfully!');
  connection.release();
} catch (err) {
  console.error('❌ Detailed Database connection error:', err);
}

// Routes
app.use('/api/events', eventsRouter);
app.use('/api/bookings', bookingsRouter);

// Start Server bound to 0.0.0.0 for Render
const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server running on port ${PORT}`);
});