const express = require("express");
const router = express.Router();

// Import controllers
const {
  login,
  signUp,
  sendOTP,
  changePassword,
} = require("../controllers/Auth");

const {
  resetPasswordToken,
  resetPassword,
} = require("../controllers/ResetPassword");

// Import middleware
const { auth } = require("../middlewares/auth");

// Auth routes

router.post("/login", login);
router.post("/signup", signUp);
router.post("/sendotp", sendOTP);
router.post("/changepassword", auth, changePassword);

// Reset password routes

router.post("/reset-password-token", resetPasswordToken);
router.post("/reset-password", resetPassword);

module.exports = router;
