import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";
import Header from "./Header";
import Footer from "./Footer";
import Dashboard from "./hamburger_menu/dashboard";
import Teacher from "./hamburger_menu/teacher";
import Student from "./hamburger_menu/student";
import Questions from "./hamburger_menu/question";
import Courses from "./hamburger_menu/courses";
import PendingTeachers from "./teacher_menu/pending-teacher";
import "./admin.css";
import AddCourse from "./courses_menu/add-courses";
import AddQuestions from "./questions_menu/add-question";
import TotalTeacher from "./teacher_menu/total-teacher";
import TotalStudent from "./student_menu/total-student";
import ViewQuestion from "./questions_menu/view-question";
import ViewCourse from "./courses_menu/view-course";
import ViewMarks from "./student_menu/view-marks";
import DetailQuestion from "./questions_menu/detail-question";

const Admin = () => {
  const [section, setSection] = useState("Dashboard");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [loggedIn, setLoggedIn] = useState(true);
  const [examCourses, setExamCourses] = useState([]);
  const [quizCourses, setQuizCourses] = useState([]);
  const [courseId, setSelectedQuiz] = useState(null);
  const [questions, setQuestions] = useState([]); // State untuk menyimpan soal

  // Ambil soal dari backend berdasarkan courseId
  useEffect(() => {
    console.log("useEffect triggered. Current courseId:", courseId); // Log ketika useEffect dijalankan
  
    if (courseId && courseId.id) {
      console.log("Fetching questions for course:", courseId.id); // Log sebelum pengambilan data
  
      axios
        .get(`http://localhost:5000/api/questions/${courseId.id}`) // Menggunakan courseId.id untuk mengambil soal
        .then((response) => {
          console.log("Questions fetched successfully:", response.data); // Log jika data berhasil diambil
          setQuestions(response.data); // Set soal yang diterima dari backend
        })
        .catch((error) => {
          console.error("Error fetching questions:", error); // Log error jika terjadi kesalahan
        });
    } else {
      console.log("No valid courseId provided, skipping data fetch."); // Log jika tidak ada courseId yang valid
    }
  }, [courseId]); // Efek dijalankan setiap kali courseId berubah  
  

  const handleLogout = () => {
    setLoggedIn(false);
  };

  const handleSectionChange = (newSection, data) => {
    setSection(newSection);
    if (newSection === "DetailQuestion" && data) {
      setSelectedQuiz(data.course);
    }
  };

  if (!loggedIn) {
    return (
      <div className="login-container">
        <h2>Login</h2>
        <button onClick={() => setLoggedIn(true)}>Login</button>
      </div>
    );
  }

  return (
    <div className={`app ${sidebarCollapsed ? "sidebar-collapsed" : ""}`}>
      <Header setSidebarCollapsed={setSidebarCollapsed} />
      <Sidebar
        sidebarCollapsed={sidebarCollapsed}
        handleSectionChange={handleSectionChange}
        handleLogout={handleLogout}
        currentSection={section}
      />
      <main>
        <section className="content">
          {section === "Dashboard" && <Dashboard />}
          {section === "Teacher" && <Teacher handleSectionChange={handleSectionChange} />}
          {section === "Student" && <Student handleSectionChange={handleSectionChange} />}
          {section === "Courses" && <Courses handleSectionChange={handleSectionChange} />}
          {section === "Questions" && <Questions handleSectionChange={handleSectionChange} />}
          {section === "PendingTeachers" && <PendingTeachers />}
          {section === "TotalTeacher" && <TotalTeacher />}
          {section === "TotalStudent" && <TotalStudent />}
          {section === "ViewMarks" && <ViewMarks />}
          {section === "AddCourse" && (
            <AddCourse
              examCourses={examCourses}
              setExamCourses={setExamCourses}
              onSectionChange={handleSectionChange}
            />
          )}
          {section === "ViewCourse" && (
            <ViewCourse examCourses={examCourses} setExamCourses={setExamCourses} />
          )}
          {section === "AddQuestions" && (
            <AddQuestions
              quizCourses={quizCourses}
              setQuizCourses={setQuizCourses}
              examsCourses={examCourses}
              onSectionChange={handleSectionChange}
            />
          )}
          {section === "ViewQuestion" && (
            <ViewQuestion
              quizCourses={quizCourses}
              setQuizCourses={setQuizCourses}
              onSectionChange={handleSectionChange}
            />
          )}
          {section === "DetailQuestion" && courseId && (
            <DetailQuestion
              course={courseId} // Mengirimkan courseId yang berisi data kursus
              onSectionChange={handleSectionChange}
            />
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Admin;
