import React from 'react';
import './admin.css';
import { FaBars } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Header = ({ toggleSidebar }) => {
    const navigate = useNavigate(); // Hook for navigation
  
    // Function to handle logout
    const handleLogout = () => {
      // Perform any necessary cleanup here, such as clearing authentication tokens
      localStorage.removeItem('authToken');
      sessionStorage.removeItem('authToken');
  
      // Redirect to login page
      navigate('/LoginForm');
    };

  return (
    <div className="headeradmin">
      <button className="hamburger" onClick={toggleSidebar}>
        <FaBars />
      </button>
      <h1>Nau.Id</h1>
      <button className="logout" onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Header;

