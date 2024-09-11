import React, { useState } from 'react';
import './App.css'; // Make sure the CSS is still being imported

function EmployeeRegistrationForm() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={darkMode ? 'dark-mode' : ''}>
      {/* Header Section */}
      <header>
        <div className="logo">
          <img src="logo.png" alt="Green Vibe Logo" />
          <span>Green Vibe</span>
        </div>
        <nav>

          <a href="#">Home</a>
          <a href="#">Contact</a>
          <a href="#">Help</a>

        </nav>
      </header>

      {/* Main Content Section */}
      <main>
        <div className="form-container">
          <h1>Employee Registration Form</h1>
          <form>
            <div className="input-container">
              <input type="text" id="firstName" name="firstName" placeholder=" " required />
              <label htmlFor="firstName">First Name</label>
            </div>

            <div className="input-container">
              <input type="text" id="lastName" name="lastName" placeholder=" " required />
              <label htmlFor="lastName">Last Name</label>
            </div>

            <div className="input-container">
              <input type="date" id="dob" name="dob" placeholder=" " required />
              <label htmlFor="dob">DOB</label>
            </div>

            <div className="input-container">
              <select id="gender" name="gender" required>
                <option value="" disabled selected></option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
              <label htmlFor="gender">Gender</label>
            </div>

            <div className="input-container">
              <input type="email" id="email" name="email" placeholder=" " required />
              <label htmlFor="email">Email</label>
            </div>

            <div className="input-container">
              <input type="text" id="nic" name="nic" placeholder=" " required />
              <label htmlFor="nic">NIC</label>
            </div>

            <div className="input-container">
              <input type="text" id="address" name="address" placeholder=" " required />
              <label htmlFor="address">Address</label>
            </div>

            <div className="input-container">
              <input type="text" id="phoneNumber" name="phoneNumber" placeholder=" " required />
              <label htmlFor="phoneNumber">Phone Number</label>
            </div>

            <div className="input-container">
              <select id="designation" name="designation" required>
                <option value="" disabled selected></option>
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
              <button type="reset" className="clear-button">Clear</button>
            </div>
            <button type="submit" className="submit-button">Submit</button>
          </form>
        </div>
      </main>

      {/* Footer Section */}
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
