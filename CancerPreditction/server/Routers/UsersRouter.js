const express = require("express");
const Users = require("../BLL/UsersBLL");
const bcrypt = require("bcrypt");

const router = express.Router();

const hash_password = async (password) => {
  const hashed_password = await bcrypt.hash(password, 10);
  return hashed_password;
};

router.get("/", async (req, res) => {
  try {
    const users = await Users.getAllUsers();
    res.send(users);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await Users.getUserById(id);
    res.send(user);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/:getbyemail/:email", async (req, res) => {
  try {
    const { email } = req.params;
    const user = await Users.getUserByEmail(email.toLowerCase());
    res.send(user._id);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post("/", async (req, res) => {
  try {
    const user = req.body;
    if (await Users.getUserByEmail(user.email.toLowerCase())) {
      res.send("Email exsists");
    } else {
      const hashed_password = await hash_password(user.password);
      const new_user = {
        ...user,
        password: hashed_password,
        email: user.email.toLowerCase(),
      };
      const result = await Users.addUser(new_user);
      res.send(result);
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const obj = req.body;

    if (obj.isNewPass) {
      const hashed_password = await hash_password(obj.formData.password);
      const updatedUser = {
        ...obj.formData,
        password: hashed_password,
        updatedAt: new Date(),
      };
      const result = await Users.updateUser(id, updatedUser);
      res.send(result);
    } else {
      const updatedUser = { ...obj.formData, updatedAt: new Date() };
      const result = await Users.updateUser(id, updatedUser);
      res.send(result);
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Users.deleteUser(id);
    res.send(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.delete("/:delete/:multi", async (req, res) => {
  try {
    const { ids } = req.body;
    const result = await Users.deleteManyUsers(ids);
    res.send(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
