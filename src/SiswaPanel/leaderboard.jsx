import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const Rangking = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const location = useLocation();
  const { totalScore, username } = location.state || {};

  useEffect(() => {
    // Inisialisasi ulang leaderboard
    const newLeaderboard = [];
    if (totalScore !== undefined && username) {
      newLeaderboard.push({ id: Date.now(), name: username, score: totalScore });
    }

    // Simpan leaderboard baru ke localStorage
    localStorage.setItem("leaderboard", JSON.stringify(newLeaderboard));
    setLeaderboard(newLeaderboard);
  }, [totalScore, username]);

  return (
    <div className="peringkat-container">
      <h2>Leaderboard</h2>
      <div className="top-3">
        {leaderboard.slice(0, 3).map((player, index) => (
          <div key={player.id} className={`top-player rank-${index + 1}`}>
            <div className="rank">#{index + 1}</div>
            <div className="name">{player.name}</div>
            <div className="score1">{player.score} Poin</div>
          </div>
        ))}
      </div>
      <div className="rank-list">
        {leaderboard.slice(3).map((player, index) => (
          <div key={player.id} className="rank-item">
            <div className="rank">#{index + 4}</div>
            <div className="name">{player.name}</div>
            <div className="score1">{player.score} Poin</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Rangking;
