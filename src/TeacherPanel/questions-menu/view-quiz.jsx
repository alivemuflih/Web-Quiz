import React from "react";
import { FaCopy } from "react-icons/fa";

const ViewQuiz = ({ quizCourses, setQuizCourses, onViewQuiz }) => {
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this quiz?")) {
      const updatedCourses = quizCourses.filter((course) => course.id !== id);
      setQuizCourses(updatedCourses);
    }
  };

  const handleCopy = (token) => {
    navigator.clipboard.writeText(token).then(() => {
      alert("Token copied to clipboard!");
    }).catch((err) => {
      alert("Failed to copy token: " + err);
    });
  };

  return (
    <div className="container">
      <div className="panel panel-primary">
        <div className="panel-heading">
          <h6 className="panel-title">Quiz Courses</h6>
        </div>
        <table className="table table-hover" id="dev-table">
          <thead>
            <tr>
              <th>Course Name</th>
              <th>Total Marks</th>
              <th>Token</th>
              <th>View Quiz</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {quizCourses.length > 0 ? (
              quizCourses.map((course) => (
                <tr key={course.id}>
                  <td>{course.courseName}</td>
                  <td>{course.totalMarks}</td>
                  <td>
                    {course.token}{" "}
                    <FaCopy
                      style={{ cursor: "pointer", marginLeft: "10px" }}
                      onClick={() => handleCopy(course.token)}
                    />
                  </td>
                  <td>
                    <button
                      className="btn btn-primary"
                      onClick={() => onViewQuiz(course)} // Trigger the quiz selection
                    >
                      View
                    </button>
                  </td>
                  <td>
                    <button
                      className="btn btn-primary-delete"
                      onClick={() => handleDelete(course.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" style={{ textAlign: "center" }}>
                  No quizzes available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewQuiz;
