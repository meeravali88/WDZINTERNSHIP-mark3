import Header from "./Header";
import DashboardModule from "./modules/DashboardModule";
import ProjectsModule from "./modules/ProjectsModule";
import TasksModule from "./modules/TasksModule";
import BudgetModule from "./modules/BudgetModule";
import MaterialsModule from "./modules/MaterialsModule";
import EmployeesModule from "./modules/EmployeesModule";
import ApprovalsModule from "./modules/ApprovalsModule";
import AnalyticsModule from "./modules/AnalyticsModule";
import SettingsModule from "./modules/SettingsModule";
import AttendanceModule from "./modules/AttendanceModule";

// Module map
const moduleMap = {
    dashboard: DashboardModule,
    projects: ProjectsModule,
    tasks: TasksModule,
    budget: BudgetModule,
    materials: MaterialsModule,
    employees: EmployeesModule,
    approvals: ApprovalsModule,
    analytics: AnalyticsModule,
    settings: SettingsModule,
    attendance: AttendanceModule
};

const headerlessModules = ["dashboard", "settings", "projects"];

const MainContent = ({
    activeModule,
    userProfile,
    onOpenModal,
    onLogout,
    onNavigate,

    onApproveProject,
    onCompleteProject,
    onDeclineApproval,

    ...rest
}) => {

    const ActiveModuleComponent = moduleMap[activeModule];

    const commonProps = {
        userProfile,
        onOpenModal,
        onNavigate,
        onLogout,
        onApproveProject,
        onCompleteProject,
        onDeclineApproval,
        ...rest
    };

    if (!ActiveModuleComponent) {
        return (
            <div className="main-content">
                <p>Module not found: {activeModule}</p>
            </div>
        );
    }

    const showHeader = !headerlessModules.includes(activeModule);

    const modifiedUserProfile = {
        ...userProfile,
        role: "Manager"
    };

    return (
        <div className="main-content">
            {showHeader && (
                <Header
                    title={activeModule.charAt(0).toUpperCase() + activeModule.slice(1)}
                    // userProfile={modifiedUserProfile}
                    onOpenProfile={() => onOpenModal("profile")}
                    onOpenSettings={() => onNavigate("settings")}
                    onLogout={onLogout}
                />
            )}

            <ActiveModuleComponent {...commonProps} />
        </div>
    );
};

export default MainContent;
