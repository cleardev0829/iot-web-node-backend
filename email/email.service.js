const axios = require("axios");
const nodemailer = require("nodemailer");
const constant = require("../utils/constant");

const messageService = require("../messages/message.service");
const productService = require("../products/product.service");
const userService = require("../users/user.service");

const accountSid = "AC0b6ed65b3b28b81e5816eeb39c2e30cd";
const authToken = "c998d5eeea33db16901aa939c8eb62ef";

module.exports = {
  sendSMSOverHTTP,
  sendSMSOverHTTPA,
  sendMailOverHTTP,
  sendMailOverHTTPA,
  iotHubMsgProc,
};

const smtptransporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: 'rocket.iot.at@gmail.com',
    pass: 'InformYourCostumer'
  },
});

const smtptransporterA = nodemailer.createTransport({
  host: "smtp.world4you.com",
  // host: "smtp.office365.com",
  port: 587,
  tls: {
    secure: false,
    ignoreTLS: true,
    rejectUnauthorized: false
  },
  auth: {
      user: 'iot@rocket-at.com',
      pass: 'zSl3#QM9Zf'
  }
})

function sendMailOverHTTP(params) {
  const mailOptions = {
    from: `contact@rockets.co`,
    to: params.email,
    subject: params.subject,
    html: params.emailBody,
  };

  return smtptransporter.sendMail(mailOptions);
}

function sendMailOverHTTPA(params) {
  const mailOptions = {
    from: `contact@rockets.co`,
    to: params.email,
    subject: params.subject,
    html: params.emailBody,
  };

  return smtptransporterA.sendMail(mailOptions);
}

function sendSMSOverHTTP(params) {
  const client = require("twilio")(accountSid, authToken);
  const phone = params.phone;
  const message = params.message;

  const body = `
      Hi
      Occured some error from your device. 
      The error is like follow.
      ${message}
      `;

  return client.messages.create({
    body: body,
    from: "+436703082251", //Austria
    to: phone,
  });
}

function sendSMSOverHTTPA(params) {
  return axios.post(
    "https://us-central1-chiplusgo-95ec4.cloudfunctions.net/textmessageV2",
    {
      Phone: params.phone,
      Body: params.message,
      From: "+13462331831", // US
    }
  );
}

async function iotHubMsgProc(params) {
  const log = params.message.log;
  messageService.createA(params)

  if (log === "error") {
    const id = params.id;
    const deviceId = params.message.ID;
    const state = params.message.state ? params.message.state : 0;
    const errid = params.message.errid ? params.message.errid : 0;
    const number = log === "info" ? state : log === "error" ? errid : 0;
    const description = constant.descriptions[log][number];

    productService.getByUID({ uid: deviceId }).then(async (data) => {
      if (data && data.categories) {
        const users = data.categories;
        let promises = [];

        promises.push(
          new Promise((resolve, reject) =>
            users.map(async (userId) => {
              await userService.getById(userId).then(async (userInfo) => {
                if (userInfo && userInfo.phone) {
                  const phone = userInfo.phone;
                  const name = userInfo.displayName;
                  const email = userInfo.email;

                  sendSMSOverHTTP({
                    phone,
                    message: `Error message(${description}) from ${deviceId}`,
                  })
                    .then((data) => {
                      resolve(data);
                    })
                    .catch((err) => {
                      reject(err);
                    });

                  sendMailOverHTTP({
                    email: email,
                    subject: `Error message from ${deviceId}`,
                    emailBody: `<h3>${number} - ${description}</h3>`,
                  })
                    .then((data) => {
                      resolve(data);
                    })
                    .catch((err) => {
                      reject(err);
                    });
                }
              });
            })
          )
        );

        Promise.all(promises).then((res) => {
          console.log("----- Promise.all->", "OK");
        });
      }
    });
  }
}
