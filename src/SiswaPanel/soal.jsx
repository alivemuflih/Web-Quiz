import React, { useState, useEffect, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./siswa.css";
import logo from "../assets/logo1.png";
import { FaRegClock } from "react-icons/fa";

const Soal = () => {
  const { courseId } = useParams(); // Get courseId from URL
  const navigate = useNavigate();

  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(30);
  const [totalScore, setTotalScore] = useState(0);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/courses/${courseId}/questions`
        );
        if (response.data) {
          setQuestions(response.data);
        }
      } catch (error) {
        console.error("Failed to fetch questions:", error);
      }
    };
    fetchQuestions();
  }, [courseId]);

  const currentQuestion = questions[currentQuestionIndex] || {}; // Default to an empty object if undefined

  const handleAnswer = (option) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.question_id]: option, // Make sure to use the correct `question_id`
    }));

    if (option === currentQuestion.correct_option) {
      setTotalScore((prevScore) => prevScore + currentQuestion.marks);
    }
  };

  const handleNextQuestion = useCallback(() => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      setTimeLeft(30);
    }
  }, [currentQuestionIndex, questions.length]);

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
      setTimeLeft(30);
    }
  };

  const handleSubmit = () => {
    // If a question is not answered, mark it as "Tidak Dijawab"
    if (!answers[currentQuestion.question_id]) {
      setAnswers((prev) => ({
        ...prev,
        [currentQuestion.question_id]: "Tidak Dijawab",
      }));
    }

    // Pass answers to the next page
    navigate("/Nilai", {
      state: {
        totalScore,
        answers,
        courseId,
      },
    });
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          if (!answers[currentQuestion.question_id]) {
            setAnswers((prev) => ({
              ...prev,
              [currentQuestion.question_id]: "Tidak Dijawab",
            }));
          }
          handleNextQuestion();
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [currentQuestionIndex, handleNextQuestion, answers, currentQuestion.question_id]);

  const allQuestionsAnswered = Object.keys(answers).length === questions.length;

  const email = localStorage.getItem("email");
  const profileImage = email
    ? `https://www.gravatar.com/avatar/${email}`
    : "https://via.placeholder.com/50";

  return (
    <div className="App">
      <div className="form-container-siswa">
        <div className="header">
          <img src={logo} alt="Logo" className="logo-image" />
          <img src={profileImage} alt="Profile" className="profile-image" />
        </div>
        <div className="divider"></div>
        <div className="formsiswa">
          <div className="timer-nilai-container">
            <div className="soal-no">
              Soal No. {currentQuestionIndex + 1} dari {questions.length}
            </div>
            <div className="soal-nilai">
              Nilai: {currentQuestion.marks} Poin |
            </div>
            <div className="soal-timer">
              <FaRegClock /> {timeLeft} s
            </div>
          </div>
          <div className="soal-container">
            <div className="soal">
              <p>{currentQuestion.question_text}</p>
            </div>
            <div className="jawaban">
              {currentQuestion.options?.map((option, index) => (
                <button
                  key={index}
                  className={`submit-jawaban ${
                    answers[currentQuestion.question_id] === option ? "selected" : ""
                  }`}
                  onClick={() => handleAnswer(option)}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
          <div className="navigation-buttons">
            <button
              onClick={handlePreviousQuestion}
              disabled={currentQuestionIndex === 0}
            >
              Previous
            </button>
            {currentQuestionIndex === questions.length - 1 ? (
              <button onClick={handleSubmit} disabled={!allQuestionsAnswered}>
                Submit
              </button>
            ) : (
              <button
                onClick={handleNextQuestion}
                disabled={currentQuestionIndex === questions.length - 1}
              >
                Next
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Soal;
