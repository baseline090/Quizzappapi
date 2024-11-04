
// const express = require('express');
// const { body } = require('express-validator');
// const {
//     register,
//     login,
//     forgotPassword,
//     verifyOtp,
//     resetPassword,
//     updateProfile,
//     logout,
//     getAllCategories
// } = require('../controllers/userController');

// // const adminController = require('../controllers/adminController');

// const router = express.Router();

// const auth = require('../middleware/auth');

// const Category = require('../models/Category'); // Import the Category model


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

// // Route for updating user profile (Protected route)
// router.put('/profile/update', auth, updateProfile);


// // Protected route for users to get all categories
// router.get('/user/categories', auth, getAllCategories);


// // Logout route (protected)
// router.post('/logout', auth, logout);


// ///////-------------------------------------------------------------------/////////////////



// ///////////----------Front End Routes----------------------///
// //////--------------Dahboard Routes-----------------------//////
// // User Dashboard Route (protected)
// router.get('/dashboard', auth, async (req, res) => {
//     try {
//         // Fetch user-specific data if needed, using req.user.userId

//         const dashboardData = {
//             message: `Welcome, ${req.user.username}! Here are your available actions.`,
//             actions: {
//                 viewProfile: '/api/profile',        // Endpoint to view the user's profile details
//                 editProfile: '/api/profile/update', // Endpoint to update the user's profile
//                 attendQuiz: '/api/quiz/start',      // Placeholder for starting a quiz
//                 selectCategory: '/api/category/select', // Placeholder for category selection
//                 logout: '/api/logout' // Placeholder for a logout feature, if needed
//             }
//         };

//         res.json(dashboardData);
//     } catch (err) {
//         console.error('Error fetching dashboard:', err);
//         res.status(500).json({ message: 'Server error' });
//     }
// });


//////////----------------------------------------------------------------------////////////////////////////



///---------------------------- Admin Routes----------------------------------------------------/////////

// Admin Registration Route
// router.post('/admin/register', [
//     body('email').isEmail().withMessage('Email is invalid'),
//     body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
//     body('confirmPassword').exists().withMessage('Please confirm your password')
// ], adminController.registerAdmin);  //adminRegister

// // Admin Login Route
// router.post('/admin/login', [
//     body('email').isEmail().withMessage('Email is invalid'),
//     body('password').notEmpty().withMessage('Password is required')
// ], adminController.loginAdmin);

// // Admin Dashboard Route (Protected)
// router.get('/admin/dashboard', auth, adminController.accessDashboard);

// // Admin Routes for get all User (Protected)
// router.get('/admin/users', auth, adminController.getAllUsers);

// //Admin Routes Delete a user (Protected)
// router.delete('/admin/user', auth, adminController.deleteUser);

// // Admin Routes get all Category Management (Protected)
// router.get('/admin/category', auth, adminController.getAllCategories);

// // Admin Routes add Category Management (Protected)
// router.post('/admin/category/add', auth, adminController.addCategory);

// //Admin Routes Delete a category
// router.delete('/admin/category/delete', auth, adminController.deleteCategory);

// // Route for admin logout
// router.post('/admin/logout', auth, adminController.adminLogout);

///////////----------------------------------------------------------------------------/////////


// module.exports = router;



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


const adminController = require('../controllers/adminController');

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




///////---------------------------------------/////////////////







///////////----------Front End Routes----------------------///
//////--------------Dahboard Routes-----------------------//////
// User Dashboard Route (protected)
router.get('/dashboard', auth, async (req, res) => {
    try {
        // Fetch user-specific data if needed, using req.user.userId

        const dashboardData = {
            message: `Welcome, ${req.user.username}! Here are your available actions.`,
            actions: {
                viewProfile: '/api/profile',        // Endpoint to view the user's profile details
                editProfile: '/api/profile/update', // Endpoint to update the user's profile
                attendQuiz: '/api/quiz/start',      // Placeholder for starting a quiz
                selectCategory: '/api/category/select', // Placeholder for category selection
                logout: '/api/logout' // Placeholder for a logout feature, if needed
            }
        };

        res.json(dashboardData);
    } catch (err) {
        console.error('Error fetching dashboard:', err);
        res.status(500).json({ message: 'Server error' });
    }
});


//////////----------------------------------------------------------------------////////////////////////////







///--------------- Admin Routes-----------------------/////////
// Admin Registration Route
router.post('/admin/register', [
    body('email').isEmail().withMessage('Email is invalid'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
    body('confirmPassword').exists().withMessage('Please confirm your password')
], adminController.registerAdmin);  //adminRegister

// Admin Login Route
router.post('/admin/login', [
    body('email').isEmail().withMessage('Email is invalid'),
    body('password').notEmpty().withMessage('Password is required')
], adminController.loginAdmin);

// Admin Dashboard Route (Protected)
router.get('/admin/dashboard', auth, adminController.accessDashboard);

// Admin Routes for get all User (Protected)
router.get('/admin/users', auth, adminController.getAllUsers);

//Admin Routes Delete a user (Protected)
router.delete('/admin/user', auth, adminController.deleteUser);

// Admin Routes get all Category Management (Protected)
router.get('/admin/category', auth, adminController.getAllCategories);

// Admin Routes add Category Management (Protected)
router.post('/admin/category/add', auth, adminController.addCategory);

//Admin Routes Delete a category
router.delete('/admin/category/delete', auth, adminController.deleteCategory);

// Route for admin logout
router.post('/admin/logout', auth, adminController.adminLogout);






module.exports = router;

