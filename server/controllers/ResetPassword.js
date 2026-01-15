const User = require("../models/User");
const mailSender = require("../utils/mailSender");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const { passwordUpdated } = require("../mail/template/passwordUpdate");
exports.resetPasswordToken = async (req, res) => {
  try {
    const email = req.body.email;
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.json({
        success: false,
        message: `This Email: ${email} is not Registered With Us Enter a Valid Email `,
      });
    }
    const token = crypto.randomBytes(20).toString("hex");

    const updatedDetails = await User.findOneAndUpdate(
      { email: email },
      {
        token: token,
        resetPasswordExpires: Date.now() + 3600000,
      },
      { new: true }
    );
    console.log("DETAILS", updatedDetails);

    const url = `https://skill-forge-roan.vercel.app/update-password/${token}`;

    await mailSender(
      email,
      "Reset Your  Password",
      `Click the link below to reset your password:\n\n${url}`
    );

    res.json({
      success: true,
      message:
        "Email Sent Successfully, Please Check Your Email to Continue Further",
    });
  } catch (error) {
    return res.json({
      error: error.message,
      success: false,
      message: `Some Error in Sending the Reset Message`,
    });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const { password, confirmPassword, token } = req.body;

    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Password and Confirm Password do not match",
      });
    }

    const userDetails = await User.findOne({ token });

    if (!userDetails) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired token",
      });
    }

    if (userDetails.resetPasswordExpires < Date.now()) {
      return res.status(403).json({
        success: false,
        message: "Token expired. Please request a new one.",
      });
    }

    const encryptedPassword = await bcrypt.hash(password, 10);

    await User.findOneAndUpdate(
      { token },
      {
        password: encryptedPassword,
        token: null,
        resetPasswordExpires: null,
      },
      { new: true }
    );

    await mailSender(
      userDetails.email,
      "Password Updated Successfully | SkillForge",
      passwordUpdated(userDetails.email, userDetails.firstName)
    );

    return res.status(200).json({
      success: true,
      message: "Password reset successful and email sent",
    });
  } catch (error) {
    console.error("Reset error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while resetting password",
    });
  }
};
