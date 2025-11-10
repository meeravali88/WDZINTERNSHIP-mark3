import React from 'react';
import Header from './Header';
import DashboardModule from './modules/DashboardModule';
import ProjectsModule from './modules/ProjectsModule';
import TasksModule from './modules/TasksModule';
import BudgetModule from './modules/BudgetModule';
import MaterialsModule from './modules/MaterialsModule';
import EmployeesModule from './modules/EmployeesModule';
import ApprovalsModule from './modules/ApprovalsModule';
import AnalyticsModule from './modules/AnalyticsModule';
import SettingsModule from './modules/SettingsModule';

const MainContent = (props) => {
    const { activeModule, userProfile, onOpenModal, onLogout, onNavigate } = props;

    return (
        <div className="main-content" id="mainContent">
            {/* Render Header for all modules except Settings (which has its own) */}
            {activeModule !== 'settings' && activeModule !== 'dashboard' && (
                <Header
                    title="Module" // Title will be set by the module itself
                    userProfile={userProfile}
                    onOpenProfile={() => onOpenModal('profile')}
                    onOpenSettings={() => onNavigate('settings')}
                    onLogout={onLogout}
                />
            )}

            {/* Render correct module based on activeModule state */}
            {activeModule === 'dashboard' && <DashboardModule {...props} />}
            {activeModule === 'projects' && <ProjectsModule {...props} />}
            {activeModule === 'tasks' && <TasksModule {...props} />}
            {activeModule === 'budget' && <BudgetModule {...props} />}
            {activeModule === 'materials' && <MaterialsModule {...props} />}
            {activeModule === 'employees' && <EmployeesModule {...props} />}
            {activeModule === 'approvals' && <ApprovalsModule {...props} />}
            {activeModule === 'analytics' && <AnalyticsModule {...props} />}
            {activeModule === 'settings' && <SettingsModule {...props} />}
        </div>
    );
};

export default MainContent;