import React from 'react';
import Header from '../Header';
import EmptyState from '../EmptyState';

// --- COMPONENTS ---
const PendingProjectCard = ({ project, onApprove, onDecline }) => (
    <div className="project-card planning" style={{ borderLeftColor: '#f39c12', background: '#fffaf0' }}>
        <div className="project-header">
             <div>
                <span style={{ fontSize: '0.8rem', fontWeight: 'bold', color: '#f39c12' }}>REQUESTED BY CUSTOMER</span>
                <div className="project-title">{project.name}</div>
             </div>
             <span className="status-badge status-pending">PENDING APPROVAL</span>
        </div>
        <p>{project.description}</p>
        <div style={{ fontWeight: 500, marginBottom: '15px' }}>Proposed Budget: ${project.budget.toLocaleString()}</div>
        <div style={{ display: 'flex', gap: '10px' }}>
            <button onClick={() => onApprove(project.id)} className="btn btn-success" style={{ flex: 1, justifyContent: 'center' }}>
                <i className="fas fa-check"></i> Approve
            </button>
            <button onClick={() => onDecline(project.id)} className="btn btn-danger" style={{ flex: 1, justifyContent: 'center' }}>
                <i className="fas fa-times"></i> Decline
            </button>
        </div>
    </div>
);

const ProjectCard = ({ project, onDeleteProject }) => (
    <div className={`project-card ${project.status}`}>
        {project.approvalStatus === 'approved' && project.requestedBy && (
           <div style={{fontSize: '0.75rem', color: 'var(--success)', marginBottom: '5px'}}>
               <i className="fas fa-check-circle"></i> Approved Customer Request
           </div>
        )}
        <div className="project-header">
            <div>
                <div className="project-title">{project.name}</div>
                <div style={{ color: 'var(--gray)', fontSize: '0.9rem' }}>{project.description}</div>
            </div>
            <span className={`status-badge status-${project.status}`}>
                {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
            </span>
        </div>
        <div className="project-meta">
            <div className="meta-item"><i className="fas fa-calendar"></i><span>{new Date(project.startDate).toLocaleDateString()} - {project.endDate ? new Date(project.endDate).toLocaleDateString() : 'TBD'}</span></div>
            <div className="meta-item"><i className="fas fa-users"></i><span>{project.teamSize} members</span></div>
        </div>
        <div className="progress-container">
            <div className="progress-label"><span>Progress</span><span>{project.progress}%</span></div>
            <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${project.progress}%`, background: `var(--${project.status === 'delayed' ? 'danger' : project.status === 'ontrack' ? 'success' : 'warning'})` }}></div>
            </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '15px' }}>
            <div style={{ fontWeight: 500 }}>Budget: ${project.budget.toLocaleString()}</div>
            <div className="chart-actions">
                <button className="chart-actions button"><i className="fas fa-edit"></i></button>
                <button className="chart-actions button" onClick={() => onDeleteProject(project.id)}><i className="fas fa-trash"></i></button>
            </div>
        </div>
    </div>
);

// --- MAIN MODULE COMPONENT ---
const ProjectsModule = ({ userProfile, onOpenModal, onLogout, onNavigate, projects, onDeleteProject, onApproveProject, onDeclineProject }) => {
    // Ensure we have arrays even if data is missing
    const safeProjects = projects || [];
    const pendingProjects = safeProjects.filter(p => p.approvalStatus === 'pending');
    // Active projects are those that are NOT pending AND NOT declined.
    // We also include projects that have NO approvalStatus (legacy data support)
    const activeProjects = safeProjects.filter(p => p.approvalStatus !== 'pending' && p.approvalStatus !== 'declined');

    return (
        <div className="module-container active" id="projects-module">
            <Header
                title="Project Management"
                userProfile={userProfile}
                onOpenProfile={() => onOpenModal('profile')}
                onOpenSettings={() => onNavigate('settings')}
                onLogout={onLogout}
            />
            <div className="user-info" style={{ marginBottom: '20px', justifyContent: 'flex-end' }}>
                <button className="btn btn-primary" onClick={() => onOpenModal('project')}>
                    <i className="fas fa-plus"></i> New Project
                </button>
            </div>

            {/* PENDING APPROVALS SECTION */}
            {pendingProjects.length > 0 && (
                <div style={{ marginBottom: '40px' }}>
                    <h3 style={{ color: '#f39c12', marginBottom: '15px', borderBottom: '2px solid #f39c12', paddingBottom: '10px' }}>
                        <i className="fas fa-exclamation-circle"></i> Pending Customer Requests ({pendingProjects.length})
                    </h3>
                    <div className="projects-grid">
                        {pendingProjects.map(project => (
                            <PendingProjectCard 
                                key={project.id} 
                                project={project} 
                                onApprove={onApproveProject} 
                                onDecline={onDeclineProject} 
                            />
                        ))}
                    </div>
                </div>
            )}

            {/* ACTIVE PROJECTS SECTION */}
            <h3 style={{ color: 'var(--dark)', marginBottom: '15px' }}>Active Projects</h3>
            <div className="projects-grid" id="projectsGrid">
                {activeProjects.length === 0 ? (
                    <EmptyState
                        icon="project-diagram"
                        title="No Active Projects"
                        message="Create a project or approve a request to get started"
                        buttonText={pendingProjects.length === 0 ? "Create Project" : null}
                        onButtonClick={() => onOpenModal('project')}
                    />
                ) : (
                    activeProjects.map(project => (
                        <ProjectCard key={project.id} project={project} onDeleteProject={onDeleteProject} />
                    ))
                )}
            </div>
        </div>
    );
};

export default ProjectsModule;