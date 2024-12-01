import React from "react";
import {
  FaTachometerAlt,
  FaBook,
  FaQuestionCircle,
} from "react-icons/fa";
import Teacher from "../assets/alive.png";

const TeacherSidebar = ({ sidebarCollapsed, handleSectionChange }) => {
  return (
    <aside className={`sidebar ${sidebarCollapsed ? "collapsed" : ""}`}>
      {/* Profile Section */}
      <div className="profile">
        <img
          src={Teacher} alt="Teacher"
          width="80"
          height="80"
        />
        <h2>Teacher</h2>
      </div>

      {/* Menu Section */}
      <div className="menu">
        {/* Dashboard */}
        <button className="menu-button" onClick={() => handleSectionChange("DashboardTeacher")}>
          <i><FaTachometerAlt size={20} /></i>
          {!sidebarCollapsed && " Dashboard"}
        </button>

        {/* Teacher Section */}
        <button className="menu-button" onClick={() => handleSectionChange("TeacherExams")}>
          <i><FaBook size={20} /></i>
          {!sidebarCollapsed && " Exams"}
        </button>

        {/* Student Section */}
        <button className="menu-button" onClick={() => handleSectionChange("TeacherQuestions")}>
          <i><FaQuestionCircle size={20} /></i>
          {!sidebarCollapsed && " Questions"}
        </button>
      </div>
    </aside>
  );
};

export default TeacherSidebar;
