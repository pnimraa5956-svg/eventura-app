import express from 'express';
import cors from 'cors';
import eventsRouter from './routes/events.js';
import bookingsRouter from './routes/bookings.js';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/events', eventsRouter);
app.use('/api/bookings', bookingsRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server running on port ${PORT}`);
});