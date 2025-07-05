import React, { useState } from 'react';
import './App.css';

const Career = () => {
  const [skills, setSkills] = useState('');
  const [interests, setInterests] = useState('');
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

 const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  setError('');
  setRecommendations([]);

  const user = JSON.parse(localStorage.getItem("user")); // ✅ get email

  try {
    const response = await fetch('http://localhost:5000/recommend', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        skills,
        interests,
        email: user?.email, // ✅ send email
      }),
    });

    if (!response.ok) throw new Error('Failed to fetch recommendations');

    const data = await response.json();
    setRecommendations(data.result);
  } catch (err) {
    setError(err.message || 'Something went wrong');
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="container" >
      <h1>Career AI Assistant 🚀</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Skills:</label>
          <textarea value={skills} placeholder="e.g Python, Java, C, DBMS, SQL, etc " onChange={(e) => setSkills(e.target.value)} rows="1" />
        </div>
        <div>
          <label>Interests:</label>
          <textarea value={interests} placeholder="e.g Software Developer, Mern stack developer, Data analyst" onChange={(e) => setInterests(e.target.value)} rows="1" />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Loading...' : 'Get Career Recommendations'}
        </button>
      </form>

      {error && <p className="error">{error}</p>}

      <div className="recommendations">
        {recommendations.map((item, idx) => (
          <div key={idx} className="career-card">
            <h3>{item.career}</h3>
            <p>{item.description}</p>
            <ul>
              {item.learningPath.map((step, i) => (
                <li key={i}>{step}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Career;
