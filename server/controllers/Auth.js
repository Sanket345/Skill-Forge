const bcrypt = require("bcryptjs");
const User = require("../models/User");
const OTP = require("../models/OTP");
const jwt = require("jsonwebtoken");
const otpGenerator = require("otp-generator");
const mailSender = require("../utils/mailSender");
const { passwordUpdated } = require("../mail/template/passwordUpdate");
const Profile = require("../models/Profile");
require("dotenv").config();
const { otpTemplate } = require("../mail/template/otpTemplate");

// SEND OTP
exports.sendOTP = async (req, res) => {
  try {
    console.log("SEND OTP HIT", req.body);

    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already registered",
      });
    }

    const otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });

    await OTP.create({ email, otp });

    await mailSender(email, "Your OTP for SkillForge", otpTemplate(otp));

    return res.status(200).json({
      success: true,
      message: "OTP sent successfully",
    });
  } catch (error) {
    console.error("SEND OTP BACKEND ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to send OTP",
    });
  }
};

// Sign up
exports.signUp = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      accountType,
      contactNumber,
      otp,
    } = req.body;

    if (
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !confirmPassword ||
      !otp
    ) {
      return res.status(403).json({
        success: false,
        message: "All Fields are required",
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message:
          "Password And ConfirmPassword Value doesnot match, Please try agin",
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already registered",
      });
    }

    const recentOtp = await OTP.findOne({ email }).sort({ createdAt: -1 });

    if (!recentOtp) {
      return res.status(400).json({
        success: false,
        message: "OTP not found",
      });
    }

    if (String(otp) !== recentOtp.otp) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const profileDetails = await Profile.create({
      gender: null,
      dateOfBirth: null,
      about: null,
      contactNumber: null,
    });

    const user = await User.create({
      firstName,
      lastName,
      email,
      contactNumber,
      password: hashedPassword,
      accountType,
      additionalDetails: profileDetails._id,
      image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName}${lastName}`,
    });

    await OTP.deleteMany({ email });

    return res.status(200).json({
      success: true,
      message: "User is registered successfully",
      user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "User can't be registered. Please try again",
    });
  }
};

// Login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(403).json({
        success: false,
        message: "All fields are requires, please try again.",
      });
    }

    const user = await User.findOne({ email }).populate("additionalDetails");
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not registered, please sign up first.",
      });
    }

    if (await bcrypt.compare(password, user.password)) {
      const payload = {
        email: user.email,
        id: user._id,
        accountType: user.accountType,
      };

      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "2h",
      });

      user.token = token;
      user.password = undefined;

      const options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      };

      res.cookie("token", token, options).status(200).json({
        success: true,
        token,
        user,
        message: "Login successfully",
      });
    } else {
      return res.status(401).json({
        success: false,
        message: "Password is incorrect",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Erro while Login, Please try again.",
    });
  }
};

// Change Password
exports.changePassword = async (req, res) => {
  try {
    const userDetails = await User.findById(req.user.id);
    const { oldPassword, newPassword } = req.body;

    const isPasswordMatch = await bcrypt.compare(
      oldPassword,
      userDetails.password
    );

    if (!isPasswordMatch) {
      return res
        .status(401)
        .json({ success: false, message: "The password is incorrect" });
    }

    const encryptedPassword = await bcrypt.hash(newPassword, 10);

    const updatedUserDetails = await User.findByIdAndUpdate(
      req.user.id,
      { password: encryptedPassword },
      { new: true }
    );

    await mailSender(
      updatedUserDetails.email,
      "Password for your account has been updated",
      passwordUpdated(
        updatedUserDetails.email,
        `Password updated successfully for ${updatedUserDetails.firstName} ${updatedUserDetails.lastName}`
      )
    );

    return res
      .status(200)
      .json({ success: true, message: "Password updated successfully" });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error occurred while updating password",
      error: error.message,
    });
  }
};
