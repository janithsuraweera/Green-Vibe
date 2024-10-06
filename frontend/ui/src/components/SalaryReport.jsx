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
                item.salary
            ]),
        });

        // Calculate total salary
        const totalSalary = salaryData.reduce((total, item) => total + item.salary, 0);
        doc.text(`Total Salary: ${totalSalary}`, 14, doc.lastAutoTable.finalY + 10);

        // Save the PDF
        if (salaryData.length > 0) {
            const employeeID = salaryData[0].employee.employeeID;
            doc.save(`${employeeID} - Salary - Report.pdf`);
        } else {
            doc.save("Salary-Report.pdf"); // Default name if no employee data
        }
    };

    // Calculate total salary for display
    const totalSalary = salaryData.reduce((total, item) => total + item.salary, 0);

    return (
        <div className="salary-report-container">
            <h1 className="report-title">Salary Report</h1>
            <button onClick={generatePDF} className="download-button">Download as PDF</button>

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
                                    <td>{item.epf}</td>
                                    <td>{item.etf}</td>
                                    <td>{item.salary}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="total-salary">
                        <h3>Total Salary: {totalSalary}</h3>
                    </div>
                </>
            )}
        </div>
    );
};

export default SalaryReport;
