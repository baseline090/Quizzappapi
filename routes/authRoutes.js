
const express = require('express');
const { body } = require('express-validator');
const {
    register,
    login,
    forgotPassword,
    verifyOtp,
    resetPassword
} = require('../controllers/userController');

const {
    adminRegister,
    adminLogin,
    getAllUsers,
    deleteUserById
} = require('../controllers/adminController');

const router = express.Router();



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

module.exports = router;
///////---------------------------------------/////////////////



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

module.exports = router;


// const express = require('express');
// const { body } = require('express-validator');
// const {
//     register,
//     login,
//     forgotPassword,
//     verifyOtp,
//     resetPassword
// } = require('../controllers/userController');

// const {
//     adminRegister,
//     adminLogin,
//     getAllUsers,
//     deleteUserById
// } = require('../controllers/adminController');

// const router = express.Router();

// //-----------User Routes----------------------------------------------------------------------------------
// // Register Route with Validation
// router.post('/register', [
//     body('fullName').notEmpty().withMessage('Full name is required'),
//     body('username').notEmpty().withMessage('Username is required'),
//     body('email').isEmail().withMessage('Email is invalid'),
//     body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
// ], register);

// // Login Route with Validation
// router.post('/login', [
//     body('email').isEmail().withMessage('Email is invalid'),
//     body('password').notEmpty().withMessage('Password is required')
// ], login);

// // Route for sending OTP
// router.post('/forgotpassword', forgotPassword);

// // Route for verifying OTP
// router.post('/verifyotp', verifyOtp);

// // Route for resetting password
// router.post('/resetpassword', resetPassword);

// //---------------- Admin Routes-----------------------/////////

// // Admin Registration Route
// router.post('/admin/register', [
//     body('email').isEmail().withMessage('Please enter a valid email'),
//     body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
//     body('confirmPassword').custom((value, { req }) => {
//         if (value !== req.body.password) {
//             throw new Error('Passwords do not match');
//         }
//         return true;
//     })
// ], adminRegister);

// // Admin Login Route
// router.post('/admin/login', [
//     body('email').isEmail().withMessage('Please enter a valid email'),
//     body('password').notEmpty().withMessage('Password is required')
// ], adminLogin);

// // Get all users Route
// router.get('/admin/users', getAllUsers);

// // Delete user by ID Route
// router.delete('/admin/user/delete', [
//     body('id').notEmpty().withMessage('User ID is required')
// ], deleteUserById);

// module.exports = router;
