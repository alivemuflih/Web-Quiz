import React from 'react';

const Card = ({ title, count, iconClass, colorClass, onClick }) => {
  return (
    <button className={`card ${colorClass}`} onClick={onClick}>
      <div>
        <h3>{title}</h3>
        <p className="count">{count}</p>
      </div>
      <i className={iconClass}></i>
    </button>
  );
};

export default Card;
