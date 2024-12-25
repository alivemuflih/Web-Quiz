import React, { useState } from "react";
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
  const [selectedQuiz, setSelectedQuiz] = useState(null);

  const handleLogout = () => {
    setLoggedIn(false);
  };

  const handleSectionChange = (newSection) => {
    setSection(newSection);
  };

  const handleDeleteQuestion = (questionIndex) => {
    if (!selectedQuiz) return;

    const updatedQuestions = selectedQuiz.questions.filter((_, index) => index !== questionIndex);
    const updatedQuiz = { ...selectedQuiz, questions: updatedQuestions };

    const updatedQuizCourses = quizCourses.map((quiz) =>
      quiz.id === updatedQuiz.id ? updatedQuiz : quiz
    );

    setQuizCourses(updatedQuizCourses);
    setSelectedQuiz(updatedQuiz);
  };

  const handleEditQuestion = (questionIndex, updatedQuestion) => {
    if (!selectedQuiz) return;

    const updatedQuestions = selectedQuiz.questions.map((question, index) =>
      index === questionIndex ? updatedQuestion : question
    );

    const updatedQuiz = { ...selectedQuiz, questions: updatedQuestions };

    const updatedQuizCourses = quizCourses.map((quiz) =>
      quiz.id === updatedQuiz.id ? updatedQuiz : quiz
    );

    setQuizCourses(updatedQuizCourses);
    setSelectedQuiz(updatedQuiz);
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
              onViewQuiz={(quiz) => {
                setSelectedQuiz(quiz);
                handleSectionChange("DetailQuiz");
              }}
            />
          )}
          {section === "DetailQuiz" && (
            <DetailQuestion
              quiz={selectedQuiz}
              onBack={() => handleSectionChange("ViewQuestion")}
              onDelete={handleDeleteQuestion}
              onEdit={handleEditQuestion} // Tambahkan fungsi onEdit
            />
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Admin;
