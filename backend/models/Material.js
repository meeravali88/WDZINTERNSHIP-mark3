const mongoose = require('mongoose');

const MaterialSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: [true, 'Material name is required'], 
        unique: true 
    },
    unit: { 
        type: String, 
        required: [true, 'Unit of measure is required'] 
    }, // e.g., 'bag', 'sq.ft', 'metre', 'unit'
    currentStock: { 
        type: Number, 
        default: 0, 
        min: 0 
    },
    minimumStockLevel: { // Used for generating 'Low Stock' alerts
        type: Number, 
        default: 10, 
        min: 0 
    },
    lastUpdated: { 
        type: Date, 
        default: Date.now 
    }
});

module.exports = mongoose.model('Material', MaterialSchema);