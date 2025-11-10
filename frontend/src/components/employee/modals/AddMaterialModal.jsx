import React, { useState } from 'react';
import Modal from './Modal';
const AddMaterialModal = ({ isOpen, onClose, onSubmit }) => {
    const [data, setData] = useState({ name: '', category: 'construction', quantity: '', unit: 'bags', status: 'available' });
    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Add Material">
             <form onSubmit={(e) => { e.preventDefault(); onSubmit(data); }}>
                <div className="form-group"><label>Name</label><input className="form-control" onChange={e=>setData({...data, name: e.target.value})} required/></div>
                <div className="form-group"><label>Quantity</label><input type="number" className="form-control" onChange={e=>setData({...data, quantity: e.target.value})} required/></div>
                <button type="submit" className="btn btn-primary">Add</button>
             </form>
        </Modal>
    );
};
export default AddMaterialModal;
