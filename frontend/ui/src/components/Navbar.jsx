import React from 'react';
import './navbar.css';

export const Navbar = () => {
  return (
    <nav>
    <div className="logo">
  <img src="./image/logo.png" alt="Green Vibe Logo" />
  <span>Green Vibe</span>
</div>


  <a href="#">Home</a>
  <a href="#">Contact</a>
  <a href="#">Help</a>
</nav>
  )
}
