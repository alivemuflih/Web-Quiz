import React from "react";
import Card from "../Card";
import {
  FaUserGraduate,
  FaChalkboardTeacher,
  FaBook
} from "react-icons/fa";
import "../admin.css";

const Student = ({ handleSectionChange }) => {
  // Fungsi untuk menangani klik pada kartu
  const handleCardClick = (title) => {
    alert(`You clicked on ${title}`);
    // Menambahkan logika untuk berpindah ke bagian terkait
    handleSectionChange(title); // Misalnya, mengubah bagian yang sedang ditampilkan
  };
  
  return (
    <div className="card-container">
    <Card
      title="Total Teacher"
      count="2"
      icon={<FaUserGraduate />}
      colorClass="students"
      onClick={() => handleCardClick("Total Students")} // Menjalankan fungsi handleCardClick
    />
    <Card
      title="Total Pending Teacher"
      count="1"
      icon={<FaChalkboardTeacher />}
      colorClass="teachers"
      onClick={() => handleCardClick("Total Teacher")} // Menjalankan fungsi handleCardClick
    />
    <Card
      title="Total Pending Teacher"
      count="1"
      icon={<FaBook />}
      colorClass="courses"
      onClick={() => handleCardClick("Total Teacher")} // Menjalankan fungsi handleCardClick
    />
  </div>
  );
};

export default Student;
