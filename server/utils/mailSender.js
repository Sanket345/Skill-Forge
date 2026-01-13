const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

const mailSender = async (email, title, body) => {
  try {
    console.log("Mail sender hit");
    return await transporter.sendMail({
      from: `"SkillForge ~ by Sanket" <${process.env.MAIL_USER}>`,
      to: email,
      subject: title,
      html: body,
    });
  } catch (error) {
    console.log("MAIL ERROR:", error.message);
    throw error;
  }
};

module.exports = mailSender;
