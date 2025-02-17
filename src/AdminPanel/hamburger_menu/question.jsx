import React from "react";
import Card from "../Card";
import {
  FaUserGraduate,
  FaChalkboardTeacher
} from "react-icons/fa";
import "../admin.css";

const Questions = ({ handleSectionChange }) => {
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
          onClick={() => handleCardClick("AddQuestions")} // Menjalankan fungsi handleCardClick
        />
        <Card
          title="View Questions"
          count="1"
          icon={<FaChalkboardTeacher />}
          colorClass="teachers"
          onClick={() => handleCardClick("ViewQuestion")} // Menjalankan fungsi handleCardClick
        />
      </div>
  );
};

export default Questions;
