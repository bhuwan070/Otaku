const nodemailer = require("nodemailer");
require("dotenv").config({
  path: "../.env",
});

module.exports.contactMail = async (data) => {
  console.log(data);
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
  transporter.verify(function (error, success) {
    if (error) {
      console.log(error);
    } else {
      console.log("Server is ready to take your messages");
    }
  });

  try {
    await transporter.sendMail({
      from: data.email,
      to: `"TO" <justforfun14728@gmail.com>`,
      subject: `From ${data.email}`,
      text: `${data.name} sent you a email via website`,
      html: `<div style="min-height: 200px; background-color: #3d5880; color: white; align-text: center; padding: 10%">
              <h3>Dear Otaku Festival,</h3>
              <div>
              <span>${data.message}</span>
              </div>
              <div>
                <h5>Regards, ${data.email}</h5>
              </div>
              </div>`,
    });
  } catch (error) {
    console.log(error.message);
  }
};
