import express from 'express';
import db from '../db.js';

const router = express.Router();

// Helper to generate unique ticket codes like "EVT-8X2A9B"
const generateTicketCode = () => {
  return 'EVT-' + Math.random().toString(36).substring(2, 8).toUpperCase();
};

// 1. GET all user bookings (for My Tickets page)
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT 
        bookings.id AS booking_id, 
        bookings.event_id, 
        bookings.ticket_code,
        events.title, 
        events.location, 
        events.event_date, 
        events.price, 
        events.category, 
        events.image_url
      FROM bookings 
      JOIN events ON bookings.event_id = events.id 
      ORDER BY bookings.id DESC
    `);
    res.json(rows);
  } catch (error) {
    console.error('Fetch bookings error:', error);
    res.status(500).json({ error: 'Failed to fetch bookings' });
  }
});

// 2. POST /api/bookings - Book a seat for an event
router.post('/', async (req, res) => {
  const { event_id, user_id = 1, seats = 1 } = req.body;

  try {
    // Check if event exists and has enough seats
    const [events] = await db.query('SELECT available_seats, title FROM events WHERE id = ?', [event_id]);
    
    if (events.length === 0) {
      return res.status(404).json({ error: 'Event not found' });
    }

    const event = events[0];

    if (event.available_seats < seats) {
      return res.status(400).json({ error: 'Not enough available seats left!' });
    }

    // Generate unique ticket code
    const ticket_code = generateTicketCode();

    // Insert booking record including user_id AND ticket_code
    await db.query(
      'INSERT INTO bookings (event_id, user_id, ticket_code) VALUES (?, ?, ?)', 
      [event_id, user_id, ticket_code]
    );

    // Decrement available_seats in events table
    await db.query(
      'UPDATE events SET available_seats = available_seats - ? WHERE id = ?',
      [seats, event_id]
    );

    const updatedRemainingSeats = event.available_seats - seats;

    res.json({
      message: `Ticket booked successfully! Your ticket code is ${ticket_code}`,
      event_title: event.title,
      ticket_code: ticket_code,
      remaining_seats: updatedRemainingSeats
    });
  } catch (error) {
    console.error('Booking error:', error);
    res.status(500).json({ error: 'Failed to complete booking' });
  }
});

export default router;