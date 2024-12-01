import React, { useState } from "react";

const Exams = ({ examCourses, setExamCourses, onSectionChange }) => {
  const [courseName, setCourseName] = useState("");
  const [totalQuestions, setTotalQuestions] = useState("");
  const [totalMarks, setTotalMarks] = useState("");

  const handleAddCourse = () => {
    if (!courseName || !totalQuestions || !totalMarks) {
      alert("Please fill in all fields.");
      return;
    }

    const newCourse = {
      id: examCourses.length + 1,  // ID berdasarkan panjang array eksisting
      courseName,
      totalQuestions: totalQuestions,
      totalMarks: totalMarks,
    };

    // Memperbarui daftar kursus
    setExamCourses([...examCourses, newCourse]);
    onSectionChange("ViewExams");  // Berpindah ke bagian ViewExams setelah menambahkan kursus
  };

  return (
    <div className="course">
      <h2>ADD COURSE</h2>
      <div className="form-group">
        <label htmlFor="course-name">Course Name</label>
        <input
          id="course-name"
          type="text"
          value={courseName}
          onChange={(e) => setCourseName(e.target.value)}
          placeholder="Enter Course Name"
        />
      </div>
      <div className="form-group">
        <label htmlFor="total-questions">Total Questions</label>
        <input
          id="total-questions"
          type="number"
          value={totalQuestions}
          onChange={(e) => setTotalQuestions(e.target.value)}
          placeholder="Enter Total Questions"
        />
      </div>
      <div className="form-group">
        <label htmlFor="total-marks">Total Marks</label>
        <input
          id="total-marks"
          type="number"
          value={totalMarks}
          onChange={(e) => setTotalMarks(e.target.value)}
          placeholder="Enter Total Marks"
        />
      </div>
      <div className="form-group">
        <button type="button" onClick={handleAddCourse}>
          ADD
        </button>
      </div>
    </div>
  );
};

export default Exams;
