import React from 'react'
import './Dropdown.css';
import { Link } from "react-router-dom";

export const Dropdown = () => {
  return (
  
  <div class="dropdown">
  <button class="dropbtn"><i class="fas fa-bars fa-1x"></i></button>
  <div class="dropdown-content">
    <a href="#"className="btn btn-primary">Dashbord </a>
    <Link to="/list"className="btn btn-primary">Employee List</Link>
    <Link to="/insert"className="btn btn-primary">Add Employee</Link>
    <Link to="/salary" className="btn btn-primary">Generate Salary Report</Link>
  </div>
</div>

   
  )
}
