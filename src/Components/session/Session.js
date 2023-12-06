import { React, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import logo from '../../assets/logo.JPG';
import '../../assets/css/carousel.css';

function Session() {
  const navigate = useNavigate();
  useEffect(() => {
    const { authToken } = JSON.parse(localStorage.getItem('Token')) || {};
    if (authToken) {
      navigate('/mainPage');
    }
  }, [navigate]);

  return (
    <div className="session-container">
      <div className="session-content">
        <h1 id="sesion-title">Esport Gaming Center</h1>
        <div className="session-logo-container">
          <img src={logo} alt="Gaming Center logo" className="session-logo" />
        </div>
        <div className="session-btns">
          <Link to="/login" className="session_btn">Log in</Link>
          <Link to="/register" className="session_btn">Sign Up</Link>
        </div>
      </div>
    </div>
  );
}

export default Session;