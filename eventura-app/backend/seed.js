import mysql from 'mysql2/promise';
import 'dotenv/config';

const sampleEvents = [
  {
    title: 'Tech Innovations Summit 2026',
    description: 'Explore cutting-edge advancements in AI, full-stack engineering, and cloud architecture with top leaders.',
    category: 'Technology',
    location: 'Convention Center, Tech Hub',
    event_date: '2026-09-15',
    total_seats: 200,
    available_seats: 150,
    price: 49.99,
    image_url: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80'
  },
  {
    title: 'Acoustic Indie Nights',
    description: 'An intimate evening featuring live acoustic performances from indie bands and solo songwriters.',
    category: 'Music',
    location: 'Grand Amphitheater, Downtown',
    event_date: '2026-09-20',
    total_seats: 100,
    available_seats: 45,
    price: 25.00,
    image_url: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80'
  },
  {
    title: 'Full-Stack Web Dev Workshop',
    description: 'Hands-on practical session building scalable MERN / MySQL applications from scratch.',
    category: 'Workshop',
    location: 'Innovation Lab, Room 302',
    event_date: '2026-10-05',
    total_seats: 50,
    available_seats: 20,
    price: 15.00,
    image_url: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80'
  }
];

const seedDB = async () => {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'eventura'
    });

    console.log('Resetting and recreating events table schema...');

    // Temporarily disable foreign key checks to safely drop and recreate events
    await connection.query('SET FOREIGN_KEY_CHECKS = 0');
    await connection.query('DROP TABLE IF EXISTS events');

    await connection.query(`
      CREATE TABLE events (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        category VARCHAR(100),
        location VARCHAR(255),
        event_date DATE,
        total_seats INT DEFAULT 0,
        available_seats INT DEFAULT 0,
        price DECIMAL(10,2) DEFAULT 0.00,
        image_url TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Re-enable foreign key checks
    await connection.query('SET FOREIGN_KEY_CHECKS = 1');

    // Insert sample data
    for (const evt of sampleEvents) {
      await connection.query(
        `INSERT INTO events (title, description, category, location, event_date, total_seats, available_seats, price, image_url)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [evt.title, evt.description, evt.category, evt.location, evt.event_date, evt.total_seats, evt.available_seats, evt.price, evt.image_url]
      );
    }

    console.log('✅ Fresh events table created and sample data inserted successfully!');
    await connection.end();
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error.message);
    process.exit(1);
  }
};

seedDB();