import React from "react";
import { FaSearch } from "react-icons/fa";
import "./siswa.css";

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="logo">Nau.id</div>

      <div className="nav-links">
        <a href="#" className="active">
          Home
        </a>
        <a href="#">Classes</a>
      </div>

      <div className="search-bar">
        <input type="text" placeholder="Find a quiz" />
        <i><FaSearch /></i>
      </div>
    </div>
  );
};

const ProfileSection = () => {
  return (
    <div className="profile-section">
      <img
        src="https://storage.googleapis.com/a1aa/image/FcT0TN1Y3BIsNdI8k1OOJVejD310aJJbTsfcSIc8g6wafAxnA.jpg"
        alt="Profile"
      />
      <div className="profile-info">
        <h2>Hello, </h2>
        <div className="coins">
          <div>
            <i className="fas fa-coins"></i> Claim 100 Coins
          </div>
          <div>
            <i className="fas fa-coins"></i> 1841 coins
          </div>
        </div>
      </div>
      <div className="join-code-section">
        <input type="text" placeholder="Enter a join code" />
        <button>Join</button>
      </div>
    </div>
  );
};

const RecentActivity = () => {
  const activities = [
    {
      title: "QUIZ PEUBAH ACAK STATISTIKA",
      questions: "9 Qs",
      author: "RETNA LESTARI",
      accuracy: "36%",
      accuracyColor: "#ff5252",
    },
    {
      title: "UTSLDTIDP5",
      questions: "100 Qs",
      author: "Nurul Firdaus",
      accuracy: "77%",
      accuracyColor: "#4caf50",
    },
    {
      title: "benzen.poly.karbo.lei",
      questions: "30 Qs",
      author: "iwik ida",
      accuracy: "93%",
      accuracyColor: "#4caf50",
    },
    {
      title: "regugusfungsi",
      questions: "20 Qs",
      author: "iwik ida",
      accuracy: "50%",
      accuracyColor: "#ff9800",
    },
    {
      title: "gugus fungsi new",
      questions: "50 Qs",
      author: "iwik ida",
      accuracy: "52%",
      accuracyColor: "#ff9800",
    },
    {
      title: "Sifat Koligatif Larutan",
      questions: "25 Qs",
      author: "iwik ida",
      accuracy: "52%",
      accuracyColor: "#ff9800",
    },
  ];

  return (
    <div className="recent-activity">
      <h2>Recent Activity</h2>
      <div className="activity-cards">
        {activities.map((activity, index) => (
          <div className="activity-card" key={index}>
            <div className="assigned">Assigned</div>
            <div className="questions">{activity.questions}</div>
            <div className="title">{activity.title}</div>
            <div className="author">By: {activity.author}</div>
            <div
              className="accuracy"
              style={{ backgroundColor: activity.accuracyColor }}
            >
              {activity.accuracy} accuracy
            </div>
          </div>
        ))}
      </div>
      <div className="see-all">
        <a href="#">See all</a>
      </div>
    </div>
  );
};

const Isi = () => {
  return (
    <div>
      <Navbar />
      <ProfileSection />
      <RecentActivity />
    </div>
  );
};

export default Isi;
