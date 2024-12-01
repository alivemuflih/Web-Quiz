import React from "react";
import TeacherCard from "../teacher-card";
import { FaUserGraduate, FaChalkboardTeacher, FaBook } from "react-icons/fa";
import "../teacher-style.css";

const DashboardTeacher = () => {
  return (
    <div className="card-container">
      <TeacherCard
        title="Total Students"
        count="2"
        icon={<FaUserGraduate />}
        colorClass="students"
      />
      <TeacherCard
        title="Total Exams"
        count="1"
        icon={<FaChalkboardTeacher />}
        colorClass="teachers"
      />
      <TeacherCard
        title="Total Questions"
        count="3"
        icon={<FaBook />}
        colorClass="courses"
      />
    </div>
  );
};

export default DashboardTeacher;
