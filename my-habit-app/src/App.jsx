import { useState } from 'react';

function App() {
  // Basic state for user data
  const [userData, setUserData] = useState({
    level: 1,
    experience: 0,
    experienceToNextLevel: 100,
    streak: 0
  });

  // Empty habits array for now
  const [habits, setHabits] = useState([]);

  // Simple view toggle
  const [activeView, setActiveView] = useState('dashboard');

  return (
    <div className="container py-4">
      {/* Tab navigation */}
      <ul className="nav nav-tabs mb-4">
        <li className="nav-item">
          <button
            className={`nav-link ${activeView === 'dashboard' ? 'active' : ''}`}
            onClick={() => setActiveView('dashboard')}
          >
            Dashboard
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeView === 'stats' ? 'active' : ''}`}
            onClick={() => setActiveView('stats')}
          >
            Statistics
          </button>
        </li>
      </ul>

      {/* ProfileBanner - shows at the top of both views */}
      <div className="card mb-4">
        <div className="card-body">
          <h2>Level {userData.level}</h2>
          <p>XP: {userData.experience}/{userData.experienceToNextLevel}</p>
          <div className="progress">
            <div
              className="progress-bar"
              style={{ width: `${(userData.experience / userData.experienceToNextLevel) * 100}%` }}
            ></div>
          </div>
          <p className="mt-2">Current streak: {userData.streak} days</p>
        </div>
      </div>

      {/* Main content area */}
      {activeView === 'dashboard' ? (
        <>
          {/* Add new habit button */}
          <button className="btn btn-primary mb-4">Add New Habit</button>

          {/* Placeholder for habit list */}
          <div className="row">
            <div className="col-md-6 mb-3">
              <div className="card">
                <div className="card-header d-flex justify-content-between">
                  <span>Example Habit</span>
                  <span className="badge bg-info">Medium</span>
                </div>
                <div className="card-body">
                  <p>This is a placeholder for your habits</p>
                  <button className="btn btn-success">Complete</button>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="stats-view">
          <h3>Your Statistics</h3>
          <p>Statistics will be displayed here</p>
        </div>
      )}

      {/* Commented out modal for now */}
      {/* 
      <div className="modal" tabIndex="-1" role="dialog">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Add New Habit</h5>
              <button type="button" className="btn-close"></button>
            </div>
            <div className="modal-body">
              Form would go here
            </div>
          </div>
        </div>
      </div>
      */}
    </div>
  );
}

export default App;