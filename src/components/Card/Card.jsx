import React from 'react';
import './Card.css';

const Card = ({ title, children, opacity = 1 }) => {
  return (
    <div className="card" style={{ backgroundColor: `rgba(255, 255, 255, ${opacity})` }}>
      {title && <div className="card-title">{title}</div>}
      <div className="card-content">{children}</div>
    </div>
  );
};

export default Card;
