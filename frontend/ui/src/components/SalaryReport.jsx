import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import './SalaryReport.css';

const SalaryReport = () => {
    const location = useLocation();
    const { reportData } = location.state || { reportData: [] };
    const [salaryData, setSalaryData] = useState([]);

    useEffect(() => {
        if (reportData && reportData.length > 0) {
            setSalaryData(reportData);
        } else {
            console.log("No report data received, only showing background image");
        }
    }, [reportData]);

    // Function to calculate EPF and ETF based on salary
    const calculateEPF = (salary) => {
        return (salary * 0.08).toFixed(2); // EPF: 8% of salary
    };

    const calculateETF = (salary) => {
        return (salary * 0.03).toFixed(2); // ETF: 3% of salary
    };

    const generatePDF = () => {
        const doc = new jsPDF();
        doc.text("Salary Report", 14, 16);
        autoTable(doc, { 
            startY: 20,
            head: [['Employee Name', 'Employee ID', 'EPF', 'ETF', 'Salary']],
            body: salaryData.map(item => [
                `${item.employee.firstName} ${item.employee.lastName}`,
                item.employee.employeeID,
                calculateEPF(item.salary), // Calculate EPF
                calculateETF(item.salary), // Calculate ETF
                item.salary
            ]),
        });
        // Assuming you want to save the report for the first employee in the report
        if (salaryData.length > 0) {
            const employeeID = salaryData[0].employee.employeeID;
            doc.save(`${employeeID} -Salary-Report.pdf`); // Employee ID used in the filename
        } else {
            doc.save("Salary-Report.pdf"); // Default name if no employee data
        }
    };

    const pieChartData = {
        labels: salaryData.map(item => `${item.employee.firstName} ${item.employee.lastName}`),
        datasets: [
            {
                label: 'Salary Distribution',
                data: salaryData.map(item => item.salary),
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
                hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
            },
        ],
    };

    return (
        <div className="salary-report-container">
            <h1 className="report-title">Salary Report</h1>
            <button onClick={generatePDF} className="download-button">Download as PDF</button>

            {/* If no salary data, display background image only */}
            {salaryData.length === 0 ? (
                <div className="background-only">
                    <h2>No salary report available yet.</h2>
                </div>
            ) : (
                <>
                    <table className="report-table">
                        <thead>
                            <tr>
                                <th>Employee Name</th>
                                <th>Employee ID</th>
                                <th>EPF</th>
                                <th>ETF</th>
                                <th>Salary</th>
                            </tr>
                        </thead>
                        <tbody>
                            {salaryData.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.employee.firstName} {item.employee.lastName}</td>
                                    <td>{item.employee.employeeID}</td>
                                    <td>{calculateEPF(item.salary)}</td> {/* Calculate EPF */}
                                    <td>{calculateETF(item.salary)}</td> {/* Calculate ETF */}
                                    <td>{item.salary}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="chart-container">
                        <h2>Salary Distribution</h2>
                        {/* Here you can render your Pie chart if needed */}
                    </div>
                </>
            )}
        </div>
    );
};

export default SalaryReport;
