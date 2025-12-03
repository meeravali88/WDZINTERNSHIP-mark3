import React from "react";

const ProjectCard = ({ project, onDeleteProject }) => {
    if (!project) return null;

    const projectName = project?.name || "Unnamed Project";
    const description = project?.description || "No description available";

    const status = project?.status || "ontrack";
    const progress = project?.progress || 0;

    const progressColor =
        status === "delayed"
            ? "var(--danger)"
            : status === "ontrack"
            ? "var(--success)"
            : "var(--warning)";

    const budget =
        project?.budget && !isNaN(project.budget)
            ? project.budget.toLocaleString()
            : "0";

    return (
        <div className="project-card">

            {project.approvalStatus === "approved" && project.requestedBy && (
                <div style={{ fontSize: "0.75rem", color: "var(--success)" }}>
                    <i className="fas fa-check-circle"></i> Approved Customer Request
                </div>
            )}

            <div className="project-header">
                <div>
                    <div className="project-title">{projectName}</div>
                    <div style={{ color: "var(--gray)", fontSize: "0.9rem" }}>
                        {description}
                    </div>
                </div>

                <span className={`status-badge status-${status}`}>
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                </span>
            </div>

            <div className="project-meta">
                <div className="meta-item">
                    <i className="fas fa-calendar"></i>
                    <span>
                        {project.startDate
                            ? new Date(project.startDate).toLocaleDateString()
                            : "Not set"}{" "}
                        –{" "}
                        {project.endDate
                            ? new Date(project.endDate).toLocaleDateString()
                            : "TBD"}
                    </span>
                </div>

                <div className="meta-item">
                    <i className="fas fa-users"></i>
                    <span>{project.teamSize || 0} members</span>
                </div>
            </div>

            <div className="progress-container">
                <div className="progress-label">
                    <span>Progress</span>
                    <span>{progress}%</span>
                </div>

                <div className="progress-bar">
                    <div
                        className="progress-fill"
                        style={{
                            width: `${progress}%`,
                            background: progressColor,
                        }}
                    ></div>
                </div>
            </div>

            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginTop: "15px",
                }}
            >
                <div style={{ fontWeight: 500 }}>
                    Budget: ${budget}
                </div>

                <div className="chart-actions">
                    <button className="chart-actions button">
                        <i className="fas fa-edit"></i>
                    </button>
                    <button
                        className="chart-actions button"
                        onClick={() => onDeleteProject(project.id)}
                    >
                        <i className="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProjectCard;
