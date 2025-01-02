import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Welcome from "./welcoming_menu/welcome.jsx";
import Login from "./Login/Login.js"; //mengarah ke Login.js
import Admin from "./AdminPanel/Admin.jsx"; //mengarah ke Admin.jsx
import LoginForm from "./Login/LoginForm.jsx";
import HomeTeacher from "./TeacherPanel/home-teacher.jsx";
import HomeSiswa from "./SiswaPanel/home-siswa.jsx";
import Instruksi from "./SiswaPanel/instruksi"; // Baru ditambahkan
import Soal from "./SiswaPanel/soal"; // Baru ditambahkan
import Nilai from "./SiswaPanel/nilai"; // Baru ditambahkan
import Leaderboard from "./SiswaPanel/leaderboard.jsx"; // Baru ditambahkan
import WaitingRoom from "./SiswaPanel/waiting-room.jsx";
import SoalGuru from "./SiswaPanel/soal-guru.jsx";

function App() {
  return (
    <Router>
      <Routes>
        {/* Rute Utama */}
        <Route path="/" element={<Welcome />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Admin" element={<Admin />} />
        <Route path="/LoginForm" element={<LoginForm />} />
        <Route path="/HomeTeacher" element={<HomeTeacher />} />
        <Route path="/HomeSiswa" element={<HomeSiswa />} />
        <Route path="/Instruksi/:courseName" element={<Instruksi />} />
        <Route path="/Soal/:courseName" element={<Soal />} />
        <Route path="/Nilai" element={<Nilai />} />
        <Route path="/Leaderboard" element={<Leaderboard />} />
        <Route path="/WaitingRoom/:joinCode" element={<WaitingRoom />} />
        <Route path="/SoalGuru/:joinCode" element={<SoalGuru />} />
      </Routes>
    </Router>
  );
}

export default App;
