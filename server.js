// const express = require('express');
// const connectDB = require('./config/db');
// const cors = require('cors');
// const authRoutes = require('./routes/authRoutes');

// const app = express();
// require('dotenv').config();

// // Connect to MongoDB
// connectDB();

// // Middleware
// app.use(express.json());
// app.use(cors());

// // Routes
// app.use('/api', authRoutes);

// // Server listening on PORT
// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//     console.log(`Server running on http://localhost:${PORT}`);
// });



const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes'); // All routes, including login and profile updates
const auth = require('./middleware/auth'); // JWT Authentication middleware

const app = express();
require('dotenv').config();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/api', authRoutes); // Handles login, registration, and profile updates

// Protected dashboard route
app.get('/api/dashboard', auth, (req, res) => {
    res.json({
        message: 'Welcome to your dashboard!',
        user: req.user // Decoded user data from the token
    });
});


//for testing purpose:
app.use(express.static('public'));



// Server listening on PORT
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
