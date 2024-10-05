import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Salary.css';

const Salary = () => {
    const [employees, setEmployees] = useState([]);
    const [designations, setDesignations] = useState([]); // Store unique designations
    const [selectedDesignation, setSelectedDesignation] = useState('');
    const [filteredEmployees, setFilteredEmployees] = useState([]);
    const [selectedEmployee, setSelectedEmployee] = useState('');
    const [salary, setSalary] = useState(0);
    const [salaryData, setSalaryData] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch employee data from an API or local data
        const fetchEmployees = async () => {
            const response = await fetch('http://localhost:9001/api/employees'); // Dummy API endpoint
            const data = await response.json();
            setEmployees(data);

            // Extract unique designations from employees
            const uniqueDesignations = [...new Set(data.map(emp => emp.designation))];
            setDesignations(uniqueDesignations);
        };

        fetchEmployees();
    }, []);

    const handleDesignationChange = (e) => {
        const designation = e.target.value;
        setSelectedDesignation(designation);

        // Filter employees by the selected designation
        const filtered = employees.filter(emp => emp.designation === designation);
        setFilteredEmployees(filtered);
        setSelectedEmployee(''); // Clear selected employee if designation changes
    };

    const handleEmployeeChange = (e) => {
        setSelectedEmployee(e.target.value);
    };

    const handleSalaryChange = (e) => {
        setSalary(e.target.value);
    };

    const handleAddToReport = () => {
        const employeeData = filteredEmployees.find(emp => emp.employeeID === selectedEmployee);
        if (employeeData) {
            const report = {
                employee: employeeData,
                salary: salary,
                epf: (salary * 0.08).toFixed(2), // EPF calculation
                etf: (salary * 0.03).toFixed(2)  // ETF calculation
            };

            const updatedSalaryData = [...salaryData, report];
            setSalaryData(updatedSalaryData);
            
            // Log for debugging
            console.log("Navigating to report with data:", updatedSalaryData);

            navigate('/salaryreport', { state: { reportData: updatedSalaryData } });
        }
    };

    return (
        <div className="salary-container">
            <h1>Salary Reporting</h1>

            {/* Dropdown to select designation */}
            <label htmlFor="designation">Select Designation: </label>
            <select id="designation" value={selectedDesignation} onChange={handleDesignationChange}>
                <option value="">-- Select --</option>
                {designations.map((designation, index) => (
                    <option key={index} value={designation}>{designation}</option>
                ))}
            </select>
            <br />

            {/* Dropdown to select employee based on filtered list */}
            {filteredEmployees.length > 0 && (
                <>
                    <label htmlFor="employee">Select Employee: </label>
                    <select id="employee" value={selectedEmployee} onChange={handleEmployeeChange}>
                        <option value="">-- Select Employee --</option>
                        {filteredEmployees.map((emp, index) => (
                            <option key={index} value={emp.employeeID}>
                                {emp.firstName} {emp.lastName} - {emp.employeeID}
                            </option>
                        ))}
                    </select>
                    <br />
                </>
            )}

            {/* Show salary input and 'Add to Report' button if an employee is selected */}
            {selectedEmployee && (
                <>
                    <label htmlFor="salary">Salary: </label>
                    <input
                        type="number"
                        id="salary"
                        value={salary}
                        onChange={handleSalaryChange}
                        placeholder="Enter salary"
                    />
                    <br />

                    <button onClick={handleAddToReport}>Add to Report</button>
                </>
            )}
        </div>
    );
};

export default Salary;