import React from "react";
import "./Dashboard.css";

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <nav className="sidebar">
        <h2>Employee MS</h2>
        <ul>
          <li><i className="icon-dashboard"></i> Dashboard</li>
          <li><i className="icon-employees"></i> Employees</li>
          <li><i className="icon-departments"></i> Departments</li>
          <li><i className="icon-leaves"></i> Leaves</li>
          <li><i className="icon-salary"></i> Salary</li>
          <li><i className="icon-settings"></i> Settings</li>
        </ul>
        <button className="logout">Logout</button>
      </nav>

      <div className="main-content">
        <header>
          <h1>Welcome, Admin</h1>
        </header>

        <section className="overview">
          <div className="card">
            <i className="icon-employees"></i>
            <h3>Total Employees</h3>
            <p>4</p>
          </div>
          <div className="card">
            <i className="icon-departments"></i>
            <h3>Total Departments</h3>
            <p>3</p>
          </div>
          <div className="card">
            <i className="icon-salary"></i>
            <h3>Monthly Pay</h3>
            <p>$1900</p>
          </div>
        </section>

        <section className="leave-details">
          <h2>Leave Details</h2>
          <div className="leave-card approved">
            <i className="icon-approved"></i>
            <h3>Leave Approved</h3>
            <p>2</p>
          </div>
          <div className="leave-card applied">
            <i className="icon-applied"></i>
            <h3>Leave Applied</h3>
            <p>2</p>
          </div>
          <div className="leave-card pending">
            <i className="icon-pending"></i>
            <h3>Leave Pending</h3>
            <p>1</p>
          </div>
          <div className="leave-card rejected">
            <i className="icon-rejected"></i>
            <h3>Leave Rejected</h3>
            <p>1</p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
