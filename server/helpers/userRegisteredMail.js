const nodemailer = require("nodemailer");
require("dotenv").config({
  path: "../.env",
});

module.exports.userRegisteredMail = async (user, event) => {
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
      from: "Otaku Festival",
      to: `"TO" <${process.env.EMAIL}>`,
      subject: `New User Registered for the ${event.name} `,
      text: "Please verify the transaction from Admin Panel.",
      html: `<div style="min-height: 200px; background-color: #3d5880; color: white; align-text: center; padding: 10%">
            <h1>New User has registered!!!</h1>
            <div>
            <span>A new user with the following details has registered for ${event.name}. </span>
                <br/>
                <h4>Name: ${user.name}</h4>
                <h4>Phone No.: ${user.phone}</h4>
                <h4>Email: ${user.email}</h4>
            </div>
            <a href=${process.env.CLIENT_ADDRESS}>Click this link to go to Admin Panel</a>
            </div>`,
    });
  } catch (error) {
    console.log(error.message);
  }
};
