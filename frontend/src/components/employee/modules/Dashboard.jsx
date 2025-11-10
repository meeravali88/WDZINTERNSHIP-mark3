import React from 'react';

const Dashboard = ({ stats, recentActivities, onDeleteActivity, onResetDashboard, onQuickTask, onQuickMaterial, onQuickRequest, onQuickHelp }) => {
    return (
        <div className="module-content active" id="dashboard">
            <h2 className="page-title">Dashboard Overview</h2>
            <div className="dashboard-grid">
                <div className="card">
                    <div className="card-header"><div className="card-title">Project Progress</div><div className="card-icon icon-blue"><i className="fas fa-chart-bar"></i></div></div>
                    <div className="stats">{stats.projectProgress}%</div><div className="stats-desc">Overall Project Completion</div>
                    <div className="progress-bar"><div className="progress progress-blue" style={{ width: `${stats.projectProgress}%` }}></div></div>
                </div>
                <div className="card">
                    <div className="card-header"><div className="card-title">Tasks Completed</div><div className="card-icon icon-green"><i className="fas fa-tasks"></i></div></div>
                    <div className="stats">{stats.tasksCompleted}/{stats.totalTasks}</div><div className="stats-desc">Tasks Completed This Month</div>
                    <div className="progress-bar"><div className="progress progress-green" style={{ width: `0%` }}></div></div>
                </div>
                <div className="card">
                    <div className="card-header"><div className="card-title">Materials Used</div><div className="card-icon icon-purple"><i className="fas fa-cubes"></i></div></div>
                    <div className="stats">{stats.materialsUsed}%</div><div className="stats-desc">Of Allocated Materials Used</div>
                    <div className="progress-bar"><div className="progress progress-purple" style={{ width: `${stats.materialsUsed}%` }}></div></div>
                </div>
                <div className="card">
                    <div className="card-header"><div className="card-title">Team Performance</div><div className="card-icon icon-orange"><i className="fas fa-users"></i></div></div>
                    <div className="stats">{stats.teamPerformance}%</div><div className="stats-desc">Positive Feedback Received</div>
                    <div className="progress-bar"><div className="progress progress-orange" style={{ width: `${stats.teamPerformance}%` }}></div></div>
                </div>
            </div>
            <div className="card">
                <div className="card-header"><div className="card-title">Quick Actions</div></div>
                <div className="quick-actions">
                    <div className="quick-action" onClick={onQuickTask}><i className="fas fa-plus-circle"></i><h3>Add Task</h3><p>Create a new task</p></div>
                    <div className="quick-action" onClick={onQuickMaterial}><i className="fas fa-cubes"></i><h3>Request Materials</h3><p>Request construction materials</p></div>
                    <div className="quick-action" onClick={onQuickRequest}><i className="fas fa-clipboard-list"></i><h3>New Request</h3><p>Submit a new request</p></div>
                    <div className="quick-action" onClick={onQuickHelp}><i className="fas fa-question-circle"></i><h3>Get Help</h3><p>Contact support</p></div>
                </div>
            </div>
            <div className="card" style={{ marginTop: '25px' }}>
                <div c
                lassName="card-header"><div className="card-title">My Assigned Projects</div></div>
                <div className="no-projects"><i className="fas fa-inbox"></i><h3>No Projects Assigned</h3><p>Your manager will assign projects to you. They will appear here once assigned.</p></div>
            </div>
            <div className="card" style={{ marginTop: '25px' }}>
                <div className="card-header"><div className="card-title">Recent Activity</div></div>
                <ul className="task-list">
                    {recentActivities.length === 0 ? (
                        <li className="task-item"><div className="task-details" style={{ textAlign: 'center', width: '100%' }}><h4>No Recent Activity</h4><p>Your recent activities will appear here.</p></div></li>
                    ) : (
                        recentActivities.map(activity => (
                            <li className="task-item" key={activity.id}>
                                <div className="task-details"><h4>{activity.title}</h4><p>{activity.description}</p></div>
                                <div className="task-actions"><span className="task-priority priority-medium">{new Date(activity.timestamp).toLocaleDateString()}</span>
                                <button className="delete-activity" onClick={() => onDeleteActivity(activity.id)}><i className="fas fa-trash"></i></button></div>
                            </li>
                        ))
                    )}
                </ul>
            </div>
             <div className="card" style={{ marginTop: '25px', textAlign: 'center' }}>
                <button className="btn btn-reset" onClick={onResetDashboard}><i className="fas fa-redo"></i> Reset Dashboard Progress</button>
            </div>
        </div>
    );
};
export default Dashboard;