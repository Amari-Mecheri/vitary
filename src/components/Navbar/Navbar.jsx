import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import LanguageSelector from '../LanguageSelector/LanguageSelector'; 
import i18n from '../../config/i18n'; 
import './Navbar.css'; 

const Navbar = () => {
  const location = useLocation();
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false); 
  const userMenuRef = useRef(null); // Ref to user menu

  const menuItems = [
    { path: '/user-management', label: i18n.t('userManagement'), icon: 'user-icon.png' },
    { path: '/calendar', label: i18n.t('calendar'), icon: 'calendar-icon.png' },
    { path: '/inventory', label: i18n.t('inventory'), icon: 'inventory-icon.png' },
    { path: '/expenses', label: i18n.t('expenses'), icon: 'expenses-icon.png' },
    { path: '/reports', label: i18n.t('reports'), icon: 'reports-icon.png' },
    { path: '/client-files', label: i18n.t('clientFiles'), icon: 'client-icon.png' },
  ];

  // Close menu when clicking outside or pressing ESC
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [userMenuRef]);

  return (
    <nav className={`navbar ${i18n.dir()}`}>
      {/* Left: Navigation Icons */}
      <div className="navbar-left">
        <ul className="navbar-list">
          {menuItems.map((item) => (
            <li key={item.path} className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}>
              <Link to={item.path}>
                <img src={`/icons/${item.icon}`} alt={item.label} />
                <span>{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Center: User/Logout Button with Dropdown */}
      <div className="navbar-center" ref={userMenuRef}>
        <div className="user-menu">
          <button className="user-button" onClick={() => setIsUserMenuOpen(prev => !prev)}>
            <img src="/icons/user-icon.png" alt="User" />
            <span>{i18n.t('user')}</span>
            <span className="arrow-down">▼</span>
          </button>
          {isUserMenuOpen && (
            <ul className="dropdown-menu">
              <li>
                <Link to="/settings">{i18n.t('settings')}</Link>
              </li>
              <li>
                <Link to="/change-password">{i18n.t('changePassword')}</Link>
              </li>
              <li>
                <button onClick={() => console.log('Logged out')}>
                  {i18n.t('logout')}
                </button>
              </li>
            </ul>
          )}
        </div>
      </div>

      {/* Right: Language Selector */}
      <div className="navbar-right">
        <LanguageSelector />
      </div>
    </nav>
  );
};

export default Navbar;
