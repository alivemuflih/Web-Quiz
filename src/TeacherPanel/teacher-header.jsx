import React from "react";
import { FaBars } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import './teacher-style.css';

const TeacherHeader = ({ setSidebarCollapsed }) => {
  const navigate = useNavigate(); // Hook untuk navigasi

  // Fungsi untuk menangani logout
  const handleLogout = () => {
    // Menghapus token autentikasi jika ada
    localStorage.removeItem('authToken');
    sessionStorage.removeItem('authToken');
    
    // Redirect ke halaman login
    navigate('/login');
  };

  return (
    <header className="header1">
      <FaBars
        onClick={() => setSidebarCollapsed((prevState) => !prevState)}
      />
      <h1>Nau.id</h1>
      {/* Tombol Logout */}
      <button className="logout" onClick={handleLogout}>Logout</button>
    </header>
  );
};

export default TeacherHeader;

