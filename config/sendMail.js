const nodemailer = require("nodemailer");

const transport = nodemailer.createTransport({
  service: "Gmail",
  debug: true,
  auth: {
    user: process.env.SMTP_FAN_USER,
    pass: process.env.SMTP_FAN_PAZZ
  },
});

module.exports = transport;
