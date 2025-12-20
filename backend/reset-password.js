#!/usr/bin/env node

require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Admin = require('./src/models/Admin');

async function resetPassword() {
  try {
    const args = process.argv.slice(2);
    if (args.length < 2) {
      console.log('❌ Usage: node reset-password.js <username-or-email> <new-password>');
      console.log('\nExample:');
      console.log('  node reset-password.js admin mynewpassword123');
      console.log('  node reset-password.js admin@example.com mynewpassword123');
      process.exit(1);
    }

    const identifier = args[0];
    const newPassword = args[1];

    if (newPassword.length < 6) {
      console.log('❌ Password must be at least 6 characters long');
      process.exit(1);
    }

    console.log('🔐 Admin Password Reset Tool\n');
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/alishbatech';
    console.log(`📡 Connecting to MongoDB...`);
    await mongoose.connect(mongoURI);
    console.log('✅ Connected to MongoDB\n');

    console.log(`🔍 Looking for admin: ${identifier}`);
    const admin = await Admin.findOne({
      $or: [
        { username: identifier.trim() },
        { email: identifier.trim().toLowerCase() }
      ]
    });

    if (!admin) {
      console.log(`❌ Admin not found with username/email: ${identifier}`);
      console.log('\nAvailable admins:');
      const allAdmins = await Admin.find({}).select('username email role');
      if (allAdmins.length === 0) {
        console.log('  No admins found in database');
      } else {
        allAdmins.forEach(a => {
          console.log(`  - Username: ${a.username}, Email: ${a.email}, Role: ${a.role}`);
        });
      }
      await mongoose.connection.close();
      process.exit(1);
    }

    console.log(`\n✅ Found admin:`);
    console.log(`   Username: ${admin.username}`);
    console.log(`   Email: ${admin.email}`);
    console.log(`   Role: ${admin.role}`);
    console.log(`   Active: ${admin.isActive ? 'Yes' : 'No'}\n`);

    console.log('🔄 Resetting password...');
    
    // Hash the password manually
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    
    console.log(`   Hash generated: ${hashedPassword.substring(0, 30)}...`);
    
    // Directly update the password field using updateOne to bypass pre-save hook
    const updateResult = await Admin.updateOne(
      { _id: admin._id },
      { $set: { password: hashedPassword } }
    );
    
    if (updateResult.modifiedCount === 0) {
      console.log('❌ Error: Password was not updated in database!');
      await mongoose.connection.close();
      process.exit(1);
    }
    
    console.log('   ✅ Password updated in database');

    // Verify the password was set correctly by fetching fresh admin
    const updatedAdmin = await Admin.findById(admin._id);
    if (!updatedAdmin) {
      console.log('❌ Error: Could not fetch updated admin!');
      await mongoose.connection.close();
      process.exit(1);
    }
    
    const passwordMatches = await updatedAdmin.comparePassword(newPassword);
    
    if (!passwordMatches) {
      console.log('❌ Error: Password verification failed after reset!');
      console.log(`   Stored hash: ${updatedAdmin.password.substring(0, 30)}...`);
      console.log('   This might indicate a database issue.');
      await mongoose.connection.close();
      process.exit(1);
    }

    console.log('✅ Password reset successfully!\n');
    console.log('You can now login with:');
    console.log(`   Username: ${admin.username}`);
    console.log(`   Email: ${admin.email}`);
    console.log(`   Password: ${newPassword}\n`);
    console.log('✅ Password verification: PASSED\n');

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

resetPassword();
