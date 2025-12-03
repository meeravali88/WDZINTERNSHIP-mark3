import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function LoginPage({ setCurrentUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    document.body.classList.add("auth-page");
    return () => document.body.classList.remove("auth-page");
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const employees = JSON.parse(localStorage.getItem("builderp_employees")) || [];

    let foundUser = null;
    foundUser = users.find(
      (user) =>
        user.email.toLowerCase() === email.toLowerCase() &&
        user.password === password
    );

    if (!foundUser) {
      foundUser = employees.find(
        (emp) =>
          emp.email?.toLowerCase() === email.toLowerCase() &&
          emp.password === password
      );

      if (foundUser) {
        foundUser.role = "employee";
      }
    }

    if (!foundUser) {
      alert("Invalid email or password!");
      return;
    }

    foundUser.lastLogin = new Date().toLocaleString();
    localStorage.setItem("loggedInUser", JSON.stringify(foundUser));
    setCurrentUser(foundUser);

    alert(`✅ Welcome back, ${foundUser.name || "User"}!`);
    switch (foundUser.role) {
      case "manager":
        navigate("/manager");
        break;

      case "employee":
        navigate("/employee");
        break;

      case "customer":
        navigate("/play");
        break;

      default:
        alert("Role not found. Redirecting to login...");
        navigate("/login");
    }
  };

  return (
    <div className="login-container">
      <h2 className="form-title">Login</h2>

      <form onSubmit={handleLogin} className="login-form">

        <div className="input-wrapper">
          <input
            type="email"
            placeholder="Email"
            className="input-field"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <i className="material-symbols-outlined">mail</i>
        </div>

        <div className="input-wrapper">
          <input
            type="password"
            placeholder="Password"
            className="input-field"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <i className="material-symbols-outlined">lock</i>
        </div>

        <button type="submit" className="submit-button">Login</button>
      </form>

      <p className="signup-text">
        Don’t have an account?{" "}
        <Link to="/register" className="register-link">
          Register
        </Link>
      </p>
    </div>
  );
}

export default LoginPage;
