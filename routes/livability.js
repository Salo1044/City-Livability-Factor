// routes/livability.js
const express = require('express');
const router = express.Router();
const pool = require('../db');

const scoringQuery = `
    SELECT
        city_name,
        city_state,
        violent_crime_rate,
        property_crime_rate,
        walkability_score,
        transit_score,
        bike_score,
        ROUND((
            (1 - (violent_crime_rate  / (SELECT MAX(violent_crime_rate)  FROM city_livability_data))) * 5 +
            (1 - (property_crime_rate / (SELECT MAX(property_crime_rate) FROM city_livability_data))) * 4 +
            (walkability_score / 100.0) * 3 +
            COALESCE((transit_score / 100.0) * 2, 0) +
            COALESCE((bike_score   / 100.0) * 1, 0)
        ), 4) AS livability_score
    FROM city_livability_data
    ORDER BY livability_score DESC
`;

// GET /api/livability
router.get('/', async (req, res) => {
    try {
        const [rows] = await pool.query(scoringQuery);
        res.json({
            count: rows.length,
            cities: rows
        });
    } catch (err) {
        console.error('Query error:', err);
        res.status(500).json({ error: 'Failed to retrieve livability scores' });
    }
});

module.exports = router;