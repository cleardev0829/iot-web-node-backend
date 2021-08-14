const express = require("express");
const router = express.Router();
const mailService = require("./email.service");

// routes
router.post("/sendSMSOverHTTP", sendSMSOverHTTP);
router.post("/sendSMSOverHTTPA", sendSMSOverHTTPA);
router.post("/sendMailOverHTTP", sendMailOverHTTP);
router.post("/sendMailOverHTTPA", sendMailOverHTTPA);
router.post("/iotHubMsgProc", iotHubMsgProc);

module.exports = router;

function sendSMSOverHTTP(req, res, next) {
  mailService
    .sendSMSOverHTTP(req.body)
    .then((data) => res.json(data))
    .catch((err) => next(err));
}

function sendMailOverHTTPA(req, res, next) {
  mailService
    .sendMailOverHTTPA(req.body)
    .then((data) => res.json(data))
    .catch((err) => next(err));
}

function sendSMSOverHTTPA(req, res, next) {
  mailService
    .sendSMSOverHTTPA(req.body)
    .then((data) => res.json(data))
    .catch((err) => next(err));
}

function sendMailOverHTTP(req, res, next) {
  mailService
    .sendMailOverHTTP(req.body)
    .then((data) => res.json(data))
    .catch((err) => next(err));
}

function iotHubMsgProc(req, res, next) {
  mailService
    .iotHubMsgProc(req.body)
    .then(() => res.json(req.body))
    .catch((err) => next(err));
}
