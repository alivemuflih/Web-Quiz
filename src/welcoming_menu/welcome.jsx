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
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda, doloremque? Lorem ipsum dolor sit amet consectetur, adipisicing elit. Autem, id?
        </p>
        {/* Use a button with an onClick to trigger navigation */}
        <button onClick={handleClick} className="btn">Mulai Bermain</button>
      </div>
    </div>
  );
};

export default Welcome;
