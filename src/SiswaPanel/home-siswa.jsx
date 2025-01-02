import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./siswa.css";

const HomeSiswa = () => {
  const navigate = useNavigate();

  const [courses] = useState([
    {
      id: 1,
      courseName: "Math Quiz",
      totalQuestions: 10,
      author: "John Doe",
      accuracy: 75,
      instructions: "Read the questions carefully and choose the correct answer.",
    },
    {
      id: 2,
      courseName: "Physics Quiz",
      totalQuestions: 15,
      author: "Jane Smith",
      accuracy: 90,
      instructions: "Use formulas where necessary and check your answers before submitting.",
    },
    {
      id: 3,
      courseName: "Chemistry Basics",
      totalQuestions: 20,
      author: "Michael Brown",
      accuracy: 60,
      instructions: "Pay attention to chemical equations and remember the periodic table.",
    },
    {
      id: 4,
      courseName: "History Challenge",
      totalQuestions: 12,
      author: "Susan Lee",
      accuracy: 45,
      instructions: "Review historical events and dates before starting the quiz.",
    },
  ]);

  const [joinCode, setJoinCode] = useState(""); // State untuk menyimpan token

  const handleCourseClick = (course) => {
    const courseNameFormatted = course.courseName.replace(/\s+/g, "-").toLowerCase(); // Format nama kursus untuk URL
    navigate(`/Instruksi/${courseNameFormatted}`);
  };

  const handleJoin = () => {
    if (joinCode) {
      navigate(`/WaitingRoom/${joinCode}`); // Navigasi ke waitingroom dengan token
    } else {
      alert("Please enter a join code.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("email"); // Hapus data login dari localStorage
    navigate("/login"); // Navigasi ke halaman login setelah logout
  };

  return (
    <div>
      {/* Navbar */}
      <div className="navbar">
        <div className="logo">Nau.id</div>
        <div className="search-bar">
          <input type="text" placeholder="Find a quiz" />
          <i>
            <FaSearch />
          </i>
        </div>
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </div>

      {/* Profile Section */}
      <div className="profile-section">
        <img
          src="https://storage.googleapis.com/a1aa/image/FcT0TN1Y3BIsNdI8k1OOJVejD310aJJbTsfcSIc8g6wafAxnA.jpg"
          alt="Profile"
        />
        <div className="profile-info">
          <h2>Hello, Student</h2>
        </div>
        <div className="join-code-section">
          <input
            type="text"
            placeholder="Enter a join code"
            value={joinCode}
            onChange={(e) => setJoinCode(e.target.value)} // Menyimpan input token ke state
          />
          <button onClick={handleJoin}>Join</button> {/* Menangani klik join */}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="recent-activity">
        <h2>Recent Activity</h2>
        <div className="activity-cards">
          {courses.map((course, index) => (
            <div
              className="activity-card"
              key={index}
              onClick={() => handleCourseClick(course)}
              style={{ cursor: "pointer" }}
            >
              <div className="assigned">Assigned</div>
              <div className="questions">{course.totalQuestions} Qs</div>
              <div className="title">{course.courseName}</div>
              <div className="author">By: {course.author}</div>
              <div
                className="accuracy"
                style={{
                  backgroundColor:
                    course.accuracy > 80
                      ? "#4caf50"
                      : course.accuracy > 50
                      ? "#ff9800"
                      : "#ff5252",
                }}
              >
                {course.accuracy}% accuracy
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomeSiswa;
