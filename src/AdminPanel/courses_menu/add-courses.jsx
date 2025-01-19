import React, { useState } from "react";
import axios from "axios";

const AddCourse = ({ examCourses, setExamCourses, onSectionChange }) => {
  const [courseName, setCourseName] = useState("");
  const [totalQuestions, setTotalQuestions] = useState("");
  const [totalMarks, setTotalMarks] = useState("");

  const handleAddCourse = () => {
    // Validasi input
    if (!courseName.trim()) {
      alert("Course Name cannot be empty.");
      return;
    }

    if (!totalQuestions || totalQuestions <= 0) {
      alert("Total Questions must be a positive number.");
      return;
    }

    if (!totalMarks || totalMarks <= 0) {
      alert("Total Marks must be a positive number.");
      return;
    }

    const newCourse = {
      courseName: courseName.trim(),
      totalQuestions: parseInt(totalQuestions, 10),
      totalMarks: parseInt(totalMarks, 10),
    };


    // Kirim data ke backend menggunakan POST
    axios.post(`${process.env.REACT_APP_API_URL}/api/courses`, newCourse)
      .then((response) => {
        setExamCourses([...examCourses, response.data]);
        onSectionChange("ViewCourse");
      })
      .catch((error) => {
        console.error("Error adding course:", error);
        const errorMessage = error.response?.data?.error || "Failed to add course. Please try again.";
        alert(errorMessage);
      });
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

export default AddCourse;
