import React from "react";
import Card from "../Card";
import {
  FaUserGraduate,
  FaChalkboardTeacher,
  FaBook,
  FaQuestionCircle,
} from "react-icons/fa";
import "../admin.css";

const Dashboard = ({ handleSectionChange }) => {
  // Fungsi untuk menangani klik pada kartu
  const handleCardClick = (title) => {
    alert(`You clicked on ${title}`);
    // Menambahkan logika untuk berpindah ke bagian terkait
    handleSectionChange(title); // Misalnya, mengubah bagian yang sedang ditampilkan
  };
  
  return (
    <div className="card-container">
        <Card
          title="Total Students"
          count="2"
          icon={<FaUserGraduate />}
          colorClass="students"
          onClick={() => handleCardClick("Total Students")} // Menjalankan fungsi handleCardClick
        />
        <Card
          title="Total Teacher"
          count="1"
          icon={<FaChalkboardTeacher />}
          colorClass="teachers"
          onClick={() => handleCardClick("Total Teacher")} // Menjalankan fungsi handleCardClick
        />
        <Card
          title="Total Courses"
          count="3"
          icon={<FaBook />}
          colorClass="courses"
          onClick={() => handleCardClick("Total Courses")} // Menjalankan fungsi handleCardClick
        />
        <Card
          title="Total Questions"
          count="5"
          icon={<FaQuestionCircle />}
          colorClass="questions"
          onClick={() => handleCardClick("Total Questions")} // Menjalankan fungsi handleCardClick
        />
    </div>
  );
};

export default Dashboard;
