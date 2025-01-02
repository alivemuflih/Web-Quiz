import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./StyleLogin.css";

const RegisterForm = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gurusiswa, setGuruSiswa] = useState("");
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();

    // Validasi sederhana
    if (!username || !email || !password || !gurusiswa) {
      alert("Semua field harus diisi!");
      return;
    }

    if (!["guru", "siswa"].includes(gurusiswa.toLowerCase())) {
      alert('Role harus "guru" atau "siswa".');
      return;
    }

    fetch(`${process.env.REACT_APP_API_URL}/api/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password, gurusiswa }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message === "Pendaftaran berhasil!") {
          alert("Pendaftaran berhasil!");
          
          // Redirect berdasarkan role yang dipilih
          if (gurusiswa.toLowerCase() === "guru") {
            navigate("/HomeTeacher");  // Mengarahkan ke halaman home guru
          } else {
            navigate("/HomeSiswa");  // Mengarahkan ke halaman home siswa
          }
        } else {
          alert(data.message || "Pendaftaran gagal!");
        }
      })
      .catch((error) => {
        console.error("Terjadi kesalahan: ", error);
        alert("Terjadi kesalahan saat registrasi.");
      });
  };

  return (
    <form onSubmit={handleRegister}>
      <div className="form-login">
        <input
          type="text"
          placeholder="Username"
          className="input-field"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          className="input-field"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="input-field"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <select
          className="input-field"
          value={gurusiswa}
          onChange={(e) => setGuruSiswa(e.target.value)}
        >
          <option value="">Pilih Role</option>
          <option value="guru">Guru</option>
          <option value="siswa">Siswa</option>
        </select>
        <button type="submit" className="submit-button">
          Daftar
        </button>
      </div>
    </form>
  );
};

export default RegisterForm;
