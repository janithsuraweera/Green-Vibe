import React, { useState } from 'react';
import './App.css'; 
import EmployeeTable from './EmployeeTable';
import { useNavigate } from 'react-router-dom';

function EmployeeRegistrationForm() {
  const [formData, setFormData] = useState({
    employeeID: '',
    firstName: '',
    lastName: '',
    dob: '',
    gender: '',
    email: '',
    nic: '',
    address: '',
    phoneNumber: '',
    designation: '',
  });

  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:9001/api/employees', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        alert('Employee registered successfully');
      } else {
        alert('Failed to register employee');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error occurred during registration');
    }
  };

  const handleClear = () => {
    setFormData({
      employeeID: '',
      firstName: '',
      lastName: '',
      dob: '',
      gender: '',
      email: '',
      nic: '',
      address: '',
      phoneNumber: '',
      designation: '',
    });
  };

  return (
    
    <div className={darkMode ? 'dark-mode' : ''}>
      <header>
        <div className="logo">
          <img src="logo.png" alt="Green Vibe Logo" />
          <span>Green Vibe</span>
        </div>

{/* //navigation */}
        <nav>
          <a href="#">Home</a>
          <a href="#">Contact</a>
          <a href="#">Help</a>
          <a href="http://localhost:9001/api/employees">Employee Table</a>
        </nav>
      </header>


      <main>
        <div className="form-container">
          <h1>Employee Registration Form</h1>
          <form onSubmit={handleSubmit}>
            <div className="input-container">
              <input
                type="text"
                id="employeeID"
                name="employeeID"
                value={formData.employeeID}
                onChange={handleChange}
                required
                placeholder=" "
              />
              <label htmlFor="employeeID">Employee ID</label>
            </div>

            <div className="input-container">
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
                placeholder=" "
              />
              <label htmlFor="firstName">First Name</label>
            </div>

            <div className="input-container">
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
                placeholder=" "
              />
              <label htmlFor="lastName">Last Name</label>
            </div>

            <div className="input-container">
              <input
                type="date"
                id="dob"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                required
                placeholder=" "
              />
              <label htmlFor="dob">DOB</label>
            </div>

            <div className="input-container">
              <select
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                required
              >
                <option value="" disabled></option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
              <label htmlFor="gender">Gender</label>
            </div>

            <div className="input-container">
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder=" "
              />
              <label htmlFor="email">Email</label>
            </div>

            <div className="input-container">
              <input
                type="text"
                id="nic"
                name="nic"
                value={formData.nic}
                onChange={handleChange}
                required
                placeholder=" "
              />
              <label htmlFor="nic">NIC</label>
            </div>

            <div className="input-container">
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
                placeholder=" "
              />
              <label htmlFor="address">Address</label>
            </div>

            <div className="input-container">
              <input
                type="text"
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                required
                placeholder=" "
              />
              <label htmlFor="phoneNumber">Phone Number</label>
            </div>

            <div className="input-container">
              <select
                id="designation"
                name="designation"
                value={formData.designation}
                onChange={handleChange}
                required
              >
                <option value="" disabled></option>
                <option value="manager">Manager</option>
                <option value="supervisor">Supervisor</option>
                <option value="engineer">Engineer</option>
                <option value="technician">Technician</option>
                <option value="worker">Worker</option>
              </select>
              <label htmlFor="designation">Designation</label>
            </div>

            <div className="form-buttons">
              <button type="button" className="back-button">Back</button>
              <button type="button" className="clear-button" onClick={handleClear}>Clear</button>
            </div>
            <button type="submit" className="submit-button">Submit</button>
          </form>
        </div>
      </main>

      <footer>
        <p>&copy; 2024 Green Vibe. All rights reserved.</p>
        <div className="togle">
          <button
            id="toggle-dark-mode"
            aria-label="Toggle Dark Mode"
            className="darkmode"
            onClick={toggleDarkMode}
          >
            <span className="icon">
              <i className="fas fa-moon" />
            </span>
            <span className="switch" />
            <span className="icon">
              <i className="fas fa-sun" />
            </span>
          </button>
        </div>
      </footer>
    </div>
  );
}

export default EmployeeRegistrationForm;
//version -02 @janith suraweera