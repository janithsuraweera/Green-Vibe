import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import axios from 'axios';

function UpdateEmployee() {
  const [employeedata, setEmployeedata] = useState({
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

  const { _id } = useParams();
  const navigate = useNavigate(); // Fixed navigate typo

  // Fetch employee data
  useEffect(() => {
    axios
      .get(`http://localhost:9001/api/employees/${_id}`)
      .then((res) => {
        setEmployeedata({
          employeeID: res.data.employeeID,
          firstName: res.data.firstName,
          lastName: res.data.lastName,
          dob: res.data.dob,
          gender: res.data.gender,
          email: res.data.email,
          nic: res.data.nic,
          address: res.data.address,
          phoneNumber: res.data.phoneNumber,
          designation: res.data.designation,
        });
      })
      .catch((err) => {
        console.error("Error fetching employee data", err);
      });
  }, [_id]);

  // Handle form input change
  const onChange = (e) => {
    setEmployeedata({
      ...employeedata, // Maintain existing values
      [e.target.name]: e.target.value, // Update the key dynamically
    });
  };

  // Handle form submission
  const onSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:9001/api/employees/${_id}`, employeedata)
      .then((res) => {
        console.log("Employee updated successfully", res.data);
        navigate("/employees"); // Navigate back to the employee list or another page
      })
      .catch((err) => {
        console.error("Error updating employee", err);
      });
  };

  return (
    <div>
      <h1>Update Employee</h1>
      <form onSubmit={onSubmit}>
        <label>Employee ID:</label>
        <input
          type="text"
          name="employeeID"
          value={employeedata.employeeID}
          onChange={onChange}
          readOnly
        />
        <br />

        <label>First Name:</label>
        <input
          type="text"
          name="firstName"
          value={employeedata.firstName}
          onChange={onChange}
        />
        <br />

        <label>Last Name:</label>
        <input
          type="text"
          name="lastName"
          value={employeedata.lastName}
          onChange={onChange}
        />
        <br />

        <label>Date of Birth:</label>
        <input
          type="date"
          name="dob"
          value={employeedata.dob}
          onChange={onChange}
        />
        <br />

        <label>Gender:</label>
        <input
          type="text"
          name="gender"
          value={employeedata.gender}
          onChange={onChange}
        />
        <br />

        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={employeedata.email}
          onChange={onChange}
        />
        <br />

        <label>NIC:</label>
        <input
          type="text"
          name="nic"
          value={employeedata.nic}
          onChange={onChange}
        />
        <br />

        <label>Address:</label>
        <input
          type="text"
          name="address"
          value={employeedata.address}
          onChange={onChange}
        />
        <br />

        <label>Phone Number:</label>
        <input
          type="text"
          name="phoneNumber"
          value={employeedata.phoneNumber}
          onChange={onChange}
        />
        <br />

        <label>Designation:</label>
        <input
          type="text"
          name="designation"
          value={employeedata.designation}
          onChange={onChange}
        />
        <br />

        <button type="submit">Update Employee</button>
      </form>
    </div>
  );
}

export default UpdateEmployee;
