// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Welcome from "./welcoming_menu/welcome.jsx";
import Login from "./Login/Login.js"; //ini mengarah ke Login.js
import Siswa from "./MainMenu/Siswa.jsx"; //mengarah ke Siswa.jsx
import MataPelajaran from "./MainMenu/MataPelajaran.jsx"; //mengarah ke MataPelajaran.jsx
import Soal from "./MainMenu/Soal.jsx"; //mengarah ke Soal.jsx
import Admin from "./AdminPanel/Admin.jsx"; //mengarah ke Soal.jsx
import LoginForm from "./Login/LoginForm.jsx";
import HomeTeacher from "./TeacherPanel/home-teacher.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/siswa" element={<Siswa />} />
        <Route path="/mata-pelajaran" element={<MataPelajaran />} />{" "}
        {/* Rute untuk MataPelajaran */}
        <Route path="/soal" element={<Soal />} /> {/* Rute untuk Soal */}
        <Route path="/Admin" element={<Admin />} /> {/* Rute untuk Admin */}
        <Route path="/LoginForm" element={<LoginForm />} />{" "}
        <Route path="/HomeTeacher" element={<HomeTeacher />} />{" "}
      </Routes>
    </Router>
  );
}

export default App;
