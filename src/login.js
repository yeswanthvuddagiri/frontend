import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import "./Login.css";

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState(localStorage.getItem("rememberedEmail") || "");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(!!localStorage.getItem("rememberedEmail"));
  const navigate = useNavigate();

  useEffect(() => {
    setPassword("");
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      const res = await fetch("https://backend-sc0x.onrender.com/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("user", JSON.stringify(data.user));
        toast.success("Login successful!");
        onLogin();

        if (rememberMe) {
          localStorage.setItem("rememberedEmail", email);
        } else {
          localStorage.removeItem("rememberedEmail");
        }

        navigate("/Chat");
      } else {
        toast.error(data.message || "Login failed");
      }
    } catch (err) {
      toast.error("Server error. Try again later.");
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleLogin} className="login-form fade-in-form" noValidate>
        <h2 className="slide-in-title">Login</h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="login-input"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="login-input"
        />

        <div className="login-options">
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />{" "}
            Remember Me
          </label>
          <p><Link to="/forgot-password">Forgot your password?</Link></p>
        </div>

        <button type="submit" className="login-button">
          Login
        </button>

        <p className="login-link">
          Don’t have an account? <Link to="/signup">Signup</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
