import React from 'react';
import Header from '../Header';
import KpiCard from '../KpiCard';
import EmptyState from '../EmptyState';

const ApprovalsModule = ({ userProfile, onOpenModal, onLogout, onNavigate, kpiData, approvals, onApprovalAction }) => {
    return (
        <div className="module-container active" id="approvals-module">
            <Header title="Approval Workflow" userProfile={userProfile} onOpenProfile={() => onOpenModal('profile')} onOpenSettings={() => onNavigate('settings')} onLogout={onLogout} />
            <div className="user-info" style={{ marginBottom: '20px', justifyContent: 'flex-end' }}>
                <button className="btn btn-primary" onClick={() => onOpenModal('approval')}><i className="fas fa-plus"></i> New Request</button>
            </div>

            <div className="kpi-cards">
                <KpiCard title="Pending Approvals" value={kpiData.pendingApprovals} />
                <KpiCard title="Approved This Week" value={kpiData.approvedThisWeek} />
                <KpiCard title="Rejected" value={kpiData.rejectedCount} />
                <KpiCard title="Avg. Response Time" value="0 days" />
            </div>

            <div className="data-table">
                <div className="table-header"><h3>Pending Approvals</h3></div>
                <table>
                    <thead>
                        <tr><th>Request ID</th><th>Type</th><th>Project</th><th>Requested By</th><th>Amount</th><th>Date</th><th>Priority</th><th>Actions</th></tr>
                    </thead>
                    <tbody>
                        {approvals.filter(a => a.status === 'pending').length === 0 ? (
                            <tr><td colSpan="8"><EmptyState icon="file-signature" title="No Pending Approvals" message="All requests have been processed" /></td></tr>
                        ) : (
                            approvals.filter(a => a.status === 'pending').map(approval => (
                                <tr key={approval.id}>
                                    <td>{approval.id}</td>
                                    <td>{approval.type.charAt(0).toUpperCase() + approval.type.slice(1)} Request</td>
                                    <td>{approval.projectName}</td>
                                    <td>{approval.requestedBy}</td>
                                    <td>${approval.amount.toLocaleString()}</td>
                                    <td>{approval.date}</td>
                                    <td><span className={`priority-badge priority-${approval.priority}`}>{approval.priority.charAt(0).toUpperCase() + approval.priority.slice(1)}</span></td>
                                    <td>
                                        <button className="btn btn-success" style={{ padding: '5px 10px', fontSize: '0.8rem', marginRight: '5px' }} onClick={() => onApprovalAction(approval.id, 'approved')}>Approve</button>
                                        <button className="btn btn-danger" style={{ padding: '5px 10px', fontSize: '0.8rem' }} onClick={() => onApprovalAction(approval.id, 'rejected')}>Reject</button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ApprovalsModule;