import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const WaitingRoom = () => {
  const { joinCode } = useParams();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [isStarted, setIsStarted] = useState(false);
  const [hasJoined, setHasJoined] = useState(false);
  const [users, setUsers] = useState([]);

  const handleStart = () => {
    setIsStarted(true);
    navigate(`/SoalGuru/${joinCode}`, { state: { username, joinCode } });
  };

  const handleJoin = () => {
    if (username.trim() === "") {
      alert("Please enter a username before joining.");
      return;
    }
    setHasJoined(true);
    setUsers((prevUsers) => [...prevUsers, username]);
  };

  return (
    <div className="waiting-room-container">
      {!hasJoined && (
        <section className="input-name-section">
          <h2>Enter Your Name</h2>
          <div className="user-input">
            <p>Please enter your name:</p>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your name"
            />
            <button className="join-button" onClick={handleJoin}>
              OK
            </button>
          </div>
        </section>
      )}

      {hasJoined && (
        <section className="waiting-room-section">
          <h2>Waiting Room</h2>
          <p>Room Code: <strong>{joinCode}</strong></p>

          <div className="user-display">
            <p>Your Username:</p>
            <h3>{username}</h3>
          </div>

          <p>Please wait for your teacher to start the quiz or click Start if you are the host.</p>

          <div className="users-list">
            <h4>Users in the Waiting Room:</h4>
            <ul>
              {users.map((user, index) => (
                <li key={index}>{user}</li>
              ))}
            </ul>
          </div>

          {!isStarted ? (
            <button className="start-button" onClick={handleStart}>
              Start Quiz
            </button>
          ) : (
            <p>The quiz is starting... Redirecting!</p>
          )}
        </section>
      )}
    </div>
  );
};

export default WaitingRoom;
