import React from "react";
import Card from "../teacher-card";
import {
  FaUserGraduate,
  FaChalkboardTeacher
} from "react-icons/fa";
import "../teacher-style.css";

const QuestionsTeacher = ({ handleSectionChange }) => {
  // Fungsi untuk menangani klik pada kartu
  const handleCardClick = (section) => {
    handleSectionChange(section); // Mengubah ke section yang dipilih
  };
  
  return (
      <div className="card-container">
        <Card
          title="Add Questions"
          count="2"
          icon={<FaUserGraduate />}
          colorClass="students"
          onClick={() => handleCardClick("AddQuiz")} // Menjalankan fungsi handleCardClick
        />
        <Card
          title="View Questions"
          count="1"
          icon={<FaChalkboardTeacher />}
          colorClass="teachers"
          onClick={() => handleCardClick("ViewQuiz")} // Menjalankan fungsi handleCardClick
        />
      </div>
  );
};

export default QuestionsTeacher;
