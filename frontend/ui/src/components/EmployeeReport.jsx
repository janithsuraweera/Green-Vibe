import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import './EmployeeReport.css';

const EmployeeReport = () => {
    const location = useLocation();
    const { reportData } = location.state || { reportData: {} };
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
                employeeReport.epf,
                employeeReport.etf,
                employeeReport.salary
            ]],
        });

        doc.save(`${employeeReport.employeeID}-Salary-Report.pdf`);
    };

    return (
        <div className="employee-report-container">
            <h1>Salary Report of {employeeReport.employeeID}</h1>
            <button onClick={generatePDF} className="download-button">Download as PDF</button>

            <div className="report-details">
                <p>Employee Name: {employeeReport.firstName} {employeeReport.lastName}</p>
                <p>Employee ID: {employeeReport.employeeID}</p>
                <p>EPF: {employeeReport.epf}</p>
                <p>ETF: {employeeReport.etf}</p>
                <p>Salary: {employeeReport.salary}</p>
            </div>
        </div>
    );
};

export default EmployeeReport;
