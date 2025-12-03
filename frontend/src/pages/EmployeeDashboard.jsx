import React, { useState, useEffect } from "react";
import "../styles/EmployeeDashboard.css";
import Sidebar from "../components/employee/Sidebar";
import MainContent from "../components/employee/MainContent";
import AddTaskModal from "../components/employee/modals/AddTaskModal";
import MaterialRequestModal from "../components/employee/modals/MaterialRequestModal";
import NewRequestModal from "../components/employee/modals/NewRequestModal";
import ContactManagerModal from "../components/employee/modals/ContactManagerModal";
import NeedHelpModal from "../components/employee/modals/NeedHelpModal";
import AddMaterialModal from "../components/employee/modals/AddMaterialModal";

const LOCAL_PREFIX = "builderp_";
const loadData = (key) => {
  try {
    const stored = localStorage.getItem(`${LOCAL_PREFIX}${key}`);
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
};
const logActivity = (message) => {
  const previousLogs =
    JSON.parse(localStorage.getItem("employeeConsoleLogs")) || [];
  const updatedLogs = [
    ...previousLogs,
    { message, date: new Date().toISOString() },
  ];
  localStorage.setItem("employeeConsoleLogs", JSON.stringify(updatedLogs));
};

export default function EmployeeDashboard({
  loggedUser,
  onLogout,
  onMarkAttendance,
}) {
  const logged =
    loggedUser ||
    JSON.parse(localStorage.getItem("loggedInUser")) || {
      name: "Employee",
      email: "",
      id: "",
    };

     const handleMarkAttendance = () => {
    const rec = {
      employeeId: logged.id || logged.email,
      email: logged.email,
      name: logged.name,
      status: "present",
    };

    onMarkAttendance?.(rec);
    showNotification("Attendance marked successfully", "success");
  };

  const [appData, setAppData] = useState(() => {
    const data = loadData("employeeData");
    return {
      user: logged,
      tasks: data?.tasks || [],
      materials: data?.materials || [], 
      recentActivities: data?.recentActivities || [],
      assignedProjects: data?.assignedProjects || [],
    };
  });

  const [activeModule, setActiveModule] = useState(
    localStorage.getItem("activeEmployeeModule") || "dashboard"
  );

  useEffect(() => {
    localStorage.setItem("activeEmployeeModule", activeModule);
  }, [activeModule]);

  const [modalState, setModalState] = useState({
    addTask: false,
    addMaterial: false,
    materialRequest: false,
    newRequest: false,
    contactManager: false,
    needHelp: false,
  });

  const openModal = (modalKey) =>
    setModalState((prev) => ({ ...prev, [modalKey]: true }));

  const closeModal = (modalKey) =>
    setModalState((prev) => ({ ...prev, [modalKey]: false }));

  const showNotification = (message) => {
    console.log("NOTIFICATION:", message);
  };

  const saveEmployeeData = (updatedData) => {
    try {
      localStorage.setItem(
        `${LOCAL_PREFIX}employeeData`,
        JSON.stringify(updatedData)
      );
    } catch (err) {
      console.error("Error saving employee data:", err);
    }
  };
  const handleMaterialRequest = (data) => {
    const prev =
      JSON.parse(localStorage.getItem("materialRequests")) || [];

    const newReq = {
      id: "REQ-" + Date.now(),
      employeeName: appData.user.name,
      materialName: data.materialName,
      materialQuantity: data.materialQuantity,
      quantity: data.materialQuantity, 
      material: data.materialName,     
      status: "pending",
      date: new Date().toISOString(),
    };

    localStorage.setItem(
      "materialRequests",
      JSON.stringify([newReq, ...prev])
    );

    closeModal("materialRequest");
    logActivity(`Requested material: ${data.materialName}`);
  };

  const handleAddTask = (newTask) => {
    const updatedData = {
      ...appData,
      tasks: [...appData.tasks, newTask],
    };
    
    setAppData(updatedData);
    saveEmployeeData(updatedData);
    closeModal("addTask");
    showNotification("Task added successfully!");
    logActivity(`Task added: ${newTask.title}`);
  };

  const handleAddMaterial = (newMaterial) => {
    const updatedData = {
      ...appData,
      materials: [...appData.materials, newMaterial],
    };

    setAppData(updatedData);
    saveEmployeeData(updatedData);
    closeModal("addMaterial");
    showNotification("Material added successfully!");
    logActivity(`Material added: ${newMaterial.name}`);
  };

  const handleDeleteTask = (taskId) => {
    const updatedData = {
      ...appData,
      tasks: appData.tasks.filter((task) => task.id !== taskId),
    };

    setAppData(updatedData);
    saveEmployeeData(updatedData);
    showNotification("Task deleted successfully!");
    logActivity(`Task deleted: ${taskId}`);
  };

  const handleToggleTask = (taskId) => {
    const updatedData = {
      ...appData,
      tasks: appData.tasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      ),
    };

    setAppData(updatedData);
    saveEmployeeData(updatedData);
    showNotification("Task updated successfully!");
    logActivity(`Task toggled: ${taskId}`);
  };

  const handleDeleteMaterial = (materialId) => {
    const updatedData = {
      ...appData,
      materials: appData.materials.filter(
        (material) => material.id !== materialId
      ),
    };

    setAppData(updatedData);
    saveEmployeeData(updatedData);
    showNotification("Material deleted successfully!");
    logActivity(`Material deleted: ${materialId}`);
  };

  const handleSaveProfile = (updatedProfile) => {
    const mergedProfile = { ...appData.user, ...updatedProfile };

    localStorage.setItem("loggedInUser", JSON.stringify(mergedProfile));

    setAppData((prevData) => ({
      ...prevData,
      user: mergedProfile,
    }));
    showNotification("Profile updated successfully!");
    logActivity("Profile updated");
  };

  return (
    <>
      <div className="container" id="dashboardContainer">
        <Sidebar
          user={appData.user}
          activeModule={activeModule}
          onNavigate={setActiveModule}
          onNewRequestClick={() => openModal("newRequest")}
          onContactManagerClick={() => openModal("contactManager")}
          onNeedHelpClick={() => openModal("needHelp")}
        />

        <MainContent
          user={appData.user}
          activeModule={activeModule}
          tasks={appData.tasks}
          materials={appData.materials}
          recentActivities={appData.recentActivities}
          assignedProjects={appData.assignedProjects}
          onMarkAttendance={handleMarkAttendance}
          onOpenAddTaskModal={() => openModal("addTask")}
          onOpenAddMaterialModal={() => openModal("addMaterial")}
          onOpenMaterialRequestModal={() => openModal("materialRequest")}
          onOpenNewRequestModal={() => openModal("newRequest")}
          onOpenNeedHelpModal={() => openModal("needHelp")}
          onDeleteTask={handleDeleteTask}
          onToggleTask={handleToggleTask}
          onDeleteMaterial={handleDeleteMaterial}
          onSaveProfile={handleSaveProfile}
        />
      </div>

      <AddTaskModal
        isOpen={modalState.addTask}
        onClose={() => closeModal("addTask")}
        onSubmit={handleAddTask}
      />

      <AddMaterialModal
        isOpen={modalState.addMaterial}
        onClose={() => closeModal("addMaterial")}
        onSubmit={handleAddMaterial}
      />
      <MaterialRequestModal
        isOpen={modalState.materialRequest}
        onClose={() => closeModal("materialRequest")}
        onSubmit={handleMaterialRequest}
      />
      <NewRequestModal
        isOpen={modalState.newRequest}
        onClose={() => closeModal("newRequest")}
      />
      <ContactManagerModal
        isOpen={modalState.contactManager}
        onClose={() => closeModal("contactManager")}
      />

      <NeedHelpModal
        isOpen={modalState.needHelp}
        onClose={() => closeModal("needHelp")}
      />
    </>
  );
}
