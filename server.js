// server.js
require('dotenv').config();
const express = require('express');
const rateLimit = require('express-rate-limit');
const app = express();
const livabilityRoutes = require('./routes/livability');

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100,                  // max 100 requests per window per IP
    message: { error: 'Too many requests, please try again later.' }
});

app.use(express.json());
app.use(express.static('public'));
app.use('/api/', limiter);
app.use('/api/livability', livabilityRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));