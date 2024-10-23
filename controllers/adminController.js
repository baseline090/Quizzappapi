const Admin = require('../models/Admin');
const User = require('../models/User');

// Admin Registration
exports.adminRegister = async (req, res) => {
  const { email, password, confirmPassword } = req.body;

  // Check if passwords match
  if (password !== confirmPassword) {
    return res.status(400).json({ message: 'Passwords do not match' });
  }

  try {
    // Check if admin already exists
    let admin = await Admin.findOne({ email });
    if (admin) {
      return res.status(400).json({ message: 'Admin already exists' });
    }

    // Create and save new admin
    admin = new Admin({ email, password });
    await admin.save();

    res.status(201).json({ message: 'Admin registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Admin Login
exports.adminLogin = async (req, res) => {
  const { email, password } = req.body; // Ensure this matches the request body

  try {
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }

    // Use the comparePassword method from the Admin model
    const isMatch = await admin.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    res.status(200).json({ message: 'Login successful', adminId: admin._id });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Delete user by ID
exports.deleteUserById = async (req, res) => {
  const { id } = req.body;

  try {
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting user', error });
  }
};
