const nodemailer = require('nodemailer');
const config = require('../config');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: config.emailUser,
    pass: config.emailPass,
  },
});

const sendMail = (to, subject, html) => {
  const mailOptions = {
    from: {
      name: '"JT\'s Food Recipe App" <services@justinakitchens.com>',
      address: config.emailPass,
    },
    to,
    subject,
    html,
  };

  return transporter.sendMail(mailOptions);
};

module.exports = sendMail;
