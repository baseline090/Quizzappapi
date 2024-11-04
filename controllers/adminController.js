

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
const User = require('../models/User');
const Category = require('../models/Category');
const tokenBlacklist = require('../utils/tokenBlacklist');

// Register Admin
exports.registerAdmin = async (req, res) => {
  const { email, password, confirmPassword } = req.body;

  // Check if the passwords match
  if (password !== confirmPassword) {
    return res.status(400).json({ message: 'Passwords do not match' });
  }

  try {
    // Check if admin with this email already exists
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ message: 'Admin with this email already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new admin
    const newAdmin = new Admin({
      email,
      password: hashedPassword,
    });

    // Save to database
    await newAdmin.save();
    res.status(201).json({ message: 'Admin registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};


// Login Admin
exports.loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find admin by email
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Generate JWT
    const token = jwt.sign({ id: admin._id, email: admin.email }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};


// Admin logout controller
exports.adminLogout = (req, res) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(400).json({ message: 'Token not provided' });
  }

  // Add token to the blacklist
  tokenBlacklist.addToken(token);

  res.status(200).json({ message: 'Admin successfully logged out' });
};



// Access dashboard (protected route)
exports.accessDashboard = (req, res) => {
  res.status(200).json({ message: 'Welcome to the Admin Dashboard' });
};



// Get all users (protected route)
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password'); // Exclude passwords from the response
    res.status(200).json({ users });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error while fetching users' });
  }
};


// Delete a user
exports.deleteUser = async (req, res) => {
  const { userId } = req.body; // Extract userId from the body

  if (!userId) {
    return res.status(400).json({ message: 'User ID is required' });
  }

  try {
    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error while deleting user' });
  }
};



///get all the cateogry
exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find(); // Fetch all categories from the database
    res.status(200).json(categories); // Send the categories as a response
  } catch (error) {
    res.status(500).json({ message: 'Server error while fetching categories' });
  }
};


// Add a new category
exports.addCategory = async (req, res) => {
  try {
    const { name } = req.body;

    // Check if the category already exists
    const existingCategory = await Category.findOne({ name });
    if (existingCategory) {
      return res.status(400).json({ message: 'Category already exists' });
    }

    // Create a new category
    const category = new Category({ name });
    await category.save();

    res.status(201).json({ message: 'Category added successfully', category });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error while adding category' });
  }
};



// Delete a category
exports.deleteCategory = async (req, res) => {
  const { categoryId } = req.body; // Read categoryId from the request body

  if (!categoryId) {
    return res.status(400).json({ message: 'Category ID is required' });
  }

  try {
    const category = await Category.findByIdAndDelete(categoryId);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }
    res.status(200).json({ message: 'Category deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error while deleting category' });
  }
};

