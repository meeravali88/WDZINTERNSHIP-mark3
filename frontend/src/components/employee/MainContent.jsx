import React from 'react';
import Header from './Header';
import Dashboard from './modules/Dashboard';
import Tasks from './modules/Tasks';
import Materials from './modules/Materials';
import Projects from './modules/Projects';
import Settings from './modules/Settings';
import Logout from './modules/Logout';

const MainContent = ({ 
    user, 
    activeModule, 
    tasks, 
    materials, 
    recentActivities,
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
    onConfirmLogout
}) => {
    
    // As per your script, stats are hardcoded to 0
    const dashboardStats = {
        projectProgress: 0,
        tasksCompleted: 0,
        totalTasks: 0,
        materialsUsed: 0,
        teamPerformance: 0
    };

    return (
        <div className="main-content">
            <Header user={user} />

            {/* Conditional Rendering of Modules */}
            {activeModule === 'dashboard' && (
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
            )}
            
            {activeModule === 'tasks' && (
                <Tasks
                    tasks={tasks}
                    onOpenAddTaskModal={onOpenAddTaskModal}
                    onDeleteTask={onDeleteTask}
                    onToggleTask={onToggleTask}
                />
            )}
            
            {activeModule === 'materials' && (
                <Materials
                    materials={materials}
                    onOpenRequestModal={onOpenMaterialRequestModal}
                    onOpenAddModal={onOpenAddMaterialModal}
                    onDeleteMaterial={onDeleteMaterial}
                />
            )}
            
            {activeModule === 'projects' && <Projects />}
            
            {activeModule === 'settings' && (
                <Settings
                    user={user}
                    onSaveProfile={onSaveProfile}
                />
            )}
            
            {activeModule === 'logout' && (
                <Logout
                    onCancelLogout={onCancelLogout}
                    onConfirmLogout={onConfirmLogout}
                />
            )}
        </div>
    );
};

export default MainContent;