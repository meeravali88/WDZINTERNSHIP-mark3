import React, { useState } from 'react';
import Modal from './Modal';

const TaskModal = ({ isOpen, onClose, onSubmit, projects }) => {
    const [formData, setFormData] = useState({
        name: '', description: '', projectId: '', assignee: '', priority: 'medium', dueDate: ''
    });

    const handleChange = (e) => setFormData({ ...formData, [e.target.id]: e.target.value });

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
        setFormData({ name: '', description: '', projectId: '', assignee: '', priority: 'medium', dueDate: '' });
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Create New Task">
            <form onSubmit={handleSubmit}>
                <div className="form-group"><label className="form-label">Task Name</label><input type="text" className="form-control" id="name" value={formData.name} onChange={handleChange} required /></div>
                <div className="form-group"><label className="form-label">Description</label><textarea className="form-control" id="description" value={formData.description} onChange={handleChange} rows="3"></textarea></div>
                <div className="form-group"><label className="form-label">Project</label>
                    <select className="form-control" id="projectId" value={formData.projectId} onChange={handleChange} required>
                        <option value="">Select Project</option>
                        {projects.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                    </select>
                </div>
                <div className="form-group"><label className="form-label">Assigned To</label>
                    <select className="form-control" id="assignee" value={formData.assignee} onChange={handleChange} required>
                        <option value="">Select Assignee</option>
                        <option value="Project Manager">Project Manager</option>
                    </select>
                </div>
                <div className="form-group"><label className="form-label">Priority</label>
                    <select className="form-control" id="priority" value={formData.priority} onChange={handleChange} required>
                        <option value="high">High</option><option value="medium">Medium</option><option value="low">Low</option>
                    </select>
                </div>
                <div className="form-group"><label className="form-label">Due Date</label><input type="date" className="form-control" id="dueDate" value={formData.dueDate} onChange={handleChange} required /></div>
                <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', marginTop: '25px' }}>
                    <button type="button" className="btn btn-outline" onClick={onClose}>Cancel</button><button type="submit" className="btn btn-primary">Create Task</button>
                </div>
            </form>
        </Modal>
    );
};

export default TaskModal;