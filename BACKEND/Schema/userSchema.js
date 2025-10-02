// const mongoose = require("mongoose");

// const userSchema = new mongoose.Schema({
//     name: {
//         type: String,
//         required: true
//     },
//     email: {
//         type: String,
//         required: true,
//         unique: true,
//         match: /^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/
//     },
//     mobile: {
//         type: String,
//         required: true,
//         match: /^[6-9][0-9]{9}$/
//     },
//     college: {
//         type: String,
//         required: true
//     },
//     branch: {
//         type: String,
//         required: true
//     },
//     year: {
//         type: Number,
//         required: true,
//         enum: [1, 2, 3, 4]
//     },
//     image: {
//         type: String,
//         required: true
//     },
//     password: {
//         type: String,
//         required: true
//     },
//     otp: {
//         type: String
//     },
//     otpExpires: {
//         type: Date
//     },
//     isVerified: {
//         type: Boolean,
//         default: false
//     }
// }, { timestamps: true });

// const UserModel = mongoose.model("User", userSchema);
// module.exports = UserModel;

// new code 02-10-2025
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: /^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
        index: true
    },
    mobile: {
        type: String,
        required: true,
        match: /^[6-9][0-9]{9}$/,
        index: true
    },
    college: {
        type: String,
        required: true
    },
    branch: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true,
        enum: [1, 2, 3, 4]
    },
    // Removed image field entirely for speed
    password: {
        type: String,
        required: true
    },
    otp: {
        type: String
    },
    otpExpires: {
        type: Date
    },
    isVerified: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

const UserModel = mongoose.model("User", userSchema);
module.exports = UserModel;