import React, {useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Correctly import Link here
import axios from "axios";
import './Employeelist.css';
import UpdateEmployee from './UpdateEmployee';

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

    const onDeleteClick = (_id) => { 
        axios
          .delete(`http://localhost:9001/api/employees/${_id}`)
          .then(() => {
            window.location.reload();
          })
          .catch((err) => {
            console.error("Delete Error", err.response ? err.response.data : err.message);
          });
    };

    const onUpdateClick = (employee) => {
        // Add your update logic here (e.g., redirect to an update form or show a modal)
        console.log("Updating employee: ", employee);

        // Example: Redirect to an update page (assuming routing is set up)
        // window.location.href = `/update-employee/${employee._id}`;
    };

    return (
        <div>
            <h1>Employee Table</h1>
            <div className="serchbar">
<input type="text" placeholder='Search '/>

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
                                <td className="buttons">
                                    {/* Delete Button */}
                                    <button onClick={() => onDeleteClick(employee._id)}>
                                        <i className="fas fa-trash"></i> {/* Delete icon */}
                                    </button>
                                   
                             
                                   <Link lassName="buttons"
                               
                                        to={`/update/${employee._id}`}
                                        className="fas fa-edit">
                                            
                                    </Link>
                                
  
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
