const sgMail = require("@sendgrid/mail");
const User = require("../models/userSchema");

require("dotenv").config();

function random() {
  return Math.floor(Math.random() * (9999 - 1000) + 1000);
}
const randomNumber = random();

sgMail.setApiKey(process.env.SECRET_OF_SendGrid);

const Confirmation = (email) => {
  sgMail
    .send({
      to: email,
      from: "ebramatalla@gmail.com",
      subject: "Confirmation",
      text: "Use This Key To Conf Email " + randomNumber,
    })
    .then(() => {
      console.log("Email sent to " + email);
    })
    .catch((error) => {
      console.error(error);
    });
};
module.exports = {
  randomNumber,
  Confirmation,
};
