import React from "react";
import Card from "../teacher-card";
import {
  FaUserGraduate,
  FaChalkboardTeacher,
} from "react-icons/fa";
import "../teacher-style.css";

const ExamsTeacher = ({ handleSectionChange }) => {
    const handleCardClick = (section) => {
      handleSectionChange(section);
    };
  
    return (
      <div className="card-container">
        <Card
          title="Add Exams"
          count="2"
          icon={<FaUserGraduate />}
          colorClass="students"
          onClick={() => handleCardClick("Exams")}
        />
        <Card
          title="View Exams"
          count="1"
          icon={<FaChalkboardTeacher />}
          colorClass="teachers"
          onClick={() => handleCardClick("ViewExams")}
        />
      </div>
    );
  };  

export default ExamsTeacher;

