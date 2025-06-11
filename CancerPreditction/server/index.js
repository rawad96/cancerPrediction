const express = require("express");
const cors = require("cors");
const compression = require("compression");
const dotenv = require("dotenv").config();
const ConnectDB = require("./Config/DB");
const usersRouter = require("./Routers/UsersRouter");
const supportRouter = require("./Routers/SupportRouter");
const auth = require("./Routers/AuthRouter");
const accsess = require("./Routers/AccessRouter");
const patientsRouter = require("./Routers/PatientsRouter");
const predictionsRouter = require("./Routers/PredictionRouter");
const path = require("path");

const app = express();
const PORT = 3000;

ConnectDB();

app.use(compression());
app.use(
  cors({
    origin: ["http://localhost:5173"],
  })
);
app.use(express.json());

//Routers
app.use("/users", usersRouter);
app.use("/support", supportRouter);
app.use(
  "/supportFiles",
  express.static(path.join(__dirname, "Routers", "supportFiles"))
);
app.use("/auth", auth);
app.use("/access", accsess);
app.use("/patients", patientsRouter);
app.use("/predictions", predictionsRouter);

app.listen(PORT, () => {
  console.log("server is runnig");
});
