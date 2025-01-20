import React, { useState } from "react";
import { FaCheck, FaTimes } from "react-icons/fa";
import "../admin.css";

const PendingTeachers = () => {
  const [teachers, setTeachers] = useState([
    {
      id: 1,
      name: "John Doe",
      profile_pic: "/default-avatar.png",
      mobile: "08123456789",
      address: "Jl. Merdeka No. 123",
    },
    {
      id: 2,
      name: "Jane Smith",
      profile_pic: "/default-avatar.png",
      mobile: "08129876543",
      address: "Jl. Sudirman No. 456",
    },
  ]);

  const handleApprove = (id) => {
    setTeachers(teachers.filter((teacher) => teacher.id !== id));
    alert("Guru berhasil disetujui!");
  };

  const handleReject = (id) => {
    if (!window.confirm("Apakah Anda yakin ingin menolak guru ini?")) {
      return;
    }
    setTeachers(teachers.filter((teacher) => teacher.id !== id));
    alert("Guru berhasil ditolak!");
  };

  return (
    <div className="container">
      <div className="panel panel-primary">
        <div className="panel-heading">
          <h6 className="panel-title">Pending Teachers</h6>
        </div>
        {teachers.length === 0 ? (
          <p>Tidak ada guru yang menunggu persetujuan</p>
        ) : (
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
                      src={teacher.profile_pic || "/default-avatar.png"}
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
        )}
      </div>
    </div>
  );
};

export default PendingTeachers;
