import React, { useState, useEffect } from "react";

const EditQuestion = ({ questionToEdit, onSave, onCancel }) => {
  const [editedQuestion, setEditedQuestion] = useState(questionToEdit);

  // Update editedQuestion when questionToEdit changes
  useEffect(() => {
    setEditedQuestion(questionToEdit);
  }, [questionToEdit]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    
    if (name.startsWith("options[")) {
      const optionId = name.match(/options\[(\d+)\]/)[1];  // Get the index of the option
      const newOptions = [...editedQuestion.options];
      newOptions[optionId].option_text = value;  // Update specific option's text

      setEditedQuestion((prev) => ({
        ...prev,
        options: newOptions,  // Set updated options
      }));
    } else {
      setEditedQuestion((prev) => ({
        ...prev,
        [name]: value,  // Update other fields
      }));
    }
  };

  const handleSave = (e) => {
    e.preventDefault();

    const updatedQuestion = {
      ...editedQuestion,
      options: editedQuestion.options.map((option) => ({
        ...option,
        option_text: option.option_text.trim(),  // Clean up the text
      })),
    };

    onSave(updatedQuestion);  // Save the updated question
  };

  return (
    <div className="add-questions">
      <h2>Edit Question</h2>

      <form onSubmit={handleSave}>
        <div className="form-group">
          <label>Question</label>
          <input
            type="text"
            name="question_text"
            value={editedQuestion.question_text}
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
          {editedQuestion.options.map((option, index) => (
            <div key={option.id}>
              <input
                type="text"
                name={`options[${index}]`}  // Use the index for dynamic option name
                value={option.option_text}
                onChange={handleChange}
                placeholder={`Option ${index + 1}`}
                required
              />
            </div>
          ))}
        </div>

        <div className="form-group">
          <label>Correct Option</label>
          <select
            name="correct_option"
            value={editedQuestion.correct_option || ""}
            onChange={handleChange}
            required
          >
            <option value="">Select correct option</option>
            {editedQuestion.options.map((option) => (
              <option key={option.id} value={option.id}>
                {option.option_text}
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
