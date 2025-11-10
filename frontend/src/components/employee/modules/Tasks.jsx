import React from 'react';

const Tasks = ({ tasks, onOpenAddTaskModal, onDeleteTask, onToggleTask }) => {
    return (
        <div className="module-content active" id="tasks">
            <h2 className="page-title">Task Management</h2>
            <div className="card">
                <div className="card-header">
                    <div className="card-title">My Tasks</div>
                    <button className="btn btn-primary" onClick={onOpenAddTaskModal}><i className="fas fa-plus"></i> Add New Task</button>
                </div>
                <ul className="task-list">
                    {tasks.length === 0 ? (
                        <li className="task-item"><div className="task-details" style={{ textAlign: 'center', width: '100%' }}><h4>No Tasks Available</h4><p>Add new tasks or wait for assignments.</p></div></li>
                    ) : (
                        tasks.map(task => (
                            <li className="task-item" key={task.id}>
                                <input type="checkbox" className="task-checkbox" checked={task.completed} onChange={() => onToggleTask(task.id)} />
                                <div className="task-details"><h4>{task.title}</h4><p>{task.description}</p>{task.project && <small><strong>Project:</strong> {task.project}</small>}</div>
                                <div className="task-actions"><span className={`task-priority priority-${task.priority}`}>{task.priority}</span>
                                <button className="delete-task" onClick={() => onDeleteTask(task.id)}><i className="fas fa-trash"></i></button></div>
                            </li>
                        ))
                    )}
                </ul>
            </div>
        </div>
    );
};
export default Tasks;