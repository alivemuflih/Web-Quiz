import React from 'react';
import { FaUserGraduate, FaChalkboardTeacher, FaBook, FaQuestionCircle, FaTachometerAlt } from "react-icons/fa";
import './admin.css';

// Sidebar component that takes onSectionChange as a prop
const Sidebar = ({ onSectionChange }) => {
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
        {/* Sidebar buttons that trigger section change */}
        <button className="menu-button" onClick={() => onSectionChange('dashboard')}>
          <i><FaTachometerAlt size={20} /></i> Dashboard
        </button>
        <button className="menu-button" onClick={() => onSectionChange('teacher')}>
          <i><FaChalkboardTeacher size={20} /></i> Teacher
        </button>
        <button className="menu-button" onClick={() => onSectionChange('student')}>
          <i><FaUserGraduate size={20} /></i> Student
        </button>
        <button className="menu-button" onClick={() => onSectionChange('courses')}>
          <i><FaBook size={20} /></i> Courses
        </button>
        <button className="menu-button" onClick={() => onSectionChange('question')}>
          <i><FaQuestionCircle size={20} /></i> Questions
        </button>
      </div>
    </div>
  );
};

export default Sidebar;

