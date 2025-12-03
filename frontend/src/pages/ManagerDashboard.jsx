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

const LOCAL_PREFIX = "builderp_";

const loadData = (key, defaultValue = []) => {
  try {
    const raw = localStorage.getItem(LOCAL_PREFIX + key);
    return raw ? JSON.parse(raw) : defaultValue;
  } catch {
    return defaultValue;
  }
};

const loadMaterialRequests = () => {
  try {
    const raw = localStorage.getItem("materialRequests");
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

const loadCustomerRequests = () => {
  try {
    const raw = localStorage.getItem("customerRequests");
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

const logged = JSON.parse(localStorage.getItem("loggedInUser")) || {};
const defaultProfile = {
  name: logged.name || "Manager",
  email: logged.email,
  role: logged.role,
  lastLogin: new Date().toLocaleString(),
};

export default function ManagerDashboard({ onLogout, attendance = [] }) {
  const navigate = useNavigate();

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
  const [assignedProjects, setAssignedProjects] = useState(() => loadData("assignedProjects"));
  const [materialRequests, setMaterialRequests] = useState(() =>
    loadMaterialRequests()
  );
  const [customerRequests, setCustomerRequests] = useState(() =>
    loadCustomerRequests()
  );

  // ui state
  const [activeModule, setActiveModule] = useState("dashboard");
  const [isMobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [toast, setToast] = useState({ show: false, message: "", isError: false });

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
  useEffect(() => {
    const data = {
      projects,
      tasks,
      budgets,
      materials,
      employees,
      approvals,
      materialTransactions,
      userProfile,
    };

    Object.entries(data).forEach(([key, val]) =>
      localStorage.setItem(LOCAL_PREFIX + key, JSON.stringify(val))
    );
    try {
      localStorage.setItem(LOCAL_PREFIX + "assignedProjects", JSON.stringify(assignedProjects));
    } catch (e) {
      console.warn("Failed to persist assignedProjects", e);
    }
    try {
      localStorage.setItem("materialRequests", JSON.stringify(materialRequests));
    } catch (e) {
      console.warn("Failed to persist materialRequests", e);
    }

    try {
      localStorage.setItem("customerRequests", JSON.stringify(customerRequests));
    } catch (e) {
      console.warn("Failed to persist customerRequests", e);
    }
  }, [projects, tasks, budgets, materials, employees, approvals, materialTransactions, userProfile, assignedProjects, materialRequests, customerRequests]);

  useEffect(() => {
    const onStorage = (e) => {
      if (!e) return;
      if (e.key === "builderp_projects") {
        try {
          const fresh = JSON.parse(localStorage.getItem("builderp_projects") || "[]");
          setProjects(fresh);
        } catch {}
      }
      if (e.key === "customerRequests") {
        try {
          const fresh = JSON.parse(localStorage.getItem("customerRequests") || "[]");
          setCustomerRequests(fresh);
        } catch {}
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);
    const showToast = (msg, isError = false) => {
    setToast({ show: true, message: msg, isError });
    setTimeout(() => setToast({ show: false, message: "", isError: false }), 2800);
  };

  const openModal = (m) => setModals((p) => ({ ...p, [m]: true }));
  const closeModal = (m) => setModals((p) => ({ ...p, [m]: false }));

  const handleNavigate = (module) => {
    setActiveModule(module);
    if (window.innerWidth <= 768) setMobileSidebarOpen(false);
  };

  const handleLogout = () => {
    onLogout?.();
    navigate("/login", { replace: true });
  };

  const handleResetData = () => {
    if (window.confirm("Reset all ERP data?")) {
      setProjects([]);
      setTasks([]);
      setBudgets([]);
      setMaterials([]);
      setEmployees([]);
      setApprovals([]);
      setMaterialTransactions([]);
      setAssignedProjects([]);
      setMaterialRequests([]);
      setCustomerRequests([]);
      showToast("All data cleared!");
    }
  };

  // KPI/analytics
  const kpiData = useMemo(() => {
    const approvedProjects = projects.filter((p) => p.approvalStatus === "approved");
    const overallProgress =
      approvedProjects.length > 0
        ? Math.round(approvedProjects.reduce((s, p) => s + Number(p.progress || 0), 0) / approvedProjects.length)
        : 0;

    const totalBudget = budgets.reduce((a, b) => a + Number(b.amount || 0), 0);
    const totalSpent = budgets.reduce((a, b) => a + Number(b.spent || 0), 0);
    const totalTasksDone = tasks.filter((t) => t.status === "completed").length;

    return {
      overallProgress,
      taskCompletion: tasks.length ? Math.round((totalTasksDone / tasks.length) * 100) : 0,
      pendingApprovals: approvals.filter((a) => a.status === "pending").length,
      totalBudget,
      totalSpent,
      remainingBudget: totalBudget - totalSpent,
      utilizationRate: totalBudget ? Math.round((totalSpent / totalBudget) * 100) : 0,
      totalMaterials: materials.length,
      lowStock: materials.filter((m) => m.quantity <= (m.minimumStock || 0)).length,
      totalEmployees: employees.length,
      pendingMaterialRequests: materialRequests.filter((r) => r.status === "pending").length,
      totalAssignedProjects: assignedProjects.length
    };
  }, [projects, tasks, budgets, materials, employees, approvals, materialRequests, assignedProjects]);
    const handleAddProject = (data) => {
    const newProject = { ...data, id: Date.now().toString(), progress: 0, approvalStatus: "approved", createdAt: new Date().toISOString() };
    setProjects((p) => [...p, newProject]);
    showToast("Project created!");
    closeModal("project");
  };

  const handleDeleteProject = (id) => {
    if (!window.confirm("Delete project?")) return;
    setProjects((p) => p.filter((x) => x.id !== id));
    setTasks((t) => t.filter((tk) => tk.projectId !== id));
    setBudgets((b) => b.filter((bb) => bb.projectId !== id));
    showToast("Project removed!");
  };

  const handleApproveProject = (id) => {
    const proj = projects.find((p) => p.id === id);
    if (!proj) {
      showToast("Project not found", true);
      return;
    }
    setProjects((prev) => prev.map((p) => (p.id === id ? { ...p, approvalStatus: "approved" } : p)));
    try {
      const existingBudget = budgets.find((b) => b.projectId === id);
      if (!existingBudget && proj.budget && Number(proj.budget) > 0) {
        const newBudget = {
          id: "BUD-" + Date.now().toString(),
          projectId: id,
          projectName: proj.name || proj.title || "Unnamed Project",
          amount: Number(proj.budget),
          spent: 0,
          status: "active",
          createdAt: new Date().toISOString(),
        };
        setBudgets((prevB) => [...prevB, newBudget]);
        showToast("Project approved and budget added!");
        return;
      }
    } catch (e) {
      console.warn("Could not add budget on approval:", e);
    }

    showToast("Project approved!");
  };

  const handleDeclineProject = (id) => {
    if (!window.confirm("Decline this project?")) return;
    setProjects((p) => p.map((proj) => (proj.id === id ? { ...proj, approvalStatus: "declined" } : proj)));
    showToast("Project declined!");
  };

  const handleAssignProjectToAttended = (projectId) => {
    if (!projectId) { showToast("Pick a project to assign", true); return; }
    const project = projects.find((p) => p.id === projectId);
    if (!project) { showToast("Project not found", true); return; }

    const today = new Date().toISOString().slice(0, 10);
    const presentRecords = (attendance || []).filter((a) => (a.date || a.day) === today || a.status === "present" || a.status === "Present" );

    if (!presentRecords.length) {
      showToast("No present employees found for today", true);
      return;
    }
    const newAssigned = [...assignedProjects];
    presentRecords.forEach((rec) => {
      const employeeId = rec.employeeId || rec.email || rec.name;
      const already = newAssigned.some((ap) => ap.projectId === projectId && ap.employeeId === employeeId);
      if (!already) {
        newAssigned.unshift({
          id: "AP-" + Date.now().toString() + "-" + Math.random().toString(36).slice(2,6),
          projectId,
          projectName: project.name || project.title || "Unnamed Project",
          employeeId,
          employeeName: rec.name || rec.employeeName || rec.email,
          status: "assigned",
          assignedAt: new Date().toISOString(),
        });
      }
    });

    setAssignedProjects(newAssigned);
    showToast(`Assigned "${project.name || project.title}" to ${presentRecords.length} present employees.`);
  };

  const handleAssignProjectToEmployees = (projectId, employeeIds) => {
    const project = projects.find((p) => p.id === projectId);
    if (!project) return;

    const newAssigned = [...assignedProjects];

    employeeIds.forEach((eid) => {
        const exists = newAssigned.some(
            (ap) => ap.projectId === projectId && ap.employeeId === eid
        );
        if (!exists) {
            const emp = employees.find(e => e.id === eid);
            newAssigned.push({
                id: "AP-" + Date.now() + "-" + Math.random().toString(36).slice(2, 5),
                projectId,
                projectName: project.name,
                employeeId: eid,
                employeeName: emp?.name,
                assignedAt: new Date().toISOString(),
            });
        }
    });

    setAssignedProjects(newAssigned);
    showToast("Employees assigned to project!");
  };
  const approveMaterialReq = (reqId) => {
    setMaterialRequests((prev) => {
      const updated = prev.map((r) => (r.id === reqId ? { ...r, status: "approved", approvedAt: new Date().toISOString() } : r));
      try { localStorage.setItem("materialRequests", JSON.stringify(updated)); } catch {}
      return updated;
    });
    showToast("Material request approved!");
  };

  const declineMaterialReq = (reqId) => {
    if (!window.confirm("Decline this material request?")) return;
    setMaterialRequests((prev) => {
      const updated = prev.map((r) => (r.id === reqId ? { ...r, status: "declined", declinedAt: new Date().toISOString() } : r));
      try { localStorage.setItem("materialRequests", JSON.stringify(updated)); } catch {}
      return updated;
    });
    showToast("Material request declined!");
  };

  const handleAddTask = (data) => {
    const proj = projects.find((p) => p.id === data.projectId);
    const newTask = { ...data, id: Date.now().toString(), projectName: proj?.name || "Unknown", status: "pending", createdAt: new Date().toISOString() };
    setTasks((t) => [...t, newTask]);
    showToast("Task added!");
    closeModal("task");
  };
  const handleToggleTask = (id) => setTasks((t) => t.map((task) => (task.id === id ? { ...task, status: task.status === "completed" ? "pending" : "completed" } : task)));
  const handleDeleteTask = (id) => { if (!window.confirm("Delete task?")) return; setTasks((t) => t.filter((x) => x.id !== id)); showToast("Task deleted!"); };
  const handleAddBudget = (data) => { const proj = projects.find((p) => p.id === data.projectId); setBudgets((b) => [...b, { ...data, id: Date.now().toString(), projectName: proj?.name || "Unknown", spent: 0, status: "active", createdAt: new Date().toISOString() }]); showToast("Budget added!"); closeModal("budget"); };
  const handleAddMaterial = (data) => { setMaterials((m) => [...m, { ...data, id: Date.now().toString(), totalValue: Number(data.quantity) * Number(data.unitPrice || 0), minimumStock: data.minimumStock || 10 }]); showToast("Material added!"); closeModal("material"); };
  const handleAddTransaction = (data) => {
    const mat = materials.find((m) => m.id === data.materialId);
    const proj = projects.find((p) => p.id === data.projectId);
    const trx = { ...data, id: "TRX-" + Date.now(), materialName: mat?.name, projectName: proj?.name || "Inventory Restock", date: new Date().toISOString() };
    setMaterialTransactions((s) => [trx, ...s]);
    setMaterials((m) => m.map((x) => (x.id === data.materialId ? { ...x, quantity: data.type === "in" ? (Number(x.quantity) + Number(data.quantity)) : (Number(x.quantity) - Number(data.quantity)) } : x)));
    showToast("Transaction recorded!");
    closeModal("transaction");
  };

  const handleAddEmployee = (data) => { setEmployees((e) => [...e, { ...data, id: Date.now().toString(), status: "active", createdAt: new Date().toISOString() }]); showToast("Employee added!"); closeModal("employee"); };
  const handleDeleteEmployee = (id) => { if (!window.confirm("Delete employee?")) return; setEmployees((e) => e.filter((x) => x.id !== id)); showToast("Employee removed!"); };
  const handleAddApproval = (data) => { setApprovals((a) => [...a, { ...data, id: "REQ-" + Date.now(), projectName: data.projectName, status: "pending", date: new Date().toISOString() }]); showToast("Approval request added!"); closeModal("approval"); };
  const handleApprovalAction = (id, action) => { setApprovals((a) => a.map((ap) => (ap.id === id ? { ...ap, status: action } : ap))); showToast("Approval updated!"); };

  return (
    <>
      <div className="dashboard-container">
        <Sidebar
          activeModule={activeModule}
          onNavigate={handleNavigate}
          approvalCount={kpiData.pendingApprovals}
          isMobileOpen={isMobileSidebarOpen}
          onLogout={handleLogout}
          attendance={attendance}
        />

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
          materialRequests={materialRequests}
          assignedProjects={assignedProjects}
          customerRequests={customerRequests}  
          onApproveMaterialRequest={approveMaterialReq}
          onDeclineMaterialRequest={declineMaterialReq}
          attendance={attendance}
          onOpenModal={openModal}
          onNavigate={handleNavigate}
          onLogout={handleLogout}

          onDeleteProject={handleDeleteProject}
          onApproveProject={handleApproveProject}
          onDeclineProject={handleDeclineProject}

          onSubmitProject={handleAddProject}
          onSubmitTask={handleAddTask}
          onSubmitBudget={handleAddBudget}
          onSubmitMaterial={handleAddMaterial}
          onSubmitTransaction={handleAddTransaction}
          onSubmitEmployee={handleAddEmployee}
          onSubmitApproval={handleAddApproval}

          onDeleteTask={handleDeleteTask}
          onToggleTask={handleToggleTask}

          onDeleteEmployee={handleDeleteEmployee}

          onApprovalAction={handleApprovalAction}
          onResetData={handleResetData}
          onAssignProjectToAttended={handleAssignProjectToAttended}
          onAssignProjectToEmployees={handleAssignProjectToEmployees}
        />
      </div>

      <Toast message={toast.message} show={toast.show} isError={toast.isError} />

      <ProfileModal isOpen={modals.profile} onClose={() => closeModal("profile")} profile={userProfile} />
      <ProjectModal isOpen={modals.project} onClose={() => closeModal("project")} onSubmit={handleAddProject} />
      <TaskModal isOpen={modals.task} onClose={() => closeModal("task")} onSubmit={handleAddTask} projects={projects} />
      <BudgetModal isOpen={modals.budget} onClose={() => closeModal("budget")} onSubmit={handleAddBudget} projects={projects} />
      <MaterialModal isOpen={modals.material} onClose={() => closeModal("material")} onSubmit={handleAddMaterial} />
      <EmployeeModal isOpen={modals.employee} onClose={() => closeModal("employee")} onSubmit={handleAddEmployee} />
      <ApprovalModal isOpen={modals.approval} onClose={() => closeModal("approval")} onSubmit={handleAddApproval} projects={projects} />
      <MaterialTransactionModal isOpen={modals.transaction} onClose={() => closeModal("transaction")} onSubmit={handleAddTransaction} materials={materials} projects={projects} />
    </>
  );
}
