import React, { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import comAuth from '../hooks/comAuth';
import logo from '../assets/logo.JPG';

function Navbar() {
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const location = useLocation();
  const { setAuth } = comAuth();
  const navigate = useNavigate();

  const { authToken } = JSON.parse(localStorage.getItem('Token')) || {};
  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  const closeSidebar = () => {
    setSidebarVisible(false);
  };

  const handleLogout = async () => {
    setAuth({});
    localStorage.removeItem('Token');

    try {
      if (authToken) {
        await axios.delete('http://localhost:3000/auth/logout', {
          headers: {
            Authorization: authToken,
            'Content-Type': 'application/json',
          },
        });
        toast.success('Logout Successfully');
      }
    } catch (err) {
      toast.error('Oops! Failed to logout');
    }
    navigate('/login');
  };

  return (
    <>
      <div className="mob-nav">
        <FontAwesomeIcon icon={faBars} className="humburger" onClick={toggleSidebar} />
      </div>
      <div className={`side-bar ${sidebarVisible ? 'visible' : ''}`}>
        <div className="sidebar-logo-container">
          <img src={logo} alt="" className="sidebar-logo" />
        </div>
        <div className="sidebar-links-container">
          <Link to="/gameList" className={`nav-link ${location.pathname === '/gameList' ? 'active' : ''}`} onClick={closeSidebar}>Games</Link>
          <Link to="/addGame" className={`nav-link ${location.pathname === '/addGame' ? 'active' : ''}`} onClick={closeSidebar}>Add Game</Link>
          <Link to="/games/delete" className={`nav-link ${location.pathname === '/games/delete' ? 'active' : ''}`} onClick={closeSidebar}>Delete Game</Link>
          <Link to="/reservations" className={`nav-link ${location.pathname === '/reservations' ? 'active' : ''}`} onClick={closeSidebar}>Reservations</Link>
          <button
            disabled={!authToken}
            onClick={handleLogout}
            type="button"
            className="list-group-item list-group-item-action"
          >
            Log Out
          </button>
        </div>
        <div className="license-container">
          <p className="license">&copy; Esports Gaming Center</p>
        </div>
      </div>
    </>
  );
}

export default Navbar;
