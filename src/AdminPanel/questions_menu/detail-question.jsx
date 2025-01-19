import React, { useEffect, useState } from "react";
import axios from "axios";
import EditQuestion from "./edit-question"; // Impor komponen EditQuestion

const DetailQuestion = ({ course, onSectionChange }) => {
  const [questions, setQuestions] = useState([]);
  const [error, setError] = useState("");
  const [editMode, setEditMode] = useState(false); // Mode edit
  const [questionToEdit, setQuestionToEdit] = useState(null); // Soal yang sedang diedit

  useEffect(() => {
    if (course && course.id) {
      fetchQuestions();
    }
  }, [course]);

  const fetchQuestions = () => {
    axios
      .get(`http://localhost:5000/api/questions/${course.id}`)
      .then((response) => {
        setQuestions(response.data);
      })
      .catch((error) => {
        console.error("Error fetching questions:", error);
        setError("Failed to fetch questions. Please try again later.");
      });
  };

  const handleEdit = (question) => {
    setQuestionToEdit(question); // Set soal yang diedit
    setEditMode(true); // Masuk ke mode edit
  };

  const handleDelete = (questionId) => {
    if (window.confirm("Are you sure you want to delete this question?")) {
      axios
        .delete(`http://localhost:5000/api/questions/${questionId}`)
        .then(() => {
          alert("Question deleted successfully!");
          fetchQuestions(); // Refresh daftar soal
        })
        .catch((error) => {
          console.error("Error deleting question:", error);
          alert("Failed to delete question. Please try again.");
        });
    }
  };

  const handleSave = (updatedQuestion) => {
    console.log("Saving question:", updatedQuestion); // Debug data yang dikirim
    axios
      .put(`http://localhost:5000/api/questions/${updatedQuestion.id}, updatedQuestion`)
      .then(() => {
        alert("Question updated successfully!");
        setEditMode(false); // Kembali ke daftar soal
        fetchQuestions(); // Refresh daftar soal
      })
      .catch((error) => {
        console.error("Error updating question:", error);
        alert("Failed to update question. Please try again.");
      });
  };
  

  const handleCancelEdit = () => {
    setEditMode(false); // Kembali ke daftar soal
  };

  const onBack = () => {
    onSectionChange("ViewQuestion");
  };

  if (!course) {
    return <div>No course data available.</div>;
  }

  // Mode Edit
  if (editMode && questionToEdit) {
    return (
      <EditQuestion
        questionToEdit={questionToEdit}  // Ubah ke questionToEdit
        onSave={handleSave}
        onCancel={handleCancelEdit}
      />
    );
  }
  
  // Daftar Soal
  return (
    <div className="container-detail-question">
      <div className="header-container">
        <div className="header2">{course.courseName} - Questions</div>
        <button className="back-button" onClick={onBack}>
          <i className="fas fa-arrow-left"></i> Back to View
        </button>
      </div>

      {error && <div style={{ color: "red" }}>{error}</div>}

      <div className="questions-list">
        {questions.length > 0 ? (
          questions.map((question, index) => (
            <div className="question-card" key={question.id}>
              <div className="question-number">Question {index + 1}</div>
              <div className="question-text">{question.question_text}</div>
              <ul className="options">
                {question.options.map((option) => (
                  <li key={option.id}>{option.option_text}</li>
                ))}
              </ul>
              <p className="correct-option">
                Correct Option:{" "}
                {question.correct_option
                  ? question.correct_option // Gunakan teks dari correct_option
                  : "No correct option available"}
              </p>


              <div className="action-buttons">
                <button
                  className="edit-button"
                  onClick={() => handleEdit(question)}
                >
                  <i className="fas fa-edit"></i> Edit
                </button>
                <button
                  className="delete-button"
                  onClick={() => handleDelete(question.id)}
                >
                  <i className="fas fa-trash"></i> Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No questions available for this course.</p>
        )}
      </div>
    </div>
  );
};

export default DetailQuestion;
