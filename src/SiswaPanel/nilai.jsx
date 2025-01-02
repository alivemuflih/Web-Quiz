import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

// Fungsi untuk mengacak urutan soal
const shuffleQuestions = (questions) => {
  const shuffled = [...questions];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]; // Swap elements
  }
  return shuffled;
};

const Nilai = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { totalScore, questions, answers } = location.state || {};

  const getAnswerStatus = (questionId) => {
    const userAnswer = answers?.[questionId];
    const correctAnswer = questions?.find((q) => q.id === questionId)?.correctAnswer;
    return userAnswer === correctAnswer ? "Benar" : "Salah";
  };

  const goHome = () => {
    navigate("/HomeSiswa");
  };

  const retryQuiz = () => {
    const shuffledQuestions = shuffleQuestions(questions);
    navigate("/Soal/:CourseName", {
      state: {
        username: location.state?.username,
        questions: shuffledQuestions, // Kirimkan soal yang sudah diacak
        answers: {}, // Reset jawaban
        totalScore: 0, // Reset skor
      },
    });
  };

  if (!questions || !answers || typeof totalScore !== "number") {
    return <div>Data tidak lengkap.</div>;
  }

  return (
    <div className="container-score">
      <div className="score">
        <h2>Skor Anda: {totalScore}</h2>
        <div className="question-details">
          <h3>Detail Jawaban</h3>
          <ul>
            {questions.map((question) => {
              const userAnswer = answers[question.id] || "Tidak Dijawab";
              const correctAnswer = question.correctAnswer;
              const isCorrect = getAnswerStatus(question.id) === "Benar";

              return (
                <li key={question.id}>
                  <strong>{question.question}</strong>
                  <br />
                  Jawaban Anda:{" "}
                  <span className={isCorrect ? "correct" : "incorrect"}>{userAnswer}</span>
                  <br />
                  {!isCorrect && (
                    <>
                      Jawaban Benar: <span className="benar">{correctAnswer}</span>
                      <br />
                    </>
                  )}
                  Status:{" "}
                  <span className={isCorrect ? "correct" : "incorrect"}>{getAnswerStatus(question.id)}</span>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="button-peringkat">
          <button onClick={retryQuiz}>Kerjakan Lagi</button>
          <button onClick={goHome}>Ke Home</button>
        </div>
      </div>
    </div>
  );
};

export default Nilai;
