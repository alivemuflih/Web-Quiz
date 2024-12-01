import React from "react";
import Card from "../Card";
import {
  FaUserGraduate,
  FaChalkboardTeacher,
  FaBook,
  FaQuestionCircle,
} from "react-icons/fa";
import "../admin.css";

const Dashboard = () => {
    return (
    <div className="card-container">
        <Card
          title="Total Students"
          count="2"
          icon={<FaUserGraduate />}
          colorClass="students"
        />
        <Card
          title="Total Teacher"
          count="1"
          icon={<FaChalkboardTeacher />}
          colorClass="teachers"
        />
        <Card
          title="Total Courses"
          count="3"
          icon={<FaBook />}
          colorClass="courses"
        />
        <Card
          title="Total Questions"
          count="5"
          icon={<FaQuestionCircle />}
          colorClass="questions"
        />
    </div>
  );
};

export default Dashboard;
