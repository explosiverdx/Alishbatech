#!/usr/bin/env node

require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Admin = require('./src/models/Admin');

async function checkAdmin() {
  try {
    const args = process.argv.slice(2);
    const testPassword = args[0] || 'test123';

    console.log('🔍 Admin Password Checker\n');
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/alishbatech';
    console.log(`📡 Connecting to MongoDB...`);
    await mongoose.connect(mongoURI);
    console.log('✅ Connected to MongoDB\n');

    const admins = await Admin.find({}).select('username email role isActive password');
    
    if (admins.length === 0) {
      console.log('❌ No admins found in database');
      await mongoose.connection.close();
      process.exit(1);
    }

    console.log(`Found ${admins.length} admin(s):\n`);

    for (const admin of admins) {
      console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
      console.log(`Username: ${admin.username}`);
      console.log(`Email: ${admin.email}`);
      console.log(`Role: ${admin.role}`);
      console.log(`Active: ${admin.isActive ? 'Yes' : 'No'}`);
      console.log(`Password Hash: ${admin.password.substring(0, 20)}...`);
      
      // Test password comparison
      const passwordMatches = await admin.comparePassword(testPassword);
      console.log(`Password "${testPassword}" matches: ${passwordMatches ? '✅ YES' : '❌ NO'}`);
      console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`);
    }

  } catch (error) {
    console.error('❌ Error:', error.message);
    if (error.stack) {
      console.error(error.stack);
    }
    process.exit(1);
  } finally {
    await mongoose.connection.close();
    process.exit(0);
  }
}

checkAdmin();
