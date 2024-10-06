import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import './EmployeeReport.css';

const EmployeeReport = () => {
    const location = useLocation();
    const { reportData } = location.state || { reportData: {} }; // Single employee data
    const [employeeReport, setEmployeeReport] = useState({});

    useEffect(() => {
        if (reportData) {
            setEmployeeReport(reportData);
        } else {
            console.log("No report data received");
        }
    }, [reportData]);

    const generatePDF = () => {
        const doc = new jsPDF();
        doc.text(`Salary Report of ${employeeReport.employeeID}`, 14, 16);
        autoTable(doc, { 
            startY: 20,
            head: [['Employee Name', 'Employee ID', 'EPF', 'ETF', 'Salary']],
            body: [[
                `${employeeReport.firstName} ${employeeReport.lastName}`,
                employeeReport.employeeID,
                (employeeReport.salary * 0.08).toFixed(2), // EPF calculation
                (employeeReport.salary * 0.03).toFixed(2), // ETF calculation
                employeeReport.salary
            ]],
        });

        doc.save(`${employeeReport.employeeID}-Salary-Report.pdf`);
    };

    return (
        <div className="employee-report-container">
            {employeeReport ? (
                <>
                    <h1>Salary Report of {employeeReport.employeeID}</h1>
                    <button onClick={generatePDF} className="download-button">Download as PDF</button>
                    <div className="report-details">
                        <p>Employee Name: {employeeReport.firstName} {employeeReport.lastName}</p>
                        <p>Employee ID: {employeeReport.employeeID}</p>
                        <p>EPF: {(employeeReport.salary * 0.08).toFixed(2)}</p>
                        <p>ETF: {(employeeReport.salary * 0.03).toFixed(2)}</p>
                        <p>Salary: {employeeReport.salary}</p>
                    </div>
                </>
            ) : (
                <h2>No salary report available</h2>
            )}
        </div>
    );
};

export default EmployeeReport;
