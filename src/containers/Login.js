import React, { useState, useEffect } from "react";
import "../css/Login.css";
import { login } from "../actions/authActions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [successMessage, setSuccessMessage] = useState(""); // Success message state
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Get state from Redux
  const { user, error, loading } = useSelector((state) => state.auth);

  // Handle form submission and validation
  const handleLogin = (e) => {
    e.preventDefault();

    // Reset previous errors and success message
    setUsernameError("");
    setPasswordError("");
    setSuccessMessage("");

    // Validate username and password
    if (!username) {
      setUsernameError("Username is required");
      return;
    }
    if (username.length < 3) {
      setUsernameError("Username must be at least 3 characters long");
      return;
    }

    if (!password) {
      setPasswordError("Password is required");
      return;
    }

    if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters long");
      return;
    }

    // Dispatch login action
    dispatch(login(username, password));

    if (user) {
      setSuccessMessage("Welcome! You are logged in."); // Set success message
      setTimeout(() => {
        setSuccessMessage(""); // Hide success message after 3 seconds
        navigate("/flights");  // Redirect to dashboard
      }, 1000);  // Message disappears after 3 seconds
    }
  };

  // Show success message and auto redirect to dashboard after successful login
  useEffect(() => {
    if (user) {
      setSuccessMessage("Welcome! You are logged in."); // Set success message
      setTimeout(() => {
        setSuccessMessage(""); // Hide success message after 3 seconds
        navigate("/flights");  // Redirect to dashboard
      }, 1000);  // Message disappears after 3 seconds
    }
  }, [user, navigate]);

  // Error display logic
  useEffect(() => {
    if (error) {
      alert(error); // You can customize this to show a styled error in the component instead of alert
    }
  }, [error]);

  return (
    <React.Fragment>
      <div className="login-container">
        {/* Success Message Displayed at the Top */}
        {successMessage && <div className="success">{successMessage}</div>}

        <form onSubmit={handleLogin}>
          <h2>Login</h2>
          <div className="input-group">
            <input
              type="text"
              value={username}
              placeholder="Username"
              onChange={(e) => setUserName(e.target.value)}
              required
            />
          </div>
          {usernameError && <p className="error">{usernameError}</p>}

          <div className="input-group">
            <input
              type="password"
              value={password}
              placeholder="Enter Password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
           
          </div>
          {passwordError && <p className="error">{passwordError}</p>}

         

          {/* Submit Button */}
          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </React.Fragment>
  );
};

export default Login;
