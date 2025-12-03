import React from "react";

import BudgetChart from "../charts/BudgetChart";
import BudgetVsActualChart from "../charts/BudgetVsActualChart";
import PerformanceChart from "../charts/PerformanceChart";
import ProgressChart from "../charts/ProgressChart";
import TaskCompletionChart from "../charts/TaskCompletionChart";
import UtilizationChart from "../charts/UtilizationChart";
import CostBreakdownChart from "../charts/CostBreakdownChart";

const AnalyticsModule = () => {

  const projects = JSON.parse(localStorage.getItem("builderp_projects")) || [];
  const employees = JSON.parse(localStorage.getItem("builderp_employees")) || [];

  const tData = JSON.parse(localStorage.getItem("constructionERPData")) || {};
  const tasks = tData.tasks || [];

  const budgets = projects.map(p => ({
    projectName: p.name,
    amount: Number(p.budget || 0),
    spent: Number(p.usedBudget || 0),
    category: p.category || "General",
    materialCost: Number(p.materialCost || 0),
    labourCost: Number(p.labourCost || 0)
  }));

  return (
    <div className="module-container active">

      <h2 style={{ marginBottom: "25px" }}>
        <i className="fas fa-chart-line"></i> Analytics Dashboard
      </h2>

      {/* 1. Budget Distribution */}
      <div className="chart-card">
        <h3>Budget Distribution</h3>
        <BudgetChart budgets={budgets} />
      </div>

      {/* 2. Budget vs Actual */}
      <div className="chart-card">
        <h3>Budget vs Actual Spend</h3>
        <BudgetVsActualChart budgets={budgets} />
      </div>

      {/* 3. Project Progress */}
      <div className="chart-card">
        <h3>Project Progress</h3>
        <ProgressChart projects={projects} />
      </div>

      {/* 4. Performance */}
      <div className="chart-card">
        <h3>Project Performance (%)</h3>
        <PerformanceChart projects={projects} />
      </div>

      {/* 5. Task Completion */}
      <div className="chart-card">
        <h3>Task Completion Overview</h3>
        <TaskCompletionChart tasks={tasks} />
      </div>

      {/* 6. Employee Utilization */}
      <div className="chart-card">
        <h3>Department-wise Utilization</h3>
        <UtilizationChart employees={employees} />
      </div>

      {/* 7. Material vs Labour Cost Breakdown */}
      <div className="chart-card">
        <h3>Material vs Labour Cost</h3>
        <CostBreakdownChart projects={budgets} />
      </div>

    </div>
  );
};

export default AnalyticsModule;
