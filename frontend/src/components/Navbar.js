import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../sewing.png';
import { isLoggedIn, logout, getUserName } from '../utils/auth';

function Navbar({ theme, toggleTheme }) {
  const navigate = useNavigate();
  const loggedIn = isLoggedIn();
  const userName = getUserName();

  const handleLogout = () => {
    logout();
    navigate('/login');
    // We don't need to force a re-render here, navigation will do it.
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">
        <img src={logo} alt="Logo" className="brand-logo"/>
        Stitched
        </Link>
      </div>
      <ul className="navbar-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/design">Design</Link></li>
        <li><Link to="/about">About</Link></li>
        {loggedIn && <li><Link to="/user">User</Link></li>}
        {loggedIn ? (
          <>
            {userName && <li className="navbar-user">Hi, {userName}</li>}
            <li><button onClick={handleLogout} className="btn-link">Logout</button></li>
          </>
        ) : (
          <li><Link to="/login">Login</Link></li>
        )}
        <li>
          <button className="theme-toggle" onClick={toggleTheme}>
            {theme === 'dark' ? '🌙 Dark' : '☀️ Light'}
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar; 