import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/EmployeeDashboard.css";
import Sidebar from "../components/employee/Sidebar";
import MainContent from "../components/employee/MainContent";
import Notification from "../components/employee/Notification";

// Modals
import NewRequestModal from "../components/employee/modals/NewRequestModal";
import ContactManagerModal from "../components/employee/modals/ContactManagerModal";
import NeedHelpModal from "../components/employee/modals/NeedHelpModal";
import MaterialRequestModal from "../components/employee/modals/MaterialRequestModal";
import AddTaskModal from "../components/employee/modals/AddTaskModal";
import AddMaterialModal from "../components/employee/modals/AddMaterialModal";

// --- Default Data ---
const sampleData = {
  user: {
    name: "John Doe",
    email: "john.doe@constructionerp.com",
    phone: "+1 (555) 123-4567",
    department: "Construction Management",
    position: "Site Supervisor",
  },
  tasks: [],
  materials: [],
  recentActivities: [],
  assignedProjects: [],
  teamPerformance: {
    completedTasks: 0,
    onTimeTasks: 0,
    positiveFeedback: 0,
  },
};

// --- Helper to load local data ---
const loadInitialData = () => {
  const savedData = localStorage.getItem("constructionERPData");
  if (savedData) {
    const parsedData = JSON.parse(savedData);
    return {
      ...sampleData,
      ...parsedData,
      assignedProjects: [],
    };
  }
  return { ...sampleData, assignedProjects: [] };
};

