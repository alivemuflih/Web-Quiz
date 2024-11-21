// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Login/Login.js"; //ini mengarah ke Login.js
import Siswa from "./MainMenu/Siswa.jsx"; //mengarah ke Siswa.jsx
import MataPelajaran from "./MainMenu/MataPelajaran.jsx"; //mengarah ke MataPelajaran.jsx
import Soal from "./MainMenu/Soal.jsx"; //mengarah ke Soal.jsx
import Admin from "./AdminPanel/Admin.jsx"; //mengarah ke Soal.jsx
import LoginForm from "./Login/LoginForm.jsx";
import Dashboard from "./AdminPanel/dashboard.jsx";
import Teacher from "./AdminPanel/teacher.jsx";
import Student from "./AdminPanel/student.jsx";
import Courses from "./AdminPanel/courses.jsx";
import Question from "./AdminPanel/question.jsx";

function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Login />} />
        <Route path="/siswa" element={<Siswa />} />
        <Route path="/mata-pelajaran" element={<MataPelajaran />} /> {/* Rute untuk MataPelajaran */}
        <Route path="/soal" element={<Soal />} /> {/* Rute untuk Soal */}
        <Route path="/Admin" element={<Admin />} /> {/* Rute untuk Admin */}
        <Route path="/LoginForm" element={<LoginForm />} /> {/* Rute untuk Admin */}
        <Route path="/Dashboard" element={<Dashboard />} /> {/* Rute untuk Admin */}
        <Route path="/Teacher" element={<Teacher />} /> {/* Rute untuk Admin */}
        <Route path="/Student" element={<Student />} /> {/* Rute untuk Admin */}
        <Route path="/Courses" element={<Courses />} /> {/* Rute untuk Admin */}
        <Route path="/Question" element={<Question />} /> {/* Rute untuk Admin */}
      </Routes>
    </Router>
  );
}

export default App;