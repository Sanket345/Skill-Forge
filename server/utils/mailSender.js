const axios = require("axios");

const mailSender = async (toEmail, subject, htmlContent) => {
  try {
    await axios.post(
      "https://api.brevo.com/v3/smtp/email",
      {
        sender: {
          name: "SkillForge",
          email: "portm372@gmail.com", // must be verified in Brevo
        },
        to: [
          {
            email: toEmail,
          },
        ],
        subject: subject,
        htmlContent: htmlContent,
      },
      {
        headers: {
          "api-key": process.env.BREVO_API_KEY,
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("MAIL SENDER ERROR:", error.response?.data || error.message);
    throw error;
  }
};

module.exports = mailSender;
