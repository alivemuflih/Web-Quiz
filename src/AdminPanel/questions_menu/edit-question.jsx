import React, { useState } from "react";

const EditQuestion = ({ questionToEdit, onSave, onCancel }) => {
  const [editedQuestion, setEditedQuestion] = useState(questionToEdit);

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name.startsWith("options[")) {
      const optionKey = name.match(/options\[(.+?)\]/)[1];
      setEditedQuestion((prev) => ({
        ...prev,
        options: {
          ...prev.options,
          [optionKey]: value,
        },
      }));
    } else {
      setEditedQuestion((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    onSave(editedQuestion);
  };

  return (
    <div className="add-questions">
      <h2>Edit Question</h2>

      <form onSubmit={handleSave}>
        <div className="form-group">
          <label>Question</label>
          <input
            type="text"
            name="questionText"
            value={editedQuestion.questionText}
            onChange={handleChange}
            required
            placeholder="Enter the question text"
          />
        </div>

        <div className="form-group">
          <label>Marks</label>
          <input
            type="number"
            name="marks"
            value={editedQuestion.marks}
            onChange={handleChange}
            required
            placeholder="Enter marks for the question"
          />
        </div>

        <div className="form-group">
          <label>Options</label>
          {Object.keys(editedQuestion.options).map((optionKey) => (
            <input
              key={optionKey}
              type="text"
              name={`options[${optionKey}]`}
              value={editedQuestion.options[optionKey]}
              onChange={handleChange}
              placeholder={`Option ${optionKey}`}
              required
            />
          ))}
        </div>

        <div className="form-group">
          <label>Correct Option</label>
          <select
            name="correctOption"
            value={editedQuestion.correctOption}
            onChange={handleChange}
            required
          >
            <option value="">Select correct option</option>
            {Object.keys(editedQuestion.options).map((optionKey) => (
              <option key={optionKey} value={optionKey}>
                {optionKey}: {editedQuestion.options[optionKey]}
              </option>
            ))}
          </select>
        </div>

        <div className="form-button">
          <button type="submit">Save Question</button>
          <button type="button" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditQuestion;
