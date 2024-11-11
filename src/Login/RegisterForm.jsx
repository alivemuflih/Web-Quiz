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
    // Contoh validasi pendaftaran
    if (username && email && password && gurusiswa) {
      // Lakukan pendaftaran di sini
      alert("Pendaftaran berhasil!");
      navigate("/Siswa"); // Mengarahkan ke halaman siswa setelah pendaftaran
    } else {
      alert("Semua field harus diisi!");
    }
  };

  return (
    <form onSubmit={handleRegister}>
      <div className="form-login">
        <input
          type="text"
          placeholder="Username"
          className="input-field"
          value={username}
          onChange={(e) => setUsername(e.target.value)} // Mengatur state username
        />
        <input
          type="email"
          placeholder="Email"
          className="input-field"
          value={email}
          onChange={(e) => setEmail(e.target.value)} // Mengatur state email
        />
        <input
          type="password"
          placeholder="Password"
          className="input-field"
          value={password}
          onChange={(e) => setPassword(e.target.value)} // Mengatur state password
        />
        <input
          type="text"
          placeholder="Guru / Siswa"
          className="input-field"
          value={gurusiswa}
          onChange={(e) => setGuruSiswa(e.target.value)} // Mengatur state guru/siswa
        />
        <hr className="divider1" />
        <button type="submit" className="submit-button">Daftar</button>
      </div>
    </form>
  );
};

export default RegisterForm;