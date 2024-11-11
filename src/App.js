// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Login/Login.js"; //ini mengarah ke Login.js
import Siswa from "./MainMenu/Siswa.jsx"; //mengarah ke Siswa.jsx
import MataPelajaran from "./MainMenu/MataPelajaran.jsx"; //mengarah ke MataPelajaran.jsx
import Soal from "./MainMenu/Soal.jsx"; //mengarah ke Soal.jsx

function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Login />} />
        <Route path="/siswa" element={<Siswa />} />
        <Route path="/mata-pelajaran" element={<MataPelajaran />} /> {/* Rute untuk MataPelajaran */}
        <Route path="/soal" element={<Soal />} /> {/* Rute untuk Soal */}
      </Routes>
    </Router>
  );
}

export default App;