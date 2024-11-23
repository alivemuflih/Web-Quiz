import React, { useState } from "react";
import Sidebar from "./Sidebar"; // Sidebar component
import PendingTeachers from "./teacher_menu/pending-teacher"; // Content for Pending Teachers
import "./admin.css";
import Dashboard from "./hamburger_menu/dashboard";
import Teacher from "./hamburger_menu/teacher";
import Student from "./hamburger_menu/student";
import Courses from "./hamburger_menu/courses";
import Question from "./hamburger_menu/question";

const AdminPanel = () => {
  const [activeSection, setActiveSection] = useState("dashboard"); // default section is dashboard

  // Function to change the active section
  const handleSectionChange = (section) => {
    setActiveSection(section); // Change the active section
  };

  return (
    <div className="app">
      {/* Pass handleSectionChange to Sidebar */}
      <Sidebar onSectionChange={handleSectionChange} />

      {/* Main content area */}
      <div className="main-content">
        {activeSection === "dashboard" && <Dashboard />}
        {activeSection === "teacher" && <Teacher />}
        {activeSection === "student" && <Student />}{" "}
        {/* Add content for student */}
        {activeSection === "courses" && <Courses />}{" "}
        {/* Add content for courses */}
        {activeSection === "question" && <Question />}{" "}
        {/* Add content for questions */}
      </div>
    </div>
  );
};

export default AdminPanel;
