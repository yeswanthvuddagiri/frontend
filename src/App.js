import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate
} from 'react-router-dom';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './App.css';
import './Navbar.css';

import Chat from './Chat';
import Login from './login';
import Signup from './sigup';
import Career from './Career';
import ForgotPassword from './ForgotPassword';
import ResetPassword from './ResetPassword';
import Dashboard from './Dashboard';
import Footer from './Footer';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [loading, setLoading] = useState(true);
  const [redirectToLogin, setRedirectToLogin] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    setIsAuthenticated(!!storedUser);
    setLoading(false);
  }, []);

  if (loading) return <div>Loading...</div>;

  if (redirectToLogin) {
    setRedirectToLogin(false);
    return <Navigate to="/login" />;
  }

  return (
    <Router>
      <div className="app-container">
        
 <div className="navbar">
  <div className="logo">CareerAssistant</div>

  <div className="menu-icon" onClick={() => {
    const menu = document.querySelector('.nav-links');
    menu.classList.toggle('show');
  }}>
    <div></div>
    <div></div>
    <div></div>
  </div>

  <ul className="nav-links">
    <li><a href="/dashboard">Dashboard</a></li>
    <li><a href="/career">Career</a></li>
    <li><a href="/chat">Chat</a></li>
    <li><a href="/login">Login</a></li>
    <li><a href="/signup">Signup</a></li>
  </ul>
</div>
        <Routes>
          <Route
            path="/"
            element={
              isAuthenticated ? (
                <Navigate to="/dashboard" />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/dashboard"
            element={
              isAuthenticated ? (
                <Dashboard setIsAuthenticated={setIsAuthenticated} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/Career"
            element={isAuthenticated ? <Career /> : <Navigate to="/login" />}
          />
          <Route
            path="/Chat"
            element={isAuthenticated ? <Chat /> : <Navigate to="/login" />}
          />
          <Route
            path="/login"
            element={
              !isAuthenticated ? (
                <Login onLogin={() => setIsAuthenticated(true)} />
              ) : (
                <Navigate to="/dashboard" />
              )
            }
          />
          <Route
            path="/signup"
            element={
              !isAuthenticated ? (
                <Signup onSignup={() => setIsAuthenticated(true)} />
              ) : (
                <Navigate to="/dashboard" />
              )
            }
          />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
        </Routes>

        <Footer /> {/* ✅ Shown only once at the bottom */}
        <ToastContainer />
      </div>
    </Router>
  );
}

export default App;
