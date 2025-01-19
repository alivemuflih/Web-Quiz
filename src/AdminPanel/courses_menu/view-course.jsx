import React, { useEffect } from "react";
import axios from "axios";

const ViewCourse = ({ examCourses, setExamCourses }) => {
  useEffect(() => {
    // Ambil data kursus dari backend saat komponen dimuat
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/courses`)
      .then((response) => {
        setExamCourses(response.data); // Perbarui state dengan data dari backend
      })
      .catch((error) => {
        console.error("Error fetching courses:", error.response?.data || error.message);
        alert("Failed to fetch courses.");
      });
  }, [setExamCourses]);

  const handleDelete = (id) => {
    console.log("Deleting course with ID:", id); // Debugging
    if (window.confirm("Are you sure you want to delete this course?")) {
      axios
        .delete(`${process.env.REACT_APP_API_URL}/api/courses/${id}`)
        .then(() => {
          const updatedCourses = examCourses.filter((course) => course.id !== id);
          setExamCourses(updatedCourses);
          alert("Course deleted successfully.");
        })
        .catch((error) => {
          console.error("Error deleting course:", error.response?.data || error.message);
          alert("Failed to delete course.");
        });
    }
  };

  return (
    <div className="container">
      <div className="panel panel-primary">
        <div className="panel-heading">
          <h6 className="panel-title">Exam Courses</h6>
        </div>
        <table className="table table-hover" id="dev-table">
          <thead>
            <tr>
              <th>Course Name</th>
              <th>Total Questions</th>
              <th>Total Marks</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {examCourses.length > 0 ? (
              examCourses.map((course) => (
                <tr key={course.id}>
                  <td>{course.courseName}</td>
                  <td>{course.totalQuestions}</td>
                  <td>{course.totalMarks}</td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDelete(course.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" style={{ textAlign: "center" }}>
                  No courses available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewCourse;
