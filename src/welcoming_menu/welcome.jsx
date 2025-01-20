import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import bg from "../assets/bg.jpg";
import './welcome.css';

const Welcome = () => {
  const navigate = useNavigate(); // Initialize the navigate function

  // Handle the button click to navigate to the Pilih page
  const handleClick = () => {
    navigate('/login'); // Navigate to the Pilih page
  };

  return (
    <div className="container-welcome">
      <div className="content">
        <img src={bg} alt="bg" className="bg-image" />
        <h1>Selamat Datang Di <span>Nau.id</span></h1>
        <p>
        💡 <strong>"Asah Pengetahuanmu, Raih Skor Tertinggi!"</strong><br />
        <br />
        🎯Mulai petualanganmu dengan memilih kuis favorit.<br />
           Belajar sambil bermain dan lihat seberapa jauh kamu bisa melangkah!
        </p>
        {/* Use a button with an onClick to trigger navigation */}
        <div className="button-container">
          <button onClick={handleClick} className="btn">Mulai Bermain</button>
          <button onClick={handleClick} className="btn">Aku Sudah Punya Akun</button>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
