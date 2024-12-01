import React from "react";
import Card from "../Card";
import {
  FaUserGraduate,
  FaChalkboardTeacher,
} from "react-icons/fa";
import "../admin.css";

const Courses = ({ handleSectionChange }) => {
  // Fungsi untuk menangani klik pada kartu
  const handleCardClick = (section) => {
    handleSectionChange(section); // Mengubah ke section yang dipilih
  };

  return (
      <div className="card-container">
        <Card
          title="Add Courses"
          count="2"
          icon={<FaUserGraduate />}
          colorClass="students"
          onClick={() => handleCardClick("AddCourse")} // Menjalankan fungsi handleCardClick
        />
        <Card
          title="View Courses "
          count="1"
          icon={<FaChalkboardTeacher />}
          colorClass="teachers"
          onClick={() => handleCardClick("ViewCourse")} // Menjalankan fungsi handleCardClick
        />
      </div>
  );
};

export default Courses;

