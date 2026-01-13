exports.courseEnrollmentEmail = (courseName, name) => {
  return `<!DOCTYPE html>
  <html>

  <head>
      <meta charset="UTF-8">
      <title>Course Enrollment Confirmation</title>
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

          .body {
              font-size: 16px;
              margin-bottom: 20px;
          }

          .highlight {
              font-weight: bold;
          }
      </style>

  </head>

  <body>
      <div class="container">
          <div class="message">Course Enrollment Successful 🎉</div>
          <div class="body">
              <p>Dear ${name},</p>
              <p>You have successfully enrolled in <span class="highlight">"${courseName}"</span>.</p>
              <p>Welcome to <b>SkillForge by Sanket</b> — your learning journey starts now.</p>
              <p>Please log in to your dashboard to access course content.</p>
          </div>
      </div>
  </body>

  </html>`;
};
