import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Salary.css';

const Salary = () => {
    const [employees, setEmployees] = useState([]);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [salaryReport, setSalaryReport] = useState(null);
    const [designations, setDesignations] = useState([]);

    useEffect(() => {
        // Fetch employees
        axios.get('http://localhost:9001/api/employees')
            .then((res) => {
                setEmployees(res.data);
                // Extract unique designations
                const uniqueDesignations = [...new Set(res.data.map(emp => emp.designation))];
                setDesignations(uniqueDesignations);
            })
            .catch(() => { console.log('Error while getting data'); });
    }, []);

    const handleEmployeeSelect = (e) => {
        const employee = employees.find(emp => emp._id === e.target.value);
        setSelectedEmployee(employee);
    };

    const generateSalaryReport = () => {
        if (selectedEmployee) {
            const { firstName, lastName, employeeID, salary, epf, etf } = selectedEmployee;
            setSalaryReport(
                `Salary Report for ${firstName} ${lastName}:\n` +
                `Employee ID: ${employeeID}\n` +
                `Salary: ${salary}\n` +
                `EPF: ${epf}\n` +
                `ETF: ${etf}`
            );
        }
    };

    return (
        <div className="salary-container">
            <h1>Generate Salary Report</h1>
            <label>Select Employee:</label>
            <select onChange={handleEmployeeSelect}>
                <option value="">--Select Employee--</option>
                {employees
                    .filter(emp => emp.designation === selectedEmployee?.designation || !selectedEmployee)
                    .map((employee) => (
                        <option key={employee._id} value={employee._id}>
                            {employee.firstName} {employee.lastName} - {employee.employeeID}
                        </option>
                    ))}
            </select>
            <button onClick={generateSalaryReport} disabled={!selectedEmployee}>
                Generate Report
            </button>
            {salaryReport && (
                <div className="report">
                    <h2>Salary Report</h2>
                    <pre>{salaryReport}</pre>
                </div>
            )}
        </div>
    );
};

export default Salary;
