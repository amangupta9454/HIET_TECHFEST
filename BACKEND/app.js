const express = require("express");
const { default: mongoose } = require("mongoose");
require('dotenv').config();
const DataRegisterModel = require("./Schema/schema.js");
const UserModel = require("./Schema/userSchema.js");
const app = express();
const cors = require("cors");
const multer = require("multer");
const { v4: uuidv4 } = require('uuid');
const cloudinary = require("cloudinary").v2;
const fs = require("fs");
const nodemailer = require('nodemailer');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const os = require('os');
const path = require('path');
const { body, validationResult } = require('express-validator');
const rateLimit = require('express-rate-limit');

// Ensure tmp directory exists
const tmpDir = path.join(os.tmpdir(), 'Uploads');
if (!fs.existsSync(tmpDir)) {
  fs.mkdirSync(tmpDir, { recursive: true });
}

app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(express.static('public', {
    setHeaders: (res, path) => {
      if (path.endsWith('.jsx')) {
        res.set('Content-Type', 'text/javascript');
      }
    }
}));
app.use(express.urlencoded({ extended: true }));

// Cloudinary Configuration
cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});

// Email Configuration
const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// Rate Limiters
const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // 5 requests per IP
    message: 'Too many login attempts, please try again after 15 minutes'
});

const registerLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 3, // 3 requests per IP
    message: 'Too many registration attempts, please try again after 1 hour'
});

// Generate OTP
const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
};

