import React, { useState } from "react";
import Sidebar from "./Sidebar"; // Impor Sidebar yang benar
import PendingTeachers from "./teacher_menu/pending-teacher"; // Konten Pending Teachers
import Dashboard from "./hamburger_menu/dashboard";
import Teacher from "./hamburger_menu/teacher";
import Student from "./hamburger_menu/student";
import Courses from "./hamburger_menu/courses";
import Question from "./hamburger_menu/question";
import "./admin.css";

const AdminPanel = () => {
  const [activeSection, setActiveSection] = useState("dashboard"); // Default section adalah dashboard

  // Fungsi untuk mengubah bagian yang aktif
  const handleSectionChange = (section) => {
    setActiveSection(section); // Mengubah bagian aktif
  };

  return (
    <div className="app">
      {/* Pass handleSectionChange ke Sidebar dan Teacher */}
      <Sidebar onSectionChange={handleSectionChange} />

      {/* Area konten utama */}
      <div className="main-content">
        {activeSection === "dashboard" && <Dashboard />}
        {activeSection === "teacher" && <Teacher onSectionChange={handleSectionChange} />}
        {activeSection === "student" && <Student />}
        {activeSection === "courses" && <Courses />}
        {activeSection === "question" && <Question />}
        {activeSection === "pending-teacher" && <PendingTeachers />} {/* Menambahkan kondisi untuk pending-teacher */}
      </div>
    </div>
  );
};

export default AdminPanel;
