const User = require('../models/User');
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');


const Admin = require('../models/Admin')

// Register a new user
exports.register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { fullName, username, email, password } = req.body;

  try {
    // Check if the email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already registered' });
    }

    const newUser = new User({ fullName, username, email, password });
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Login a user
exports.login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    return res.status(200).json({ message: 'Login successful!' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};

// Send OTP for password reset
exports.forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found. Please register first.' });
    }

    // Generate a new 4-digit OTP
    const otp = Math.floor(1000 + Math.random() * 9000).toString();
    user.otp = otp; // Update user's OTP
    await user.save();

    res.json({ status: 'success', message: 'OTP sent to your email.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Verify OTP
exports.verifyOtp = async (req, res) => {
  const { email, otp } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user || user.otp !== otp) {
      return res.status(400).json({ status: 'error', message: 'Invalid OTP.' });
    }

    res.json({ status: 'verified', message: 'OTP verified successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Reset password
exports.resetPassword = async (req, res) => {
  const { email, newPassword, confirmPassword } = req.body;

  // Check if newPassword and confirmPassword match
  if (newPassword !== confirmPassword) {
    return res.status(400).json({ message: 'Passwords do not match.' });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    // Update password
    user.password = newPassword; // Set new password
    user.otp = null; // Clear OTP
    await user.save();

    res.json({ message: 'Password updated successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};




/////-------------Admin Functionality-------------------------------------------------

////Admin registration function
// exports.adminRegister = async (req, res) => {
//   const { email, password, confirmPassword } = req.body;

//   if (password !== confirmPassword) {
//     return res.status(400).json({ message: 'Passwords do not match' });
//   }

//   // Create a new admin
//   try {
//     const newAdmin = new Admin({ email, password }); // Hash the password before saving
//     await newAdmin.save();
//     return res.status(201).json({ message: 'Admin registered successfully' });
//   } catch (error) {
//     return res.status(500).json({ message: 'Server error', error });
//   }
// };




// // Admin login function
// exports.adminLogin = async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     // Find admin by email
//     const admin = await Admin.findOne({ email });
//     if (!admin) {
//       return res.status(404).json({ message: 'Admin not found' });
//     }

//     // Compare password
//     const isMatch = await bcrypt.compare(password, admin.password);
//     if (!isMatch) {
//       return res.status(401).json({ message: 'Invalid credentials' });
//     }

//     // You can generate a token here if you're using JWT
//     return res.status(200).json({ message: 'Login successful', adminId: admin._id });
//   } catch (error) {
//     return res.status(500).json({ message: 'Server error', error });
//   }
// };





// // Get all users
// exports.getAllUsers = async (req, res) => {
//   try {
//     const users = await User.find(); // Retrieve all users
//     return res.status(200).json(users);
//   } catch (error) {
//     return res.status(500).json({ message: 'Server error', error });
//   }
// };


// // Delete user by ID
// exports.deleteUser = async (req, res) => {
//   const { id } = req.params;
//   try {
//     await User.findByIdAndDelete(id); // Delete user by ID
//     return res.status(200).json({ message: 'User deleted successfully' });
//   } catch (error) {
//     return res.status(500).json({ message: 'Server error', error });
//   }
// };


