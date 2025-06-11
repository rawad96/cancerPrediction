const Support = require("../Models/SupportModel");

const getAllSupports = () => {
  return Support.find();
};

const getSupportById = (id) => {
  return Support.findById({ _id: id });
};

const getManySupportsByIds = (ids) => {
  return Support.find({ _id: { $in: ids } });
};

const addSupport = async (obj) => {
  const support = new Support(obj);
  await support.save();
  return "created";
};

const updateSupport = async (id, obj) => {
  await Support.findByIdAndUpdate(id, obj);
  return "Updated";
};

const deleteSupport = async (id) => {
  await Support.findByIdAndDelete(id);
  return "Deleted";
};

const deleteManySupports = async (ids) => {
  await Support.deleteMany({ _id: { $in: ids } });
  return "Deleted";
};

module.exports = {
  getAllSupports,
  getSupportById,
  getManySupportsByIds,
  addSupport,
  updateSupport,
  deleteSupport,
  deleteManySupports,
};
