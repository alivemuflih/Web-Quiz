import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";  // Import axios
import "./siswa.css";

const HomeSiswa = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]); // State untuk menyimpan daftar kursus
  const [joinCode, setJoinCode] = useState(""); // State untuk join code
  const [searchQuery, setSearchQuery] = useState(""); // State untuk query pencarian
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  // Mengambil data kursus dari backend ketika komponen pertama kali dimuat
  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/api/courses`)  // Endpoint API di backend
      .then((response) => {
        setCourses(response.data); // Menyimpan data kursus ke state
        setLoading(false);  // Set loading to false after data is fetched
      })
      .catch((error) => {
        console.error("Error fetching courses:", error);
        setError("Failed to fetch courses. Please try again later.");
        setLoading(false); // Set loading to false on error
      });
  }, []);  // Hanya dipanggil sekali ketika komponen pertama kali dimuat

  const handleCourseClick = (course) => {
    const courseNameFormatted = course.courseName.replace(/\s+/g, "-").toLowerCase();
    navigate(`/Instruksi/${courseNameFormatted}`);
  };  

  const handleJoin = () => {
    if (joinCode) {
      navigate(`/WaitingRoom/${joinCode}`);
    } else {
      alert("Please enter a join code.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("email");
    navigate("/login");
  };

  // Filter courses based on search query
  const filteredCourses = courses.filter(course => 
    course.courseName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      {/* Navbar */}
      <div className="navbar">
        <div className="logo">Nau.id</div>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Find a quiz"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
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
          <h2>Hello, {localStorage.getItem("studentName") || "Student"}</h2>
        </div>
        <div className="join-code-section">
          <input
            type="text"
            placeholder="Enter a join code"
            value={joinCode}
            onChange={(e) => setJoinCode(e.target.value)}
          />
          <button onClick={handleJoin}>Join</button>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="recent-activity">
        <h2>Recent Activity</h2>
        <div className="activity-cards">
          {loading ? (
            <div>Loading...</div>  // Display loading message while fetching
          ) : error ? (
            <div>{error}</div>  // Display error message
          ) : filteredCourses.length > 0 ? (
            filteredCourses.map((course) => (
              <div
                className="activity-card"
                key={course.id}
                onClick={() => handleCourseClick(course)}
                style={{ cursor: "pointer" }}
              >
                <div className="assigned">Assigned</div>
                <div className="questions">{course.totalQuestions} Qs</div>
                <div className="title">{course.courseName}</div>
                <div className="author">By: Admin</div>
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
            ))
          ) : (
            <div>No courses available.</div>  // Menampilkan pesan jika tidak ada kursus
          )}
        </div>
      </div>
    </div>
  );
};

export default HomeSiswa;
