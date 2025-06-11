const mongoose = require("mongoose");
const dotenv = require("dotenv").config();

const ConnectDB = () => {
  mongoose
    .connect(
      `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@atlascluster.crzk4rq.mongodb.net/${process.env.DB_NAME}`
    )
    .then(() => console.log("Connected to CancerDB"))
    .catch((error) => console.log(error));
};

module.exports = ConnectDB;
