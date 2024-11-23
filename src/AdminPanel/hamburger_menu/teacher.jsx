import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Header";
import Card from "../Home";
import "../admin.css";

const Teacher = () => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  return (
    <div className={`app ${!isSidebarVisible ? "sidebar-hidden" : ""}`}>
      <Header toggleSidebar={toggleSidebar} />

      <div className="main-content">
        <div className="card-container">
          <Card
            title="Total Teacher"
            count="2"
            iconClass="fas fa-user-graduate"
            colorClass="students"
          />
          <Card
            title="Total Pending Teacher"
            count="1"
            iconClass="fas fa-chalkboard-teacher"
            colorClass="teachers"
            onClick={() => navigate("/pending-teacher")}
          />
        </div>
      </div>
    </div>
  );
};

export default Teacher;
