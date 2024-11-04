
const express = require('express');
const { body } = require('express-validator');
const {
    register,
    login,
    forgotPassword,
    verifyOtp,
    resetPassword,
    updateProfile,
    logout,
    getAllCategories
} = require('../controllers/userController');

const {
    adminRegister,
    adminLogin,
    getAllUsers,
    deleteUserById
} = require('../controllers/adminController');

const router = express.Router();

const auth = require('../middleware/auth');

const Category = require('../models/Category'); // Import the Category model


//-----------User Routes----------------------------------------------------------------------------------
// Register Route with Validation
router.post('/register', [
    body('fullName').notEmpty().withMessage('Full name is required'),
    body('username').notEmpty().withMessage('Username is required'),
    body('email').isEmail().withMessage('Email is invalid'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
], register);

// Login Route with Validation
router.post('/login', [
    body('email').isEmail().withMessage('Email is invalid'),
    body('password').notEmpty().withMessage('Password is required')
], login);

// Route for sending OTP
router.post('/forgotpassword', forgotPassword);

// Route for verifying OTP
router.post('/verifyotp', verifyOtp);

// Route for resetting password
router.post('/resetpassword', resetPassword);

// Route for updating user profile (Protected route)
router.put('/profile/update', auth, updateProfile);


// Protected route for users to get all categories
router.get('/user/categories', auth, getAllCategories);


// Logout route (protected)
router.post('/logout', auth, logout);



module.exports = router;
///////---------------------------------------/////////////////

//////--------------Dahboard Routes-----------------------//////
// User Dashboard Route (protected)
router.get('/dashboard', auth, (req, res) => {
    res.status(200).json({
        message: 'Welcome to your dashboard!',
        user: req.user // This should contain user data from the token
    });
});

// Route for updating user profile (Protected route)
router.put('/profile/update', auth, updateProfile);


///--------------- Admin Routes-----------------------/////////
// Admin Registration Route
router.post('/admin/register',
    [
        body('email').isEmail().withMessage('Please enter a valid email'),
        body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
        body('confirmPassword').custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error('Passwords do not match');
            }
            return true;
        })
    ],
    adminRegister
);

// Admin Login Route
router.post('/admin/login',
    [
        body('email').isEmail().withMessage('Please enter a valid email'),
        body('password').notEmpty().withMessage('Password is required')
    ],
    adminLogin
);

// Get all users Route
router.get('/admin/users', getAllUsers);

// Delete user by ID Route
router.delete('/admin/user/delete',
    [
        body('id').notEmpty().withMessage('User ID is required')
    ],
    deleteUserById
);
//////---------------------------------------------------------------------/////////
module.exports = router;


