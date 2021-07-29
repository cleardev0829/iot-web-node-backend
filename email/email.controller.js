const express = require("express");
const router = express.Router();
const mailService = require("./email.service");
const nodemailer = require("nodemailer");
const cors = require("cors")({ origin: true });

// routes
router.post("/sendSMSOverHTTP", sendSMSOverHTTP);
router.post("/sendMailOverHTTP", sendMailOverHTTP);

module.exports = router;

const accountSid = "AC0b6ed65b3b28b81e5816eeb39c2e30cd";
const authToken = "59c24ba047f4732df8791cd093f3901b";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    // user: 'rocket.iot.at@gmail.com',
    // pass: 'InformYourCostumer'
    user: "anatolloflint@gmail.com",
    pass: "cartographerclarine?",
  },
});

function sendSMSOverHTTP(req, res) {
  console.log(req.body);
  cors(req, res, () => {
    const client = require("twilio")(accountSid, authToken);
    const phone = req.body.phone;
    const name = req.body.name;
    const message = req.body.message;

    const body = `
      Hi ${name}.
      Occured some error from your device. 
      The error is like follow.
      ${message}
      `;

    return client.messages
      .create({
        body: body,
        from: "+79600315449",
        to: phone,
      })
      .then((message) => {
        return res.send({ data: message, phone: phone });
      })
      .catch((error) => {
        return res.send({ error: error, phone: phone });
      });
  });
}

function sendMailOverHTTP(req, res, next) {
  mailService
    .sendMailOverHTTP(req.body)
    .then((response) => res.json(response))
    .catch((err) => console.log('err', err));
}
