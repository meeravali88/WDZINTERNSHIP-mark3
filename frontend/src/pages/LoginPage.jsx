import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // ✅ Apply gradient background only when this page is active
  useEffect(() => {
    document.body.classList.add("auth-page");
    return () => document.body.classList.remove("auth-page");
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();

    // ✅ Load registered users
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // ✅ Match user credentials
    const foundUser = users.find(
      (user) =>
        user.email.toLowerCase() === email.toLowerCase() &&
        user.password === password
    );

    if (!foundUser) {
      alert("❌ Invalid email or password!");
      return;
    }

    // ✅ Update last login timestamp
    foundUser.lastLogin = new Date().toLocaleString();

    // ✅ Save session to localStorage
    localStorage.setItem("loggedInUser", JSON.stringify(foundUser));

    // ✅ Welcome message
    alert(`✅ Welcome back, ${foundUser.name || "User"}!`);

    // ✅ Redirect based on role
    switch (foundUser.role) {
      case "manager":
        navigate("/manager");
        break;
      case "employee":
        navigate("/employee");
        break;
      case "customer":
        navigate("/customer");
        break;
      default:
        alert("⚠️ Role not found. Redirecting to login...");
        navigate("/");
    }
  };

  return (
    <div className="login-container">
      <h2 className="form-title">Login</h2>

    

      {/* --- Login Form --- */}
      <form onSubmit={handleLogin} className="login-form">
        {/* Email Field */}
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

        {/* Password Field */}
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

        {/* Submit Button */}
        <button type="submit" className="submit-button">
          Login
        </button>
      </form>

      {/* --- Bottom Link --- */}
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
