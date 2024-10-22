const mongoose = require("mongoose");
const Admin = require("../model/Admin");

require("dotenv").config();
mongoose.connect(process.env.DB).then(console.log("db connected"));

const deleteAdmin = async ({ email, password }) => {
  const adminDB = await Admin.findOne({ email });
  if (!adminDB) {
    console.log(`Admin not registered with ${email} `);
    return;
  }
  if (!adminDB.email === email && !adminDB.password === password) {
    console.log("Please enter correct info");
    return;
  }
  try {
    await Admin.findOneAndDelete({ email });
    console.log("Admin Account deleted");
  } catch (error) {
    console.log(error);
  }
};

deleteAdmin({
  email: "ghimire.amrit147@gmail.com",
  password: "123456",
});
