const mongoose = require("mongoose");

const UsersSchema = new mongoose.Schema(
  {
    fullName: String,
    idNumber: String,
    email: String,
    phone: String,
    password: String,
    licenseNumber: String,
    specialization: String,
    gender: String,
    birthDate: Date,
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: { type: Date, default: Date.now },
    permissions: [],
  },
  { versionKey: false }
);

const Users = mongoose.model("user", UsersSchema, "users");

module.exports = Users;
