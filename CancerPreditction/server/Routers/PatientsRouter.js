const express = require("express");
const Patients = require("../BLL/PatientsBLL");
const Predictions = require("../BLL/PredictionBLL");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const patients = await Patients.getAllPatients();
    res.send(patients);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/:all/:patients/:ids", async (req, res) => {
  try {
    const patients = await Patients.getAllPatientIDs();
    const ids = patients.map((p) => p.patientId);
    res.send(ids);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/:DB/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const patient = await Patients.getPatientById(id);
    res.send(patient);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const patient = await Patients.getPatientByPatientId(id);
    res.send(patient);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post("/", async (req, res) => {
  try {
    const patient = req.body;
    if (await Patients.getPatientByPatientId(patient.patientId)) {
      res.send("ID exsists");
    } else {
      const result = await Patients.addPatients(patient);
      const addPatientToPredictions = await Predictions.addPatientPredictions(
        result._doc
      );
      res.send("Added");
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const obj = req.body;
    const currentPatient = await Patients.getPatientById(id);
    const result = await Patients.updatePatients(id, obj);

    if (obj.patientId && obj.patientId !== currentPatient.patientId) {
      await Predictions.updatePrediction(id, obj.patientId);
    }
    res.send(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Patients.deletePatients(id);
    const deltePatientPredictions =
      await Predictions.deletePredictionsByPatientId(id);
    res.send(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.delete("/:delete/:multi", async (req, res) => {
  try {
    const { ids } = req.body;
    const result = await Patients.deleteManyPatients(ids);
    const deltePatientsPredictions =
      await Predictions.deleteManyPredictionsByPatientIds(ids);
    res.send(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
