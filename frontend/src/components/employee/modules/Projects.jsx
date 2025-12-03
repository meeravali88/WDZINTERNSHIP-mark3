import React from 'react';

const Projects = ({ assignedProjects }) => {
    return (
        <div className="module-content active">
            <h2 className="page-title">My Projects</h2>

            <div className="card">
                <div className="card-header">
                    <div className="card-title">Assigned Projects</div>
                </div>

                {assignedProjects?.length > 0 ? (
                    <div className="projects-list">
                        {assignedProjects.map((p) => (
                            <div key={p.id} className="project-item">
                                <h4>{p.projectName}</h4>
                                <p>Assigned at: {new Date(p.assignedAt).toLocaleString()}</p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="no-projects">
                        <i className="fas fa-building"></i>
                        <h3>No Projects Assigned</h3>
                        <p>Your manager will assign projects to you.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Projects;
