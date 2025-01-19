import React, { useEffect, useState } from "react";
import { FaCheck, FaTimes } from "react-icons/fa";
import "../admin.css";

const PendingTeachers = () => {
  const [teachers, setTeachers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchTeachers();
  }, []);

  const fetchTeachers = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/pending-teachers`);
      if (!response.ok) throw new Error("Failed to fetch teachers");
      
      const data = await response.json();
      setTeachers(data);
    } catch (err) {
      setError("Error loading teachers: " + err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleApprove = async (id) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/teachers/${id}/approve`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
        }
      );

      const data = await response.json();

      if (!response.ok) throw new Error(data.message);

      setTeachers(teachers.filter(teacher => teacher.id !== id));
      alert("Guru berhasil disetujui!");
    } catch (err) {
      alert("Gagal menyetujui guru: " + err.message);
    }
  };

  const handleReject = async (id) => {
    if (!window.confirm("Apakah Anda yakin ingin menolak guru ini?")) {
      return;
    }

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/teachers/${id}/reject`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
        }
      );

      const data = await response.json();

      if (!response.ok) throw new Error(data.message);

      setTeachers(teachers.filter(teacher => teacher.id !== id));
      alert("Guru berhasil ditolak!");
    } catch (err) {
      alert("Gagal menolak guru: " + err.message);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div className="error-message">{error}</div>;

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