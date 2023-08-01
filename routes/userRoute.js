const express = require("express");
const {
  loginController,
  registerController,
} = require("../controllers/userController");
const authenticate = require("../middlewares/authenticate");

const router = express.Router();

router.post("/login", loginController);
router.post("/signup", registerController);

router.get("/logout", (req, res) => {
  res.clearCookie("expensetoken", { path: "/" });
  res.status(200).json({ message: "user logged out" });
});

router.get("/profile", authenticate, (req, res) => {
  res.send(req.rootUser);
});
router.get("/getdata", authenticate, (req, res) => {
  res.send(req.rootUser);
});

module.exports = router;
