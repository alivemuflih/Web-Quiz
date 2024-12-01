import React from "react";

const ViewQuestion = ({ quizCourses, setQuizCourses }) => {
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this quiz?")) {
      const updatedCourses = quizCourses.filter((course) => course.id !== id);
      setQuizCourses(updatedCourses);
    }
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
              <th>Marks</th>
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
                    <button
                      className="btn btn-primary"
                      onClick={() => handleDelete(course.id)}
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

export default ViewQuestion;
