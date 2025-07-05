import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate
} from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
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

  const handleLogout = () => {
    localStorage.removeItem("user");
    setIsAuthenticated(false);
    setRedirectToLogin(true);
    toast.success("Logged out");
  };

  if (redirectToLogin) {
    setRedirectToLogin(false);
    return <Navigate to="/login" />;
  }

  return (
    <Router>
      <div className="app-container">
        <nav className="navbar">
          {isAuthenticated && <Link className="nav-link" to="/dashboard">Dashboard</Link>}
          <Link className="nav-link" to="/Career">Career Assistant</Link>
          <Link className="nav-link" to="/Chat">Chat</Link>

          {!isAuthenticated && <Link className="nav-link" to="/login">Login</Link>}
          {!isAuthenticated && <Link className="nav-link" to="/signup">Signup</Link>}
        </nav>

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
