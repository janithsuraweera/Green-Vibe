import React from 'react';
import './navbar.css';
import {Link} from 'react-router-dom'

export const Navbar = () => {
  return (
    <nav>
    <div className="logo">
  <img src="logo.png" alt="Green Vibe Logo" />
  <span>Green Vibe</span>

  <Link to="#">Home</Link>
  <Link to="#">Contact</Link>
  <Link to="#">Help</Link>
  <Link to="/list">Employee List</Link>
  <Link to="/insert">Add Employee</Link>
  </div>
</nav>
  )
}
