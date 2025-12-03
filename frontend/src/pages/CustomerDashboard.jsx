import React, { useState, useEffect } from "react";
import "../styles/CustomerDashboard.css";

const CustomerDashboard = ({ user, onLogout }) => {
  const [projects, setProjects] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    budget: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    budget: "",
  });

  useEffect(() => {
    const all = JSON.parse(localStorage.getItem("builderp_projects")) || [];
    setProjects(all.filter((p) => p.requestedBy === user.email));
  }, [user.email]);

  const saveCustomerRequest = (projectData) => {
    const req = JSON.parse(localStorage.getItem("customerRequests")) || [];

    req.push({
      id: Date.now(),
      customerName: user.name,
      customerEmail: user.email,
      details: `Project: ${projectData.name}, Budget: ₹${projectData.budget}, Description: ${projectData.description}`,
      status: "Pending",
      submittedAt: new Date().toLocaleString(),
    });

    localStorage.setItem("customerRequests", JSON.stringify(req));
    window.dispatchEvent(new Event("storage"));
  };

  // VALIDATION LOGIC
  const validateForm = () => {
    let valid = true;
    let newErrors = { name: "", budget: "" };
    const nameRegex = /^[A-Za-z ]{3,40}$/;

    if (!nameRegex.test(formData.name.trim())) {
      newErrors.name = "Project name must contain only letters & spaces (3–40 characters).";
      valid = false;
    }
    const budgetValue = Number(formData.budget);

    if (isNaN(budgetValue) || budgetValue <= 0) {
      newErrors.budget = "Please enter a valid budget amount.";
      valid = false;
    } else if (budgetValue > 10000000) {
      newErrors.budget = "Budget must be below ₹1 Crore.";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const newProject = {
      id: Date.now().toString(),
      name: formData.name.trim(),
      description: formData.description,
      budget: Number(formData.budget),
      startDate: new Date().toISOString().split("T")[0],
      endDate: "",
      status: "Planning",
      approvalStatus: "pending",
      progress: 0,
      requestedBy: user.email,
    };

    const all = JSON.parse(localStorage.getItem("builderp_projects")) || [];
    const updated = [...all, newProject];

    localStorage.setItem("builderp_projects", JSON.stringify(updated));
    setProjects(updated.filter((p) => p.requestedBy === user.email));

    saveCustomerRequest(newProject);

    alert("Project request submitted!");

    setFormData({ name: "", description: "", budget: "" });
    setShowModal(false);
    setErrors({ name: "", budget: "" });
  };

  return (
    <div className="customer-dashboard">
      <header className="dashboard-header">
        <div>
          <h1>Welcome, {user.name}</h1>
          <p className="tagline">
            A simple and easy place to manage your project requests.
          </p>
        </div>

        <button onClick={onLogout} className="logout-btn">
          Logout
        </button>
      </header>
      <div className="features-guide">
        <h2 className="guide-title">How to Request Your Project?</h2>

        <div className="features-grid">
          <div className="feature-box">
            <span className="icon">📝</span>
            <h3>Enter Details</h3>
            <p>Provide a clear name and description of your project idea.</p>
          </div>

          <div className="feature-box">
            <span className="icon">💰</span>
            <h3>Set a Budget</h3>
            <p>Give an approximate budget that suits your work requirement.</p>
          </div>

          <div className="feature-box">
            <span className="icon">📨</span>
            <h3>Submit Request</h3>
            <p>Your request will be sent to managers for approval.</p>
          </div>

          <div className="feature-box">
            <span className="icon">📊</span>
            <h3>Track Status</h3>
            <p>Check approval or progress anytime from your dashboard.</p>
          </div>
        </div>
      </div>
      <div className="request-btn-wrapper">
        <button className="new-project-btn" onClick={() => setShowModal(true)}>
          + Submit a New Project Request
        </button>
      </div>
      <h2 className="section-title">Your Project Requests</h2>
      <div className="project-grid">
        {projects.length === 0 ? (
          <p className="empty-text">No requests yet. Start by creating one!</p>
        ) : (
          projects.map((p) => (
            <div key={p.id} className="project-card">
              <div className="project-header">
                <h3>{p.name}</h3>
                <span
                  className={`status-badge ${
                    p.approvalStatus === "approved"
                      ? "approved"
                      : p.approvalStatus === "declined"
                      ? "declined"
                      : "pending"
                  }`}
                >
                  {p.approvalStatus.toUpperCase()}
                </span>
              </div>

              <p><strong>Budget:</strong> ₹{p.budget.toLocaleString()}</p>
              <p><strong>Description:</strong> {p.description}</p>
              <p><strong>Status:</strong> {p.status}</p>
            </div>
          ))
        )}
      </div>
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h2>Request New Project</h2>
            <form onSubmit={handleSubmit}>
              <label>Project Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
              />
              {errors.name && <p className="error-text">{errors.name}</p>}
              <label>Description</label>
              <textarea
                rows="3"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                required
              ></textarea>
              <label>Estimated Budget (₹)</label>
              <input
                type="number"
                value={formData.budget}
                onChange={(e) =>
                  setFormData({ ...formData, budget: e.target.value })
                }
                required
              />
              {errors.budget && <p className="error-text">{errors.budget}</p>}
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
