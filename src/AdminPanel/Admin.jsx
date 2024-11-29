import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import Footer from "./Footer";
import Dashboard from "./hamburger_menu/dashboard";
import Teacher from "./hamburger_menu/teacher";  // Import the Teacher component
import Student from "./hamburger_menu/student";
import Questions from "./hamburger_menu/question";
import Courses from "./hamburger_menu/courses";
import PendingTeachers from "./teacher_menu/pending-teacher";
import "./admin.css";

const Admin = () => {
  const [section, setSection] = useState("Dashboard");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [loggedIn, setLoggedIn] = useState(true);

  const handleLogout = () => {
    setLoggedIn(false);
  };

  const handleSectionChange = (newSection) => {
    setSection(newSection); // This function will change the current section
  };

  if (!loggedIn) {
    return (
      <div className="login-container">
        <h2>Login</h2>
        <button onClick={() => setLoggedIn(true)}>Login</button>
      </div>
    );
  }

  return (
    <div className={`app ${sidebarCollapsed ? "sidebar-collapsed" : ""}`}>
      {/* Header */}
      <Header setSidebarCollapsed={setSidebarCollapsed} />

      {/* Sidebar */}
      <Sidebar
        sidebarCollapsed={sidebarCollapsed}
        handleSectionChange={handleSectionChange} // Passing the function as a prop
        handleLogout={handleLogout}
        currentSection={section}
      />

      {/* Main Content */}
      <main>
        <section className="content">
          {section === "Dashboard" && <Dashboard />}
          {section === "Teacher" && <Teacher handleSectionChange={handleSectionChange} />}
          {section === "Student" && <Student />}
          {section === "Courses" && <Courses />}
          {section === "Questions" && <Questions />}
          {section === "PendingTeachers" && <PendingTeachers />}
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Admin;
