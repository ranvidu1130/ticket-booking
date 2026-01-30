const express = require('express');
const { pool } = require('../config/database');

const router = express.Router();

// Get all films
router.get('/', async (req, res) => {
    try {
        const [films] = await pool.query('SELECT * FROM films ORDER BY created_at DESC');
        
        res.json({
            success: true,
            message: 'Films retrieved successfully',
            data: films
        });
    } catch (error) {
        console.error('Error fetching films:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch films'
        });
    }
});

// Get single film by ID
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const [films] = await pool.query('SELECT * FROM films WHERE id = ?', [id]);
        
        if (films.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Film not found'
            });
        }
        
        res.json({
            success: true,
            message: 'Film retrieved successfully',
            data: films[0]
        });
    } catch (error) {
        console.error('Error fetching film:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch film'
        });
    }
});

module.exports = router;
