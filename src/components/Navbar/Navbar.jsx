import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom'; 
import LanguageSelector from '../LanguageSelector/LanguageSelector'; 
import MenuItem from './MenuItem'; 
import i18n from '../../config/i18n'; 
import { useUser } from '../../services/UserContext'; 
import './Navbar.css'; 

const Navbar = () => {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false); 
  const userMenuRef = useRef(null);
  const { connectedUser, setConnectedUser } = useUser();

  const menuItems = [
    { path: '/user-management', label: i18n.t('userManagement'), icon: 'user-icon.png' },
    { path: '/calendar', label: i18n.t('calendar'), icon: 'calendar-icon.png' },
    { path: '/inventory', label: i18n.t('inventory'), icon: 'inventory-icon.png' },
    { path: '/expenses', label: i18n.t('expenses'), icon: 'expenses-icon.png' },
    { path: '/reports', label: i18n.t('reports'), icon: 'reports-icon.png' },
    { path: '/client-files', label: i18n.t('clientFiles'), icon: 'client-icon.png' },
  ];

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

  const handleLogout = () => {
    const currentPath = window.location.pathname;
    if (connectedUser) {
      localStorage.setItem(`lastVisitedPath_${connectedUser.username}`, currentPath);
    }
    setConnectedUser(null);
  };

  return (
    <nav className={`navbar ${i18n.dir()}`}>
      <div className="navbar-left">
        <ul className="navbar-list">
          {menuItems.map((item) => (
            <MenuItem key={item.path} {...item} />
          ))}
        </ul>
      </div>

      <div className="navbar-center" ref={userMenuRef}>
        {connectedUser ? (
          <div className="user-menu">
            <button className="user-button" onClick={() => setIsUserMenuOpen(prev => !prev)}>
              <i className="bi bi-person"></i>
              <span>{connectedUser.username}</span>
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
                  <button className="logout-button" onClick={handleLogout}>
                    <i className="bi bi-box-arrow-right"></i>
                    {i18n.t('logout')}
                  </button>
                </li>
              </ul>
            )}
          </div>
        ) : (
          <Link to="/login" className="login-link">
            {i18n.t('login')}
          </Link>
        )}
      </div>

      <div className="navbar-right">
        <LanguageSelector />
      </div>
    </nav>
  );
};

export default Navbar;
