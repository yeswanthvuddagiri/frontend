import React, { useState } from "react";
import { toast } from "react-toastify";
import './ForgotPassword.css'; // 💡 External CSS

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("https://backend-sc0x.onrender.com/forgot-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    const data = await res.json();
    res.ok ? toast.success(data.message) : toast.error(data.message);
  };

  return (
    <div className="fp-container">
      <div className="fp-card">
        <h2>Forgot Password?</h2>
        <p>Enter your email to receive reset instructions.</p>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Enter your email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button type="submit">Send Reset Link</button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
