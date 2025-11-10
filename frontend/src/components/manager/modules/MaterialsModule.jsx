import React, { useState } from 'react';
import Header from '../Header';
import KpiCard from '../KpiCard';
import EmptyState from '../EmptyState';

const MaterialsModule = ({ userProfile, onOpenModal, onLogout, onNavigate, kpiData, materials, materialTransactions, onOpenTransactionModal }) => {
    const [activeTab, setActiveTab] = useState('stock'); // 'stock' or 'history'

    return (
        <div className="module-container active" id="materials-module">
            <Header title="Material Management" userProfile={userProfile} onOpenProfile={() => onOpenModal('profile')} onOpenSettings={() => onNavigate('settings')} onLogout={onLogout} />
            
            <div className="user-info" style={{ marginBottom: '20px', justifyContent: 'flex-end', gap: '10px' }}>
                 <button className="btn btn-warning" onClick={onOpenTransactionModal} disabled={materials.length === 0}>
                    <i className="fas fa-exchange-alt"></i> Record Transaction
                </button>
                <button className="btn btn-primary" onClick={() => onOpenModal('material')}>
                    <i className="fas fa-plus"></i> New Material
                </button>
            </div>

            <div className="kpi-cards">
                <KpiCard title="Total Materials" value={kpiData.totalMaterials} />
                <KpiCard title="Low Stock" value={kpiData.lowStock} cardType={kpiData.lowStock > 0 ? 'danger' : ''} />
                <KpiCard title="Inventory Value" value={`$${kpiData.inventoryValue.toLocaleString()}`} />
                <KpiCard title="Transactions" value={materialTransactions ? materialTransactions.length : 0} />
            </div>

            {/* TABS for switching views */}
            <div className="tasks-header" style={{ marginBottom: '15px' }}>
                <div className="tasks-filter">
                    <button className={`filter-btn ${activeTab === 'stock' ? 'active' : ''}`} onClick={() => setActiveTab('stock')}>Current Stock</button>
                    <button className={`filter-btn ${activeTab === 'history' ? 'active' : ''}`} onClick={() => setActiveTab('history')}>Transaction History</button>
                </div>
            </div>

            <div className="data-table">
                <div className="table-header">
                    <h3>{activeTab === 'stock' ? 'Material Inventory' : 'Movement History'}</h3>
                </div>
                
                {activeTab === 'stock' ? (
                    // --- STOCK VIEW ---
                    <table>
                        <thead>
                            <tr><th>Material</th><th>Category</th><th>Current Stock</th><th>Minimum Stock</th><th>Unit Price</th><th>Total Value</th><th>Status</th></tr>
                        </thead>
                        <tbody>
                            {materials.length === 0 ? (
                                <tr><td colSpan="7"><EmptyState icon="boxes" title="No Materials" message="Add your first material to get started" /></td></tr>
                            ) : (
                                materials.map(material => {
                                    const status = material.quantity <= material.minimumStock ? 'delayed' : 'active';
                                    return (
                                        <tr key={material.id}>
                                            <td>{material.name}</td>
                                            <td>{material.category.charAt(0).toUpperCase() + material.category.slice(1)}</td>
                                            <td><strong>{material.quantity}</strong> {material.unit}</td>
                                            <td>{material.minimumStock} {material.unit}</td>
                                            <td>${material.unitPrice.toLocaleString()}/{material.unit}</td>
                                            <td>${material.totalValue.toLocaleString()}</td>
                                            <td><span className={`status-badge status-${status}`}>{status === 'delayed' ? 'Low Stock' : 'In Stock'}</span></td>
                                        </tr>
                                    );
                                })
                            )}
                        </tbody>
                    </table>
                ) : (
                    // --- HISTORY VIEW ---
                    <table>
                         <thead>
                            <tr><th>Date</th><th>Type</th><th>Material</th><th>Quantity</th><th>Project/Source</th><th>Performed By</th></tr>
                        </thead>
                        <tbody>
                             {(!materialTransactions || materialTransactions.length === 0) ? (
                                <tr><td colSpan="6"><EmptyState icon="history" title="No Transactions" message="Record material movements to see history" /></td></tr>
                            ) : (
                                materialTransactions.map(trx => (
                                    <tr key={trx.id}>
                                        <td>{new Date(trx.date).toLocaleDateString()} {new Date(trx.date).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</td>
                                        <td>
                                            <span className={`status-badge status-${trx.type === 'in' ? 'approved' : 'planning'}`}>
                                                {trx.type === 'in' ? 'CHECK IN' : 'CHECK OUT'}
                                            </span>
                                        </td>
                                        <td>{trx.materialName}</td>
                                        <td style={{ fontWeight: 'bold', color: trx.type === 'in' ? 'var(--success)' : 'var(--danger)' }}>
                                            {trx.type === 'in' ? '+' : '-'}{trx.quantity} {trx.unit}
                                        </td>
                                        <td>{trx.projectName}</td>
                                        <td>{trx.performedBy}</td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default MaterialsModule;