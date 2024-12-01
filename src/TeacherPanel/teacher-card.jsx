import React from "react";

const TeacherCard = ({ title, count, icon, colorClass, onClick }) => {
  return (
    <button className={`card ${colorClass}`} onClick={onClick}>
      <div>
        <h3>{title}</h3>
        <p className="count">{count}</p>
      </div>
      <div className="icon">{icon}</div>
    </button>
  );
};

export default TeacherCard;
