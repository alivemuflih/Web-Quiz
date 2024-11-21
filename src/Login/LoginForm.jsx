import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.js";
import "./StyleLogin.css";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // Menggunakan useNavigate untuk pengalihan

  const handleLogin = (e) => {
    e.preventDefault();
    // Contoh validasi login
    if (username === "admin" && password === "1234") {
      navigate("/Admin"); // Arahkan ke halaman siswa
    } else {
      alert("Username atau password salah");
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <div className="form-login">
        <input
          type="text"
          placeholder="Email / Username"
          className="input-field"
          value={username}
          onChange={(e) => setUsername(e.target.value)} // Mengatur state username
        />
        <input
          type="password"
          placeholder="Password"
          className="input-field"
          value={password}
          onChange={(e) => setPassword(e.target.value)} // Mengatur state password
        />
        <hr className="divider1" />
        <button type="submit" className="submit-button">Masuk</button>
      </div>
    </form>
  );
};

export default LoginForm;