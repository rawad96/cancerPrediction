const Users = require("../Models/UsersModel");

const getAllUsers = () => {
  return Users.find();
};

const getUserById = (id) => {
  return Users.findById({ _id: id });
};

const getUserByEmail = (email) => {
  return Users.findOne({ email });
};

const addUser = async (obj) => {
  const user = new Users(obj);
  await user.save();
  return "created";
};

const updateUser = async (id, obj) => {
  await Users.findByIdAndUpdate(id, obj);
  return "Updated";
};

const deleteUser = async (id) => {
  await Users.findByIdAndDelete(id);
  return "Deleted";
};

const deleteManyUsers = async (ids) => {
  await Users.deleteMany({ _id: { $in: ids } });
  return "Deleted";
};

module.exports = {
  getAllUsers,
  getUserById,
  addUser,
  updateUser,
  deleteUser,
  getUserByEmail,
  deleteManyUsers,
};
