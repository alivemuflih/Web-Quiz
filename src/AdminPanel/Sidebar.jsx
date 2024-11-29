import React from "react";
import {
  FaTachometerAlt,
  FaChalkboardTeacher,
  FaUserGraduate,
  FaBook,
  FaQuestionCircle,
} from "react-icons/fa";

const Sidebar = ({ sidebarCollapsed, handleSectionChange }) => {
  return (
    <aside className={`sidebar ${sidebarCollapsed ? "collapsed" : ""}`}>
      {/* Profile Section */}
      <div className="profile">
        <img
          src="https://storage.googleapis.com/a1aa/image/M1gBCSZLtSoHBF8pAWVykzTmPCbFMbNoseS94uzcDXOl394JA.jpg"
          alt="Admin profile"
          width="80"
          height="80"
        />
        <h2>Admin</h2>
      </div>

      {/* Menu Section */}
      <div className="menu">
        {/* Dashboard */}
        <button className="menu-button" onClick={() => handleSectionChange("Dashboard")}>
          <i><FaTachometerAlt size={20} /></i>
          {!sidebarCollapsed && " Dashboard"}
        </button>

        {/* Teacher Section */}
        <button className="menu-button" onClick={() => handleSectionChange("Teacher")}>
          <i><FaChalkboardTeacher size={20} /></i>
          {!sidebarCollapsed && " Teacher"}
        </button>

        {/* Student Section */}
        <button className="menu-button" onClick={() => handleSectionChange("Student")}>
          <i><FaUserGraduate size={20} /></i>
          {!sidebarCollapsed && " Student"}
        </button>

        {/* Courses Section */}
        <button className="menu-button" onClick={() => handleSectionChange("Courses")}>
          <i><FaBook size={20} /></i>
          {!sidebarCollapsed && " Courses"}
        </button>

        {/* Questions Section */}
        <button className="menu-button" onClick={() => handleSectionChange("Questions")}>
          <i><FaQuestionCircle size={20} /></i>
          {!sidebarCollapsed && " Questions"}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
