import React, { useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import './admin.css';

const AdminLayout = ({ children }) => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  return (
    <div className="app">
      <Header toggleSidebar={toggleSidebar} />
      {isSidebarVisible && <Sidebar />}
      <div className={`main-content ${isSidebarVisible ? '' : 'full-width'}`}>
        {children}
      </div>
    </div>
  );
};

export default AdminLayout;
