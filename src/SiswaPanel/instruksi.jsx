import React from "react";
import { useParams, useNavigate } from "react-router-dom";

const Instruksi = () => {
  const { courseName } = useParams(); // Ambil courseName dari URL
  const navigate = useNavigate();

  const courses = [
    {
      id: 1,
      courseName: "Math Quiz",
      totalQuestions: 10,
      instructions: "Read the questions carefully and choose the correct answer."
    },
    {
      id: 2,
      courseName: "Physics Quiz",
      totalQuestions: 15,
      instructions: "Use formulas where necessary and check your answers before submitting."
    },
  ];

  // Format ulang courseName untuk mencocokkan format URL
  const formattedCourseName = (name) => name.replace(/\s+/g, "-").toLowerCase();

  // Cari course berdasarkan courseName yang sudah diformat
  const course = courses.find((c) => formattedCourseName(c.courseName) === courseName);

  // Jika course tidak ditemukan, tampilkan pesan error
  if (!course) {
    return <div>Course not found</div>;
  }

  const handleStartQuiz = () => {
    navigate(`/Soal/${courseName}`); // Navigasi ke quiz berdasarkan ID course
  };

  return (
    <div className="instructions-section">
      <h2>Instructions for {course.courseName}</h2>
      <p>Total Questions: {course.totalQuestions}</p>
      <p>{course.instructions}</p>
      <button onClick={handleStartQuiz}>Start Quiz</button>
    </div>
  );
};

export default Instruksi;
