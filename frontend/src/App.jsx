import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ManagerDashboard from "./pages/ManagerDashboard";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import CustomerDashboard from "./pages/CustomerDashboard";
import TicTacToe from "./pages/TicTacToe";
function ProtectedRoute({ children, currentUser, loading }) {
  if (loading) return <div>Loading...</div>;
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }
  return children;
}
const loadAttendance = () => {
  try {
    const raw = localStorage.getItem("builderp_attendance");
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [attendance, setAttendance] = useState(() => loadAttendance());

  useEffect(() => {
    try {
      const raw = localStorage.getItem("loggedInUser");
      if (raw) setCurrentUser(JSON.parse(raw));
    } catch (err) {
      console.warn("Failed to read loggedInUser from localStorage:", err);
      localStorage.removeItem("loggedInUser");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("builderp_attendance", JSON.stringify(attendance));
    } catch (err) {
      console.warn("Failed to persist attendance:", err);
    }
  }, [attendance]);
  const markAttendance = (partialRecord) => {
    const now = new Date();
    const record = {
      id: "ATT-" + Date.now(),
      name: partialRecord.name || partialRecord.employeeName || "Unknown",
      employeeId: partialRecord.employeeId || partialRecord.email || null,
      email: partialRecord.email || null,
      date: now.toISOString().slice(0, 10),
      timestamp: new Date().toLocaleTimeString([], { 
        hour: "2-digit", 
        minute: "2-digit" 
      }),
      status: partialRecord.status || "present",
      meta: partialRecord.meta || {},
    };
    setAttendance((prev) => [record, ...prev]);
  };

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    setCurrentUser(null);
  };

  return (
    <Routes>
      <Route path="/play" element={<TicTacToe />} />
      <Route
        path="/"
        element={
          loading ? (
            <div>Loading...</div>
          ) : currentUser ? (
            <Navigate to={`/${currentUser.role}`} replace />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />

      <Route 
        path="/login" 
        element={<LoginPage setCurrentUser={setCurrentUser} />} 
      />
      <Route path="/register" element={<RegisterPage />} />
      <Route
        path="/manager"
        element={
          <ProtectedRoute currentUser={currentUser} loading={loading}>
            <ManagerDashboard 
              onLogout={handleLogout} 
              attendance={attendance}   // <-- Required for workflow
            />
          </ProtectedRoute>
        }
      />
      <Route
        path="/employee"
        element={
          <ProtectedRoute currentUser={currentUser} loading={loading}>
            <EmployeeDashboard 
              onLogout={handleLogout} 
              onMarkAttendance={markAttendance}  // <-- Required for workflow
            />
          </ProtectedRoute>
        }
      />
      <Route
        path="/customer"
        element={
          <ProtectedRoute currentUser={currentUser} loading={loading}>
            <CustomerDashboard user={currentUser} onLogout={handleLogout} />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
