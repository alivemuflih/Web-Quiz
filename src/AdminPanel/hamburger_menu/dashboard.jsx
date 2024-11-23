import React, { useState } from "react";
import Header from "../Header";
import Card from "../Home";
import {
  FaUserGraduate,
  FaChalkboardTeacher,
  FaBook,
  FaQuestionCircle,
} from "react-icons/fa";
import "../admin.css";

const Dashboard = () => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(true); // State untuk mengontrol sidebar

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible); // Mengubah status sidebar
  };

  // Fungsi untuk menangani klik pada kartu
  const handleCardClick = (title) => {
    alert(`You clicked on ${title}`);
    // Tambahkan logika sesuai kebutuhan, seperti navigasi atau lainnya
  };

  return (
    <div className={`app ${!isSidebarVisible ? "sidebar-hidden" : ""}`}>
      <Header toggleSidebar={toggleSidebar} />

      <div className="main-content">
        <div className="card-container">
          <Card
            title="Total Students"
            count="2"
            icon={<FaUserGraduate />}
            colorClass="students"
            onClick={() => handleCardClick("Total Students")}
          />
          <Card
            title="Total Teacher"
            count="1"
            icon={<FaChalkboardTeacher />}
            colorClass="teachers"
            onClick={() => handleCardClick("Total Teacher")}
          />
          <Card
            title="Total Courses"
            count="3"
            icon={<FaBook />}
            colorClass="courses"
            onClick={() => handleCardClick("Total Courses")}
          />
          <Card
            title="Total Questions"
            count="5"
            icon={<FaQuestionCircle />}
            colorClass="questions"
            onClick={() => handleCardClick("Total Questions")}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
