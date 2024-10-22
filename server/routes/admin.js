const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const { verifyToken } = require("../helpers/verifyToken");

// router.use(verifyToken);

router.post("/login", adminController.adminLogin);
router.post("/logout", adminController.adminLogout);

router.get("/isAdmin", adminController.isAdmin);
// router.get("/isAdmin", async (req, res) => {
//   console.log("hello");
//   const token = req.cookies.token;
//   if (!token) {
//     res.header("Access-Control-Allow-Origin", req.headers.origin);
//     res.header("Access-Control-Allow-Methods", "GET");
//     res.header("Access-Control-Allow-Credentials", true);
//     return res.json({ status: "error" });
//   }
// });

module.exports = router;
