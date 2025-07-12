import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./Signup.css";

const Signup = ({ onSignup }) => {
  const [email, setEmail] = useState("");
  const [createpassword, setCreatePassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    if (createpassword !== confirmpassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const res = await fetch("https://backend-sc0x.onrender.com/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, createpassword }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("user", JSON.stringify(data.user));
        toast.success("Signup successful!");
        onSignup();
        navigate("/Chat");
      } else {
        toast.error(data.message || "Signup failed");
      }
    } catch (err) {
      toast.error("Server error. Please try again later.");
    }
  };

  return (
    <div className="signup-container">
      <form onSubmit={handleSignup} className="signup-form fade-in-form">
        <h2 className="slide-in-title">Signup</h2>

        <input
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="signup-input"
        />

        <input
          type="password"
          placeholder="Create Password"
          required
          value={createpassword}
          onChange={(e) => setCreatePassword(e.target.value)}
          className="signup-input"
        />

        <input
          type="password"
          placeholder="Confirm Password"
          required
          value={confirmpassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="signup-input"
        />

        <button type="submit" className="signup-button animated-button">
          Signup
        </button>

        <p className="signup-link-text">
          Already have an account? <Link to="/login" className="log">Login</Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
