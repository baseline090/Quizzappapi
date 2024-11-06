// const mongoose = require('mongoose');
// const bcrypt = require('bcrypt');

// const userSchema = new mongoose.Schema({
//     fullName: { type: String, required: true },
//     firstName: { type: String, default: "" }, // Optional during registration
//     lastName: { type: String, default: "" },  // Optional during registration
//     username: { type: String, required: true },
//     email: { type: String, required: true, unique: true, match: /.+\@.+\..+/ }, // Regex for email validation
//     password: { type: String, required: true },
//     otp: { type: String, default: null }, // Field for storing OTP
//     phoneNumber: { type: String, default: null }, // Optional during registration
//     // profilePic: { type: Buffer }// Optional during registration
// }, { timestamps: true });


// // Hash password before saving
// userSchema.pre('save', async function (next) {
//     if (this.isModified('password')) {
//         this.password = await bcrypt.hash(this.password, 10);
//     }
//     next();
// });

// module.exports = mongoose.model('User', userSchema);



const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    firstName: { type: String, default: "" }, // Optional during registration
    lastName: { type: String, default: "" },  // Optional during registration
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true, match: /.+\@.+\..+/ }, // Regex for email validation
    password: { type: String, required: true },
    otp: { type: String, default: null }, // Field for storing OTP
    phoneNumber: { type: String, default: null }, // Optional during registration
    profilePic: { type: Buffer }// Optional during registration
}, { timestamps: true });


// Hash password before saving
userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

module.exports = mongoose.model('User', userSchema);

