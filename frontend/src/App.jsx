import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";

// Pages
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ManagerDashboard from "./pages/ManagerDashboard";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import CustomerDashboard from "./pages/CustomerDashboard";

// --- Protected Route ---
function ProtectedRoute({ children, allowedRoles, currentUser, loading }) {
  if (loading) return <div>Loading...</div>;

  if (!currentUser) return <Navigate to="/" replace />;

  if (allowedRoles && !allowedRoles.includes(currentUser.role)) {
    switch (currentUser.role) {
      case "manager":
        return <Navigate to="/manager" replace />;
      case "employee":
        return <Navigate to="/employee" replace />;
      case "customer":
        return <Navigate to="/customer" replace />;
      default:
        return <Navigate to="/" replace />;
    }
  }

  return children;
}

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (storedUser) {
      setCurrentUser(storedUser);
      switch (storedUser.role) {
        case "manager":
          navigate("/manager", { replace: true });
          break;
        case "employee":
          navigate("/employee", { replace: true });
          break;
        case "customer":
          navigate("/customer", { replace: true });
          break;
        default:
          navigate("/", { replace: true });
      }
    }
    setLoading(false);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    setCurrentUser(null);
    navigate("/", { replace: true });
  };

  return (
    <Routes>
      <Route
        path="/"
        element={
          currentUser ? (
            <Navigate
              to={
                currentUser.role === "manager"
                  ? "/manager"
                  : currentUser.role === "employee"
                  ? "/employee"
                  : "/customer"
              }
              replace
            />
          ) : (
            <LoginPage />
          )
        }
      />

      <Route
        path="/register"
        element={currentUser ? <Navigate to="/" replace /> : <RegisterPage />}
      />

      <Route
        path="/manager"
        element={
          <ProtectedRoute
            allowedRoles={["manager"]}
            currentUser={currentUser}
            loading={loading}
          >
            <ManagerDashboard user={currentUser} onLogout={handleLogout} />
          </ProtectedRoute>
        }
      />

      <Route
        path="/employee"
        element={
          <ProtectedRoute
            allowedRoles={["employee"]}
            currentUser={currentUser}
            loading={loading}
          >
            <EmployeeDashboard user={currentUser} onLogout={handleLogout} />
          </ProtectedRoute>
        }
      />

      <Route
        path="/customer"
        element={
          <ProtectedRoute
            allowedRoles={["customer"]}
            currentUser={currentUser}
            loading={loading}
          >
            <CustomerDashboard user={currentUser} onLogout={handleLogout} />
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
