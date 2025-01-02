import React, { useState, useEffect, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./siswa.css";
import logo from "../assets/logo1.png";

const SoalGuru = () => {
  const { state } = useLocation();
  const { username } = state || {};

  const email = localStorage.getItem("email");
  const profileImage = email
    ? `https://www.gravatar.com/avatar/${email}`
    : "https://via.placeholder.com/50";

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
  ];

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(10);
  const [timerRunning, setTimerRunning] = useState(true);
  const [isQuizComplete, setIsQuizComplete] = useState(false);

  const navigate = useNavigate();
  const currentQuestion = questions[currentQuestionIndex] || null;

  const handleAnswer = (option) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: {
        selectedAnswer: option,
        score:
          option === currentQuestion.correctAnswer
            ? currentQuestion.points + timeLeft
            : 0,
      },
    }));
  };

  const handleNextQuestion = useCallback(() => {
    if (currentQuestionIndex >= questions.length - 1) {
      setIsQuizComplete(true);
      setTimerRunning(false); // Stop timer setelah semua soal selesai
      return;
    }
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    setTimeLeft(10);
    setTimerRunning(true);
  }, [currentQuestionIndex, questions.length]);

  useEffect(() => {
    if (!timerRunning) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleNextQuestion(); // Melanjutkan ke soal berikutnya ketika waktu habis
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timerRunning, handleNextQuestion]);

  useEffect(() => {
    if (isQuizComplete) {
      // Hitung total poin dengan menjumlahkan skor dari semua jawaban
      const totalScore = Object.values(answers).reduce(
        (total, answer) => total + (answer.score || 0),
        0
      );

      console.log("Quiz complete. Navigating to leaderboard...");
      // Navigate to Rangking page and pass the total score
      navigate("/Leaderboard", { state: { totalScore, username } });
    }
  }, [isQuizComplete, navigate, answers, username]);

  return (
    <div className="App">
      <div className="form-container-siswa">
        <div className="header">
          <img src={logo} alt="Logo" className="logo-image" />
          <img src={profileImage} alt="Profile" className="profile-image" />
        </div>
        <div className="divider"></div>

        {currentQuestion ? (
          <div className="formsiswa">
            <div className="timer-nilai-container">
              <div className="soal-no">
                Soal No. {currentQuestionIndex + 1} dari {questions.length}
              </div>
              <div className="soal-timer">Waktu: {timeLeft} detik</div>
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
                      answers[currentQuestion.id]?.selectedAnswer === option
                        ? "selected"
                        : ""
                    }`}
                    onClick={() => handleAnswer(option)}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <h2>Semua soal telah selesai!</h2>
        )}
      </div>
    </div>
  );
};

export default SoalGuru;
