import React, { useEffect, useState } from "react";
import axios from "axios";

const AddQuestion = ({ onSectionChange }) => {
  const [quizCourses, setQuizCourses] = useState([]);
  const [course, setCourse] = useState("");
  const [question, setQuestion] = useState("");
  const [marks, setMarks] = useState("");
  const [options, setOptions] = useState(["", ""]); // 2 opsi awal
  const [correctOption, setCorrectOption] = useState("");
  const [error, setError] = useState(""); // Untuk menangani error fetching

  // Muat data kursus dari backend
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/courses")
      .then((response) => setQuizCourses(response.data))
      .catch((error) => {
        console.error("Error fetching courses:", error);
        setError("Failed to fetch courses. Please try again later.");
      });
  }, []);

  // Validasi marks
  const handleMarksChange = (e) => {
    const value = e.target.value;
    if (value >= 0) {
      setMarks(value);
    }
  };

  // Validasi saat menyimpan soal
  const handleSaveQuestion = (e) => {
    e.preventDefault();

    if (!course || !question || !marks || !correctOption || options.some(opt => !opt.trim())) {
      alert("Please fill in all fields before submitting.");
      return;
    }

    const newQuestion = {
      questionText: question,
      options,
      correctOption,
      marks: parseInt(marks),
    };

    // Pastikan ID kursus disertakan dalam URL
    axios
      .post(`http://localhost:5000/api/courses/${course}/questions`, newQuestion)
      .then(() => {
        // Reset form setelah soal pertama disimpan
        resetForm();
        // Pindah ke halaman View Question setelah menyimpan
        onSectionChange("ViewQuestion");
      })
      .catch((error) => {
        console.error("Error saving question:", error);
        alert("Failed to save the question. Please try again.");
      });
  };

  // Reset form setelah soal ditambahkan
  const resetForm = () => {
    setQuestion("");
    setMarks("");
    setOptions(["", ""]); // Kembali ke 2 opsi awal
    setCorrectOption("");
  };

  // Menangani perubahan pada opsi jawaban
  const handleOptionChange = (e, index) => {
    const updatedOptions = [...options];
    updatedOptions[index] = e.target.value;
    setOptions(updatedOptions);
  };

  // Menambah opsi jawaban baru
  const handleAddOption = () => {
    setOptions([...options, ""]); // Menambah opsi baru dengan string kosong
  };

  // Menangani "Add Another Question"
  const handleAddAnotherQuestion = (e) => {
    e.preventDefault(); // Prevent form submission that would trigger page change

    if (!course || !question || !marks || !correctOption || options.some(opt => !opt.trim())) {
      alert("Please fill in all fields before submitting.");
      return;
    }

    const newQuestion = {
      questionText: question,
      options,
      correctOption,
      marks: parseInt(marks),
    };

    // Simpan soal ke backend
    axios
      .post(`http://localhost:5000/api/courses/${course}/questions`, newQuestion)
      .then(() => {
        // Reset form untuk soal berikutnya
        resetForm();
        // Tidak perlu pindah ke halaman View Question
      })
      .catch((error) => {
        console.error("Error saving question:", error);
        alert("Failed to save the question. Please try again.");
      });
  };

  return (
    <div className="add-questions">
      <h2>Add Question</h2>

      {error && <p className="error-message">{error}</p>} {/* Tampilkan pesan error */}

      <form>
        <div className="form-group">
          <label>Select Course</label>
          <select
            value={course}
            onChange={(e) => setCourse(e.target.value)}
            required
          >
            <option value="">Select a course</option>
            {quizCourses.map((courseItem) => (
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
            onChange={handleMarksChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Options</label>
          {options.map((option, index) => (
            <div key={index} className="option-input">
              <label>{`Option ${index + 1}`}</label>
              <input
                value={option}
                onChange={(e) => handleOptionChange(e, index)}
                placeholder={`Enter Option ${index + 1}`}
              />
            </div>
          ))}
          <div className="add-option-btn">
            <button
              type="button"
              onClick={handleAddOption}
            >
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
            {options.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div className="form-button">
          <button type="button" onClick={handleAddAnotherQuestion}>
            Add Another Question
          </button>
          <button type="button" onClick={handleSaveQuestion}>
            Save Question
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddQuestion;
