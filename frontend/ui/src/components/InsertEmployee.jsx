import React, { useState } from 'react';
import './InsertEmployee.css';
import axios from 'axios';

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setemployeedata({
      ...employeedata,
      [name]: value,
    });
    console.log(employeedata);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Payload being sent:", employeedata); // Check the payload

    try {
      const response = await axios.post("http://localhost:9001/api/employees", employeedata);
      console.log("Data submitted successfully:", response.data);
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
    } catch (error) {
      console.error("Error submitting data:", error.response ? error.response.data : error.message);
    }
  };

  return (
<div>
  <div class="dropdown">
  <button class="dropbtn"><i class="fas fa-bars fa-2x"></i></button>
  <div class="dropdown-content">
    <a href="#">Dashbord</a>
    <a href="#">Employee List</a>
    <a href="#">Add Employee</a>
  </div>
</div>
    <div className="form-container">
       
      <h1>Employee Registration Form</h1>
      <form onSubmit={handleSubmit}>
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
        </div>

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
        </div>

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
        </div>

        <div className="input-container">
          <input
            type="date"
            id="dob"
            name="dob"
            required
            placeholder=" "
            onChange={handleChange}
            value={employeedata.dob}
          />
          <label htmlFor="dob">DOB</label>
        </div>

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
        </div>

        <div className="input-container">
          <input
            type="email"
            id="email"
            name="email"
            onChange={handleChange}
            value={employeedata.email}
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
            onChange={handleChange}
            required
            placeholder=" "
            value={employeedata.nic}
          />
          <label htmlFor="nic">NIC</label>
        </div>

        <div className="input-container">
          <input
            type="text"
            id="address"
            name="address"
            onChange={handleChange} // Corrected handler here
            required
            placeholder=" "
            value={employeedata.address}
          />
          <label htmlFor="address">Address</label>
        </div>

        <div className="input-container">
          <input
            type="text"
            id="phoneNumber"
            name="phoneNumber"
            onChange={handleChange}
            required
            placeholder=" "
            value={employeedata.phoneNumber}
          />
          <label htmlFor="phoneNumber">Phone Number</label>
        </div>

        <div className="input-container">
          <select
            id="designation"
            name="designation"
            onChange={handleChange}
            required
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
        </div>

        <div className="form-buttons">
          <button type="button" className="back-button">Back</button>
          <button type="button" className="clear-button">Clear</button>
        </div>

        <button type="submit" className="submit-button" onChange={handleChange}>Submit</button> 
      </form>
    </div>
    </div>
  );
};
