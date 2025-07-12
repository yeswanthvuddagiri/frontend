import React, { useEffect, useState } from "react";
import axios from "axios";
import './dasboard.css';
import { useNavigate } from "react-router-dom"; // for redirecting after logout


const Dashboard = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
// eslint-disable-next-line no-unused-vars
const navigate = useNavigate();

  // Fetch user history
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || !user.email) {
      console.error("User not logged in.");
      return;
    }

    const fetchHistory = async () => {
      try {
        const res = await axios.get(`https://backend-sc0x.onrender.com/history/${user.email}`);
        setHistory(res.data.history || []);
        console.log("Fetched history:", res.data.history);
      } catch (err) {
        console.error("Failed to fetch history", err);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  // Logout handler
  const handleLogout = () => {
    localStorage.removeItem("user");
window.location.href = "/login";
  };

  return (
    <div className="dashboard-container" style={{ paddingTop: "60px" }}>
      <div className="dashboard-header">
        <h1 style={{ margin: "0 auto" }}>Dashboard</h1>
  <button className="logout-btn" onClick={handleLogout} style={{margin:"0 auto"}}>Logout</button>
  
</div>

      <div className="history-section">
        <h2 className="history-title">Recommendation History</h2>

        {loading ? (
          <p style={{ textAlign: "center", color: "#fff" }}>Loading...</p>
        ) : history.length === 0 ? (
          <p style={{ textAlign: "center", color: "#fff" }}>No history available.</p>
        ) : (
          history.map((entry, index) => (
            <div className="history-entry" key={index}>
              <p className="history-time">
                Recommended on: {new Date(entry.recommendedAt).toLocaleString()}
              </p>
              <ul className="history-list">
                {entry.result.map((item, i) => (
                  <li key={i}>
                    <strong>{item.career}</strong>: {item.description}
                    <ul>
                      {item.learningPath?.map((step, j) => (
                        <li key={j}>{step}</li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Dashboard;
