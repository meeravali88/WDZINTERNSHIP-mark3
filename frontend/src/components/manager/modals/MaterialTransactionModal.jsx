import React, { useState } from 'react';
import Modal from './Modal';

const MaterialTransactionModal = ({ isOpen, onClose, onSubmit, materials, projects }) => {
    const [formData, setFormData] = useState({
        materialId: '',
        type: 'out', // 'in' for restocking, 'out' for usage
        quantity: '',
        projectId: '',
        notes: ''
    });

    const handleChange = (e) => setFormData({ ...formData, [e.target.id]: e.target.value });

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ ...formData, quantity: parseFloat(formData.quantity) });
        setFormData({ materialId: '', type: 'out', quantity: '', projectId: '', notes: '' });
    };

    const selectedMaterial = materials.find(m => m.id === formData.materialId);

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Record Material Transaction">
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label className="form-label">Transaction Type</label>
                    <select className="form-control" id="type" value={formData.type} onChange={handleChange} required>
                        <option value="out">Check OUT (Usage)</option>
                        <option value="in">Check IN (Restock/Return)</option>
                    </select>
                </div>
                <div className="form-group">
                    <label className="form-label">Material</label>
                    <select className="form-control" id="materialId" value={formData.materialId} onChange={handleChange} required>
                        <option value="">Select Material</option>
                        {materials.map(m => (
                            <option key={m.id} value={m.id}>
                                {m.name} (Current Stock: {m.quantity} {m.unit})
                            </option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label className="form-label">Quantity ({selectedMaterial?.unit || 'Units'})</label>
                    <input 
                        type="number" 
                        className="form-control" 
                        id="quantity" 
                        value={formData.quantity} 
                        onChange={handleChange} 
                        required 
                        min="0.01" 
                        step="0.01"
                        max={formData.type === 'out' && selectedMaterial ? selectedMaterial.quantity : undefined}
                    />
                    {formData.type === 'out' && selectedMaterial && (
                        <small style={{ color: 'var(--gray)' }}>Max available: {selectedMaterial.quantity}</small>
                    )}
                </div>
                {formData.type === 'out' && (
                     <div className="form-group">
                        <label className="form-label">Assign to Project</label>
                        <select className="form-control" id="projectId" value={formData.projectId} onChange={handleChange} required={formData.type === 'out'}>
                            <option value="">Select Project</option>
                            {projects.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                        </select>
                    </div>
                )}
                <div className="form-group">
                    <label className="form-label">Notes</label>
                    <textarea className="form-control" id="notes" rows="2" value={formData.notes} onChange={handleChange} placeholder="Optional details..."></textarea>
                </div>
                <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', marginTop: '25px' }}>
                    <button type="button" className="btn btn-outline" onClick={onClose}>Cancel</button>
                    <button type="submit" className="btn btn-primary">Record Transaction</button>
                </div>
            </form>
        </Modal>
    );
};

export default MaterialTransactionModal;