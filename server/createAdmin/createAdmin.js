const mongoose = require('mongoose');
const Admin = require('../model/Admin');
const bcrypt = require('bcryptjs');

require('dotenv').config();
mongoose.connect(process.env.DB).then(console.log('db connected'));

const createNewAdmin = async ({ email, password }) => {
  const adminDB = await Admin.findOne({ email });
  if (adminDB) {
    console.log('Admin already registered');
    return;
  }
  const hashedPassword = await bcrypt.hash(password, 10);

  const admin = new Admin({ email, password: hashedPassword });
  try {
    const newAdmin = await admin.save();
    if (newAdmin) {
      console.log('New admin registered with following details.');
      console.log(newAdmin);
    }
  } catch (error) {
    console.log(error);
  }
};

createNewAdmin({
  email: 'admin@gmail.com',
  password: 'admin123',
});
