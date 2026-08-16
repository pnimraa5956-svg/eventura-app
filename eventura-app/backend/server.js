import express from 'express';
import cors from 'cors';
import eventsRouter from './routes/events.js';
import bookingsRouter from './routes/bookings.js'; // 1. Import bookings route

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/events', eventsRouter);
app.use('/api/bookings', bookingsRouter); // 2. Mount bookings route

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
