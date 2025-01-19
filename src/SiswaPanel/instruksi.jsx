import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const Instruksi = () => {
  const { courseId } = useParams(); // Mengambil courseId dari URL
  const navigate = useNavigate();

  const [courses, setCourses] = useState([]); // State untuk daftar kursus
  const [course, setCourse] = useState(null); // State untuk kursus yang dipilih
  const [loading, setLoading] = useState(true); // State loading
  const [error, setError] = useState(null); // State error

  // Mengambil data semua kursus
  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/api/courses`)
      .then((response) => {
        setCourses(response.data); // Menyimpan daftar kursus
        setLoading(false); // Set loading false setelah data diambil
      })
      .catch((error) => {
        console.error("Terjadi kesalahan:", error);
        setError("Tidak dapat mengambil data kursus. Coba lagi nanti.");
        setLoading(false); // Set loading false jika terjadi error
      });
  }, []);

  // Mencari kursus berdasarkan courseId dari URL
  useEffect(() => {
    if (courses.length > 0) {
      const selectedCourse = courses.find(course => course.courseName.toLowerCase() === courseId.toLowerCase());
      if (selectedCourse) {
        setCourse(selectedCourse);
      } else {
        setError("Kursus tidak ditemukan");
      }
    }
  }, [courses, courseId]);

  // Menampilkan loading atau error
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!course) {
    return <div>Kursus tidak ditemukan</div>;
  }

  const handleStartQuiz = () => {
    navigate(`/course/${course.id}/soal`); // Navigasi ke halaman soal berdasarkan courseId numerik
  };

  return (
    <div className="instructions-section">
      <h2>Instruksi untuk {course.courseName}</h2>
      <p>Total Soal: {course.totalQuestions}</p>
      <p>{course.instructions}</p>
      <button onClick={handleStartQuiz}>Mulai Ujian</button>
    </div>
  );
};

export default Instruksi;
