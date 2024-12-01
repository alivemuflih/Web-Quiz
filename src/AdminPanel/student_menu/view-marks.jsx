import React, { useState } from "react";
import "../admin.css";

const ViewMarks = () => {
  const [questions] = useState([
    {
      id: 1,
      courseName: "Mathematics",
      totalQuestions: 10,
      totalMarks: 100,
    },
    {
      id: 2,
      courseName: "Science",
      totalQuestions: 15,
      totalMarks: 150,
    },
  ]);

  return (
    <div className="container">
      <div className="panel panel-primary">
        <div className="panel-heading">
          <h6 className="panel-title">Exams</h6>
        </div>
        <table className="table table-hover" id="dev-table">
          <thead>
            <tr>
              <th>Exam Name</th>
              <th>View Marks</th>
            </tr>
          </thead>
          <tbody>
            {questions.map((question) => (
              <tr key={question.id}>
                <td>{question.courseName}</td>
                <td>
                  <button
                    className="btn btn-primary"
                    onClick={() => alert(`Viewing questions for ${question.courseName}`)}
                  >
                    View Marks
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewMarks;
