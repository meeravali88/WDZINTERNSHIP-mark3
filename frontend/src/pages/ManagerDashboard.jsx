import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/ManagerDashboard.css";
import Sidebar from "../components/manager/Sidebar";
import MainContent from "../components/manager/MainContent";
import Toast from "../components/manager/Toast";
import ProfileModal from "../components/manager/modals/ProfileModal";
import ProjectModal from "../components/manager/modals/ProjectModal";
import TaskModal from "../components/manager/modals/TaskModal";
import BudgetModal from "../components/manager/modals/BudgetModal";
import MaterialModal from "../components/manager/modals/MaterialModal";
import EmployeeModal from "../components/manager/modals/EmployeeModal";
import ApprovalModal from "../components/manager/modals/ApprovalModal";
import MaterialTransactionModal from "../components/manager/modals/MaterialTransactionModal";

// ✅ Utility function for safe localStorage loading
const loadData = (key, defaultValue = []) => {
  const saved = localStorage.getItem(`builderp_${key}`);
  return saved ? JSON.parse(saved) : defaultValue;
};

const defaultProfile = {
  name: "Project Manager",
  role: "Admin",
  email: "manager@builderp.com",
  phone: "+1 (555) 123-4567",
  department: "Construction Management",
  lastLogin: new Date().toLocaleString(),
};

