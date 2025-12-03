import React from "react";
import Header from "../Header";
import KpiCard from "../KpiCard";
import EmptyState from "../EmptyState";
import ProgressChart from "../charts/ProgressChart";
import BudgetChart from "../charts/BudgetChart";

const DashboardModule = ({
  userProfile,
  onOpenModal,
  onLogout,
  onNavigate,
  kpiData,
  projects,
  budgets,
  onResetData,
  tasks,
}) => {
  // ✅ Safely format last login date
  const lastLogin = userProfile?.lastLogin
    ? new Date(userProfile.lastLogin).toLocaleString()
    : "N/A";

  // ✅ Safely handle budget utilization (avoid crash if undefined)
  const budgetUtilization =
    kpiData?.budgetUtilization !== undefined
      ? `$${kpiData.budgetUtilization.toLocaleString()}`
      : "$0";

  return (
    <div className="module-container active" id="dashboard-module">
      {/* ✅ Header */}
      <Header
        title="Construction Analytics Dashboard"
        // userProfile={userProfile}
        onOpenProfile={() => onOpenModal("profile")}
        onOpenSettings={() => onNavigate("settings")}
        onLogout={onLogout}
      />

      {/* ✅ Show last login info */}
      <div className="last-login-info" style={{ textAlign: "right", margin: "0 20px" }}>
        <p>
          <strong>Last Login:</strong> {lastLogin}
        </p>
      </div>

      {/* ✅ KPI Cards */}
      <div className="kpi-cards">
        <KpiCard
          title="Overall Project Progress"
          value={`${kpiData.overallProgress}%`}
          trend={projects.length > 0 ? "Projects added" : null}
          trendDirection="up"
        />
        <KpiCard
          title="Budget Utilization"
          value={budgetUtilization}
          trend={budgets.length > 0 ? "Budget allocated" : null}
          trendDirection="up"
        />
        <KpiCard
          title="Task Completion Rate"
          value={`${kpiData.taskCompletion}%`}
          trend={tasks.length > 0 ? "Tasks created" : null}
          trendDirection="up"
        />
        <KpiCard
          title="Pending Approvals"
          value={kpiData.pendingApprovals}
          trend={kpiData.pendingApprovals > 0 ? "Requests submitted" : null}
          trendDirection="up"
        />
      </div>

      {/* ✅ Charts Section */}
      <div className="charts-grid">
        <div className="chart-card">
          <div className="chart-header">
            <h3>Project Progress Tracking</h3>
          </div>
          <div id="progressChartContainer">
            {projects.length === 0 ? (
              <EmptyState
                icon="chart-bar"
                title="No Project Data"
                message="Add projects to see progress tracking"
                buttonText="Add Project"
                onButtonClick={() => onOpenModal("project")}
              />
            ) : (
              <ProgressChart projects={projects} />
            )}
          </div>
        </div>

        <div className="chart-card">
          <div className="chart-header">
            <h3>Budget Allocation</h3>
          </div>
          <div id="budgetChartContainer">
            {budgets.length === 0 ? (
              <EmptyState
                icon="chart-pie"
                title="No Budget Data"
                message="Add budget items to see allocation"
                buttonText="Add Budget"
                onButtonClick={() => onOpenModal("budget")}
              />
            ) : (
              <BudgetChart budgets={budgets} />
            )}
          </div>
        </div>
      </div>

      {/* ✅ Footer */}
      <div className="footer">
        <p>
          BuildERP Construction Analytics &copy; 2025 | Real-time Data Dashboard
        </p>
        <button className="reset-data-btn" onClick={onResetData}>
          <i className="fas fa-trash"></i> Reset All Data
        </button>
      </div>
    </div>
  );
};

export default DashboardModule;
