import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Untuk navigasi halaman setelah login
import "./StyleLogin.css"; // Pastikan untuk menyesuaikan CSS Anda

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // Validasi sederhana sebelum mengirim data
    if (username && password) {
      // Cek login untuk admin secara statis
      if (username === "admin" && password === "admin") {
        // Jika username dan password adalah "admin", arahkan ke halaman admin
        alert("Login berhasil sebagai admin!");
        navigate("/Admin"); // Pengalihan ke halaman Admin
      } else {
        // Jika bukan admin, kirim data login ke backend
        fetch(`${process.env.REACT_APP_API_URL}/api/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }), // Mengirim data login ke backend
          credentials: "include", // Menggunakan cookies atau session
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.message === 'Login berhasil!') {
              // Jika login berhasil berdasarkan role dari backend
              alert("Login berhasil!");

              // Arahkan berdasarkan role yang dikirim oleh backend
              if (data.role === "guru") {
                navigate("/HomeTeacher"); // Pengalihan ke halaman guru
              } else if (data.role === "siswa") {
                navigate("/Isi"); // Pengalihan ke halaman siswa
              }
            } else {
              alert(data.message || "Login gagal!"); // Jika login gagal
            }
          })
          .catch((error) => {
            console.error("Terjadi kesalahan: ", error);
            alert("Terjadi kesalahan saat login.");
          });
      }
    } else {
      alert("Username dan password harus diisi.");
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <div className="form-login">
        <input
          type="text"
          placeholder="Username"
          className="input-field"
          value={username}
          onChange={(e) => setUsername(e.target.value)} // Menyimpan input username
        />
        <input
          type="password"
          placeholder="Password"
          className="input-field"
          value={password}
          onChange={(e) => setPassword(e.target.value)} // Menyimpan input password
        />
        <hr className="divider1" />
        <button type="submit" className="submit-button">Masuk</button>
      </div>
    </form>
  );
};

export default LoginForm;
