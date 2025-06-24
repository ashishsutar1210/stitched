import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../sewing.png';
function Navbar({ theme, toggleTheme }) {
  // Placeholder: Replace with real auth logic
  const isLoggedIn = !!localStorage.getItem('token');
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
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
        {isLoggedIn && <li><Link to="/user">User</Link></li>}
        <li>
          {isLoggedIn ? (
            <button onClick={handleLogout} className="btn-link">Logout</button>
          ) : (
            <Link to="/login">Login</Link>
          )}
        </li>
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