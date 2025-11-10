import React from 'react';
import Header from '../Header';
import EmptyState from '../EmptyState';
// Charts
import PerformanceChart from '../charts/PerformanceChart';
import UtilizationChart from '../charts/UtilizationChart';
import TaskCompletionChart from '../charts/TaskCompletionChart';
import BudgetVsActualChart from '../charts/BudgetVsActualChart';

const AnalyticsModule = ({ userProfile, onOpenModal, onLogout, onNavigate, projects, employees, tasks, budgets }) => {
    return (
        <div className="module-container active" id="analytics-module">
            <Header title="Advanced Analytics" userProfile={userProfile} onOpenProfile={() => onOpenModal('profile')} onOpenSettings={() => onNavigate('settings')} onLogout={onLogout} />
            
            <div className="charts-grid">
                <div className="chart-card">
                    <div className="chart-header"><h3>Project Performance Trends</h3></div>
                    <div id="performanceChartContainer">
                        {projects.length === 0 ? <EmptyState icon="chart-line" title="No Performance Data" message="Add projects to see analytics" /> : <PerformanceChart projects={projects} />}
                    </div>
                </div>
                <div className="chart-card">
                    <div className="chart-header"><h3>Resource Utilization</h3></div>
                    <div id="utilizationChartContainer">
                         {employees.length === 0 ? <EmptyState icon="chart-bar" title="No Resource Data" message="Add employees to see utilization" /> : <UtilizationChart employees={employees} />}
                    </div>
                </div>
            </div>
            <div className="chart-row">
                <div className="chart-card">
                    <div className="chart-header"><h3>Task Completion Rate</h3></div>
                    <div id="taskCompletionChartContainer">
                         {tasks.length === 0 ? <EmptyState icon="chart-pie" title="No Task Data" message="Add tasks to see completion rates" /> : <TaskCompletionChart tasks={tasks} />}
                    </div>
                </div>
                <div className="chart-card">
                    <div className="chart-header"><h3>Budget vs Actual Spending</h3></div>
                    <div id="budgetVsActualChartContainer">
                         {budgets.length === 0 ? <EmptyState icon="chart-bar" title="No Budget Data" message="Add budget items to see comparison" /> : <BudgetVsActualChart budgets={budgets} />}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AnalyticsModule;