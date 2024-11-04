

// const jwt = require('jsonwebtoken');
// const tokenBlacklist = require('../utils/tokenBlacklist');

// const auth = (req, res, next) => {
//   const token = req.header('Authorization')?.replace('Bearer ', '');

//   if (!token) {
//     return res.status(401).json({ message: 'Unauthorized access, please login first' });
//   }

//   // Check if the token is blacklisted
//   if (tokenBlacklist.isTokenBlacklisted(token)) {
//     return res.status(401).json({ message: 'Token is invalid. Please login again.' });
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = decoded; // Attach user info to request
//     next(); // Continue to the next middleware or route handler
//   } catch (error) {
//     return res.status(401).json({ message: 'Unauthorized access, please login first' });
//   }
// };

// module.exports = auth;



const jwt = require('jsonwebtoken');
const tokenBlacklist = require('../utils/tokenBlacklist');

const auth = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized access, please login first' });
  }

  // Check if the token is blacklisted
  if (tokenBlacklist.isTokenBlacklisted(token)) {
    return res.status(401).json({ message: 'Token is invalid. Please login again.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach user info to request
    next(); // Continue to the next middleware or route handler
  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized access, please login first' });
  }
};

module.exports = auth;


