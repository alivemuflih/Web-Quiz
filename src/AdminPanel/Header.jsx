import React from 'react';
import { FaBars } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import './admin.css';

const Header = ({ toggleSidebar }) => {
    const navigate = useNavigate(); // Hook untuk navigasi
  
    // Fungsi untuk menangani logout
    const handleLogout = () => {
      // Menghapus token autentikasi
      localStorage.removeItem('authToken');
      sessionStorage.removeItem('authToken');
  
      // Redirect ke halaman login
      navigate('/Login');
    };

  return (
    <div className="headeradmin">
      {/* Tombol hamburger yang memanggil toggleSidebar */}
      <button className="hamburger" onClick={toggleSidebar}>
        <FaBars />
      </button>
      <h1>Nau.id</h1>
      <button className="logout" onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Header;
