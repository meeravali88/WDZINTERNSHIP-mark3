import React, { useState, useMemo } from 'react';
import Header from '../Header';
import EmptyState from '../EmptyState';

const TaskItem = ({ task, onToggleTask }) => (
    <div className={`task-item ${task.status === 'completed' ? 'completed' : ''}`}>
        <div className="task-checkbox">
            <input 
                type="checkbox" 
                checked={task.status === 'completed'}
                onChange={() => onToggleTask(task.id)}
            />
        </div>
        <div className="task-content">
            <div className="task-title">{task.name}</div>
            <div className="task-meta">
                <span><i className="fas fa-project-diagram"></i> {task.projectName}</span>
                <span><i className="fas fa-user"></i> {task.assignee}</span>
                <span><i className="fas fa-calendar"></i> {new Date(task.dueDate).toLocaleDateString()}</span>
            </div>
        </div>
        <div>
            <span className={`priority-badge priority-${task.priority}`}>
                {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
            </span>
        </div>
    </div>
);

const TaskRow = ({ task, onDeleteTask }) => (
    <tr>
        <td>{task.name}</td>
        <td>{task.projectName}</td>
        <td>{task.assignee}</td>
        <td><span className={`priority-badge priority-${task.priority}`}>{task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}</span></td>
        <td>{new Date(task.dueDate).toLocaleDateString()}</td>
        <td><span className={`status-badge status-${task.status}`}>{task.status.charAt(0).toUpperCase() + task.status.slice(1)}</span></td>
        <td>
            <button className="chart-actions button"><i className="fas fa-edit"></i></button>
            <button className="chart-actions button" onClick={() => onDeleteTask(task.id)}><i className="fas fa-trash"></i></button>
        </td>
    </tr>
);

const TasksModule = ({ userProfile, onOpenModal, onLogout, onNavigate, tasks, onDeleteTask, onToggleTask }) => {
    const [activeFilter, setActiveFilter] = useState('all');

    const filteredTasks = useMemo(() => {
        const now = new Date();
        switch (activeFilter) {
            // case 'my-tasks':
            //     return tasks.filter(task => task.assignee === userProfile.name); // Assumes assignee name matches profile name
            case 'overdue':
                return tasks.filter(task => new Date(task.dueDate) < now && task.status !== 'completed');
            case 'completed':
                return tasks.filter(task => task.status === 'completed');
            case 'all':
            default:
                return tasks;
        }
    }, [tasks, activeFilter, userProfile.name]);

    const getEmptyState = () => {
        switch (activeFilter) {
            // case 'my-tasks': return { icon: 'user', title: 'No Tasks Assigned to You', msg: 'Tasks assigned to you will appear here' };
            case 'overdue': return { icon: 'exclamation-triangle', title: 'No Overdue Tasks', msg: 'Great job! All tasks are on schedule' };
            case 'completed': return { icon: 'check-circle', title: 'No Completed Tasks', msg: 'Completed tasks will appear here' };
            case 'all':
            default: return { icon: 'tasks', title: 'No Tasks Yet', msg: 'Create your first task to get started' };
        }
    };
    
    const emptyState = getEmptyState();

    return (
        <div className="module-container active" id="tasks-module">
            {/* <Header
                title="Task Management"
                userProfile={userProfile}
                onOpenProfile={() => onOpenModal('profile')}
                onOpenSettings={() => onNavigate('settings')}
                onLogout={onLogout}
            /> */}
            <div className="user-info" style={{ marginBottom: '20px', justifyContent: 'flex-end' }}>
                <button className="btn btn-primary" onClick={() => onOpenModal('task')}>
                    <i className="fas fa-plus"></i> New Task
                </button>
            </div>

            <div className="tasks-container">
                <div className="tasks-header">
                    <h3>Active Tasks</h3>
                    <div className="tasks-filter">
                        <button className={`filter-btn ${activeFilter === 'all' ? 'active' : ''}`} onClick={() => setActiveFilter('all')}>All Tasks</button>
                        {/* <button className={`filter-btn ${activeFilter === 'my-tasks' ? 'active' : ''}`} onClick={() => setActiveFilter('my-tasks')}>My Tasks</button> */}
                        <button className={`filter-btn ${activeFilter === 'overdue' ? 'active' : ''}`} onClick={() => setActiveFilter('overdue')}>Overdue</button>
                        <button className={`filter-btn ${activeFilter === 'completed' ? 'active' : ''}`} onClick={() => setActiveFilter('completed')}>Completed</button>
                    </div>
                </div>
                
                <div className="task-filter-section active">
                    <div className="tasks-list">
                        {filteredTasks.length === 0 ? (
                            <EmptyState
                                icon={emptyState.icon}
                                title={emptyState.title}
                                message={emptyState.msg}
                                buttonText={activeFilter === 'all' ? 'Create Task' : null}
                                onButtonClick={() => onOpenModal('task')}
                            />
                        ) : (
                            filteredTasks.map(task => (
                                <TaskItem key={task.id} task={task} onToggleTask={onToggleTask} />
                            ))
                        )}
                    </div>
                </div>
            </div>

            <div className="data-table">
                <div className="table-header"><h3>Task Overview</h3></div>
                <table>
                    <thead>
                        <tr><th>Task Name</th><th>Project</th><th>Assigned To</th><th>Priority</th><th>Due Date</th><th>Status</th><th>Actions</th></tr>
                    </thead>
                    <tbody id="tasksTableBody">
                        {tasks.length === 0 ? (
                            <tr>
                                <td colSpan="7" style={{ textAlign: 'center', padding: '40px' }}>
                                    <EmptyState icon="tasks" title="No Tasks" message="Create your first task to get started" />
                                </td>
                            </tr>
                        ) : (
                            tasks.map(task => (
                                <TaskRow key={task.id} task={task} onDeleteTask={onDeleteTask} />
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TasksModule;