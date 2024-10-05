import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Pie } from 'react-chartjs-2';
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

    const generatePDF = () => {
        const doc = new jsPDF();
        doc.text("Salary Report", 14, 16);
        autoTable(doc, { 
            startY: 20,
            head: [['Employee Name', 'Employee ID', 'EPF', 'ETF', 'Salary']],
            body: salaryData.map(item => [
                `${item.employee.firstName} ${item.employee.lastName}`,
                item.employee.employeeID,
                item.epf,
                item.etf,
                item.Pie
            ]),
        });
        doc.save("salary-report.pdf");
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
                <div className="background-only"> {/* Ensure the background image is visible */}
                    <h2>No salary report available yet.</h2>
                </div>
            ) : (
                <>
                    <ul className="report-list">
                        {salaryData.map((item, index) => (
                            <li key={index}>
                                {item.employee.firstName} {item.employee.lastName} - 
                                Employee ID: {item.employee.employeeID}, 
                                EPF: {item.epf},
                                ETF: {item.etf},
                                Salary: {item.salary}
                            </li>
                        ))}
                    </ul>
                    <div className="chart-container">
                        <h2>Salary Distribution</h2>
                        
                    </div>
                </>
            )}
        </div>
    );
};

export default SalaryReport;
