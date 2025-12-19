// Email utility functions
// Configure your email service here

// Example: SendGrid
// const sgMail = require('@sendgrid/mail');
// sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// Example: Nodemailer
// const nodemailer = require('nodemailer');
// const transporter = nodemailer.createTransport({
//   host: process.env.SMTP_HOST,
//   port: process.env.SMTP_PORT,
//   auth: {
//     user: process.env.SMTP_USER,
//     pass: process.env.SMTP_PASSWORD,
//   },
// });

/**
 * Send contact form notification email
 */
async function sendContactEmail(data) {
  console.log('Sending contact email:', {
    to: process.env.CONTACT_EMAIL || 'info@alishbatech.com',
    from: data.email,
    subject: data.subject,
  });

  // Example with SendGrid:
  // const msg = {
  //   to: process.env.CONTACT_EMAIL,
  //   from: process.env.EMAIL_FROM,
  //   subject: `Contact Form: ${data.subject}`,
  //   text: `Name: ${data.name}\nEmail: ${data.email}\n\nMessage:\n${data.message}`,
  //   html: `
  //     <h2>New Contact Form Submission</h2>
  //     <p><strong>Name:</strong> ${data.name}</p>
  //     <p><strong>Email:</strong> ${data.email}</p>
  //     <p><strong>Subject:</strong> ${data.subject}</p>
  //     <p><strong>Message:</strong></p>
  //     <p>${data.message}</p>
  //   `,
  // };
  // await sgMail.send(msg);

  return true;
}

/**
 * Send confirmation email to form submitter
 */
async function sendConfirmationEmail(data) {
  console.log('Sending confirmation email to:', data.email);

  // Implement email sending logic
  return true;
}

module.exports = {
  sendContactEmail,
  sendConfirmationEmail,
};

