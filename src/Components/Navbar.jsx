import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import './Navbar.css';
import { useNavigate } from 'react-router-dom';
import { SiSteam } from "react-icons/si";

function Navbar() {
  const { isAuthenticated, logout } = useAuth0();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout({ returnTo: window.location.origin });
  };

  const goToHome = () => {
    navigate('/');
  };

  return (
    <header className="nextplay-header">
      <div className="nextplay-title">
        <span>NextPlay</span>
        <p className='by'>by</p>
        <SiSteam />
      </div>
      <div className="nextplay-actions">
        {isAuthenticated && (
          <>
            <button onClick={goToHome} className="btn">Inicio</button>
            <button onClick={handleLogout} className="btn logout-btn">
              Logout
            </button>
          </>
        )}
      </div>
    </header>
  );
};

export default Navbar;
