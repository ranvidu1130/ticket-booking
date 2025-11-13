import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './Navbar.css';

function Navbar() {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleLogout = () => {
    logout();
    setIsDropdownOpen(false);
    navigate('/');
  };

  const handleProfileClick = () => {
    navigate('/profile');
    setIsDropdownOpen(false);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <div className="logo-placeholder">🎫</div>
        <span className="logo-text">TicketPro</span>
      </div>
      <div className="navbar-links">
        {isAuthenticated ? (
          <>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/booking">Booking</Link>
            <Link to="/seating">Seating</Link>
            <span className="user-welcome">Welcome, {user?.first_name}!</span>
            <div className="profile-dropdown" ref={dropdownRef}>
              <button className="profile-icon" onClick={toggleDropdown}>
                <div className="avatar">
                  {user?.first_name?.[0]?.toUpperCase() || 'U'}
                </div>
                <span className="dropdown-arrow">▼</span>
              </button>
              {isDropdownOpen && (
                <div className="dropdown-menu">
                  <button onClick={handleProfileClick} className="dropdown-item profile-item">
                    <span className="item-icon">👤</span>
                    Profile
                  </button>
                  <button onClick={handleLogout} className="dropdown-item logout-item">
                    <span className="item-icon">🚪</span>
                    Logout
                  </button>
                </div>
              )}
            </div>
          </>
        ) : (
          <>
            <Link to="/">Login</Link>
            <Link to="/signup">Sign Up</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
