import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import "./StyleSiswa.css"
import logo from "../assets/logo1.png";

const Siswa = () => {
  const navigate = useNavigate(); // Inisialisasi useNavigate
  const email = localStorage.getItem("email");
  const profileImage = email ? `https://www.gravatar.com/avatar/${email}` : null;

  // Fungsi untuk menangani klik tombol
  const handleButtonClick = (kelas) => {
    if (kelas === 'SD') {
      navigate('/mata-pelajaran'); // Navigasi ke MataPelajaran jika SD diklik
    }
    if (kelas === 'SMP') {
      navigate('/mata-pelajaran'); // Navigasi ke MataPelajaran jika SMP diklik
    }
    if (kelas === 'SMA') {
      navigate('/mata-pelajaran'); // Navigasi ke MataPelajaran jika SMA diklik
    }
  };

  return (
    <div className="App">
        <div className="form-container-siswa">
            <div className="header">
                <img src={logo} alt="Logo" className="logo-image" />
                <img src={profileImage} alt="Profile" className="profile-image" />
            </div>
            <div className="divider"></div>
            <div className="formsiswa">
                <h1>Pilih Kelas</h1>
                <button className="submit-button" onClick={() => handleButtonClick('SD')}>SD</button>
                <button className="submit-button" onClick={() => handleButtonClick('SMP')}>SMP</button>
                <button className="submit-button" onClick={() => handleButtonClick('SMA')}>SMA</button>
            </div>
        </div>
    </div>
  );
};

export default Siswa;