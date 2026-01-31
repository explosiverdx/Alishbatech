// Secure version using environment variables
// Usage: NEW_USERNAME=rohit NEW_EMAIL=rohit@alishbatech.in NEW_PASSWORD='Aardex@26Alishba' node update-admin-secure.js

const Admin = require('./src/models/Admin');
const mongoose = require('mongoose');
require('dotenv').config();

(async () => {
  await mongoose.connect(process.env.MONGODB_URI);
  
  // Get values from environment variables
  const NEW_USERNAME = process.env.NEW_USERNAME;
  const NEW_EMAIL = process.env.NEW_EMAIL;
  const NEW_PASSWORD = process.env.NEW_PASSWORD;
  
  // Validate required values
  if (!NEW_USERNAME || !NEW_EMAIL || !NEW_PASSWORD) {
    console.log('❌ Missing required environment variables!');
    console.log('Usage: NEW_USERNAME=username NEW_EMAIL=email NEW_PASSWORD=password node update-admin-secure.js');
    process.exit(1);
  }
  
  // Find admin by current email
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
  console.log('Password: [hidden]');
  console.log('Role:', admin.role);
  
  process.exit(0);
})();
