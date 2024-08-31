// models/register.js

const mongoose = require("mongoose");

const registerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    resume: { type: String, required: true }, // Store the filename here
});

const Register = mongoose.model("Register", registerSchema);

module.exports = Register;
