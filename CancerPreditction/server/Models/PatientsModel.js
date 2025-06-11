const mongoose = require("mongoose");

const PatientSchema = new mongoose.Schema(
  {
    patientId: String,
    fullname: String,
    email: String,
    phone: String,
    dateOfBirth: Date,
    gender: String,
    address: String,
    age: String,
    medicalHistory: [],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  { versionKey: false }
);

const Patients = mongoose.model("patient", PatientSchema, "patients");

module.exports = Patients;
