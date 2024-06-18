// src/Navbar.js
import React from 'react';
import './Navbar.css'; // Import the CSS file for styling

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">MyApp</div>
      <ul className="navbar-links">
        <li><a href="#home">Home</a></li>
        <li><a href="#myFrame">Map</a></li>
        <li><a href="#services">Services</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
    </nav>
  );
};

export default Navbar;
