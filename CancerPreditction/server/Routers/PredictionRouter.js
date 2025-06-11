const express = require("express");
const Predictions = require("../BLL/PredictionBLL");
const axios = require("axios");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const predictions = await Predictions.getAllPredictions();
    res.send(predictions);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/:DB/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const prediction = await Predictions.getPredictionById(id);
    res.send(prediction);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/:patientId", async (req, res) => {
  try {
    const { patientId } = req.params;
    const prediction = await Predictions.getPredictionByPatientId(patientId);
    res.send(prediction);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post("/:patientId", async (req, res) => {
  try {
    const { patientId } = req.params;
    const predicttionData = req.body;

    let pythonResponse = {};

    if (predicttionData.cancerType === "Breast cancer") {
      pythonResponse = await axios.post(
        "http://localhost:5000/predict/breast",
        {
          data: predicttionData.patientData,
        }
      );
    }

    const { prediction, probability } = pythonResponse.data;

    const newPrediction = {
      cancerType: predicttionData.cancerType,
      prediction,
      probability,
      inputData: predicttionData.patientData,
      createdAt: new Date().toLocaleString(),
    };

    const result = await Predictions.addPrediction(newPrediction, patientId);

    res.status(200).send({ ...newPrediction, patientId });
  } catch (error) {
    console.error("Error during prediction process:", error);
    res.status(500).send("An error occurred while processing prediction.");
  }
});

router.put("/:patientId", async (req, res) => {
  try {
    const { patientId } = req.params;
    const updatedPrediction = req.body;
    const result = await Predictions.updatePrediction(
      patientId,
      updatedPrediction
    );
    res.send(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.delete("/:patientId", async (req, res) => {
  try {
    const { patientId } = req.params;
    const result = await Predictions.deletePredictionsByPatientId(patientId);
    res.send(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.delete("/:patientId/:predictionId/:single", async (req, res) => {
  try {
    const { patientId, predictionId } = req.params;
    const result = await Predictions.deletePrediction(patientId, predictionId);
    res.send(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.delete("/:patientId/:multi", async (req, res) => {
  try {
    const { patientId } = req.params;
    const { ids } = req.body;
    const result = await Predictions.deleteManyPredictions(patientId, ids);
    res.send(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.delete("/", async (req, res) => {
  try {
    const { ids } = req.body;
    const result = await Predictions.deleteManyPredictionsByPatientIds(ids);
    res.send(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.delete("/:many/:preditcion/:by/:_id", async (req, res) => {
  try {
    const { ids } = req.body;
    const result = await Predictions.deleteManyP(ids);
    res.send(result);
  } catch (error) {
    res.status(500).send(error);
  }
});
module.exports = router;
