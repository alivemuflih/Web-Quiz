import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const Nilai = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { totalScore, answers, courseId } = location.state || {};

  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch questions from backend based on courseId
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/courses/${courseId}/questions`
        );
        setQuestions(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching questions:", error);
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [courseId]);

  const getAnswerStatus = (questionId) => {
    const userAnswer = answers?.[questionId];
    const correctAnswer = questions?.find(
      (q) => q.question_id === questionId
    )?.correct_option;
    return userAnswer === correctAnswer ? "Benar" : "Salah";
  };

  const goHome = () => {
    navigate("/HomeSiswa");
  };

  const retryQuiz = () => {
    navigate(`/course/${courseId}/Soal`);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

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
              const userAnswer = answers[question.question_id] || "Tidak Dijawab";
              const correctAnswer = question.correct_option;
              const isCorrect = getAnswerStatus(question.question_id) === "Benar";

              return (
                <li key={question.question_id}>
                  <strong>{question.question_text}</strong>
                  <br />
                  Jawaban Anda:{" "}
                  <span className={isCorrect ? "correct" : "incorrect"}>
                    {userAnswer}
                  </span>
                  <br />
                  {!isCorrect && (
                    <>
                      Jawaban Benar: <span className="benar">{correctAnswer}</span>
                      <br />
                    </>
                  )}
                  Status:{" "}
                  <span className={isCorrect ? "correct" : "incorrect"}>
                    {getAnswerStatus(question.question_id)}
                  </span>
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
