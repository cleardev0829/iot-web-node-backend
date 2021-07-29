const axios = require("axios");
const nodemailer = require("nodemailer");

const accountSid = "AC0b6ed65b3b28b81e5816eeb39c2e30cd";
const authToken = "59c24ba047f4732df8791cd093f3901b";

module.exports = {
  sendSMSOverHTTP,
  sendSMSOverHTTPA,
  sendMailOverHTTP,
};

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

function sendSMSOverHTTP(params) {
  const client = require("twilio")(accountSid, authToken);
  const phone = params.phone;
  const name = params.name;
  const message = params.message;

  const body = `
      Hi ${name}.
      Occured some error from your device. 
      The error is like follow.
      ${message}
      `;

  return client.messages.create({
    body: body,
    from: "+436505050180",
    to: "+43650505018",
  });
}

function sendSMSOverHTTPA(params) {
  return axios.post(
    "https://us-central1-chiplusgo-95ec4.cloudfunctions.net/textmessageV2",
    {
      Phone: params.phone,
      Body: params.message,
      From: "+13462331831",
    }
  );
}

function sendMailOverHTTP(params) {
  const mailOptions = {
    from: `contact@rockets.co`,
    to: params.email,
    subject: params.subject,
    html: params.emailBody,
  };

  return transporter.sendMail(mailOptions);
}
