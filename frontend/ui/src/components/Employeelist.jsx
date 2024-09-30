import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Correctly import Link here
import axios from 'axios';
import './Employeelist.css';
import UpdateEmployee from './UpdateEmployee';

export const Employeelist = () => {
    const [employees, setEmployees] = useState([]);
    const [searchQuery, setSearchQuery] = useState(''); // State for search query

    useEffect(() => {
        axios.get('http://localhost:9001/api/employees')
            .then((res) => {
                setEmployees(res.data);
                console.log(res.data);
            })
            .catch(() => { console.log('Error while getting data'); });
    }, []);

    const onDeleteClick = (_id) => {
        axios
            .delete(`http://localhost:9001/api/employees/${_id}`)
            .then(() => {
                window.location.reload();
            })
            .catch((err) => {
                console.error('Delete Error', err.response ? err.response.data : err.message);
            });
    };

    const handleSearch = (e) => {
        setSearchQuery(e.target.value); // Update the search query when the user types in the search box
    };

    // Filter the employees based on the search query (match against employeeID)
    const filteredEmployees = employees.filter(employee =>
        employee.employeeID.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Function to handle salary report generation
    const generateSalaryReport = (employee) => {
        // Logic to generate the salary report for the employee
        // Here, you might fetch the salary data from the backend or compute it
        // For this example, we will assume a simple salary calculation

        const salary = employee.salary; // Assuming `salary` is part of the employee object

        // Example salary report generation (this could also involve PDF generation, etc.)
        alert(`Salary Report for ${employee.firstName} ${employee.lastName}:\nEmployee ID: ${employee.employeeID}\nSalary: ${salary}`);
        
        // You can also generate and download a report file, e.g., as a CSV or PDF
    };

    return (
        <div>
            <h1>Employee Table</h1>
            
            <div className="search-container">
    <i className="fas fa-search search-icon"></i>
    <input
        type="text"
        placeholder="Search by Employee ID"
        value={searchQuery}
        onChange={handleSearch} // Update search query on input change
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
                                    {/* Delete Button */}
                                    <button onClick={() => onDeleteClick(employee._id)}>
                                        <i className="fas fa-trash"></i> {/* Delete icon */}
                                    </button>

                                    {/* Update Button */}
                                    <Link
                                        to={`/update/${employee._id}`}
                                        className="fas fa-edit">
                                    </Link>

                                    {/* Salary Report Button */}
                                    <button onClick={() => generateSalaryReport(employee)}>
                                    <i className="fas fa-trash" id="reportbtn"></i>
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
