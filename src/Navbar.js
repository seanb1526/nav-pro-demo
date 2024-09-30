// src/Navbar.js
import React from 'react';
import './Navbar.css'; // Import the CSS file for styling

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">Logo Here</div>
      <ul className="navbar-links">
        <li><a href="#home">Home</a></li>
        <li><a href="#myFrame">Map</a></li>
        <li><a href="#myFrame2">Map2</a></li>
        <li><a href="#googleMaps">GPS</a></li>
      </ul>
    </nav>
  );
};

export default Navbar;
