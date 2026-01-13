exports.otpTemplate = (otp) => {
  return `<!DOCTYPE html>
  <html>

  <head>
      <meta charset="UTF-8">
      <title>Email Verification</title>
      <style>
          body {
              background-color: #ffffff;
              font-family: Arial, sans-serif;
              font-size: 16px;
              line-height: 1.4;
              color: #333333;
              margin: 0;
              padding: 0;
          }

          .container {
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
              text-align: center;
          }

          .message {
              font-size: 18px;
              font-weight: bold;
              margin-bottom: 20px;
          }

          .highlight {
              font-size: 22px;
              font-weight: bold;
          }
      </style>

  </head>

  <body>
      <div class="container">
          <div class="message">Verify Your SkillForge Account</div>
          <p>Thank you for joining <b>SkillForge by Sanket</b>.</p>
          <p>Your OTP is:</p>
          <p class="highlight">${otp}</p>
          <p>This OTP is valid for 5 minutes.</p>
          <p>If you didn’t request this, you can safely ignore this email.</p>
      </div>
  </body>

  </html>`;
};
