import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <div className="header">
        <div className="elite-fitness-box">Elite Fitness</div>
      </div>
      <div className="main-content">
        <h1 className="lets-get-moving">LETS GET MOVING</h1>
        <p className="journey-text">Your Journey to Fitness Starts Here</p>
        <div className="action-buttons">
          <button 
            className="action-btn"
            onClick={() => navigate('/workouts')}
          >
            Start your journey
          </button>
          <button 
            className="action-btn"
            onClick={() => navigate('/plans')}
          >
            Discover Your Plan
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;
