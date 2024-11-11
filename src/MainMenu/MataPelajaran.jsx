import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import "./StyleSiswa.css"
import logo from "../assets/logo1.png";

const MataPelajaran = () => {
  const navigate = useNavigate(); // Inisialisasi useNavigate
  const email = localStorage.getItem("email");
  const profileImage = email ? `https://www.gravatar.com/avatar/${email}` : null;

  // Fungsi untuk menangani klik tombol
  const handleButtonClick = () => {
    navigate('/soal'); // Navigasi ke Soal ketika tombol diklik
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
                <h1>Pilih Mata Pelajaran</h1>
                <button className="submit-button" onClick={handleButtonClick}>Matematika</button>
                <button className="submit-button" onClick={handleButtonClick}>IPA</button>
                <button className="submit-button" onClick={handleButtonClick}>IPS</button>
            </div>
        </div>
    </div>
  );
};

export default MataPelajaran;