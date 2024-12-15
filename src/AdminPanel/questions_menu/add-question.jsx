import React, { useState } from "react";

const AddQuestion = ({ quizCourses, setQuizCourses, examsCourses, onSectionChange }) => {
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

  const handleAddQuestion = () => {
    // Reset input fields untuk menambah soal baru setelah soal disimpan
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
          <button type="button" onClick={handleAddAnotherQuestion}>Add Another Question</button>
          <button type="submit">Save Question</button>
        </div>
      </form>
    </div>
  );
};

export default AddQuestion;

