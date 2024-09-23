import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './MenuItem.css'; // Ensure this file contains your styles

const MenuItem = ({ path, label, icon }) => {
  const location = useLocation(); // Get the current route

  // Check if the current route matches the path of the menu item
  const isActive = location.pathname === path;

  return (
    <Link to={path}>
      <li className={`nav-item ${isActive ? 'active' : ''}`}>
        <img src={`/icons/${icon}`} alt={label} />
        <span>{label}</span>
      </li>
    </Link>
  );
};

export default MenuItem;
