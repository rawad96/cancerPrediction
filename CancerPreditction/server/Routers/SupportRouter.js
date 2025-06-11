const express = require("express");
const Support = require("../BLL/SupportBLL");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = path.join(__dirname, "supportFiles");
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath);
    }
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

router.get("/", async (req, res) => {
  try {
    const supportData = await Support.getAllSupports();
    res.send(supportData);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const support = await Support.getSupportById(id);
    res.send(support);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post("/", upload.single("image"), async (req, res) => {
  try {
    const obj = req.body;
    const file = req.file;

    const imageUrl = file
      ? `http://localhost:3000/supportFiles/${file.filename}`
      : null;

    const savedData = {
      userFullName: obj.userFullName,
      userEmail: obj.userEmail,
      userId: obj.userId,
      phoneNumber: obj.phoneNumber,
      department: obj.department,
      subject: obj.subject,
      description: obj.description,
      imageUrl,
    };

    const result = await Support.addSupport(savedData);
    res.send(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const obj = req.body;
    const result = await Support.updateSupport(id, {
      ...obj,
      updatedAt: new Date(),
    });
    res.send(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Support.deleteSupport(id);
    res.send(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.delete("/:delete/:multi", async (req, res) => {
  try {
    const { ids } = req.body;
    const supportsToDelete = await Support.getManySupportsByIds(ids);

    supportsToDelete.forEach((support) => {
      if (support.imageUrl) {
        const filename = support.imageUrl.split("/").pop();
        const filePath = path.join(__dirname, "supportFiles", filename);

        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
      }
    });

    const result = await Support.deleteManySupports(ids);
    res.send(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
