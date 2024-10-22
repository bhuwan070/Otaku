const express = require("express");
const { contactMail } = require("../helpers/contactMail");
const router = express.Router();

// router.use(verifyToken);

router.post("/", async (req, res) => {
  try {
    contactMail(req.body);
  } catch (error) {
    res.status(400).json({ status: "error", message: error.message });
  }
});

module.exports = router;
