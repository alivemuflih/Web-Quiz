import React, { useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import Card from './Home';
import './admin.css';

const Question = () => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  // Fungsi untuk menangani klik pada kartu
  const handleCardClick = (title) => {
    alert(`You clicked on ${title}`);
    // Tambahkan logika sesuai kebutuhan, seperti navigasi atau lainnya
  };

  return (
    <div className={`app ${!isSidebarVisible ? 'sidebar-hidden' : ''}`}>
      <Header toggleSidebar={toggleSidebar} />
      {isSidebarVisible && <Sidebar />}
      
      <div className="main-content">
        <div className="card-container">
          <Card
            title="Add Questions"
            count="2"
            iconClass="fas fa-user-graduate"
            colorClass="students"
            onClick={() => handleCardClick('Total Students')}
          />
          <Card
            title="View Questions"
            count="1"
            iconClass="fas fa-chalkboard-teacher"
            colorClass="teachers"
            onClick={() => handleCardClick('Total Teacher')}
          />
        </div>
      </div>
    </div>
  );
};

export default Question;
