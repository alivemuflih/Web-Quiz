import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "./siswa.css";
import logo from "../assets/logo1.png";
import { FaRegClock } from "react-icons/fa";

const Soal = () => {
  const email = localStorage.getItem("email");
  const profileImage = email
    ? `https://www.gravatar.com/avatar/${email}`
    : null;

  const questions = [
    {
      id: 1,
      question: "Apa hasil dari 2 + 2?",
      options: ["2", "3", "4", "5"],
      correctAnswer: "4",
      points: 10,
    },
    {
      id: 2,
      question: "Apa ibu kota Indonesia?",
      options: ["Bandung", "Jakarta", "Surabaya", "Medan"],
      correctAnswer: "Jakarta",
      points: 10,
    },
    {
      id: 3,
      question: "Berapa jumlah warna dalam pelangi?",
      options: ["5", "6", "7", "8"],
      correctAnswer: "7",
      points: 10,
    },
  ];

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(30);
  const [totalScore, setTotalScore] = useState(0);

  const currentQuestion = questions[currentQuestionIndex];
  const navigate = useNavigate();

  const handleAnswer = (option) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: option,
    }));

    if (option === currentQuestion.correctAnswer) {
      setTotalScore((prevScore) => prevScore + currentQuestion.points);
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
    if (!answers[currentQuestion.id]) {
      setAnswers((prev) => ({
        ...prev,
        [currentQuestion.id]: "Tidak Dijawab",
      }));
    }

    navigate("/Nilai", {
      state: {
        totalScore,
        questions,
        answers,
      },
    });
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          if (!answers[currentQuestion.id]) {
            setAnswers((prev) => ({
              ...prev,
              [currentQuestion.id]: "Tidak Dijawab",
            }));
          }
          handleNextQuestion();
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer); // Bersihkan timer saat komponen di-unmount
  }, [currentQuestionIndex, handleNextQuestion, answers, currentQuestion.id]);

  const allQuestionsAnswered = Object.keys(answers).length === questions.length;

  return (
    <div className="App">
      <div className="form-container-siswa">
        <div className="header">
          <img src={logo} alt="Logo" className="logo-image" />
          <img
            src={profileImage || "https://via.placeholder.com/50"}
            alt="Profile"
            className="profile-image"
          />
        </div>
        <div className="divider"></div>
        <div className="formsiswa">
          <div className="timer-nilai-container">
            <div className="soal-no">
              Soal No. {currentQuestionIndex + 1} dari {questions.length}
            </div>
            <div className="soal-nilai">
              Nilai: {currentQuestion.points} Poin |
            </div>
            <div className="soal-timer">
              <FaRegClock /> {timeLeft} s
            </div>
          </div>
          <div className="soal-container">
            <div className="soal">
              <p>{currentQuestion.question}</p>
            </div>
            <div className="jawaban">
              {currentQuestion.options.map((option, index) => (
                <button
                  key={index}
                  className={`submit-jawaban ${
                    answers[currentQuestion.id] === option ? "selected" : ""
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
