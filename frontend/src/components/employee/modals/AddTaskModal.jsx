import React, { useState } from 'react';
import Modal from './Modal';

const AddTaskModal = ({ isOpen, onClose, onSubmit }) => {
    const [formData, setFormData] = useState({ title: '', description: '', priority: 'medium' });
    const handleSubmit = (e) => { e.preventDefault(); onSubmit(formData); setFormData({ title: '', description: '', priority: 'medium' }); };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Add New Task">
            <form onSubmit={handleSubmit}>
                <div className="form-group"><label>Title</label><input className="form-control" value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} required /></div>
                <div className="form-group"><label>Description</label><textarea className="form-control" value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} required /></div>
                <div className="form-group"><label>Priority</label><select className="form-control" value={formData.priority} onChange={e => setFormData({ ...formData, priority: e.target.value })}><option value="low">Low</option><option value="medium">Medium</option><option value="high">High</option></select></div>
                <button type="submit" className="btn btn-primary">Add Task</button>
            </form>
        </Modal>
    );
};
export default AddTaskModal;