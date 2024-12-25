import React, { useState } from "react";
import EditQuestion from "./edit-question";

const DetailQuestion = ({ quiz, onBack, onDelete, onEdit }) => {
  const [editingQuestion, setEditingQuestion] = useState(null);

  const handleDelete = (index) => {
    if (window.confirm("Are you sure you want to delete this question?")) {
      onDelete(index);
    }
  };

  const handleEdit = (index) => {
    const questionToEdit = quiz.questions[index];
    setEditingQuestion({ ...questionToEdit, index });
  };

  const handleSaveEdit = (updatedQuestion) => {
    onEdit(updatedQuestion.index, updatedQuestion);
    setEditingQuestion(null);
  };

  const handleCancelEdit = () => {
    setEditingQuestion(null);
  };

  return (
    <div className="container-detail-question">
      {!editingQuestion && (
        <div className="header-container">
          <div className="header2">{quiz.courseName} - Questions</div>
          <button className="back-button" onClick={onBack}>
            <i className="fas fa-arrow-left"></i> Back to View
          </button>
        </div>
      )}

      {editingQuestion ? (
        <EditQuestion
          questionToEdit={editingQuestion}
          onSave={handleSaveEdit}
          onCancel={handleCancelEdit}
        />
      ) : (
        <div className="questions-list">
          {quiz.questions.length > 0 ? (
            quiz.questions.map((question, index) => (
              <div className="question-card" key={index}>
                <div className="question-number">Question {index + 1}</div>
                <div className="question-text">{question.questionText}</div>
                <p>Marks: {question.marks}</p>
                <p>Options:</p>
                <ul className="options">
                  {Object.keys(question.options).map((optionKey) => (
                    <li key={optionKey}>{question.options[optionKey]}</li>
                  ))}
                </ul>
                <p className="correct-option">
                  Correct Option: {question.options[question.correctOption]}
                </p>
                <div className="action-buttons">
                  <button
                    className="edit-button"
                    onClick={() => handleEdit(index)}
                  >
                    <i className="fas fa-edit"></i> Edit
                  </button>
                  <button
                    className="delete-button"
                    onClick={() => handleDelete(index)}
                  >
                    <i className="fas fa-trash"></i> Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="no-questions">No questions available for this course.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default DetailQuestion;
