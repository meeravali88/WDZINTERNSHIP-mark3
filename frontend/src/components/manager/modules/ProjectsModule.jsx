import React, { useState } from "react";
import Header from "../Header";
import EmptyState from "../EmptyState";
import ProjectCard from "../ProjectCard";

const PendingProjectCard = ({ project, onApprove, onDecline }) => {
    const firstLetter = project?.name?.charAt?.(0)?.toUpperCase?.() || "?";

    return (
        <div className="project-card planning" style={{ borderLeftColor: "#f39c12", background: "#fffaf0" }}>
            <div className="project-header">
                <div>
                    <span style={{ fontSize: "0.8rem", fontWeight: "bold", color: "#f39c12" }}>
                        REQUESTED BY CUSTOMER
                    </span>
                    <div className="project-title">{firstLetter}</div>
                </div>
                <span className="status-badge status-pending">PENDING APPROVAL</span>
            </div>

            <p>{project?.description || "No description"}</p>

            <div style={{ fontWeight: 500, marginBottom: "15px" }}>
                Proposed Budget: ${project?.budget?.toLocaleString?.() || "0"}
            </div>

            <div style={{ display: "flex", gap: "10px" }}>
                <button onClick={() => onApprove(project.id)} className="btn btn-success" style={{ flex: 1 }}>
                    <i className="fas fa-check"></i> Approve
                </button>
                <button onClick={() => onDecline(project.id)} className="btn btn-danger" style={{ flex: 1 }}>
                    <i className="fas fa-times"></i> Decline
                </button>
            </div>
        </div>
    );
};

const ProjectsModule = ({
    userProfile,
    onOpenModal,
    onLogout,
    onNavigate,
    projects,
    employees,
    onDeleteProject,
    onApproveProject,
    onDeclineProject,

    // new handler from ManagerDashboard
    onAssignProjectToEmployees,
}) => {
    const safeProjects = Array.isArray(projects) ? projects : [];
    const safeEmployees = Array.isArray(employees) ? employees : [];

    const pendingProjects = safeProjects.filter((p) => p.approvalStatus === "pending");
    const activeProjects = safeProjects.filter(
        (p) => p.approvalStatus !== "pending" && p.approvalStatus !== "declined"
    );

    const [selectedProjectId, setSelectedProjectId] = useState("");
    const [selectedEmployees, setSelectedEmployees] = useState([]);

    const toggleEmployee = (id) => {
        setSelectedEmployees((prev) =>
            prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
        );
    };

    const assignNow = () => {
        if (!selectedProjectId || selectedEmployees.length === 0) {
            alert("Select a project and at least one employee.");
            return;
        }
        onAssignProjectToEmployees(selectedProjectId, selectedEmployees);
        setSelectedEmployees([]);
    };

    return (
        <div className="module-container active">

            <Header
                title="Project Management"
                userProfile={userProfile}
                onOpenProfile={() => onOpenModal("profile")}
                onOpenSettings={() => onNavigate("settings")}
                onLogout={onLogout}
            />

            {/* ASSIGN PROJECT SECTION */}
            <div className="card" style={{ padding: "20px", marginBottom: "25px" }}>
                <h3 style={{ marginBottom: "15px" }}>
                    <i className="fas fa-tasks"></i> Assign Project to Employees
                </h3>

                {/* Project dropdown */}
                <select
                    className="form-control"
                    value={selectedProjectId}
                    onChange={(e) => setSelectedProjectId(e.target.value)}
                    style={{ marginBottom: "15px" }}
                >
                    <option value="">-- Select Project --</option>
                    {activeProjects.map((proj) => (
                        <option key={proj.id} value={proj.id}>{proj.name}</option>
                    ))}
                </select>

                {/* Employee selection */}
                <div className="employee-select-grid">
                    {safeEmployees.map((emp) => (
                        <label key={emp.id} className="employee-select-item">
                            <input
                                type="checkbox"
                                checked={selectedEmployees.includes(emp.id)}
                                onChange={() => toggleEmployee(emp.id)}
                            />
                            {emp.name} ({emp.position})
                        </label>
                    ))}
                </div>

                <button className="btn btn-success" disabled={!selectedProjectId} onClick={assignNow}>
                    <i className="fas fa-check"></i> Assign Selected Employees
                </button>
            </div>

            {/* PENDING PROJECTS */}
            {pendingProjects.length > 0 && (
                <div style={{ marginBottom: "40px" }}>
                    <h3 style={{ color: "#f39c12", marginBottom: "15px" }}>
                        Pending Customer Requests ({pendingProjects.length})
                    </h3>

                    <div className="projects-grid">
                        {pendingProjects.map((project) => (
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

            <h3 style={{ marginBottom: "15px" }}>Active Projects</h3>

            <div className="projects-grid">
                {activeProjects.length === 0 ? (
                    <EmptyState
                        icon="project-diagram"
                        title="No Active Projects"
                        message="Create a project or approve a request to get started"
                        buttonText="Create Project"
                        onButtonClick={() => onOpenModal("project")}
                    />
                ) : (
                    activeProjects.map((project) => (
                        <ProjectCard
                            key={project.id}
                            project={project}
                            onDeleteProject={onDeleteProject}
                        />
                    ))
                )}
            </div>
        </div>
    );
};

export default ProjectsModule;
