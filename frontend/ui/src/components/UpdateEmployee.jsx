import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import './Employeelist.css'; // Make sure this path is correct

function UpdateEmployee() {
  const [employee, setEmployee] = useState({
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

  const { id } = useParams(); // Get the employee ID from the URL
  const navigate = useNavigate(); // For redirecting after update

  // Fetch employee details when the component is mounted
  useEffect(() => {
    axios
      .get(`http://localhost:9001/api/employees/${id}`) // Correct API route
      .then((res) => {
        setEmployee(res.data); // Populate the form with the fetched data
      })
      .catch((err) => {
        console.log("Error from UpdateEmployee:", err);
      });
  }, [id]);

  // Handle input changes in the form
  const handleChange = (e) => {
    setEmployee({ ...employee, [e.target.name]: e.target.value });
  };

  // Handle form submission to update the employee
  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .put(`http://localhost:9001/api/employees/${id}`, employee) // PUT request to update the employee
      .then((res) => {
        navigate("/list"); // Redirect to the employee list after successful update
      })
      .catch((err) => {
        console.log("Error updating employee:", err);
      });
  };

  return (
    <div className="form-container">
      <h1>Update Employee Information</h1>
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <input
            type="text"
            name="employeeID"
            value={employee.employeeID}
            onChange={handleChange}
            placeholder="Employee ID"
            required
            disabled // Disable Employee ID field as it's auto-incremented
          />
          <label>Employee ID</label>
        </div>

        <div className="input-container">
          <input
            type="text"
            name="firstName"
            value={employee.firstName}
            onChange={handleChange}
            placeholder="First Name"
            required
          />
          <label>First Name</label>
        </div>

        <div className="input-container">
          <input
            type="text"
            name="lastName"
            value={employee.lastName}
            onChange={handleChange}
            placeholder="Last Name"
            required
          />
          <label>Last Name</label>
        </div>

        <div className="input-container">
          <input
            type="date"
            name="dob"
            value={employee.dob}
            onChange={handleChange}
            required
          />
          <label>DOB</label>
        </div>

        <div className="input-container">
          <select
            name="gender"
            value={employee.gender}
            onChange={handleChange}
            required
          >
            <option value="" disabled>
              Select Gender
            </option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          <label>Gender</label>
        </div>

        <div className="input-container">
          <input
            type="email"
            name="email"
            value={employee.email}
            onChange={handleChange}
            required
          />
          <label>Email</label>
        </div>

        <div className="input-container">
          <input
            type="text"
            name="nic"
            value={employee.nic}
            onChange={handleChange}
            required
          />
          <label>NIC</label>
        </div>

        <div className="input-container">
          <input
            type="text"
            name="address"
            value={employee.address}
            onChange={handleChange}
            required
          />
          <label>Address</label>
        </div>

        <div className="input-container">
          <input
            type="text"
            name="phoneNumber"
            value={employee.phoneNumber}
            onChange={handleChange}
            required
          />
          <label>Phone Number</label>
        </div>

        <div className="input-container">
          <select
            name="designation"
            value={employee.designation}
            onChange={handleChange}
            required
          >
            <option value="" disabled>
              Select Designation
            </option>
            <option value="manager">Manager</option>
            <option value="supervisor">Supervisor</option>
            <option value="engineer">Engineer</option>
            <option value="technician">Technician</option>
            <option value="worker">Worker</option>
          </select>
          <label>Designation</label>
        </div>

        <div className="form-buttons">
          <button type="submit" className="submit-button">
            Update
          </button>
          <button type="button" className="back-button" onClick={() => navigate("/list")}>
            Back
          </button>
        </div>
      </form>
    </div>
  );
}

export default UpdateEmployee;
