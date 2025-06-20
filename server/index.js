const express = require('express');
const cors = require('cors');
const fs = require('fs');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

const SCORE_FILE = './scores.json';
let scores = [];

// Load existing scores from file if it exists
if (fs.existsSync(SCORE_FILE)) {
  try {
    const data = fs.readFileSync(SCORE_FILE, 'utf-8');
    scores = JSON.parse(data);
  } catch (error) {
    console.error('Error reading scores.json:', error);
    scores = [];
  }
} else {
  // If no file exists, create an empty one
  fs.writeFileSync(SCORE_FILE, '[]');
}

// GET top 5 scores by WPM
app.get('/scores', (req, res) => {
  const top = scores
    .slice() // clone array to avoid mutating original
    .sort((a, b) => b.wpm - a.wpm)
    .slice(0, 5);
  res.json(top);
});

// POST new score
app.post('/scores', (req, res) => {
  console.log('📥 Received POST /scores:', req.body);

  const { name, time, wpm } = req.body;

  if (!name || typeof time !== 'number' || typeof wpm !== 'number') {
    return res.status(400).json({ message: 'Invalid score data' });
  }

  scores.push({ name, time, wpm });

  try {
    fs.writeFileSync(SCORE_FILE, JSON.stringify(scores, null, 2));
  } catch (error) {
    console.error('Error writing scores.json:', error);
    return res.status(500).json({ message: 'Failed to save score' });
  }

  res.status(201).json({ message: 'Score saved!' });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
