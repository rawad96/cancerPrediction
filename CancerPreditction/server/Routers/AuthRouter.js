const express = require("express");
const jwt = require("jsonwebtoken");
const users = require("../BLL/UsersBLL");
const dotenv = require("dotenv").config();
const bcrypt = require("bcrypt");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await users.getUserByEmail(email.toLowerCase());
    if (!user) {
      res.send("Email is incorrect");
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      res.send("Password is incorrect");
    }
    const userId = user._id;
    const permission = user.permissions;
    const ACCESS_SECRET_TOKEN = process.env.JWT_KEY;
    const time = new Date();
    const localDateTime = time.toLocaleString();

    const accessToken = jwt.sign(
      { id: userId, permission: permission },
      ACCESS_SECRET_TOKEN
    );

    res.send({ accessToken, userId, localDateTime });
  } catch (error) {
    res.status(401);
  }
});

module.exports = router;
