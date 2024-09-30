import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; 
import axios from 'axios';
import './Employeelist.css';
import UpdateEmployee from './UpdateEmployee';

export const Employeelist = () => {
    const [employees, setEmployees] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        axios.get('http://localhost:9001/api/employees')
            .then((res) => {
                setEmployees(res.data);
                console.log(res.data);
            })
            .catch(() => { console.log('Error while getting data'); });
    }, []);

    const onDeleteClick = (_id) => {
        axios.delete(`http://localhost:9001/api/employees/${_id}`)
            .then(() => {
                window.location.reload();
            })
            .catch((err) => {
                console.error('Delete Error', err.response ? err.response.data : err.message);
            });
    };

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    };

    // Filter employees based on search query (match against employeeID, firstName, lastName, or NIC)
    const filteredEmployees = employees.filter(employee =>
        employee.employeeID.toLowerCase().includes(searchQuery.toLowerCase()) ||
        employee.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        employee.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        employee.nic.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const generateSalaryReport = (employee) => {
        const salary = employee.salary; 
        alert(`Salary Report for ${employee.firstName} ${employee.lastName}:\nEmployee ID: ${employee.employeeID}\nSalary: ${salary}`);
    };

    return (
        <div>
            <h1>Employee Table</h1>
            
            <div className="search-container">
                <i className="fas fa-search search-icon"></i>
                <input
                    type="text"
                    placeholder="Search by Employee ID, Name, or NIC"
                    value={searchQuery}
                    onChange={handleSearch}
                    className="search-bar"
                />
            </div>

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
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredEmployees.length > 0 ? (
                        filteredEmployees.map((employee) => (
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
                                <td className="buttons">
                                    <button onClick={() => onDeleteClick(employee._id)}>
                                        <i className="fas fa-trash"></i>
                                    </button>
                                    <Link to={`/update/${employee._id}`} className="fas fa-edit"></Link>
                                    <button onClick={() => generateSalaryReport(employee)}>
                                        <i className="fas fa-file-invoice-dollar"></i>
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="11">No data found</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};
