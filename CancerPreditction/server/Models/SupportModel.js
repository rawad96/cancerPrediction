const mongoose = require("mongoose");

const SupportSchema = new mongoose.Schema(
  {
    userFullName: String,
    userEmail: String,
    userId: String,
    phoneNUmber: String,
    department: String,
    subject: String,
    description: String,
    imageUrl: String,
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: { type: Date, default: Date.now },
    isResolved: { type: Boolean, default: false },
  },
  { versionKey: false }
);

const Support = mongoose.model("support", SupportSchema, "supports");

module.exports = Support;