// Send OTP Email
const sendOTPEmail = async (email, otp) => {
    try {
        const mailOptions = {
            from: `"Event Registration" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: 'OTP for Registration',
            html: `
                <h2>Your OTP</h2>
                <p>Your OTP for registration is: <strong>${otp}</strong></p>
                <p>This OTP is valid for 10 minutes.</p>
            `
        };
        await transporter.sendMail(mailOptions);
        return true;
    } catch (error) {
        console.error('Error sending OTP email:', error);
        return false;
    }
};

// Send Confirmation Email
const generateEmailTemplate = (userData) => {
    return `
        <!DOCTYPE html>
        <html>
        <head>
            <style>
                .container {
                    padding: 20px;
                    font-family: Arial, sans-serif;
                    max-width: 600px;
                    margin: 0 auto;
                }
                .header {
                    color: #333;
                    text-align: center;
                    border-bottom: 2px solid #007bff;
                    padding-bottom: 10px;
                }
                .greeting {
                    color: #444;
                    line-height: 1.6;
                    margin-bottom: 20px;
                }
                .data-table {
                    width: 100%;
                    border-collapse: collapse;
                    margin: 20px 0;
                    box-shadow: 0 0 10px rgba(0,0,0,0.1);
                }
                .data-table th, .data-table td {
                    padding: 12px;
                    text-align: left;
                    border: 1px solid #ddd;
                }
                .data-table th {
                    background-color: #007bff;
                    color: white;
                    font-weight: bold;
                }
                .data-table td {
                    background-color: #f9f9f9;
                }
                .rules-section {
                    margin-top: 20px;
                }
                .rules-section h3 {
                    color: #333;
                    border-bottom: 1px solid #007bff;
                    padding-bottom: 5px;
                }
                .rules-section ul {
                    padding-left: 20px;
                    color: #666;
                }
                .rules-section li {
                    margin: 8px 0;
                }
                .footer {
                    margin-top: 20px;
                    color: #666;
                    font-size: 14px;
                    text-align: center;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <h2 class="header">Registration Confirmation</h2>
                <div class="greeting">
                    <p>Dear ${userData.teamLeaderName},</p>
                    <p>I hope you're doing well! We’re excited to inform you that you have successfully registered for the HIET Ghaziabad Tech Event. Your registration details are provided below for your reference.</p>
                </div>
                <table class="data-table">
                    <tr>
                        <th>Field</th>
                        <th>Details</th>
                    </tr>
                    <tr>
                        <td>Registration ID</td>
                        <td>${userData.registrationId}</td>
                    </tr>
                    <tr>
                        <td>Event</td>
                        <td>${userData.event}</td>
                    </tr>
                    <tr>
                        <td>Team Name</td>
                        <td>${userData.teamName}</td>
                    </tr>
                    <tr>
                        <td>Team Leader</td>
                        <td>${userData.teamLeaderName}</td>
                    </tr>
                    <tr>
                        <td>Email</td>
                        <td>${userData.email}</td>
                    </tr>
                    <tr>
                        <td>Mobile</td>
                        <td>${userData.mobile}</td>
                    </tr>
                    <tr>
                        <td>College</td>
                        <td>${userData.college}</td>
                    </tr>
                    <tr>
                        <td>Course</td>
                        <td>${userData.course}</td>
                    </tr>
                    <tr>
                        <td>Year</td>
                        <td>${userData.year}</td>
                    </tr>
                    <tr>
                        <td>Team Size</td>
                        <td>${userData.teamSize}</td>
                    </tr>
                </table>
                <div class="rules-section">
                    <h3>Event Rules</h3>
                    <ul>
                        <li>Arrive 15 minutes before the event starts</li>
                        <li>No late entries allowed</li>
                        <li>Bring valid ID for verification</li>
                        <li>Follow the specified dress code</li>
                        <li>Respect all participants and organizers</li>
                    </ul>
                </div>
                <div class="footer">
                    <p>Best regards,<br>The Event Team<br>HIET Ghaziabad</p>
                </div>
            </div>
        </body>
        </html>
    `;
};

const sendConfirmationEmail = async (userData) => {
    try {
        const mailOptions = {
            from: `"Event Registration" <${process.env.EMAIL_USER}>`,
            to: userData.email,
            subject: `Registration Confirmation - ${userData.event}`,
            html: generateEmailTemplate(userData)
        };
        await transporter.sendMail(mailOptions);
        return true;
    } catch (error) {
        console.error('Error sending email:', error);
        return false;
    }
};

// JWT Middleware
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return res.status(401).send({ message: 'Access denied' });

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next();
    } catch (err) {
        res.status(400).send({ message: 'Invalid token' });
    }
};

// Database Connection
const connectiontodatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            maxPoolSize: 10, // Maximum number of connections in the pool
            minPoolSize: 2,  // Minimum number of connections in the pool
            connectTimeoutMS: 10000, // Timeout for initial connection
        });
        console.log("YOUR DATABASE IS CONNECTED SUCCESSFULLY");   
    } catch(err) {
        console.log(err);
    }
};

connectiontodatabase();

// Multer Storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, tmpDir);
    },
    filename: function (req, file, cb) {
        const uniqueid = uuidv4();
        cb(null, uniqueid + "" + file.originalname);
    }
});

const upload = multer({ 
    storage: storage,
    limits: { fileSize: 300000 },
});

// Input Validation Middleware for User Registration
const validateUserRegistration = [
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('email').isEmail().normalizeEmail().withMessage('Invalid email format'),
    body('mobile').matches(/^[6-9][0-9]{9}$/).withMessage('Invalid mobile number'),
    body('college').trim().notEmpty().withMessage('College is required'),
    body('branch').trim().notEmpty().withMessage('Branch is required'),
    body('year').isIn([1, 2, 3, 4]).withMessage('Year must be 1, 2, 3, or 4'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
];

// Input Validation Middleware for Event Registration
const validateEventRegistration = [
    body('event').trim().notEmpty().withMessage('Event is required'),
    body('teamName').trim().notEmpty().withMessage('Team name is required'),
    body('teamLeaderName').trim().notEmpty().withMessage('Team leader name is required'),
    body('email').isEmail().normalizeEmail().withMessage('Invalid email format'),
    body('mobile').matches(/^[6-9][0-9]{9}$/).withMessage('Invalid mobile number'),
    body('gender').isIn(['male', 'female', 'other']).withMessage('Invalid gender'),
    body('college').trim().notEmpty().withMessage('College is required'),
    body('course').trim().notEmpty().withMessage('Course is required'),
    body('year').isIn([1, 2, 3, 4]).withMessage('Year must be 1, 2, 3, or 4'),
    body('rollno').trim().notEmpty().withMessage('Roll number is required'),
    body('aadhar').matches(/^[0-9]{12}$/).withMessage('Invalid Aadhar number'),
    body('teamSize').isInt({ min: 1, max: 4 }).withMessage('Team size must be between 1 and 4'),
];

// User Registration
app.post('/api/user/register', registerLimiter, upload.single('image'), validateUserRegistration, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).send({ message: 'Validation failed', errors: errors.array() });
    }

    const { name, email, mobile, college, branch, year, password } = req.body;
    const image = req.file;

    try {
        if (!image) {
            return res.status(400).send({ message: 'Profile image is required' });
        }

        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return res.status(409).send({ message: 'User already exists' });
        }

        if (!fs.existsSync(image.path)) {
            return res.status(500).send({ message: 'Uploaded file not found' });
        }

        const uploadResult = await cloudinary.uploader.upload(image.path, {
            public_id: uuidv4() + image.originalname,
        });

        fs.unlink(image.path, (err) => {
            if (err) console.log('Error deleting image file:', err);
        });

        const hashedPassword = await bcrypt.hash(password, 10);
        const otp = generateOTP();

        const user = new UserModel({
            name,
            email,
            mobile,
            college,
            branch,
            year,
            image: uploadResult.secure_url,
            password: hashedPassword,
            otp,
            otpExpires: Date.now() + 10 * 60 * 1000,
        });

        await user.save();
        const emailSent = await sendOTPEmail(email, otp);
        if (!emailSent) {
            return res.status(500).send({ message: 'Failed to send OTP' });
        }

        res.status(201).send({ message: 'OTP sent to your email' });
    } catch (err) {
        console.error('Registration error:', err);
        res.status(500).send({ message: 'Server error', error: err.message });
    }
});

// OTP Verification
app.post('/api/user/verify-otp', [
    body('email').isEmail().normalizeEmail().withMessage('Invalid email format'),
    body('otp').trim().notEmpty().withMessage('OTP is required')
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).send({ message: 'Validation failed', errors: errors.array() });
    }

    const { email, otp } = req.body;

    try {
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }

        if (user.otp !== otp || user.otpExpires < Date.now()) {
            return res.status(400).send({ message: 'Invalid or expired OTP' });
        }

        user.otp = null;
        user.otpExpires = null;
        user.isVerified = true;
        await user.save();

        res.status(200).send({ message: 'OTP verified successfully' });
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: 'Server error' });
    }
});

// User Login
app.post('/api/user/login', loginLimiter, [
    body('email').isEmail().normalizeEmail().withMessage('Invalid email format'),
    body('password').notEmpty().withMessage('Password is required')
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).send({ message: 'Validation failed', errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
        const user = await UserModel.findOne({ email });
        if (!user || !user.isVerified) {
            return res.status(401).send({ message: 'Invalid credentials or unverified account' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).send({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
        res.status(200).send({ token });
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: 'Server error' });
    }
});

// User Dashboard
app.get('/api/user/dashboard', authenticateToken, async (req, res) => {
    try {
        const user = await UserModel.findById(req.user.userId).select('-password -otp -otpExpires');
        const events = await DataRegisterModel.find({ email: user.email });
        res.status(200).send({ user, events });
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: 'Server error' });
    }
});

// Check Duplicate Registration
app.post('/api/register/check', authenticateToken, [
    body('rollno').trim().notEmpty().withMessage('Roll number is required'),
    body('teamLeaderName').trim().notEmpty().withMessage('Team leader name is required'),
    body('aadhar').matches(/^[0-9]{12}$/).withMessage('Invalid Aadhar number')
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).send({ message: 'Validation failed', errors: errors.array() });
    }

    const { rollno, teamLeaderName, aadhar } = req.body;

    try {
        const existingRegistration = await DataRegisterModel.findOne({
            $or: [
                { rollno },
                { teamLeaderName },
                { aadhar },
            ],
        });

        if (existingRegistration) {
            return res.status(409).send({ message: 'This roll number, team leader name, or Aadhar number is already registered', isRegistered: true });
        }

        res.status(200).send({ isRegistered: false });
    } catch (err) {
        console.error('Check registration error:', err);
        res.status(500).send({ message: 'Server error' });
    }
});

// Event Registration (Protected)
app.post('/api/register', authenticateToken, upload.fields([
    { name: "clg_id" },
    { name: "aadharImage" }
]), validateEventRegistration, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).send({ message: 'Validation failed', errors: errors.array() });
    }

    const { 
        event,
        teamName,
        teamLeaderName,
        email,
        mobile,
        gender,
        college,
        course,
        year,
        rollno,
        aadhar,
        teamSize 
    } = req.body;

    try {
        const findStudent = await DataRegisterModel.findOne({ email, mobile });
        if (findStudent) {
            return res.status(409).send({ message: "You are already registered" });
        }

        if (!req.files || !req.files.clg_id || !req.files.aadharImage) {
            return res.status(400).send({ message: "Both college ID and Aadhar image are required" });
        }

        const uploadResultcollegeId = await cloudinary.uploader.upload(
            req.files.clg_id[0].path,
            {
                public_id: uuidv4() + "" + req.files.clg_id[0].originalname,
            }
        );

        if (!uploadResultcollegeId) {
            return res.status(400).send({ message: "Can't upload college ID image, try again" });
        }

        const uploadResultaadharcard = await cloudinary.uploader.upload(
            req.files.aadharImage[0].path,
            {
                public_id: uuidv4() + "" + req.files.aadharImage[0].originalname,
            }
        );

        if (!uploadResultaadharcard) {
            return res.status(400).send({ message: "Can't upload Aadhar image, try again" });
        }

        fs.unlink(req.files.clg_id[0].path, (err) => {
            if (err) console.log("Error deleting college id file:", err);
        });

        fs.unlink(req.files.aadharImage[0].path, (err) => {
            if (err) console.log("Error deleting aadhar card file:", err);
        });

        const parsedTeamSize = Number(teamSize);
        if (isNaN(parsedTeamSize) || parsedTeamSize < 1 || parsedTeamSize > 4) {
            return res.status(400).send({ message: "Team size must be a number between 1 and 4" });
        }

        const newdata = new DataRegisterModel({
            clg_id: uploadResultcollegeId.secure_url,
            registrationId: uuidv4(),
            event,
            teamName,
            teamLeaderName,
            email,
            mobile: parseInt(mobile),
            gender,
            college,
            course,
            year: parseInt(year),
            rollno,
            aadhar,
            teamSize: parsedTeamSize,
            aadharImage: uploadResultaadharcard.secure_url
        });

        const savedata = await newdata.save();
        
        if (savedata) {
            const emailSent = await sendConfirmationEmail(savedata);
            if (!emailSent) {
                console.log("Email sending failed, but registration successful");
            }

            return res.status(201).send({
                message: `Congrats😀 ${teamName} Registered Successfully`,
                registrationId: savedata.registrationId,
                data: savedata
            });
        } else {
            return res.status(400).send({ message: "Can't save data. Try again" });
        }
    } catch (err) {
        console.log(err);
        return res.status(500).send({ message: "Server error" });
    }
});

app.get("/", (req, res) => {
    res.send({"msg": "hi"});
});

const PORT = process.env.PORT || 5000; 
app.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT}`);
});