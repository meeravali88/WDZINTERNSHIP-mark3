import Header from "./Header";

import Dashboard from "./modules/Dashboard";
import Tasks from "./modules/Tasks";
import Materials from "./modules/Materials";
import Projects from "./modules/Projects";
import Settings from "./modules/Settings";
import Logout from "./modules/Logout";

const MainContent = ({
  user,
  activeModule,
  tasks,
  materials,
  recentActivities,
  assignedProjects,   // correct
  onMarkAttendance,
  onResetDashboard,
  onOpenAddTaskModal,
  onOpenAddMaterialModal,
  onOpenMaterialRequestModal,
  onOpenNewRequestModal,
  onOpenNeedHelpModal,
  onDeleteTask,
  onToggleTask,
  onDeleteMaterial,
  onDeleteActivity,
  onSaveProfile,
  onCancelLogout,
  onConfirmLogout,
}) => {

  const dashboardStats = {
    projectProgress: 0,
    tasksCompleted: 0,
    totalTasks: 0,
    materialsUsed: 0,
    teamPerformance: 0,
  };

  return (
    <div className="main-content">
      <Header user={user} />

      {/* DASHBOARD */}
      {activeModule === "dashboard" && (
        <>
          <button className="mark-attendance-btn" onClick={onMarkAttendance}>
            <i className="fas fa-hand-paper"></i> Mark Attendance
          </button>

          <Dashboard
            stats={dashboardStats}
            recentActivities={recentActivities}
            onDeleteActivity={onDeleteActivity}
            onResetDashboard={onResetDashboard}
            onQuickTask={onOpenAddTaskModal}
            onQuickMaterial={onOpenMaterialRequestModal}
            onQuickRequest={onOpenNewRequestModal}
            onQuickHelp={onOpenNeedHelpModal}
          />
        </>
      )}

      {/* TASKS */}
      {activeModule === "tasks" && (
        <Tasks
          tasks={tasks}
          onOpenAddTaskModal={onOpenAddTaskModal}
          onDeleteTask={onDeleteTask}
          onToggleTask={onToggleTask}
        />
      )}

      {/* MATERIALS */}
      {activeModule === "materials" && (
        <Materials
          materials={materials}
          onOpenRequestModal={onOpenMaterialRequestModal}
          onOpenAddModal={onOpenAddMaterialModal}
          onDeleteMaterial={onDeleteMaterial}
        />
      )}

      {/* ⭐ MY PROJECTS (ONLY HERE SHOWN CORRECTLY) */}
      {activeModule === "projects" && (
        <Projects assignedProjects={assignedProjects} />
      )}

      {/* SETTINGS */}
      {activeModule === "settings" && (
        <Settings user={user} onSaveProfile={onSaveProfile} />
      )}

      {/* LOGOUT */}
      {activeModule === "logout" && (
        <Logout
          onCancelLogout={onCancelLogout}
          onConfirmLogout={onConfirmLogout}
        />
      )}
    </div>
  );
};

export default MainContent;
