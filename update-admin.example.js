// Template for updating admin user
// Copy this to update-admin.js and fill in your values
// DO NOT commit update-admin.js to git!

const Admin = require('./src/models/Admin');
const mongoose = require('mongoose');
require('dotenv').config();

(async () => {
  await mongoose.connect(process.env.MONGODB_URI);
  
  // EDIT THESE VALUES:
  const NEW_USERNAME = 'your_new_username';
  const NEW_EMAIL = 'your_new_email@alishbatech.in';
  const NEW_PASSWORD = 'YourNewPassword@123';
  
  // Find admin by current email or username
  const admin = await Admin.findOne({ email: 'admin@alishbatech.in' });
  
  if (!admin) {
    console.log('❌ Admin not found!');
    process.exit(1);
  }
  
  admin.username = NEW_USERNAME;
  admin.email = NEW_EMAIL;
  admin.password = NEW_PASSWORD;
  
  await admin.save();
  
  console.log('✅ Admin updated successfully!');
  console.log('Username:', admin.username);
  console.log('Email:', admin.email);
  console.log('Password:', NEW_PASSWORD);
  console.log('Role:', admin.role);
  
  process.exit(0);
})();
