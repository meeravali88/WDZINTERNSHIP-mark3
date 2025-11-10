import React, { useState } from 'react';
import Modal from './Modal';
const MaterialRequestModal = ({ isOpen, onClose, onSubmit }) => {
    const [data, setData] = useState({ materialName: '', materialQuantity: '', materialUnit: 'pieces' });
    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Request Materials">
             <form onSubmit={(e) => { e.preventDefault(); onSubmit(data); }}>
                <div className="form-group"><label>Material</label><input className="form-control" onChange={e=>setData({...data, materialName: e.target.value})} required/></div>
                <div className="form-group"><label>Quantity</label><input type="number" className="form-control" onChange={e=>setData({...data, materialQuantity: e.target.value})} required/></div>
                <button type="submit" className="btn btn-primary">Request</button>
             </form>
        </Modal>
    );
};
export default MaterialRequestModal;