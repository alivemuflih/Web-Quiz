import React from 'react';
import { useNavigate } from 'react-router-dom';
import './admin.css';

const Sidebar = () => {
  const navigate = useNavigate();

  // Handler for navigating to different sections
  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className="sidebar">
      <div className="profile">
        <img
          src="https://storage.googleapis.com/a1aa/image/M1gBCSZLtSoHBF8pAWVykzTmPCbFMbNoseS94uzcDXOl394JA.jpg"
          alt="Admin profile"
          width="80"
          height="80"
        />
        <h2>Admin</h2>
      </div>
      <div className="menu">
        <button className="menu-button" onClick={() => handleNavigation('/dashboard')}>
          <i className="fas fa-tachometer-alt"></i> Dashboard
        </button>
        <button className="menu-button" onClick={() => handleNavigation('/teacher')}>
          <i className="fas fa-chalkboard-teacher"></i> Teacher
        </button>
        <button className="menu-button" onClick={() => handleNavigation('/student')}>
          <i className="fas fa-user-graduate"></i> Student
        </button>
        <button className="menu-button" onClick={() => handleNavigation('/courses')}>
          <i className="fas fa-book"></i> Courses
        </button>
        <button className="menu-button" onClick={() => handleNavigation('/question')}>
          <i className="fas fa-question-circle"></i> Questions
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
