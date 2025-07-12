import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // for redirecting after logout

const Dashboard = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  // eslint-disable-next-line no-unused-vars
  const navigate = useNavigate();

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

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white pt-16 px-4 sm:px-6 md:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-center sm:text-left">Dashboard</h1>
          <button
            onClick={handleLogout}
            className="mt-4 sm:mt-0 bg-red-600 hover:bg-red-700 px-4 py-2 rounded-md text-sm font-medium"
          >
            Logout
          </button>
        </div>

        {/* History Section */}
        <div className="bg-gray-800 rounded-lg p-4 sm:p-6 shadow-md">
          <h2 className="text-xl font-semibold mb-4">Recommendation History</h2>

          {loading ? (
            <p className="text-center text-gray-300">Loading...</p>
          ) : history.length === 0 ? (
            <p className="text-center text-gray-300">No history available.</p>
          ) : (
            history.map((entry, index) => (
              <div key={index} className="mb-6 border-b border-gray-700 pb-4">
                <p className="text-sm text-gray-400 mb-2">
                  Recommended on: {new Date(entry.recommendedAt).toLocaleString()}
                </p>
                <ul className="space-y-2 list-disc list-inside">
                  {entry.result.map((item, i) => (
                    <li key={i}>
                      <span className="font-semibold">{item.career}</span>: {item.description}
                      {item.learningPath?.length > 0 && (
                        <ul className="list-decimal list-inside ml-4 mt-1 text-sm text-gray-300">
                          {item.learningPath.map((step, j) => (
                            <li key={j}>{step}</li>
                          ))}
                        </ul>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