function EmployeeDashboard() {
  const navigate = useNavigate();

  // --- STATE ---
  const [appData, setAppData] = useState(loadInitialData);
  const [activeModule, setActiveModule] = useState("dashboard");
  const [notification, setNotification] = useState({
    message: "",
    type: "",
    visible: false,
  });
  const [modalState, setModalState] = useState({
    newRequest: false,
    contactManager: false,
    needHelp: false,
    materialRequest: false,
    addTask: false,
    addMaterial: false,
  });

  // --- SAVE DATA TO LOCALSTORAGE ---
  useEffect(() => {
    localStorage.setItem(
      "constructionERPData",
      JSON.stringify({ ...appData, assignedProjects: [] })
    );
  }, [appData]);

  // --- NOTIFICATION UTILITY ---
  const showNotification = (message, type) => {
    setNotification({ message, type, visible: true });
    setTimeout(() => {
      setNotification({ message: "", type: "", visible: false });
    }, 3000);
  };

  // --- ACTIVITY LOGS ---
  const addActivity = (title, description, type = "profile") => {
    const newActivity = {
      id: Date.now(),
      type,
      title,
      description,
      timestamp: new Date().toISOString(),
    };
    setAppData((prev) => ({
      ...prev,
      recentActivities: [newActivity, ...prev.recentActivities].slice(0, 5),
    }));
  };

  // --- MODAL CONTROLS ---
  const openModal = (modalName) =>
    setModalState((prev) => ({ ...prev, [modalName]: true }));
  const closeModal = (modalName) =>
    setModalState((prev) => ({ ...prev, [modalName]: false }));

  // --- CORE HANDLERS ---
  const handleNavigate = (moduleName) => {
    if (moduleName === "logout") {
      // Optional: Clear any specific session data here if needed
      // localStorage.removeItem("userToken"); 
      
      // Use React Router to navigate. 'replace: true' prevents going back.
      navigate("/login", { replace: true });
      return;
    }
    setActiveModule(moduleName);
  };

  const handleResetDashboard = () =>
    showNotification("Dashboard progress has been reset", "success");

  const handleAddTask = (taskData) => {
    const newTask = { ...taskData, id: Date.now(), completed: false };
    setAppData((prev) => ({ ...prev, tasks: [...prev.tasks, newTask] }));
    addActivity("New Task Added", `${taskData.title} added`, "task");
    showNotification("Task added successfully!", "success");
    closeModal("addTask");
  };

  const handleDeleteTask = (taskId) => {
    const taskToDelete = appData.tasks.find((t) => t.id === taskId);
    if (taskToDelete) {
      setAppData((prev) => ({
        ...prev,
        tasks: prev.tasks.filter((t) => t.id !== taskId),
      }));
      addActivity("Task Deleted", `${taskToDelete.title} deleted`, "task");
      showNotification("Task deleted successfully", "success");
    }
  };

  const handleToggleTask = (taskId) => {
    let taskTitle = "";
    let isCompleted = false;
    setAppData((prev) => ({
      ...prev,
      tasks: prev.tasks.map((task) => {
        if (task.id === taskId) {
          taskTitle = task.title;
          isCompleted = !task.completed;
          return { ...task, completed: isCompleted };
        }
        return task;
      }),
    }));
    if (taskTitle) {
      const activityTitle = isCompleted ? "Task Completed" : "Task Reopened";
      addActivity(
        activityTitle,
        `${taskTitle} ${isCompleted ? "completed" : "reopened"}`,
        "task"
      );
    }
  };

  const handleAddMaterial = (data) => {
    const newMaterial = { ...data, id: Date.now() };
    setAppData((prev) => ({
      ...prev,
      materials: [...prev.materials, newMaterial],
    }));
    addActivity("Material Added", `${data.name} added to inventory`, "material");
    showNotification("Material added successfully!", "success");
    closeModal("addMaterial");
  };

  const handleDeleteMaterial = (id) => {
    const materialToDelete = appData.materials.find((m) => m.id === id);
    if (materialToDelete) {
      setAppData((prev) => ({
        ...prev,
        materials: prev.materials.filter((m) => m.id !== id),
      }));
      addActivity(
        "Material Deleted",
        `${materialToDelete.name} removed`,
        "material"
      );
      showNotification("Material deleted successfully", "success");
    }
  };

  const handleSaveProfile = (profileData) => {
    setAppData((prev) => ({ ...prev, user: profileData }));
    addActivity("Profile Updated", "Your profile info was updated", "profile");
    showNotification("Profile updated successfully", "success");
  };

  const handleSubmitNewRequest = (requestData) => {
    addActivity(
      "New Request",
      `${requestData.requestTitle} submitted`,
      "request"
    );
    showNotification("Request submitted successfully!", "success");
    closeModal("newRequest");
  };

  const handleSubmitMaterialRequest = (requestData) => {
    addActivity(
      "Material Request",
      `${requestData.materialName} requested`,
      "material"
    );
    showNotification("Material request submitted successfully!", "success");
    closeModal("materialRequest");
  };

  // --- JSX ---
  return (
    <>
      <Notification
        message={notification.message}
        type={notification.type}
        visible={notification.visible}
      />

      <div className="container" id="dashboardContainer">
        <Sidebar
          user={appData.user}
          activeModule={activeModule}
          onNavigate={handleNavigate}
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
          onResetDashboard={handleResetDashboard}
          onOpenAddTaskModal={() => openModal("addTask")}
          onOpenAddMaterialModal={() => openModal("addMaterial")}
          onOpenMaterialRequestModal={() => openModal("materialRequest")}
          onOpenNewRequestModal={() => openModal("newRequest")}
          onOpenNeedHelpModal={() => openModal("needHelp")}
          onDeleteTask={handleDeleteTask}
          onToggleTask={handleToggleTask}
          onDeleteMaterial={handleDeleteMaterial}
          onDeleteActivity={(activityId) => {
            setAppData((prev) => ({
              ...prev,
              recentActivities: prev.recentActivities.filter(
                (a) => a.id !== activityId
              ),
            }));
            showNotification("Activity deleted successfully", "success");
          }}
          onSaveProfile={handleSaveProfile}
        />
      </div>

      {/* --- All Modals --- */}
      <NewRequestModal
        isOpen={modalState.newRequest}
        onClose={() => closeModal("newRequest")}
        onSubmit={handleSubmitNewRequest}
      />
      <ContactManagerModal
        isOpen={modalState.contactManager}
        onClose={() => closeModal("contactManager")}
      />
      <NeedHelpModal
        isOpen={modalState.needHelp}
        onClose={() => closeModal("needHelp")}
      />
      <MaterialRequestModal
        isOpen={modalState.materialRequest}
        onClose={() => closeModal("materialRequest")}
        onSubmit={handleSubmitMaterialRequest}
      />
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
    </>
  );
}

export default EmployeeDashboard;