import React, { useState } from 'react';
import './InsertEmployee.css'; // CSS file for styling
import axios from 'axios'; // For making API requests

export const InsertEmployee = () => {
  const [employeedata, setemployeedata] = useState({
    employeeID: "",
    firstName: "",
    lastName: "",
    dob: "",
    gender: "",
    email: "",
    nic: "",
    address: "",
    phoneNumber: "",
    designation: "",
  });

  const [errors, setErrors] = useState({});
  const [emailSuggestions, setEmailSuggestions] = useState([]);
  const [nicSuggestion, setNicSuggestion] = useState('');

  // Date validation to ensure DOB is within the last 60 years
  const isDateValid = (dob) => {
    const currentDate = new Date();
    const selectedDate = new Date(dob);
    const ageLimitDate = new Date();
    ageLimitDate.setFullYear(currentDate.getFullYear() - 60);
    return selectedDate <= currentDate && selectedDate >= ageLimitDate;
  };

  // NIC validation methods
  const isNicValidOld = (nic) => /^[0-9]{9}[vV]?$/.test(nic);
  const isNicValidNew = (nic) => /^[0-9]{12}$/.test(nic);


  // Phone number validation (exactly 10 digits)
  const isPhoneNumberValid = (phoneNumber) => /^[0-9]{10}$/.test(phoneNumber);

  // Employee ID validation (1-5 digits)
  const isEmployeeIdValid = (employeeID) => /^[0-9]{1,5}$/.test(employeeID);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "phoneNumber") {
      if (!/^[0-9]*$/.test(value) || value.length > 10) {
        return; // Prevent invalid phone number input
      }
    }

    // Handle NIC suggestions and validations
    if (name === "nic") {
      if (value.length === 9 && !value.endsWith('v') && !value.endsWith('V')) {
        setNicSuggestion(value + 'V'); // Suggest 'V' if the old NIC format is valid
      } else {
        setNicSuggestion('');
      }
    

      // Suggest NIC if it's an old format
      if (isNicValidOld(value) && value.length === 9 && !value.endsWith('v') && !value.endsWith('V')) {
        setNicSuggestion(value + 'V');
      } else {
        setNicSuggestion('');
      }
    }

    // Prevent invalid input for employee ID
    if (name === "employeeID" && !isEmployeeIdValid(value)) {
      return; // Prevent invalid employee ID input
    }
    // Email suggestions
    if (name === "email") {
      const domains = ['gmail.com', 'icloud.com', 'yahoo.com', 'outlook.com', 'hotmail.com'];
      const emailParts = value.split('@');
      if (emailParts.length > 1) {
        const suggestions = domains.map(domain => `${emailParts[0]}@${domain}`);
        setEmailSuggestions(suggestions);
      } else {
        setEmailSuggestions([]);
      }
    } else {
      setEmailSuggestions([]);
    }

    setemployeedata({
      ...employeedata,
      [name]: value,
    });
  };

  // Validate fields before submission
  const validateFields = () => {
    let errors = {};

    if (!employeedata.employeeID || !isEmployeeIdValid(employeedata.employeeID)) {
      errors.employeeID = "Employee ID is required and must be 1-5 digits.";
    }

    if (!employeedata.firstName) {
      errors.firstName = "First Name is required";
    }

    if (!employeedata.lastName) {
      errors.lastName = "Last Name is required";
    }

    if (!employeedata.dob || !isDateValid(employeedata.dob)) {
      errors.dob = "DOB must be a valid date and no more than 60 years in the past.";
    }

    if (!employeedata.gender) {
      errors.gender = "Gender is required";
    }

    if (!employeedata.email || !/\S+@\S+\.\S+/.test(employeedata.email)) {
      errors.email = "Email is invalid. Please use a valid format (e.g., example@gmail.com)";
    }

    if (!employeedata.nic || (!isNicValidOld(employeedata.nic) && !isNicValidNew(employeedata.nic))) {
      errors.nic = "NIC must be either 9 digits with an optional 'V' or 12 digits.";
    }

    if (!employeedata.address) {
      errors.address = "Address is required";
    }

    if (!employeedata.phoneNumber || !isPhoneNumberValid(employeedata.phoneNumber)) {
      errors.phoneNumber = "Phone Number must contain exactly 10 digits.";
    }

    if (!employeedata.designation) {
      errors.designation = "Designation is required";
    }

    setErrors(errors);
    return Object.keys(errors).length === 0; // Return true if no errors
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateFields()) {
      try {
        const response = await axios.post("http://localhost:9001/api/employees", employeedata);
        console.log("Data submitted successfully:", response.data);
        // Reset the form after successful submission
        setemployeedata({
          employeeID: "",
          firstName: "",
          lastName: "",
          dob: "",
          gender: "",
          email: "",
          nic: "",
          address: "",
          phoneNumber: "",
          designation: "",
        });
        setErrors({});
        setEmailSuggestions([]);
      } catch (error) {
        console.error("Error submitting data:", error.response ? error.response.data : error.message);
      }
    } else {
      console.log("Validation errors:", errors);
    }
  };

  return (
    <div className="form-container">
      <h1>Employee Registration Form</h1>
      <form onSubmit={handleSubmit}>
        {/* Employee ID */}
        <div className="input-container">
          <input
            type="text"
            id="employeeID"
            name="employeeID"
            required
            placeholder=" "
            onChange={handleChange}
            value={employeedata.employeeID}
          />
          <label htmlFor="employeeID">Employee ID</label>
          {errors.employeeID && <span className="error">{errors.employeeID}</span>}
        </div>

        {/* First Name */}
        <div className="input-container">
          <input
            type="text"
            id="firstName"
            name="firstName"
            required
            placeholder=" "
            onChange={handleChange}
            value={employeedata.firstName}
          />
          <label htmlFor="firstName">First Name</label>
          {errors.firstName && <span className="error">{errors.firstName}</span>}
        </div>

        {/* Last Name */}
        <div className="input-container">
          <input
            type="text"
            id="lastName"
            name="lastName"
            required
            placeholder=" "
            onChange={handleChange}
            value={employeedata.lastName}
          />
          <label htmlFor="lastName">Last Name</label>
          {errors.lastName && <span className="error">{errors.lastName}</span>}
        </div>

        {/* DOB */}
        <div className="input-container">
          <input
            type="date"
            id="dob"
            name="dob"
            required
            onChange={handleChange}
            value={employeedata.dob}
            max={new Date().toISOString().split("T")[0]} // Limit DOB to today or earlier
          />
          <label htmlFor="dob">DOB</label>
          {errors.dob && <span className="error">{errors.dob}</span>}
        </div>

        {/* Gender */}
        <div className="input-container">
          <select
            id="gender"
            name="gender"
            required
            onChange={handleChange}
            value={employeedata.gender}
          >
            <option value="" disabled></option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          <label htmlFor="gender">Gender</label>
          {errors.gender && <span className="error">{errors.gender}</span>}
        </div>

        {/* Email */}
        <div className="input-container">
          <input
            type="email"
            id="email"
            name="email"
            required
            placeholder=" "
            onChange={handleChange}
            value={employeedata.email}
          />
          <label htmlFor="email">Email</label>
          {emailSuggestions.length > 0 && (
            <ul className="suggestions">
              {emailSuggestions.map((suggestion, index) => (
                <li key={index} onClick={() => {
                  setemployeedata({ ...employeedata, email: suggestion });
                  setEmailSuggestions([]); // Clear suggestions after selection
                }}>
                  {suggestion}
                </li>
              ))}
            </ul>
          )}
          {errors.email && <span className="error">{errors.email}</span>}
        </div>

       {/* NIC */}
        <div className="input-container">
          <input
            type="text"
            id="nic"
            name="nic"
            required
            placeholder=" "
            onChange={handleChange}
            value={employeedata.nic}
            maxLength={12}
          />
          <label htmlFor="nic">NIC</label>
          {nicSuggestion && <span className="suggestion">Did you mean: {nicSuggestion}</span>}
          {errors.nic && <span className="error">{errors.nic}</span>}
        </div>

        {/* Address */}
        <div className="input-container">
          <input
            type="text"
            id="address"
            name="address"
            required
            placeholder=" "
            onChange={handleChange}
            value={employeedata.address}
          />
          <label htmlFor="address">Address</label>
          {errors.address && <span className="error">{errors.address}</span>}
        </div>

        {/* Phone Number */}
        <div className="input-container">
          <input
            type="text"
            id="phoneNumber"
            name="phoneNumber"
            required
            placeholder=" "
            onChange={handleChange}
            value={employeedata.phoneNumber}
          />
          <label htmlFor="phoneNumber">Phone Number</label>
          {errors.phoneNumber && <span className="error">{errors.phoneNumber}</span>}
        </div>

        {/* Designation */}
        <div className="input-container">
          <select
            id="designation"
            name="designation"
            required
            onChange={handleChange}
            value={employeedata.designation}
          >
            <option value="" disabled></option>
            <option value="manager">Manager</option>
            <option value="supervisor">Supervisor</option>
            <option value="engineer">Engineer</option>
            <option value="technician">Technician</option>
            <option value="worker">Worker</option>
          </select>
          <label htmlFor="designation">Designation</label>
          {errors.designation && <span className="error">{errors.designation}</span>}
        </div>

        <div className="form-buttons">
          <button type="button" className="back-button">Back</button>
          <button type="button" className="clear-button" onClick={() => setemployeedata({})}>Clear</button>
        </div>

        <button type="submit" className="submit-button">Submit</button>
      </form>
    </div>
  );
};
