import React from 'react';
import Header from '../Header';
import KpiCard from '../KpiCard';
import EmptyState from '../EmptyState';

const BudgetRow = ({ budget }) => {
    const remaining = budget.amount - budget.spent;
    const utilization = budget.amount > 0 ? (budget.spent / budget.amount) * 100 : 0;
    let progressColor = 'success';
    if (utilization > 90) progressColor = 'danger';
    else if (utilization > 70) progressColor = 'warning';

    return (
        <tr>
            <td>{budget.projectName}</td>
            <td>${budget.amount.toLocaleString()}</td>
            <td>${budget.spent.toLocaleString()}</td>
            <td>${remaining.toLocaleString()}</td>
            <td>
                <div className="progress-container">
                    <div className="progress-bar">
                        <div className="progress-fill" style={{ width: `${utilization}%`, background: `var(--${progressColor})` }}></div>
                    </div>
                    <div className="progress-label" style={{ justifyContent: 'center' }}><span>{Math.round(utilization)}%</span></div>
                </div>
            </td>
            <td><span className={`status-badge status-${budget.status}`}>{budget.status.charAt(0).toUpperCase() + budget.status.slice(1)}</span></td>
        </tr>
    );
};

const BudgetModule = ({ userProfile, onOpenModal, onLogout, onNavigate, kpiData, budgets }) => {
    return (
        <div className="module-container active" id="budget-module">
            {/* <Header title="Budget Management" userProfile={userProfile} onOpenProfile={() => onOpenModal('profile')} onOpenSettings={() => onNavigate('settings')} onLogout={onLogout} /> */}
            <div className="user-info" style={{ marginBottom: '20px', justifyContent: 'flex-end' }}>
                <button className="btn btn-primary" onClick={() => onOpenModal('budget')}><i className="fas fa-plus"></i> New Budget</button>
            </div>

            <div className="kpi-cards">
                <KpiCard title="Total Budget" value={`$${kpiData.totalBudget.toLocaleString()}`} />
                <KpiCard title="Total Spent" value={`$${kpiData.totalSpent.toLocaleString()}`} />
                <KpiCard title="Remaining" value={`$${kpiData.remainingBudget.toLocaleString()}`} />
                <KpiCard title="Utilization Rate" value={`${kpiData.utilizationRate}%`} />
            </div>

            <div className="data-table">
                <div className="table-header"><h3>Budget Allocation by Project</h3></div>
                <table>
                    <thead>
                        <tr><th>Project</th><th>Allocated Budget</th><th>Spent</th><th>Remaining</th><th>Utilization</th><th>Status</th></tr>
                    </thead>
                    <tbody id="budgetTableBody">
                        {budgets.length === 0 ? (
                            <tr><td colSpan="6"><EmptyState icon="money-bill-wave" title="No Budget Data" message="Create your first budget to get started" /></td></tr>
                        ) : (
                            budgets.map(budget => <BudgetRow key={budget.id} budget={budget} />)
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default BudgetModule;