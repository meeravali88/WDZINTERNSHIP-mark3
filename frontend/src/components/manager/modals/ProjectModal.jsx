import React, { useState, useEffect } from 'react';
import Modal from './Modal';

const ProjectModal = ({ isOpen, onClose, onSubmit }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [budget, setBudget] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [manager, setManager] = useState('1');

    // --- NEW: Budget Estimation State ---
    const [isEstimating, setIsEstimating] = useState(false);
    const [estimationItems, setEstimationItems] = useState([
        { id: Date.now(), description: 'Initial Phase', cost: 0 }
    ]);

    // Recalculate total budget whenever items change
    useEffect(() => {
        if (isEstimating) {
            const total = estimationItems.reduce((sum, item) => sum + (parseFloat(item.cost) || 0), 0);
            setBudget(total.toFixed(2));
        }
    }, [estimationItems, isEstimating]);

    const handleAddItem = () => {
        setEstimationItems([...estimationItems, { id: Date.now(), description: '', cost: 0 }]);
    };

    const handleRemoveItem = (id) => {
        setEstimationItems(estimationItems.filter(item => item.id !== id));
    };

    const handleItemChange = (id, field, value) => {
        setEstimationItems(estimationItems.map(item => 
            item.id === id ? { ...item, [field]: value } : item
        ));
    };
    // ------------------------------------

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({
            name,
            description,
            budget: parseFloat(budget),
            startDate,
            endDate,
            manager,
            // Optional: save the estimation details too if your backend supports it
            estimationDetails: isEstimating ? estimationItems : null 
        });
        resetForm();
    };

    const resetForm = () => {
        setName(''); setDescription(''); setBudget(''); setStartDate(''); setEndDate('');
        setIsEstimating(false);
        setEstimationItems([{ id: Date.now(), description: 'Initial Phase', cost: 0 }]);
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Create New Project">
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label className="form-label">Project Name</label>
                    <input type="text" className="form-control" value={name} onChange={e => setName(e.target.value)} placeholder="Enter project name" required />
                </div>
                <div className="form-group">
                    <label className="form-label">Description</label>
                    <textarea className="form-control" rows="3" value={description} onChange={e => setDescription(e.target.value)} placeholder="Project description"></textarea>
                </div>

                {/* --- MODIFIED: Budget Section --- */}
                <div className="form-group">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                        <label className="form-label" style={{ marginBottom: 0 }}>Budget</label>
                        <div style={{ fontSize: '0.9rem' }}>
                            <input 
                                type="checkbox" 
                                id="useEstimator" 
                                checked={isEstimating} 
                                onChange={(e) => setIsEstimating(e.target.checked)}
                                style={{ marginRight: '8px' }}
                            />
                            <label htmlFor="useEstimator" style={{ cursor: 'pointer', fontWeight: 'normal' }}>Use Budget Estimator</label>
                        </div>
                    </div>
                    
                    {isEstimating ? (
                        <div className="estimation-container" style={{ background: '#f8f9fa', padding: '15px', borderRadius: '8px', marginBottom: '15px' }}>
                            {estimationItems.map((item, index) => (
                                <div key={item.id} style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        placeholder="Item description" 
                                        value={item.description}
                                        onChange={(e) => handleItemChange(item.id, 'description', e.target.value)}
                                        required
                                        style={{ flex: 2 }}
                                    />
                                    <input 
                                        type="number" 
                                        className="form-control" 
                                        placeholder="Cost" 
                                        value={item.cost}
                                        onChange={(e) => handleItemChange(item.id, 'cost', e.target.value)}
                                        required
                                        min="0"
                                        step="0.01"
                                        style={{ flex: 1 }}
                                    />
                                    {estimationItems.length > 1 && (
                                        <button 
                                            type="button" 
                                            className="btn btn-danger" 
                                            onClick={() => handleRemoveItem(item.id)}
                                            style={{ padding: '0 12px' }}
                                        >
                                            <i className="fas fa-times"></i>
                                        </button>
                                    )}
                                </div>
                            ))}
                            <button 
                                type="button" 
                                className="btn btn-outline" 
                                onClick={handleAddItem}
                                style={{ width: '100%', marginTop: '10px', borderStyle: 'dashed' }}
                            >
                                <i className="fas fa-plus"></i> Add Estimation Item
                            </button>
                            <div style={{ textAlign: 'right', marginTop: '15px', fontWeight: '600', fontSize: '1.1rem' }}>
                                Estimated Total: ${parseFloat(budget || 0).toLocaleString()}
                            </div>
                        </div>
                    ) : (
                        <input type="number" className="form-control" value={budget} onChange={e => setBudget(e.target.value)} placeholder="Enter total budget" required min="0" step="0.01" />
                    )}
                </div>
                {/* -------------------------------- */}

                <div className="form-group">
                    <label className="form-label">Start Date</label>
                    <input type="date" className="form-control" value={startDate} onChange={e => setStartDate(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label className="form-label">End Date</label>
                    <input type="date" className="form-control" value={endDate} onChange={e => setEndDate(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label className="form-label">Project Manager</label>
                    <select className="form-control" value={manager} onChange={e => setManager(e.target.value)} required>
                        <option value="1">Project Manager</option>
                    </select>
                </div>
                <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', marginTop: '25px' }}>
                    <button type="button" className="btn btn-outline" onClick={onClose}>Cancel</button>
                    <button type="submit" className="btn btn-primary">Create Project</button>
                </div>
            </form>
        </Modal>
    );
};

export default ProjectModal;