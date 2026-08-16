import express from 'express';
import db from '../db.js';

const router = express.Router();

// 1. GET all events
router.get('/', async (req, res) => {
  try {
    const { category, search } = req.query;
    let query = 'SELECT * FROM events WHERE 1=1';
    const params = [];

    if (category && category !== 'All') {
      query += ' AND category = ?';
      params.push(category);
    }

    if (search) {
      query += ' AND (title LIKE ? OR description LIKE ? OR location LIKE ?)';
      const searchTerm = `%${search}%`;
      params.push(searchTerm, searchTerm, searchTerm);
    }

    query += ' ORDER BY event_date ASC';

    const [rows] = await db.query(query, params);
    res.json(rows);
  } catch (error) {
    console.error('Fetch events error:', error);
    res.status(500).json({ error: 'Failed to fetch events' });
  }
});

// 2. GET single event by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await db.query('SELECT * FROM events WHERE id = ?', [id]);

    if (rows.length === 0) {
      return res.status(404).json({ error: 'Event not found' });
    }

    res.json(rows[0]);
  } catch (error) {
    console.error('Fetch single event error:', error);
    res.status(500).json({ error: 'Failed to fetch event details' });
  }
});

// 3. POST Create New Event
router.post('/', async (req, res) => {
  const { title, description, category, location, event_date, available_seats, price, image_url } = req.body;

  if (!title || !description || !location || !event_date) {
    return res.status(400).json({ error: 'Title, description, location, and date are required.' });
  }

  try {
    const [result] = await db.query(
      `INSERT INTO events (title, description, category, location, event_date, available_seats, price, image_url) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        title, 
        description, 
        category || 'General', 
        location, 
        event_date, 
        available_seats || 50, 
        price || 0, 
        image_url || 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?auto=format&fit=crop&w=800&q=80'
      ]
    );

    res.status(201).json({ message: 'Event created successfully!', eventId: result.insertId });
  } catch (error) {
    console.error('Create event error:', error);
    res.status(500).json({ error: 'Failed to create event' });
  }
});

export default router;