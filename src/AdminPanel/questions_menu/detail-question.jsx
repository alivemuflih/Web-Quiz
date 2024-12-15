import React from "react";

const DetailQuestion = ({ quiz, onBack }) => {
  return (
    <div className="detail-question-container">
      <h2 className="course-title">{quiz.courseName} - Questions</h2>
      <button className="back-button" onClick={onBack}>Back to View</button>
      <div className="questions-list">
        {quiz.questions.length > 0 ? (
          quiz.questions.map((question, index) => (
            <div className="question-card" key={index}>
              <p className="question-text"><strong>{question.questionText}</strong></p>
              <p className="marks">Marks: <strong>{question.marks}</strong></p>
              <div className="options">
                <strong>Options:</strong>
                <ul>
                  {Object.keys(question.options).map((optionKey) => (
                    <li key={optionKey}>{question.options[optionKey]}</li>
                  ))}
                </ul>
              </div>
              <p className="correct-option">
                Correct Option: <strong>{question.correctOption}</strong>
              </p>
            </div>
          ))
        ) : (
          <p className="no-questions">No questions available for this course.</p>
        )}
      </div>
    </div>
  );
};

export default DetailQuestion;
