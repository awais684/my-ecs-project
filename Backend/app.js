const express = require('express');
const cors = require('cors');
const db = require('./db');

const app = express();
app.use(cors());
app.use(express.json());

// Signup
app.post('/signup', async (req, res) => {
  const { email, password } = req.body;
  try {
    await db.query('INSERT INTO users (email, password) VALUES (?, ?)', [email, password]);
    res.send('Signup successful');
  } catch (err) {
    console.error(err);
    res.status(400).send('Signup failed');
  }
});

// Login
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const [rows] = await db.query('SELECT * FROM users WHERE email = ? AND password = ?', [email, password]);
  if (rows.length > 0) {
    res.json({ success: true, user: rows[0] });
  } else {
    res.json({ success: false });
  }
});

// Add Note
app.post('/note', async (req, res) => {
  const { userId, content } = req.body;
  try {
    await db.query('INSERT INTO notes (user_id, content) VALUES (?, ?)', [userId, content]);
    res.send('Note saved!');
  } catch (err) {
    console.error(err);
    res.status(400).send('Error saving note');
  }
});

// Get Notes
app.get('/notes', async (req, res) => {
  const { userId } = req.query;
  const [rows] = await db.query('SELECT * FROM notes WHERE user_id = ?', [userId]);
  res.json(rows);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
