import React, { useState } from "react";

const AddQuestion = ({ quizCourses, setQuizCourses, examsCourses, onSectionChange }) => {
  const [course, setCourse] = useState("");
  const [question, setQuestion] = useState("");
  const [marks, setMarks] = useState("");
  const [options, setOptions] = useState({
    option1: "",
    option2: "",
  });
  const [correctOption, setCorrectOption] = useState("");

  const handleSave = (e) => {
    e.preventDefault();

    // Cek apakah semua field telah diisi
    if (!course || !question || !marks || !correctOption) {
      alert("Please fill in all fields before submitting.");
      return;
    }

    const newQuestion = {
      questionText: question,
      options,
      correctOption,
      marks: parseInt(marks),
    };

    // Cari apakah kursus sudah ada
    const existingCourseIndex = quizCourses.findIndex((courseItem) => courseItem.id === parseInt(course));

    if (existingCourseIndex !== -1) {
      // Jika kursus sudah ada, tambahkan soal ke kursus tersebut
      const updatedQuizCourses = [...quizCourses];
      updatedQuizCourses[existingCourseIndex].questions.push(newQuestion);
      updatedQuizCourses[existingCourseIndex].totalQuestions = updatedQuizCourses[existingCourseIndex].questions.length;
      updatedQuizCourses[existingCourseIndex].totalMarks = updatedQuizCourses[existingCourseIndex].questions.reduce(
        (total, q) => total + q.marks,
        0
      );
      setQuizCourses(updatedQuizCourses);
    } else {
      // Jika kursus belum ada, buat kursus baru dengan soal pertama
      const newCourse = {
        id: parseInt(course),
        courseName: examsCourses.find((courseItem) => courseItem.id === parseInt(course))?.courseName,
        totalQuestions: 1,
        totalMarks: parseInt(marks),
        questions: [newQuestion],
      };
      setQuizCourses([...quizCourses, newCourse]);
    }

    // Reset input fields setelah soal ditambahkan
    handleAddQuestion();
    onSectionChange("ViewQuestion");
  };

  const handleOptionChange = (e) => {
    const { id, value } = e.target;
    setOptions((prevOptions) => ({
      ...prevOptions,
      [id]: value,
    }));
  };

  const handleAddOption = () => {
    const newOptionKey = `option${Object.keys(options).length + 1}`;
    setOptions((prevOptions) => ({
      ...prevOptions,
      [newOptionKey]: "",
    }));
  };

  const handleAddAnotherQuestion = () => {
    // Cek apakah semua field telah diisi sebelum menambah soal berikutnya
    if (!course || !question || !marks || !correctOption) {
      alert("Please fill in all fields before adding another question.");
      return;
    }

    const newQuestion = {
      questionText: question,
      options,
      correctOption,
      marks: parseInt(marks),
    };

    // Tambahkan soal ke quizCourses, tanpa reset state
    const existingCourseIndex = quizCourses.findIndex((courseItem) => courseItem.id === parseInt(course));

    if (existingCourseIndex !== -1) {
      // Jika kursus sudah ada, tambahkan soal ke kursus tersebut
      const updatedQuizCourses = [...quizCourses];
      updatedQuizCourses[existingCourseIndex].questions.push(newQuestion);
      updatedQuizCourses[existingCourseIndex].totalQuestions = updatedQuizCourses[existingCourseIndex].questions.length;
      updatedQuizCourses[existingCourseIndex].totalMarks = updatedQuizCourses[existingCourseIndex].questions.reduce(
        (total, q) => total + q.marks,
        0
      );
      setQuizCourses(updatedQuizCourses);
    } else {
      // Jika kursus belum ada, buat kursus baru dengan soal pertama
      const newCourse = {
        id: parseInt(course),
        courseName: examsCourses.find((courseItem) => courseItem.id === parseInt(course))?.courseName,
        totalQuestions: 1,
        totalMarks: parseInt(marks),
        questions: [newQuestion],
      };
      setQuizCourses([...quizCourses, newCourse]);
    }

    // Reset input fields setelah soal ditambahkan
    handleAddQuestion();
  };

  const handleAddQuestion = () => {
    // Reset input fields untuk menambah soal baru setelah soal disimpan
    setQuestion("");
    setMarks("");
    setOptions({
      option1: "",
      option2: "",
    });
    setCorrectOption("");
  };

  return (
    <div className="add-questions">
      <h2>Add Question</h2>

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
          {Object.keys(options).map((optionKey) => (
            <div key={optionKey} className="option-input">
              <label>{`Option ${optionKey.replace('option', '')}`}</label>
              <input
                id={optionKey}
                value={options[optionKey]}
                onChange={handleOptionChange}
              />
            </div>
          ))}

          {/* Add gap between options and the Add button */}
          <div className="add-option-btn">
            <button type="button" onClick={handleAddOption}>
              Add Another Option
            </button>
          </div>
        </div>

        <div className="form-group">
          <label>Correct Option</label>
          <select
            value={correctOption}
            onChange={(e) => setCorrectOption(e.target.value)}
            required
          >
            <option value="">Select correct option</option>
            {Object.keys(options).map((optionKey) => (
              <option key={optionKey} value={optionKey}>
                {options[optionKey]}
              </option>
            ))}
          </select>
        </div>

        <div className="form-button">
          <button type="button" onClick={handleAddAnotherQuestion}>Add Another Question</button>
          <button type="submit">Save Question</button>
        </div>
      </form>
    </div>
  );
};

export default AddQuestion;
