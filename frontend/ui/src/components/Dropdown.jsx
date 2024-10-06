import React from 'react';
import './Dropdown.css';
import { Link } from "react-router-dom";

export const Dropdown = () => {
  return (
    <div className="dropdown">
      <button className="dropbtn">
        <i className="fas fa-bars fa-1x"></i> Menu
      </button>
      <div className="dropdown-content">
        <Link to="/dashbord" className="btn btn-primary">
          <i className="fas fa-home"></i> Dashbord
        </Link>
        <Link to="/list" className="btn btn-primary">
          <i className="fas fa-users"></i> Employee List
        </Link>
        <Link to="/insert" className="btn btn-primary">
          <i className="fas fa-user-plus"></i> Add Employee
        </Link>
        <Link to="/salary" className="btn btn-primary">
          <i className="fas fa-file-invoice-dollar"></i> Generate Salary Report
        </Link>
        <Link to="/" className="logout">
          <i className="fas fa-sign-out-alt"></i> Sign out
        </Link>
      </div>
    </div>
  );
}
