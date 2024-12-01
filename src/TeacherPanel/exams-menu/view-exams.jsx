import React from "react";

const ViewExams = ({ examCourses, setExamCourses }) => {
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this course?")) {
      const updatedCourses = examCourses.filter((course) => course.id !== id);
      setExamCourses(updatedCourses);
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

export default ViewExams;
