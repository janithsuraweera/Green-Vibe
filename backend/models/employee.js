const express = require('express');
const Joi = require('joi');
const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
    employeeID: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: (v) => {
                return Joi.string().regex(/^[a-zA-Z0-9]{5,10}$/).validate(v).error === undefined;
            },
            message: 'Employee ID must be 5-10 characters long and contain only letters and numbers'
        }
    },

    firstName: {
        type: String,
        required: true,
        validate: {
            validator: (v) => {
                return Joi.string().regex(/^[a-zA-Z ]{2,50}$/).validate(v).error === undefined;
            },
            message: 'First Name must be 2-50 characters long and contain only letters and spaces'
        }
    },

    lastName: {
        type: String,
        required: true,
        validate: {
            validator: (v) => {
                return Joi.string().regex(/^[a-zA-Z ]{2,50}$/).validate(v).error === undefined;
            },
            message: 'Last Name must be 2-50 characters long and contain only letters and spaces'
        }
    },

    dob: {
        type: Date,
        required: true,
        validate: {
            validator: (v) => {
                // Check if the date is not in the future
                const today = new Date();
                if (v > today) {
                    return false; // Date of birth cannot be in the future
                }

                // Check if the date is not more than 60 years ago
                const maxDate = new Date();
                maxDate.setFullYear(today.getFullYear() - 60);
                if (v < maxDate) {
                    return false; // Date of birth must be within the last 60 years
                }

                return true;
            },
            message: 'Date of Birth must be within the last 60 years and cannot be a future date'
        }
    },

    gender: {
        type: String,
        required: true,
        enum: ['male', 'female', 'other'],
    },

    email: {
        type: String,
        required: true,
        validate: {
            validator: (v) => {
                return Joi.string().email({ tlds: { allow: false } }).validate(v).error === undefined;
            },
            message: 'Email must be valid'
        }
    },

    nic: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: (v) => {
                return Joi.string().regex(/^\d{9}[vV]|\d{12}$/).validate(v).error === undefined;
            },
            message: 'NIC must be either 9 digits followed by "V" or "v", or 12 digits long'
        }
    },

    address: {
        type: String,
        required: true,
        validate: {
            validator: (v) => {
                return Joi.string().regex(/^[a-zA-Z0-9\s,.-]{5,100}$/).validate(v).error === undefined;
            },
            message: 'Address must be 5-100 characters long and contain only letters, numbers, spaces, commas, periods, and hyphens'
        }
    },

    phoneNumber: {
        type: String,
        required: true,
        validate: {
            validator: (v) => {
                return Joi.string().regex(/^\d{10}$/).validate(v).error === undefined;
            },
            message: 'Phone number must be exactly 10 digits'
        }
    },

    designation: {
        type: String,
        required: true,
        enum: ['manager', 'supervisor', 'engineer', 'technician', 'worker'],
    }
});


module.exports = Employee = mongoose.model("employee", EmployeeSchema)