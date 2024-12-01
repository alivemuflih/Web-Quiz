import React from "react";
import Card from "../Card";
import {
  FaUserGraduate,
  FaChalkboardTeacher
} from "react-icons/fa";
import "../admin.css";

const Student = ({ handleSectionChange }) => {
  // Fungsi untuk menangani klik pada kartu
  const handleCardClick = (section) => {
    handleSectionChange(section); // Mengubah ke section yang dipilih
  };
  
  return (
    <div className="card-container">
    <Card
      title="Total Student"
      count="2"
      icon={<FaUserGraduate />}
      colorClass="students"
      onClick={() => handleCardClick("TotalStudent")} // Menjalankan fungsi handleCardClick
    />
    <Card
      title="View Marks"
      count="1"
      icon={<FaChalkboardTeacher />}
      colorClass="teachers"
      onClick={() => handleCardClick("ViewMarks")} // Menjalankan fungsi handleCardClick
    />
  </div>
  );
};

export default Student;
