const express = require('express');
const router = express.Router();
const Budget = require('../models/Budget');
// NOTE: You would typically include role-based access middleware here (e.g., auth.js)

// @route   POST /api/budget
// @desc    Create a new budget item
// @access  Private (Admin/Manager)
router.post('/', async (req, res) => {
    try {
        const newBudgetItem = new Budget(req.body);
        const item = await newBudgetItem.save();
        res.status(201).json(item);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// @route   GET /api/budget/:projectId
// @desc    Get all budget items for a specific project
// @access  Private (All authenticated users)
router.get('/:projectId', async (req, res) => {
    try {
        const budgetItems = await Budget.find({ projectId: req.params.projectId }).sort({ dateCreated: 1 });
        res.json(budgetItems);
    } catch (err) {
        res.status(500).json({ message: 'Server Error: ' + err.message });
    }
});

// @route   PATCH /api/budget/:id
// @desc    Update an existing budget item (e.g., set actual cost)
// @access  Private (Admin/Manager)
router.patch('/:id', async (req, res) => {
    try {
        const updatedItem = await Budget.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!updatedItem) return res.status(404).json({ message: 'Budget item not found' });
        res.json(updatedItem);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;