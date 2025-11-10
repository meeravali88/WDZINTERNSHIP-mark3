const mongoose = require('mongoose');

const BudgetSchema = new mongoose.Schema({
    // Link to the project (assuming a Project model exists)
    projectId: { 
        type: mongoose.Schema.Types.ObjectId, 
        // ref: 'Project', // Uncomment if you create the Project model
        required: true 
    },
    item: { 
        type: String, 
        required: [true, 'Budget item name is required'] 
    }, // e.g., 'Labour - Plumbing', 'Cement Procurement'
    estimatedCost: { 
        type: Number, 
        required: [true, 'Estimated cost is required'], 
        min: 0 
    },
    actualCost: { 
        type: Number, 
        default: 0, 
        min: 0 
    },
    category: { // Optional: for filtering/reporting
        type: String, 
        enum: ['Labour', 'Material', 'Equipment', 'Subcontractor'], 
        default: 'Material' 
    },
    dateCreated: { 
        type: Date, 
        default: Date.now 
    }
});

module.exports = mongoose.model('Budget', BudgetSchema);