import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/CustomerDashboard.css"; // ✅ Import CSS

const CustomerDashboard = ({ user, onLogout }) => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    budget: "",
  });

  // ✅ Load customer’s existing projects
  useEffect(() => {
    const allProjects = JSON.parse(localStorage.getItem("builderp_projects")) || [];
    setProjects(allProjects.filter((p) => p.requestedBy === user.email));
  }, [user.email]);

  /**
   * ✅ NEW: Save Customer Request for Manager Approvals
   */
  const handleNewRequest = (projectData) => {
    const requests = JSON.parse(localStorage.getItem("customerRequests")) || [];

    const newRequest = {
      id: Date.now(),
      customerName: user.name,
      customerEmail: user.email,
      details: `Project: ${projectData.name}, Budget: $${projectData.budget}, Description: ${projectData.description}`,
      status: "Pending",
      submittedAt: new Date().toLocaleString(),
    };

    requests.push(newRequest);
    localStorage.setItem("customerRequests", JSON.stringify(requests));
    window.dispatchEvent(new Event("storage"));

  };

  /**
   * ✅ Handle new project request form submit
   */
  const handleRequestProject = (e) => {
    e.preventDefault();

    const newProject = {
      id: Date.now().toString(),
      name: formData.name.trim(),
      description: formData.description.trim(),
      budget: parseFloat(formData.budget),
      startDate: new Date().toISOString().split("T")[0],
      endDate: "",
      status: "planning",
      approvalStatus: "pending",
      progress: 0,
      requestedBy: user.email, // Link to logged-in customer
      teamSize: 0,
    };

    const allProjects = JSON.parse(localStorage.getItem("builderp_projects")) || [];
    const updatedProjects = [...allProjects, newProject];
    localStorage.setItem("builderp_projects", JSON.stringify(updatedProjects));

    // ✅ Update state for this customer’s list
    setProjects(updatedProjects.filter((p) => p.requestedBy === user.email));

    // ✅ Also save in manager approvals queue
    handleNewRequest(newProject);

    // ✅ Reset form
    setShowModal(false);
    setFormData({ name: "", description: "", budget: "" });

    alert("✅ Project requested successfully! Waiting for manager approval.");
  };

  // ✅ Logout
  const handleLogout = () => {
    onLogout();
    navigate("/");
  };

  return (
    <div className="customer-dashboard">
      {/* --- HEADER --- */}
      <header className="customer-header">
        <h1>Hello, {user.name || "Customer"}</h1>
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </header>

      {/* --- REQUEST SECTION --- */}
      <div className="request-section">
        <button className="request-btn" onClick={() => setShowModal(true)}>
          <i className="fas fa-plus-circle"></i> Request New Project
        </button>
      </div>

      {/* --- PROJECT LIST --- */}
      <h2>Your Project Requests</h2>
      <div className="project-list">
        {projects.length === 0 ? (
          <p style={{ color: "#7f8c8d", fontSize: "1.1rem" }}>
            You haven’t requested any projects yet.
          </p>
        ) : (
          projects.map((p) => (
            <div key={p.id} className="project-card">
              <div className="project-card-header">
                <h3>{p.name}</h3>
                <span
                  className={`status-badge ${
                    p.approvalStatus === "approved"
                      ? "status-approved"
                      : p.approvalStatus === "declined"
                      ? "status-declined"
                      : "status-pending"
                  }`}
                >
                  {p.approvalStatus.toUpperCase()}
                </span>
              </div>
              <p>{p.description}</p>
              <p>
                <strong>Proposed Budget:</strong> ${p.budget.toLocaleString()}
              </p>
              <p>
                <strong>Status:</strong>{" "}
                {p.status.charAt(0).toUpperCase() + p.status.slice(1)}
              </p>
            </div>
          ))
        )}
      </div>

      {/* --- MODAL --- */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h2>Request a New Project</h2>
            <form onSubmit={handleRequestProject}>
              <div>
                <label>Project Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  required
                />
              </div>
              <div>
                <label>Description</label>
                <textarea
                  rows="3"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  required
                ></textarea>
              </div>
              <div>
                <label>Estimated Budget</label>
                <input
                  type="number"
                  value={formData.budget}
                  onChange={(e) =>
                    setFormData({ ...formData, budget: e.target.value })
                  }
                  required
                />
              </div>

              <div className="modal-actions">
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="submit-btn">
                  Submit Request
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerDashboard;
