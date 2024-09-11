const express = require('express');
const Joi = require('joi');
const router = express.Router()
const Employees = require("../models/employee");
// GET /api/employees/test - Test the employee routes.
router.get("/test", (req, res) => res.send("Employee routes working..."));

// POST /api/employees - Add a new employee to the database.  //CREATE
router.post("/", (req, res) => {
    Employees.create(req.body)
        .then(() => res.json({ msg: "Employee added successfully..." }))
        .catch(() => res.status(400).json({ msg: "Employee adding failed..." }));
});


// GET /api/employees - Get all employees from the database.    //READ
router.get("/", (req, res) => {
    Employees.find()
        .then((employees) => res.json(employees))
        .catch((err) => res.status(400).json({ msg: "No employee found" }));
});

// routes/employees.js
router.post("/", (req, res) => {
    Employees.create(req.body)
        .then(() => res.json({ msg: "Employee added successfully..." }))
        .catch((err) => {
            console.log("Error: ", err);
            res.status(400).json({ msg: "Employee adding failed..." });
        });
});



// GET /api/employees/search/:name - Search for employees by name.
// GET /api/employees/:id - Get a specific employee by ID from the database.
router.get("/:id", (req, res) => {
    Employees.findById(req.params.id)
        .then((employee) => res.json(employee))
        .catch(() => res.status(400).json({
            msg: "Cannot find employee"
        }));
});

// PUT /api/employees/:id - Update a specific employee by ID in the database.    //UPDATE
router.put("/:id", (req, res) => {
    Employees.findByIdAndUpdate(req.params.id, req.body)
        .then(() => res.json({ msg: "Update successfully..." }))
        .catch(() => res.status(400).json({ msg: "Update failed..." }));
});

// DELETE /api/employees/:id - Delete a specific employee by ID from the database.    //DELETE
router.delete("/:id", (req, res) => {
    Employees.findByIdAndDelete(req.params.id)
        .then(() => res.json({ msg: "Employee deleted successfully..." }))
        .catch(() => res.status(400).json({ msg: "Delete failed..." }));
});

// Validation middleware
module.exports = router; // The export statement is correct as 'router' is the variable being used.