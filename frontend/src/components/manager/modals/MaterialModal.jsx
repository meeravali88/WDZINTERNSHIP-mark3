import React, { useState } from 'react';
import Modal from './Modal';

const MaterialModal = ({ isOpen, onClose, onSubmit }) => {
    const [formData, setFormData] = useState({ name: '', category: 'concrete', quantity: '', unit: 'tons', unitPrice: '' });
    const handleChange = (e) => setFormData({ ...formData, [e.target.id]: e.target.value });
    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
        setFormData({ name: '', category: 'concrete', quantity: '', unit: 'tons', unitPrice: '' });
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Add New Material">
            <form onSubmit={handleSubmit}>
                <div className="form-group"><label className="form-label">Material Name</label><input type="text" className="form-control" id="name" value={formData.name} onChange={handleChange} required /></div>
                <div className="form-group"><label className="form-label">Category</label>
                    <select className="form-control" id="category" value={formData.category} onChange={handleChange} required>
                        <option value="concrete">Concrete</option><option value="steel">Steel</option><option value="electrical">Electrical</option><option value="plumbing">Plumbing</option><option value="finishing">Finishing</option>
                    </select>
                </div>
                <div className="form-group"><label className="form-label">Quantity</label><input type="number" className="form-control" id="quantity" value={formData.quantity} onChange={handleChange} required /></div>
                <div className="form-group"><label className="form-label">Unit</label>
                    <select className="form-control" id="unit" value={formData.unit} onChange={handleChange} required>
                        <option value="tons">Tons</option><option value="meters">Meters</option><option value="pieces">Pieces</option><option value="kg">Kilograms</option>
                    </select>
                </div>
                <div className="form-group"><label className="form-label">Unit Price</label><input type="number" className="form-control" id="unitPrice" value={formData.unitPrice} onChange={handleChange} required /></div>
                <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', marginTop: '25px' }}>
                    <button type="button" className="btn btn-outline" onClick={onClose}>Cancel</button><button type="submit" className="btn btn-primary">Add Material</button>
                </div>
            </form>
        </Modal>
    );
};
export default MaterialModal;