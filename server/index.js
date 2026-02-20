const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// In-memory stores
let registrations = [];
let leaderboard = [
    { rank: 1, team: 'CyberNova', score: 2850, event: 'Hackathon' },
    { rank: 2, team: 'NeonByte', score: 2630, event: 'Hackathon' },
    { rank: 3, team: 'PixelStorm', score: 2410, event: 'Code Wars' },
    { rank: 4, team: 'DataDrift', score: 2280, event: 'CTF Challenge' },
    { rank: 5, team: 'GlitchSquad', score: 2100, event: 'Code Wars' },
    { rank: 6, team: 'ZeroCool', score: 1980, event: 'Robo Race' },
    { rank: 7, team: 'PhantomCoders', score: 1870, event: 'Hackathon' },
    { rank: 8, team: 'QuantumLeap', score: 1750, event: 'CTF Challenge' },
    { rank: 9, team: 'BinaryBlaze', score: 1640, event: 'Gaming Arena' },
    { rank: 10, team: 'SynthWave', score: 1520, event: 'Code Wars' },
];

// POST /api/register
app.post('/api/register', (req, res) => {
    const { name, email, phone, college, event } = req.body;

    if (!name || !email || !phone || !college || !event) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ error: 'Invalid email format' });
    }

    const duplicate = registrations.find(r => r.email === email && r.event === event);
    if (duplicate) {
        return res.status(409).json({ error: 'Already registered for this event' });
    }

    const registration = {
        id: Date.now(),
        name,
        email,
        phone,
        college,
        event,
        registeredAt: new Date().toISOString(),
    };

    registrations.push(registration);
    res.status(201).json({ message: 'Registration successful', registration });
});

// GET /api/registrations
app.get('/api/registrations', (req, res) => {
    res.json(registrations);
});

// GET /api/leaderboard
app.get('/api/leaderboard', (req, res) => {
    res.json(leaderboard);
});

app.listen(PORT, () => {
    console.log(`🚀 TechPulse API running on http://localhost:${PORT}`);
});
