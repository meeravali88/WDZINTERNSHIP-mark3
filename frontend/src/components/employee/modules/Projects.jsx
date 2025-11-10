import React from 'react';

const Projects = () => {
    return (
        <div className="module-content active" id="projects">
            <h2 className="page-title">My Projects</h2>
            <div className="card">
                <div className="card-header"><div className="card-title">Assigned Projects</div></div>
                <div className="no-projects">
                    <i className="fas fa-building"></i><h3>No Projects Assigned</h3>
                    <p>Your manager will assign projects to you from the manager dashboard.</p>
                </div>
            </div>
        </div>
    );
};
export default Projects;