exports.passwordUpdated = (email, name) => {
  return `<!DOCTYPE html>
  <html>

  <head>
      <meta charset="UTF-8">
      <title>Password Updated</title>
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
              font-weight: bold;
          }
      </style>

  </head>

  <body>
      <div class="container">
          <div class="message">Password Updated Successfully</div>
          <p>Hey ${name},</p>
          <p>Your password for <span class="highlight">${email}</span> has been updated.</p>
          <p>If this wasn’t you, please contact <b>SkillForge Support</b> immediately.</p>
      </div>
  </body>

  </html>`;
};
