import React from 'react'
import './Dropdown.css';
import { Link } from "react-router-dom";

export const Dropdown = () => {
  return (
  
  <div class="dropdown">
  <button class="dropbtn"><i class="fas fa-bars fa-1x"></i></button>
  <div class="dropdown-content">
    <a href="#">Dashbord </a>
    <Link to="/list">Employee List</Link>
    <Link to="/insert">Add Employee</Link>
  </div>
</div>

   
  )
}