function ManagerDashboard() {
  const navigate = useNavigate();

  // --- STATE ---
  const [projects, setProjects] = useState(() => loadData("projects"));
  const [tasks, setTasks] = useState(() => loadData("tasks"));
  const [budgets, setBudgets] = useState(() => loadData("budgets"));
  const [materials, setMaterials] = useState(() => loadData("materials"));
  const [employees, setEmployees] = useState(() => loadData("employees"));
  const [approvals, setApprovals] = useState(() => loadData("approvals"));
  const [materialTransactions, setMaterialTransactions] = useState(() =>
    loadData("materialTransactions")
  );
  const [userProfile, setUserProfile] = useState(() =>
    loadData("userProfile", defaultProfile)
  );
  const [customerRequests, setCustomerRequests] = useState([]);

  const [activeModule, setActiveModule] = useState("dashboard");
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isMobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const [modals, setModals] = useState({
    profile: false,
    project: false,
    task: false,
    budget: false,
    material: false,
    employee: false,
    approval: false,
    transaction: false,
  });

  const [toast, setToast] = useState({ show: false, message: "", isError: false });

  // --- DATA PERSISTENCE ---
  useEffect(() => {
    const dataMap = {
      projects,
      tasks,
      budgets,
      materials,
      employees,
      approvals,
      materialTransactions,
      userProfile,
    };
    Object.entries(dataMap).forEach(([key, value]) =>
      localStorage.setItem(`builderp_${key}`, JSON.stringify(value))
    );
  }, [
    projects,
    tasks,
    budgets,
    materials,
    employees,
    approvals,
    materialTransactions,
    userProfile,
  ]);

  // ✅ Load Customer Requests for "Approvals" tab
  useEffect(() => {
    if (activeModule === "approvals") {
      const saved = JSON.parse(localStorage.getItem("customerRequests")) || [];
      setCustomerRequests(saved);
    }
  }, [activeModule]);

  // ✅ Live Sync: Listen for updates from customer requests
  useEffect(() => {
    const handleStorageChange = (event) => {
      if (event.key === "customerRequests") {
        const updated = JSON.parse(localStorage.getItem("customerRequests")) || [];
        setCustomerRequests(updated);

        if (activeModule === "approvals") {
          showToast("📨 New customer request received!");
        }
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [activeModule]);

  // ✅ Approve / Reject Customer Requests
  const handleApprovalAction = (id, action) => {
    const updated = customerRequests.map((req) =>
      req.id === id
        ? { ...req, status: action === "approve" ? "Approved" : "Rejected" }
        : req
    );

    setCustomerRequests(updated);
    localStorage.setItem("customerRequests", JSON.stringify(updated));

    // 🔄 Sync with Customer’s Project List
    const allProjects = JSON.parse(localStorage.getItem("builderp_projects")) || [];
    const modified = allProjects.map((p) =>
      p.requestedBy === updated.find((r) => r.id === id)?.customerEmail
        ? { ...p, approvalStatus: action === "approve" ? "approved" : "declined" }
        : p
    );
    localStorage.setItem("builderp_projects", JSON.stringify(modified));
    setProjects(modified);
  };

  // --- KPI CALCULATION ---
  const kpiData = useMemo(() => {
    const activeProjects = projects.filter((p) => p.approvalStatus !== "pending");
    const totalProgress =
      activeProjects.length > 0
        ? activeProjects.reduce((sum, p) => sum + (p.progress || 0), 0) /
          activeProjects.length
        : 0;

    const totalBudget = budgets.reduce((sum, b) => sum + parseFloat(b.amount || 0), 0);
    const totalSpent = budgets.reduce((sum, b) => sum + parseFloat(b.spent || 0), 0);
    const budgetUtilization =
      totalBudget > 0 ? (totalSpent / totalBudget) * 100 : 0;

    const completedTasks = tasks.filter((t) => t.status === "completed").length;
    const taskCompletionRate =
      tasks.length > 0 ? (completedTasks / tasks.length) * 100 : 0;
    const pendingApprovals = approvals.filter((a) => a.status === "pending").length;

    return {
      overallProgress: Math.round(totalProgress),
      budgetUtilization: totalBudget,
      taskCompletion: Math.round(taskCompletionRate),
      pendingApprovals,
      totalBudget,
      totalSpent,
      remainingBudget: totalBudget - totalSpent,
      utilizationRate: Math.round(budgetUtilization),
      totalMaterials: materials.length,
      lowStock: materials.filter((m) => m.quantity <= m.minimumStock).length,
      inventoryValue: materials.reduce((sum, m) => sum + m.totalValue, 0),
      totalEmployees: employees.length,
      approvedThisWeek: approvals.filter((a) => a.status === "approved").length,
      rejectedCount: approvals.filter((a) => a.status === "rejected").length,
    };
  }, [projects, tasks, budgets, materials, employees, approvals]);

  // --- UTILITIES ---
  const showToast = (message, isError = false) => {
    setToast({ show: true, message, isError });
    setTimeout(() => setToast({ show: false, message: "", isError: false }), 2000);
  };

  const openModal = (modalName) =>
    setModals((prev) => ({ ...prev, [modalName]: true }));
  const closeModal = (modalName) =>
    setModals((prev) => ({ ...prev, [modalName]: false }));

  const handleNavigate = (moduleName) => {
    setActiveModule(moduleName);
    if (window.innerWidth <= 768) setMobileSidebarOpen(false);
  };

  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    showToast("✅ Logged out successfully!");
    setTimeout(() => navigate("/loginPage"), 800);
  };

  const handleResetData = () => {
    if (window.confirm("Are you sure you want to reset all data?")) {
      setProjects([]);
      setTasks([]);
      setBudgets([]);
      setMaterials([]);
      setEmployees([]);
      setApprovals([]);
      setMaterialTransactions([]);
      showToast("All data has been reset!");
    }
  };

  // --- APPROVALS TAB CONTENT ---
  const renderApprovalsContent = () => (
    <div className="approvals-section">
      <h2>Customer Requests</h2>
      {customerRequests.length === 0 ? (
        <p>No pending requests yet.</p>
      ) : (
        <table className="approvals-table">
          <thead>
            <tr>
              <th>Customer</th>
              <th>Email</th>
              <th>Details</th>
              <th>Submitted</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {customerRequests.map((req) => (
              <tr key={req.id}>
                <td>{req.customerName}</td>
                <td>{req.customerEmail}</td>
                <td>{req.details}</td>
                <td>{req.submittedAt}</td>
                <td
                  style={{
                    color:
                      req.status === "Approved"
                        ? "green"
                        : req.status === "Rejected"
                        ? "red"
                        : "orange",
                  }}
                >
                  {req.status}
                </td>
                <td>
                  {req.status === "Pending" ? (
                    <>
                      <button
                        className="approve-btn"
                        onClick={() => handleApprovalAction(req.id, "approve")}
                      >
                        Approve
                      </button>
                      <button
                        className="reject-btn"
                        onClick={() => handleApprovalAction(req.id, "reject")}
                      >
                        Reject
                      </button>
                    </>
                  ) : (
                    <em>{req.status}</em>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );

  // --- MAIN RENDER ---
  return (
    <>
      <button
        className="mobile-menu-btn"
        onClick={() => setMobileSidebarOpen(!isMobileSidebarOpen)}
      >
        <i className="fas fa-bars"></i>
      </button>

      <div className="dashboard-container">
        <Sidebar
          activeModule={activeModule}
          onNavigate={handleNavigate}
          approvalCount={kpiData.pendingApprovals}
          isCollapsed={isSidebarCollapsed}
          isMobileOpen={isMobileSidebarOpen}
          onLogout={handleLogout}
        />

        {activeModule === "approvals" ? (
          <div className="dashboard-content">{renderApprovalsContent()}</div>
        ) : (
          <MainContent
            activeModule={activeModule}
            userProfile={userProfile}
            kpiData={kpiData}
            projects={projects}
            tasks={tasks}
            budgets={budgets}
            materials={materials}
            materialTransactions={materialTransactions}
            employees={employees}
            approvals={approvals}
            onOpenModal={openModal}
            onOpenTransactionModal={() => openModal("transaction")}
            onDeleteProject={(id) =>
              setProjects((prev) => prev.filter((p) => p.id !== id))
            }
            onDeleteEmployee={(id) =>
              setEmployees((prev) => prev.filter((e) => e.id !== id))
            }
            onResetData={handleResetData}
            onLogout={handleLogout}
            onNavigate={handleNavigate}
          />
        )}
      </div>

      <Toast message={toast.message} isError={toast.isError} show={toast.show} />
    </>
  );
}

export default ManagerDashboard;
