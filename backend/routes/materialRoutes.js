const express = require('express');
const router = express.Router();
const Material = require('../models/Material');

// @route   POST /api/material
// @desc    Add a new type of material to the inventory
// @access  Private (Admin/Manager)
router.post('/', async (req, res) => {
    try {
        const newMaterial = new Material(req.body);
        const material = await newMaterial.save();
        res.status(201).json(material);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// @route   GET /api/material
// @desc    Get the full list of material inventory
// @access  Private (All authenticated users)
router.get('/', async (req, res) => {
    try {
        const materials = await Material.find().sort({ name: 1 });
        res.json(materials);
    } catch (err) {
        res.status(500).json({ message: 'Server Error: ' + err.message });
    }
});

// @route   PATCH /api/material/stock/:id
// @desc    Update material stock (procurement/usage)
// @access  Private (Manager/User)
router.patch('/stock/:id', async (req, res) => {
    const { quantityChange } = req.body; // Expects a number (positive for add, negative for use)
    try {
        const material = await Material.findById(req.params.id);
        if (!material) return res.status(404).json({ message: 'Material not found' });

        material.currentStock += quantityChange;
        material.lastUpdated = Date.now();
        await material.save();
        
        res.json(material);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;