import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import './Employeelist.css'; // Ensure this path is correct

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

  const [errors, setErrors] = useState({});
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

  // Validation methods
  const isDateValid = (dob) => {
    const currentDate = new Date();
    const selectedDate = new Date(dob);
    const ageLimitDate = new Date();
    ageLimitDate.setFullYear(currentDate.getFullYear() - 60);
    return selectedDate <= currentDate && selectedDate >= ageLimitDate;
  };

  const isNicValidOld = (nic) => /^[0-9]{9}[vV]?$/.test(nic);
  const isNicValidNew = (nic) => /^[0-9]{12}$/.test(nic);
  const isPhoneNumberValid = (phoneNumber) => /^[0-9]{10}$/.test(phoneNumber);
  const isEmployeeIdValid = (employeeID) => /^[0-9]{1,5}$/.test(employeeID);

  // Handle input changes in the form
  const handleChange = (e) => {
    setEmployee({ ...employee, [e.target.name]: e.target.value });
  };

  // Validate fields before submission
  const validateFields = () => {
    let errors = {};

    if (!employee.firstName) {
      errors.firstName = "First Name is required";
    }

    if (!employee.lastName) {
      errors.lastName = "Last Name is required";
    }

    if (!employee.dob || !isDateValid(employee.dob)) {
      errors.dob = "DOB must be a valid date and no more than 60 years in the past.";
    }

    if (!employee.gender) {
      errors.gender = "Gender is required";
    }

    if (!employee.email || !/\S+@\S+\.\S+/.test(employee.email)) {
      errors.email = "Email is invalid. Please use a valid format (e.g., example@gmail.com)";
    }

    if (!employee.nic || (!isNicValidOld(employee.nic) && !isNicValidNew(employee.nic))) {
      errors.nic = "NIC must be either 9 digits with an optional 'V' or 12 digits.";
    }

    if (!employee.address) {
      errors.address = "Address is required";
    }

    if (!employee.phoneNumber || !isPhoneNumberValid(employee.phoneNumber)) {
      errors.phoneNumber = "Phone Number must contain exactly 10 digits.";
    }

    if (!employee.designation) {
      errors.designation = "Designation is required";
    }

    setErrors(errors);
    return Object.keys(errors).length === 0; // Return true if no errors
  };

  // Handle form submission to update the employee
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateFields()) {
      axios
        .put(`http://localhost:9001/api/employees/${id}`, employee) // PUT request to update the employee
        .then((res) => {
          navigate("/list"); // Redirect to the employee list after successful update
        })
        .catch((err) => {
          console.log("Error updating employee:", err);
        });
    } else {
      console.log("Validation errors:", errors);
    }
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
          {errors.employeeID && <span className="error">{errors.employeeID}</span>}
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
          {errors.firstName && <span className="error">{errors.firstName}</span>}
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
          {errors.lastName && <span className="error">{errors.lastName}</span>}
        </div>

        <div className="input-container">
          <input
            type="date"
            name="dob"
            value={employee.dob}
            onChange={handleChange}
            required
            max={new Date().toISOString().split("T")[0]} // Limit DOB to today or earlier
          />
          <label>DOB</label>
          {errors.dob && <span className="error">{errors.dob}</span>}
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
          {errors.gender && <span className="error">{errors.gender}</span>}
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
          {errors.email && <span className="error">{errors.email}</span>}
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
          {errors.nic && <span className="error">{errors.nic}</span>}
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
          {errors.address && <span className="error">{errors.address}</span>}
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
          {errors.phoneNumber && <span className="error">{errors.phoneNumber}</span>}
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
          {errors.designation && <span className="error">{errors.designation}</span>}
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
