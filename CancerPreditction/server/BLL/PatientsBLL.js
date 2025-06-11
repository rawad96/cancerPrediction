const Patients = require("../Models/PatientsModel");

const getAllPatients = () => {
  return Patients.find();
};

const getAllPatientIDs = () => {
  return Patients.find({}, "patientId");
};

const getPatientById = (id) => {
  return Patients.findById({ _id: id });
};

const getPatientByPatientId = (patientId) => {
  return Patients.findOne({ patientId });
};

const addPatients = async (obj) => {
  const patient = new Patients(obj);
  await patient.save();
  return patient;
};

const updatePatients = async (id, obj) => {
  const updatedPatient = await Patients.findByIdAndUpdate(id, obj);
  // console.log(updatedPatient);

  return updatedPatient;
};

const deletePatients = async (id) => {
  await Patients.findOneAndDelete({ patientId: id });
  return "Deleted";
};

const deleteManyPatients = async (ids) => {
  await Patients.deleteMany({ patientId: { $in: ids } });
  return "Deleted";
};

module.exports = {
  getAllPatients,
  getPatientById,
  getPatientByPatientId,
  addPatients,
  updatePatients,
  deletePatients,
  deleteManyPatients,
  getAllPatientIDs,
};
