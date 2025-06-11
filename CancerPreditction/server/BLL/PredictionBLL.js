const Predictions = require("../Models/PredictionsModel");

const getAllPredictions = () => {
  return Predictions.find();
};

const getPredictionById = (id) => {
  return Predictions.findById({ _id: id });
};

const getPredictionByPatientId = (patientId) => {
  return Predictions.findOne({ patientId });
};

const addPatientPredictions = async (patient) => {
  const existing = await Predictions.findOne({ _id: patient._id });

  if (existing) {
    return "Patient exists";
  } else {
    const newPrediction = new Predictions({
      _id: patient._id,
      patientId: patient.patientId,
      predictionData: [],
    });
    await newPrediction.save();
  }
  return "Added";
};

const addPrediction = async (predictionObj, patientId) => {
  await Predictions.updateOne(
    { patientId },
    { $push: { predictionData: predictionObj } }
  );
  return "Added";
};

const updatePrediction = async (id, newPatientId) => {
  await Predictions.updateOne(
    { _id: id },
    {
      $set: {
        patientId: newPatientId,
      },
    }
  );

  return "Updated";
};

const deletePrediction = async (patientId, predictionId) => {
  await Predictions.updateOne(
    { patientId },
    { $pull: { predictionData: { _id: predictionId } } }
  );
  return "Deleted";
};

const deleteManyPredictions = async (patientId, ids) => {
  await Predictions.updateOne(
    { patientId },
    { $pull: { predictionData: { _id: { $in: ids } } } }
  );
  return "Deleted";
};

const deletePredictionsByPatientId = async (patientId) => {
  await Predictions.deleteOne({ patientId });
  return "Deleted";
};

const deleteManyPredictionsByPatientIds = async (ids) => {
  await Predictions.deleteMany({ patientId: { $in: ids } });
  return "Deleted";
};

const deleteManyP = async (ids) => {
  await Predictions.updateMany(
    { "predictionData._id": { $in: ids } },
    { $pull: { predictionData: { _id: { $in: ids } } } }
  );
  return "Deleted";
};

module.exports = {
  getAllPredictions,
  getPredictionById,
  getPredictionByPatientId,
  addPrediction,
  updatePrediction,
  deletePrediction,
  deleteManyPredictions,
  deletePredictionsByPatientId,
  deleteManyPredictionsByPatientIds,
  deleteManyP,
  addPatientPredictions,
};
