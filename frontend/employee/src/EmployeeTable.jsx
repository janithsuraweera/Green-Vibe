import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const EmployeeTable = () => {
  const location = useLocation();
  const [submittedData, setSubmittedData] = useState(location.state);

  useEffect(() => {
    if (location.state) {
      setSubmittedData(location.state);
    }
  }, [location.state]);

  const handleUpdate = (data) => {
    // Implement update logic here
    console.log("Update:", data);
  };

  const handleDelete = (data) => {
    // Implement delete logic here
    console.log("Delete:", data);
  };

  return (
    <div>
      <h1>Employee Table</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Employee ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Date of Birth</th>
            <th>Email</th>
            <th>NIC</th>
            <th>Address</th>
            <th>Phone Number</th>
            <th>Designation</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {submittedData ? (
            <tr>
              <td>{submittedData.employeeID}</td>
              <td>{submittedData.firstName}</td>
              <td>{submittedData.lastName}</td>
              <td>{submittedData.dob}</td>
              <td>{submittedData.gender}</td>
              <td>{submittedData.email}</td>
              <td>{submittedData.nic}</td>
              <td>{submittedData.address}</td>
              <td>{submittedData.phoneNumber}</td>
              <td>{submittedData.designation}</td>
              <td>
                <button onClick={() => handleUpdate(submittedData)}>Update</button>
                <button onClick={() => handleDelete(submittedData)}>Delete</button>
              </td>
            </tr>
          ) : (
            <tr>
              <td colSpan="11">No data submitted</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeTable;
