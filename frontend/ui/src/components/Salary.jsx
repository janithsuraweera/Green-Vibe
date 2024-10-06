import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Salary.css';

const Salary = () => {
    const [employees, setEmployees] = useState([]);
    const [designations, setDesignations] = useState([]);
    const [selectedDesignation, setSelectedDesignation] = useState('');
    const [filteredEmployees, setFilteredEmployees] = useState([]);
    const [selectedEmployee, setSelectedEmployee] = useState('');
    const [salary, setSalary] = useState(0);
    const [salaryData, setSalaryData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const response = await fetch('http://localhost:9001/api/employees');
                if (!response.ok) {
                    throw new Error('Failed to fetch employees');
                }
                const data = await response.json();
                setEmployees(data);

                const uniqueDesignations = [...new Set(data.map(emp => emp.designation))];
                setDesignations(uniqueDesignations);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchEmployees();
    }, []);

    const handleDesignationChange = (e) => {
        const designation = e.target.value;
        setSelectedDesignation(designation);

        const filtered = employees.filter(emp => emp.designation === designation);
        setFilteredEmployees(filtered);
        setSelectedEmployee('');
        setSalary(0);
    };

    const handleEmployeeChange = (e) => {
        setSelectedEmployee(e.target.value);
    };

    const handleSalaryChange = (e) => {
        setSalary(e.target.value);
    };

    const handleAddToReport = () => {
        if (!salary || selectedEmployee === '') {
            alert('Please select an employee and enter a salary.');
            return;
        }

        const employeeData = filteredEmployees.find(emp => emp.employeeID === selectedEmployee);
        if (employeeData) {
            const report = {
                employee: employeeData,
                salary: parseFloat(salary),
                epf: (salary * 0.08).toFixed(2),
                etf: (salary * 0.03).toFixed(2)
            };

            // Update salaryData with the new report
            setSalaryData(prev => {
                const existingReportIndex = prev.findIndex(item => item.employee.employeeID === employeeData.employeeID);
                if (existingReportIndex > -1) {
                    // If the employee already exists in the report, update their salary
                    const updatedData = [...prev];
                    updatedData[existingReportIndex] = report;
                    return updatedData;
                }
                return [...prev, report]; // Else add a new report
            });

            // Clear selections and input fields
            setSelectedEmployee('');
            setSalary(0);
            setSelectedDesignation('');
            setFilteredEmployees([]);
        }
    };

    // Navigate to the SalaryReport page with current salary data
    const handleViewReport = () => {
        if (salaryData.length === 0) {
            alert('No salary report available. Please add salary data first.');
            return;
        }
        navigate('/salaryreport', { state: { reportData: salaryData } });
    };

    const handleEmployeeReport = (employeeID) => {
        const employeeData = employees.find(emp => emp.employeeID === employeeID);
        navigate('/employeereport', { state: { reportData: employeeData } });
    };

    if (loading) {
        return <div>Loading employees...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="salary-container">
            <h1>Salary Reporting</h1>

            <label htmlFor="designation">Select Designation: </label>
            <select id="designation" value={selectedDesignation} onChange={handleDesignationChange}>
                <option value="">-- Select --</option>
                {designations.map((designation, index) => (
                    <option key={index} value={designation}>{designation}</option>
                ))}
            </select>
            <br />

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

            {/* Show View Report button only if there are salary reports */}
            {salaryData.length > 0 && (
                <>
                    <button onClick={handleViewReport}>View Salary Report</button>
                    <button onClick={() => handleEmployeeReport(selectedEmployee)}>View Employee Report</button>
                </>
            )}
        </div>
    );
};

export default Salary;
