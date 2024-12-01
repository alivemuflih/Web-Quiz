import React, { useState } from "react";
import TeacherSidebar from "./teacher.sidebar";
import TeacherHeader from "./teacher-header";
import TeacherFooter from "./teacher-footer";
import DashboardTeacher from "./Teacher-hamburger/dashboard-teacher";
import ExamsTeacher from "./Teacher-hamburger/exams-teacher";
import QuestionsTeacher from "./Teacher-hamburger/questions-teacher";
import "./teacher-style.css";
import Exams from "./exams-menu/add-exams";
import AddQuiz from "./questions-menu/add-quiz";
import ViewExams from "./exams-menu/view-exams";
import ViewQuiz from "./questions-menu/view-quiz";

const HomeTeacher = () => {
  const [section, setSection] = useState("DashboardTeacher");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [loggedIn, setLoggedIn] = useState(true);
  const [examCourses, setExamCourses] = useState([]); // Untuk Exams
  const [quizCourses, setQuizCourses] = useState([]); // Untuk Quiz

  const handleLogout = () => {
    setLoggedIn(false);
  };

  const handleSectionChange = (newSection) => {
    setSection(newSection);
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
      {/* Header */}
      <TeacherHeader setSidebarCollapsed={setSidebarCollapsed} />

      {/* Sidebar */}
      <TeacherSidebar
        sidebarCollapsed={sidebarCollapsed}
        handleSectionChange={handleSectionChange}
        handleLogout={handleLogout}
        currentSection={section}
      />

      {/* Main Content */}
      <main>
        <section className="content">
          {section === "DashboardTeacher" && <DashboardTeacher />}
          {section === "TeacherExams" && (<ExamsTeacher handleSectionChange={handleSectionChange} />)}
          {section === "TeacherQuestions" && (<QuestionsTeacher handleSectionChange={handleSectionChange} />)}
          {section === "Exams" && (
            <Exams
              examCourses={examCourses}
              setExamCourses={setExamCourses}
              onSectionChange={handleSectionChange}
            />
          )}
          {section === "ViewExams" && (<ViewExams examCourses={examCourses} setExamCourses={setExamCourses} />)}
          {section === "AddQuiz" && ( 
            <AddQuiz 
              quizCourses={quizCourses} 
              setQuizCourses={setQuizCourses}
              examsCourses={examCourses} 
              onSectionChange={handleSectionChange} 
            /> 
          )}
          {section === "ViewQuiz" && ( <ViewQuiz quizCourses={quizCourses} setQuizCourses={setQuizCourses} /> )}
        </section>
      </main>

      {/* Footer */}
      <TeacherFooter />
    </div>
  );
};

export default HomeTeacher;
