const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const multer = require("multer");

//storage
const storage = multer.diskStorage({
  destination: "uploads/transactions",
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({
  storage: storage,
});

router.get("/", userController.getUser);

router.post("/", upload.single("payment"), userController.handleNewUser);

module.exports = router;
