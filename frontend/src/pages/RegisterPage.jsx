import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";


function RegisterPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    role: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    document.body.classList.add("auth-page");
    return () => document.body.classList.remove("auth-page");
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError("");
    setSuccess("");
  };

  const validatePassword = (password) => {
    const firstCharUppercase = /^[A-Z]/;
    return firstCharUppercase.test(password) && password.length >= 8;
  };

  const handleRegister = (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!validatePassword(formData.password)) {
      setError(
        "Password must start with a capital letter and be at least 8 characters long."
      );
      return;
    }

    const existingUsers = JSON.parse(localStorage.getItem("users")) || [];

    const existingUser = existingUsers.find(
      (user) => user.email.toLowerCase() === formData.email.toLowerCase()
    );

    if (existingUser) {
      setError(
        `⚠️ This email is already registered as a ${existingUser.role.toUpperCase()}. Please log in instead.`
      );
      setTimeout(() => navigate("/"), 1500);
      return;
    }
    const normalizedRole = formData.role.trim().toLowerCase();

    const newUser = {
      name: formData.fullName.trim(),
      email: formData.email.trim(),
      password: formData.password,
      role: normalizedRole,
      registeredAt: new Date().toLocaleString(),
      lastLogin: new Date().toLocaleString(),
    };

    existingUsers.push(newUser);
    localStorage.setItem("users", JSON.stringify(existingUsers));
    setSuccess(`Registration successful as ${normalizedRole}! Redirecting...`);
    setTimeout(() => {
      switch (normalizedRole) {
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
          navigate("/");
      }
    }, 1000);
  };

  return (
    <div className="register-container">
      <h2 className="form-title">Create an Account</h2>

      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}

      <form onSubmit={handleRegister} className="register-form">
        <div className="input-wrapper">
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            className="input-field"
            value={formData.fullName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="input-wrapper">
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="input-field"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="input-wrapper">
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="input-field"
            value={formData.password}
            onChange={handleChange}
            required
          />
          
        </div>

        <div className="input-wrapper">
          <select
            name="role"
            className="input-field"
            value={formData.role}
            onChange={handleChange}
            required
          >
            <option value="" disabled>
              Select Role
            </option>
            <option value="manager">Manager</option>
            <option value="employee">Employee</option>
            <option value="customer">Customer</option>
          </select>
        </div>

        <button type="submit" className="submit-button">
          Register
        </button>
      </form>

      <p className="signup-text">
        Already have an account?{" "}
        <Link to="/" className="register-link">
          Login
        </Link>
      </p>
    </div>
  );
}

export default RegisterPage;
