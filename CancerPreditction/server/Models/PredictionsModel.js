const mongoose = require("mongoose");

const PredictionSchema = new mongoose.Schema(
  {
    predictionData: [
      {
        cancerType: String,
        prediction: String,
        probability: String,
        inputData: [],
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    patientId: String,
  },
  { versionKey: false }
);

const Prediction = mongoose.model(
  "prediction",
  PredictionSchema,
  "predictions"
);

module.exports = Prediction;
