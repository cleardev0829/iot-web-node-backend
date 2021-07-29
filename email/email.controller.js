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

function sendSMSOverHTTP(req, res, next) {
  mailService
    .sendSMSOverHTTP(req.body)
    .then((data) => res.json(data))
    .catch((err) => next(err));
}

function sendMailOverHTTP(req, res, next) {
  mailService
    .sendMailOverHTTP(req.body)
    .then((data) => res.json(data))
    .catch((err) => next(err));
}
