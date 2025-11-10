import React from 'react';

const Materials = ({ materials, onOpenRequestModal, onOpenAddModal, onDeleteMaterial }) => {
    return (
        <div className="module-content active" id="materials">
            <h2 className="page-title">Material Inventory</h2>
            <div className="card">
                <div className="card-header">
                    <div className="card-title">Current Stock</div>
                    <div>
                        <button className="btn btn-primary" onClick={onOpenRequestModal}><i className="fas fa-plus"></i> Request</button>
                        <button className="btn btn-primary" onClick={onOpenAddModal} style={{ marginLeft: '10px' }}><i className="fas fa-plus"></i> Add</button>
                    </div>
                </div>
                <table className="materials-table">
                    <thead><tr><th>Material</th><th>Category</th><th>Quantity</th><th>Unit</th><th>Status</th><th>Actions</th></tr></thead>
                    <tbody>
                        {materials.length === 0 ? (
                            <tr><td colSpan="6" style={{ textAlign: 'center', padding: '40px' }}><i className="fas fa-cubes" style={{ fontSize: '40px', color: '#bdc3c7' }}></i><h4>No Materials</h4></td></tr>
                        ) : (
                            materials.map(m => (
                                <tr key={m.id}><td>{m.name}</td><td>{m.category}</td><td>{m.quantity}</td><td>{m.unit}</td>
                                <td><span className={`status-badge status-${m.status}`}>{m.status}</span></td>
                                <td><button className="delete-task" onClick={() => onDeleteMaterial(m.id)}><i className="fas fa-trash"></i></button></td></tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
export default Materials;