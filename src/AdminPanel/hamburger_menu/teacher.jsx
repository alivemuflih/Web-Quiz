import React from "react";
import Card from "../Card";
import {
  FaUserGraduate,
  FaChalkboardTeacher,
} from "react-icons/fa";
import "../admin.css";

const Teacher = ({ handleSectionChange }) => {
  // Fungsi untuk menangani klik pada kartu
  const handleCardClick = (section) => {
    handleSectionChange(section); // Mengubah ke section yang dipilih
  };

  return (
    <div className="card-container">
      {/* Card untuk Total Teacher */}
      <Card
        title="Total Teacher"
        count="2"
        icon={<FaUserGraduate />}
        colorClass="students"
        onClick={() => handleCardClick("Teacher")} // Mengubah ke section "Teacher"
      />
      
      {/* Card untuk Total Pending Teacher */}
      <Card
        title="Total Pending Teacher"
        count="1"
        icon={<FaChalkboardTeacher />}
        colorClass="teachers"
        onClick={() => handleCardClick("PendingTeachers")} // Mengubah ke section "PendingTeachers"
      />
    </div>
  );
};

export default Teacher;
