import React, { useState } from "react";

const AddQuiz = ({ quizCourses, setQuizCourses, examsCourses, onSectionChange }) => {
  const [course, setCourse] = useState("");
  const [question, setQuestion] = useState("");
  const [marks, setMarks] = useState("");
  const [options, setOptions] = useState({
    option1: "",
    option2: "",
    option3: "",
    option4: "",
  });
  const [correctOption, setCorrectOption] = useState("");
  const [token, setToken] = useState("");
  const [questions, setQuestions] = useState([]); // State untuk menyimpan soal yang dimasukkan
  const [isSubmitted, setIsSubmitted] = useState(false);

  const generateToken = () => {
    return Math.random().toString(36).substr(2, 8).toUpperCase();
  };

  const handleSave = (e) => {
    e.preventDefault();

    if (!course || !question || !marks || !correctOption) {
      alert("Please fill in all fields before submitting.");
      return;
    }

    const newToken = generateToken();

    // Menambahkan soal baru ke dalam daftar soal
    const newQuestion = {
      questionText: question,
      options,
      correctOption,
      marks,
    };

    setQuestions((prevQuestions) => [...prevQuestions, newQuestion]);

    // Mengupdate course dengan soal yang baru
    const newCourse = {
      id: course,
      courseName: examsCourses.find((courseItem) => courseItem.id === parseInt(course))?.courseName,
      totalQuestions: questions.length + 1, // Menambahkan jumlah soal
      totalMarks: marks,
      token: newToken,
    };

    setQuizCourses((prevCourses) => [...prevCourses, newCourse]);
    setToken(newToken);
    setIsSubmitted(true);
    onSectionChange("ViewQuiz");
  };

  const handleOptionChange = (e) => {
    const { id, value } = e.target;
    setOptions((prevOptions) => ({
      ...prevOptions,
      [id]: value,
    }));
  };

  const handleAddQuestion = () => {
    // Reset input fields for adding another question
    setQuestion("");
    setMarks("");
    setOptions({
      option1: "",
      option2: "",
      option3: "",
      option4: "",
    });
    setCorrectOption("");
  };

  return (
    <div className="add-questions">
      <h2>Add Question</h2>

      {isSubmitted ? (
        <div className="token-display">
          <h3>Exam Created Successfully!</h3>
          <p>Your Token: <strong>{token}</strong></p>
        </div>
      ) : (
        <form onSubmit={handleSave}>
          <div className="form-group">
            <label>Select Course</label>
            <select
              value={course}
              onChange={(e) => setCourse(e.target.value)}
              required
            >
              <option value="">Select a course</option>
              {examsCourses.map((courseItem) => (
                <option key={courseItem.id} value={courseItem.id}>
                  {courseItem.courseName}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Question</label>
            <input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Marks</label>
            <input
              type="number"
              value={marks}
              onChange={(e) => setMarks(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Options</label>
            <input
              id="option1"
              value={options.option1}
              onChange={handleOptionChange}
              placeholder="Option 1"
            />
            <input
              id="option2"
              value={options.option2}
              onChange={handleOptionChange}
              placeholder="Option 2"
            />
            <input
              id="option3"
              value={options.option3}
              onChange={handleOptionChange}
              placeholder="Option 3"
            />
            <input
              id="option4"
              value={options.option4}
              onChange={handleOptionChange}
              placeholder="Option 4"
            />
          </div>

          <div className="form-group">
            <label>Correct Option</label>
            <select
              value={correctOption}
              onChange={(e) => setCorrectOption(e.target.value)}
              required
            >
              <option value="">Select correct option</option>
              <option value="option1">Option 1</option>
              <option value="option2">Option 2</option>
              <option value="option3">Option 3</option>
              <option value="option4">Option 4</option>
            </select>
          </div>

          <div className="form-button">
            <button type="button" onClick={handleAddQuestion}>Add Another Question</button>
            <button type="submit">Save Question</button>
          </div>
        </form>
      )}
    </div>
  );
};

export default AddQuiz;
