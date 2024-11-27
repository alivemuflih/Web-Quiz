import React, { useState } from 'react';
import Header from '../Header';
import {
  FaCheck,
  FaTimes
} from "react-icons/fa";
import '../admin.css';

const PendingTeachers = () => {
    const [isSidebarVisible, setIsSidebarVisible] = useState(true); // State untuk mengontrol sidebar
  
  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible); // Mengubah status sidebar
  };
  
  const [teachers] = useState([
    {
      id: 1,
      name: "John Doe",
      profile_pic: "https://via.placeholder.com/40",
      mobile: "123-456-7890",
      address: "123 Main St, Springfield",
    },
    {
      id: 2,
      name: "Jane Smith",
      profile_pic: "https://via.placeholder.com/40",
      mobile: "987-654-3210",
      address: "456 Elm St, Springfield",
    },
  ]);

  const handleApprove = (id) => {
    alert(`Approved teacher with ID: ${id}`);
    // Add logic to approve teacher via API
  };

  const handleReject = (id) => {
    alert(`Rejected teacher with ID: ${id}`);
    // Add logic to reject teacher via API
  };

  return (
    <div className={`app ${!isSidebarVisible ? "sidebar-hidden" : ""}`}>
      <Header toggleSidebar={toggleSidebar} />

      <div className="container">
        <div className="panel panel-primary">
          <div className="panel-heading">
            <h6 className="panel-title">Pending Teachers</h6>
          </div>
          <table className="table table-hover" id="dev-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Profile Picture</th>
                <th>Mobile</th>
                <th>Address</th>
                <th>Approve</th>
                <th>Reject</th>
              </tr>
            </thead>
            <tbody>
              {teachers.map((teacher) => (
                <tr key={teacher.id}>
                  <td>{teacher.name}</td>
                  <td>
                    <img
                      src={teacher.profile_pic}
                      alt="Profile Pic"
                      height="40"
                      width="40"
                    />
                  </td>
                  <td>{teacher.mobile}</td>
                  <td>{teacher.address}</td>
                  <td>
                    <button
                      className="btn btn-primary btn-xs"
                      onClick={() => handleApprove(teacher.id)}
                    >
                      <FaCheck />
                    </button>
                  </td>
                  <td>
                    <button
                      className="btn btn-danger btn-xs"
                      onClick={() => handleReject(teacher.id)}
                    >
                      <FaTimes />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PendingTeachers;
