import React, { useState, useEffect } from 'react';
import axios from "axios";
import './Employeelist.css';

export const Employeelist = () => {
    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:9001/api/employees")
            .then((res) => {
                setEmployees(res.data);
                console.log(res.data);
            })
            .catch(() => { console.log("Error while getting data"); });
    }, []);

    const handleUpdate = (employee) => {
        // Update logic here
    };

    const handleDelete = (employeeID) => {
        // Delete logic here
    };

    return (
        <div>
            <h1>Employee Table</h1>
            <table>
                <thead>
                    <tr>
                        <th>Employee ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Date of Birth</th>
                        <th>Gender</th>
                        <th>Email</th>
                        <th>NIC</th>
                        <th>Address</th>
                        <th>Phone Number</th>
                        <th>Designation</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.length > 0 ? (
                        employees.map((employee) => (
                            <tr key={employee.employeeID}>
                                <td>{employee.employeeID}</td>
                                <td>{employee.firstName}</td>
                                <td>{employee.lastName}</td>
                                <td>{new Date(employee.dob).toLocaleDateString()}</td>
                                <td>{employee.gender}</td>
                                <td>{employee.email}</td>
                                <td>{employee.nic}</td>
                                <td>{employee.address}</td>
                                <td>{employee.phoneNumber}</td>
                                <td>{employee.designation}</td>
                                <td class="buttons">
                                    <button onClick={() => handleUpdate(employee)}>
                                        <i className="fas fa-edit"></i> {/* Edit icon */}
                                    </button>
                                    <button onClick={() => handleDelete(employee.employeeID)}>
                                        <i className="fas fa-trash"></i> {/* Delete icon */}
                                    </button>
                                </td>
                            </tr>
                        ))
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
