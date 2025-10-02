// // rename 2
// const express = require("express");
// const { default: mongoose } = require("mongoose");
// require('dotenv').config();
// const DataRegisterModel = require("./Schema/schema.js");
// const UserModel = require("./Schema/userSchema.js");
// const app = express();
// const cors = require("cors");
// const multer = require("multer");
// const { v4: uuidv4 } = require('uuid');
// const cloudinary = require("cloudinary").v2;
// const fs = require("fs"); // Import synchronous fs
// const fsPromises = require("fs").promises; // Import fs.promises separately
// const nodemailer = require('nodemailer');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const os = require('os');
// const path = require('path');
// const { body, validationResult } = require('express-validator');
// const rateLimit = require('express-rate-limit');

// app.set('trust proxy', 1);

// const tmpDir = path.join(os.tmpdir(), 'Uploads');
// if (!fs.existsSync(tmpDir)) {
//   fs.mkdirSync(tmpDir, { recursive: true }); // Create Uploads directory if it doesn't exist
// }

// app.use(cors("*"));
// app.use(express.json());
// app.use(express.static('public', {
//     setHeaders: (res, path) => {
//       if (path.endsWith('.jsx')) {
//         res.set('Content-Type', 'text/javascript');
//       }
//     }
// }));
// app.use(express.urlencoded({ extended: true }));

// cloudinary.config({ 
//     cloud_name: process.env.CLOUD_NAME,
//     api_key: process.env.API_KEY,
//     api_secret: process.env.API_SECRET
// });

// const transporter = nodemailer.createTransport({
//     host: process.env.EMAIL_HOST,
//     port: process.env.EMAIL_PORT,
//     secure: false,
//     auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASS
//     }
// });

// const loginLimiter = rateLimit({
//     windowMs: 15 * 60 * 1000,
//     max: 5,
//     message: 'Too many login attempts, please try again after 15 minutes'
// });

// const registerLimiter = rateLimit({
//     windowMs: 15 * 60 * 1000,
//     max: 5,
//     message: 'Too many registration attempts, please try again after 1 hour'
// });

// const generateOTP = () =>
//   Math.floor(100_000 + Math.random() * 900_000).toString();

// const sendOTPEmail = async (email, otp) => {
//  const mailHtml = `
// <!DOCTYPE html>
// <html lang="en">
// <head>
//   <meta charset="UTF-8" />
//   <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
//   <title>Email Verification – CROSSROADS</title>
//   <style>
//     body {
//       margin: 0;
//       padding: 0;
//       background: #f2f4f8;
//       font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
//     }
//     .email-wrapper {
//       max-width: 600px;
//       margin: 50px auto;
//       background: #ffffff;
//       border-radius: 14px;
//       box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
//       overflow: hidden;
//     }
//     .email-header {
//       background: linear-gradient(135deg, #667eea, #764ba2);
//       padding: 40px 30px;
//       text-align: center;
//       color: #ffffff;
//     }
//     .email-header h1 {
//       margin: 0;
//       font-size: 26px;
//       font-weight: 700;
//     }
//     .email-header p {
//       margin-top: 10px;
//       font-size: 15.5px;
//       opacity: 0.95;
//     }
//     .email-body {
//       padding: 30px;
//       color: #333;
//     }
//     .email-body p {
//       font-size: 15.5px;
//       line-height: 1.6;
//       margin: 12px 0;
//     }
//     .otp-block {
//       margin: 30px auto;
//       background: #f4f7ff;
//       border: 2px solid #cdd9ff;
//       border-radius: 10px;
//       text-align: center;
//       padding: 20px;
//       width: fit-content;
//     }
//     .otp-title {
//       font-size: 14px;
//       color: #666;
//       margin-bottom: 8px;
//     }
//     .otp-code {
//       font-size: 38px;
//       letter-spacing: 10px;
//       font-family: 'Courier New', monospace;
//       font-weight: bold;
//       color: #4a5fe1;
//     }
//     .security-note {
//       font-size: 13.5px;
//       color: #555;
//       margin-top: 30px;
//       line-height: 1.6;
//     }
//     .footer {
//       background: #f9fafc;
//       text-align: center;
//       padding: 18px 30px;
//       font-size: 12.5px;
//       color: #888;
//       border-top: 1px solid #e3e7ed;
//     }
//     .footer a {
//       color: #667eea;
//       text-decoration: none;
//       font-weight: 500;
//     }
//   </style>
// </head>
// <body>
//   <div class="email-wrapper">
//     <div class="email-header">
//       <h1>Verify Your Email</h1>
//       <p>Welcome to CROSSROADS – Secure your account</p>
//     </div>
//     <div class="email-body">
//       <p>Hello 👋,</p>
//       <p>Thanks for signing up with CROSSROADS! To verify your email address, please use the following One-Time Password (OTP):</p>

//       <div class="otp-block">
//         <div class="otp-title">Your Verification Code</div>
//         <div class="otp-code">${otp}</div>
//       </div>

//       <p class="security-note">
//         ⏰ This code will expire in <strong>10 minutes</strong>.<br>
//         🔐 For your security, <strong>never share</strong> this code with anyone—even CROSSROADS staff.<br>
//         ❌ If you didn’t request this, you can safely ignore this email.
//       </p>
//     </div>
//     <div class="footer">
//       Need help? <a href="mailto:ag0567688@gmail.com">Contact Support</a><br />
//       &copy; ${new Date().getFullYear()} CROSSROADS. All rights reserved.
//     </div>
//   </div>
// </body>
// </html>
// `;


//   try {
//     await transporter.sendMail({
//       from: `"CROSSROADS" <${process.env.EMAIL_USER}>`,
//       to: email,
//       subject: "🔐 Complete Your CROSSROADS Registration",
//       html: mailHtml,
//     });
//     return true;
//   } catch (err) {
//     console.error("❌ Failed to send OTP email:", err);
//     return false;
//   }
// };

// module.exports = { generateOTP, sendOTPEmail };

// const generateLeaderEmailTemplate = (userData) => {
//     return `
//         <!DOCTYPE html>
//         <html>
//         <head>
//             <style>
//                 .container {
//                     padding: 20px;
//                     font-family: Arial, sans-serif;
//                     max-width: 600px;
//                     margin: 0 auto;
//                 }
//                 .header {
//                     color: #333;
//                     text-align: center;
//                     border-bottom: 2px solid #007bff;
//                     padding-bottom: 10px;
//                 }
//                 .greeting {
//                     color: #444;
//                     line-height: 1.6;
//                     margin-bottom: 20px;
//                 }
//                 .data-table {
//                     width: 100%;
//                     border-collapse: collapse;
//                     margin: 20px 0;
//                     box-shadow: 0 0 10px rgba(0,0,0,0.1);
//                 }
//                 .data-table th, .data-table td {
//                     padding: 12px;
//                     text-align: left;
//                     border: 1px solid #ddd;
//                 }
//                 .data-table th {
//                     background-color: #007bff;
//                     color: white;
//                     font-weight: bold;
//                 }
//                 .data-table td {
//                     background-color: #f9f9f9;
//                 }
//                 .rules-section {
//                     margin-top: 20px;
//                 }
//                 .rules-section h3 {
//                     color: #333;
//                     border-bottom: 1px solid #007bff;
//                     padding-bottom: 5px;
//                 }
//                 .rules-section ul {
//                     padding-left: 20px;
//                     color: #666;
//                 }
//                 .rules-section li {
//                     margin: 8px 0;
//                 }
//                 .footer {
//                     margin-top: 20px;
//                     color: #666;
//                     font-size: 14px;
//                     text-align: center;
//                 }
//                 .team-members {
//                     margin-top: 20px;
//                 }
//                 .team-members h3 {
//                     color: #333;
//                     border-bottom: 1px solid #007bff;
//                     padding-bottom: 5px;
//                 }
//             </style>
//         </head>
//         <body>
//             <div class="container">
//                 <h2 class="header">Registration Confirmation</h2>
//                 <div class="greeting">
//                     <p>Dear ${userData.teamLeaderName},</p>
//                     <p>I hope you're doing well! We’re excited to inform you that you have successfully registered as the team leader for the HIET Ghaziabad Tech Event. Your registration details are provided below for your reference.</p>
//                 </div>
//                 <table class="data-table">
//                     <tr>
//                         <th>Field</th>
//                         <th>Details</th>
//                     </tr>
//                     <tr>
//                         <td>Registration ID</td>
//                         <td>${userData.registrationId}</td>
//                     </tr>
//                     <tr>
//                         <td>Event</td>
//                         <td>${userData.event}</td>
//                     </tr>
//                     <tr>
//                         <td>Team Name</td>
//                         <td>${userData.teamName}</td>
//                     </tr>
//                     <tr>
//                         <td>Team Leader</td>
//                         <td>${userData.teamLeaderName}</td>
//                     </tr>
//                     <tr>
//                         <td>Email</td>
//                         <td>${userData.email}</td>
//                     </tr>
//                     <tr>
//                         <td>Mobile</td>
//                         <td>${userData.mobile}</td>
//                     </tr>
//                     <tr>
//                         <td>College</td>
//                         <td>${userData.college}</td>
//                     </tr>
//                     <tr>
//                         <td>Course</td>
//                         <td>${userData.course}</td>
//                     </tr>
//                     <tr>
//                         <td>Year</td>
//                         <td>${userData.year}</td>
//                     </tr>
//                     <tr>
//                         <td>Team Size (Excluding Leader)</td>
//                         <td>${userData.teamSize}</td>
//                     </tr>
//                 </table>
//                 ${userData.teamMembers && userData.teamMembers.length > 0 ? `
//                 <div class="team-members">
//                     <h3>Team Members</h3>
//                     <table class="data-table">
//                         <tr>
//                             <th>Name</th>
//                             <th>Email</th>
//                             <th>Course</th>
//                             <th>Branch</th>
//                             <th>Year</th>
//                             <th>Roll No</th>
//                         </tr>
//                         ${userData.teamMembers.map(member => `
//                         <tr>
//                             <td>${member.name}</td>
//                             <td>${member.email}</td>
//                             <td>${member.course}</td>
//                             <td>${member.branch}</td>
//                             <td>${member.year}</td>
//                             <td>${member.rollno}</td>
//                         </tr>
//                         `).join('')}
//                     </table>
//                 </div>
//                 ` : ''}
//                 <div class="rules-section">
//                     <h3>Event Rules</h3>
//                     <ul>
//                         <li>Arrive 15 minutes before the event starts</li>
//                         <li>No late entries allowed</li>
//                         <li>Bring valid ID for verification</li>
//                         <li>Follow the specified dress code</li>
//                         <li>Respect all participants and organizers</li>
//                     </ul>
//                 </div>
//                 <div class="footer">
//                     <p>Best regards,<br>The Event Team<br>HIET Ghaziabad</p>
//                 </div>
//             </div>
//         </body>
//         </html>
//     `;
// };

// const generateMemberEmailTemplate = (userData, member) => {
//     return `
//         <!DOCTYPE html>
//         <html>
//         <head>
//             <style>
//                 .container {
//                     padding: 20px;
//                     font-family: Arial, sans-serif;
//                     max-width: 600px;
//                     margin: 0 auto;
//                 }
//                 .header {
//                     color: #333;
//                     text-align: center;
//                     border-bottom: 2px solid #007bff;
//                     padding-bottom: 10px;
//                 }
//                 .greeting {
//                     color: #444;
//                     line-height: 1.6;
//                     margin-bottom: 20px;
//                 }
//                 .data-table {
//                     width: 100%;
//                     border-collapse: collapse;
//                     margin: 20px 0;
//                     box-shadow: 0 0 10px rgba(0,0,0,0.1);
//                 }
//                 .data-table th, .data-table td {
//                     padding: 12px;
//                     text-align: left;
//                     border: 1px solid #ddd;
//                 }
//                 .data-table th {
//                     background-color: #007bff;
//                     color: white;
//                     font-weight: bold;
//                 }
//                 .data-table td {
//                     background-color: #f9f9f9;
//                 }
//                 .rules-section {
//                     margin-top: 20px;
//                 }
//                 .rules-section h3 {
//                     color: #333;
//                     border-bottom: 1px solid #007bff;
//                     padding-bottom: 5px;
//                 }
//                 .rules-section ul {
//                     padding-left: 20px;
//                     color: #666;
//                 }
//                 .rules-section li {
//                     margin: 8px 0;
//                 }
//                 .footer {
//                     margin-top: 20px;
//                     color: #666;
//                     font-size: 14px;
//                     text-align: center;
//                 }
//             </style>
//         </head>
//         <body>
//             <div class="container">
//                 <h2 class="header">Registration Confirmation</h2>
//                 <div class="greeting">
//                     <p>Hello ${member.name},</p>
//                     <p>We’re excited to confirm that you have successfully registered as a team member for the HIET Ghaziabad Tech Event in the team "${userData.teamName}" led by ${userData.teamLeaderName}. Your registration details are provided below for your reference.</p>
//                 </div>
//                 <table class="data-table">
//                     <tr>
//                         <th>Field</th>
//                         <th>Details</th>
//                     </tr>
//                     <tr>
//                         <td>Registration ID</td>
//                         <td>${userData.registrationId}</td>
//                     </tr>
//                     <tr>
//                         <td>Event</td>
//                         <td>${userData.event}</td>
//                     </tr>
//                     <tr>
//                         <td>Team Name</td>
//                         <td>${userData.teamName}</td>
//                     </tr>
//                     <tr>
//                         <td>Team Leader</td>
//                         <td>${userData.teamLeaderName}</td>
//                     </tr>
//                     <tr>
//                         <td>Your Name</td>
//                         <td>${member.name}</td>
//                     </tr>
//                     <tr>
//                         <td>Your Email</td>
//                         <td>${member.email}</td>
//                     </tr>
//                     <tr>
//                         <td>Your Course</td>
//                         <td>${member.course}</td>
//                     </tr>
//                     <tr>
//                         <td>Your Branch</td>
//                         <td>${member.branch}</td>
//                     </tr>
//                     <tr>
//                         <td>Your Year</td>
//                         <td>${member.year}</td>
//                     </tr>
//                     <tr>
//                         <td>Your Roll No</td>
//                         <td>${member.rollno}</td>
//                     </tr>
//                     <tr>
//                         <td>Team Size (Excluding Leader)</td>
//                         <td>${userData.teamSize}</td>
//                     </tr>
//                 </table>
//                 <div class="rules-section">
//                     <h3>Event Rules</h3>
//                     <ul>
//                         <li>Arrive 15 minutes before the event starts</li>
//                         <li>No late entries allowed</li>
//                         <li>Bring valid ID for verification</li>
//                         <li>Follow the specified dress code</li>
//                         <li>Respect all participants and organizers</li>
//                     </ul>
//                 </div>
//                 <div class="footer">
//                     <p>Best regards,<br>The Event Team<br>HIET Ghaziabad</p>
//                 </div>
//             </div>
//         </body>
//         </html>
//     `;
// };

// const sendConfirmationEmail = async (userData) => {
//     try {
//         // Send email to team leader
//         const leaderMailOptions = {
//             from: `"Event Registration" <${process.env.EMAIL_USER}>`,
//             to: userData.email,
//             subject: `Registration Confirmation - ${userData.event}`,
//             html: generateLeaderEmailTemplate(userData)
//         };
//         await transporter.sendMail(leaderMailOptions);

//         // Send emails to team members
//         for (const member of userData.teamMembers) {
//             const memberMailOptions = {
//                 from: `"Event Registration" <${process.env.EMAIL_USER}>`,
//                 to: member.email,
//                 subject: `Registration Confirmation - ${userData.event}`,
//                 html: generateMemberEmailTemplate(userData, member)
//             };
//             await transporter.sendMail(memberMailOptions);
//         }
//         return true;
//     } catch (error) {
//         console.error('Error sending email:', error);
//         return false;
//     }
// };

// const authenticateToken = (req, res, next) => {
//     const authHeader = req.headers['authorization'];
//     const token = authHeader && authHeader.split(' ')[1];
//     if (!token) return res.status(401).send({ message: 'Access denied' });

//     try {
//         const verified = jwt.verify(token, process.env.JWT_SECRET);
//         req.user = verified;
//         next();
//     } catch (err) {
//         res.status(400).send({ message: 'Invalid token' });
//     }
// };

// const connectiontodatabase = async () => {
//     try {
//         await mongoose.connect(process.env.MONGODB_URI, {
//             maxPoolSize: 10,
//             minPoolSize: 2,
//             connectTimeoutMS: 10000,
//         });
//         console.log("YOUR DATABASE IS CONNECTED SUCCESSFULLY");   
//     } catch(err) {
//         console.log(err);
//     }
// };

// connectiontodatabase();

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, tmpDir);
//     },
//     filename: function (req, file, cb) {
//         const uniqueid = uuidv4();
//         cb(null, uniqueid + "" + file.originalname);
//     }
// });

// const upload = multer({ 
//     storage: storage,
//     limits: { fileSize: 1000000 },
// });

// const validateUserRegistration = [
//     body('name').trim().notEmpty().withMessage('Name is required'),
//     body('email').isEmail().normalizeEmail().withMessage('Invalid email format'),
//     body('mobile').matches(/^[6-9][0-9]{9}$/).withMessage('Invalid mobile number'),
//     body('college').trim().notEmpty().withMessage('College is required'),
//     body('branch').trim().notEmpty().withMessage('Branch is required'),
//     body('year').isInt({ min: 1, max: 12 }).withMessage('Year must be between 1 and 12'),
//     body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
// ];

// const validateEventRegistration = [
//     body('event').trim().notEmpty().withMessage('Event is required'),
//     body('teamName').trim().notEmpty().withMessage('Team name is required'),
//     body('teamLeaderName').trim().notEmpty().withMessage('Team leader name is required'),
//     body('email').isEmail().normalizeEmail().withMessage('Invalid email format'),
//     body('mobile').matches(/^[6-9][0-9]{9}$/).withMessage('Invalid mobile number'),
//     body('gender').isIn(['male', 'female', 'other']).withMessage('Invalid gender'),
//     body('college').trim().notEmpty().withMessage('College is required'),
//     body('course').trim().notEmpty().withMessage('Course is required'),
//     body('year').isInt({ min: 1, max: 12 }).withMessage('Year must be between 1 and 12'),
//     body('rollno').trim().notEmpty().withMessage('Roll number is required'),
//     body('teamSize').isInt({ min: 0, max: 10 }).withMessage('Team size must be between 0 and 10'),
//     body('teamMembers.*.name').trim().notEmpty().withMessage('Team member name is required'),
//     body('teamMembers.*.email').isEmail().normalizeEmail().withMessage('Invalid team member email format'),
//     body('teamMembers.*.course').trim().notEmpty().withMessage('Team member course is required'),
//     body('teamMembers.*.branch').trim().notEmpty().withMessage('Team member branch is required'),
//     body('teamMembers.*.year').isInt({ min: 1, max: 12 }).withMessage('Team member year must be between 1 and 12'),
//     body('teamMembers.*.rollno').trim().notEmpty().withMessage('Team member roll number is required'),
// ];

// app.post('/api/user/register', registerLimiter, upload.single('image'), validateUserRegistration, async (req, res) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//         return res.status(400).send({ message: 'Validation failed', errors: errors.array() });
//     }

//     const { name, email, mobile, college, branch, year, password } = req.body;
//     const image = req.file;

//     try {
//         if (!image) {
//             return res.status(400).send({ message: 'Profile image is required' });
//         }

//         const existingUser = await UserModel.findOne({ email }).lean();
//         if (existingUser) {
//             return res.status(409).send({ message: 'User already exists' });
//         }

//         if (!fs.existsSync(image.path)) {
//             return res.status(500).send({ message: 'Uploaded file not found' });
//         }

//         const uploadResult = await cloudinary.uploader.upload(image.path, {
//             public_id: uuidv4() + image.originalname,
//         });

//         await fsPromises.unlink(image.path).catch(err => console.log('Error deleting image file:', err));

//         const hashedPassword = await bcrypt.hash(password, 10);
//         const otp = generateOTP();

//         const user = new UserModel({
//             name,
//             email,
//             mobile,
//             college,
//             branch,
//             year,
//             image: uploadResult.secure_url,
//             password: hashedPassword,
//             otp,
//             otpExpires: Date.now() + 10 * 60 * 1000,
//         });

//         await user.save();
//         const emailSent = await sendOTPEmail(email, otp);
//         if (!emailSent) {
//             return res.status(500).send({ message: 'Failed to send OTP' });
//         }

//         res.status(201).send({ message: 'OTP sent to your email' });
//     } catch (err) {
//         console.error('Registration error:', err);
//         res.status(500).send({ message: 'Server error', error: err.message });
//     }
// });

// app.post('/api/user/verify-otp', [
//     body('email').isEmail().normalizeEmail().withMessage('Invalid email format'),
//     body('otp').trim().notEmpty().withMessage('OTP is required')
// ], async (req, res) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//         return res.status(400).send({ message: 'Validation failed', errors: errors.array() });
//     }

//     const { email, otp } = req.body;

//     try {
//         const user = await UserModel.findOne({ email }).lean();
//         if (!user) {
//             return res.status(404).send({ message: 'User not found' });
//         }

//         if (user.otp !== otp || user.otpExpires < Date.now()) {
//             return res.status(400).send({ message: 'Invalid or expired OTP' });
//         }

//         await UserModel.updateOne({ email }, { otp: null, otpExpires: null, isVerified: true });
//         res.status(200).send({ message: 'OTP verified successfully' });
//     } catch (err) {
//         console.log(err);
//         res.status(500).send({ message: 'Server error' });
//     }
// });

// app.post('/api/user/login', loginLimiter, [
//     body('email').isEmail().normalizeEmail().withMessage('Invalid email format'),
//     body('password').notEmpty().withMessage('Password is required')
// ], async (req, res) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//         return res.status(400).send({ message: 'Validation failed', errors: errors.array() });
//     }

//     const { email, password } = req.body;

//     try {
//         const user = await UserModel.findOne({ email }).lean();
//         if (!user || !user.isVerified) {
//             return res.status(401).send({ message: 'Invalid credentials or unverified account' });
//         }

//         const isMatch = await bcrypt.compare(password, user.password);
//         if (!isMatch) {
//             return res.status(401).send({ message: 'Invalid credentials' });
//         }

//         const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
//         res.status(200).send({ token });
//     } catch (err) {
//         console.log(err);
//         res.status(500).send({ message: 'Server error' });
//     }
// });

// app.get('/api/user/dashboard', authenticateToken, async (req, res) => {
//     try {
//         const user = await UserModel.findById(req.user.userId).select('-password -otp -otpExpires').lean();
//         const events = await DataRegisterModel.find({ $or: [{ email: user.email }, { 'teamMembers.email': user.email }] }).lean();
//         res.status(200).send({ user, events });
//     } catch (err) {
//         console.log(err);
//         res.status(500).send({ message: 'Server error' });
//     }
// });

// app.post('/api/register/check', authenticateToken, [
//     body('teamName').trim().notEmpty().withMessage('Team name is required'),
//     body('rollno').trim().notEmpty().withMessage('Roll number is required'),
//     body('college').trim().notEmpty().withMessage('College is required'),
//     body('course').trim().notEmpty().withMessage('Course is required'),
//     body('email').isEmail().normalizeEmail().withMessage('Invalid email format'),
// ], async (req, res) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//         return res.status(400).send({ message: 'Validation failed', errors: errors.array() });
//     }

//     const { teamName, rollno, college, course, email } = req.body;

//     try {
//         const existingRegistration = await DataRegisterModel.findOne({
//             $or: [
//                 { teamName },
//                 { rollno },
//                 { email },
//                 { $and: [{ college }, { course }, { email }] },
//                 { 'teamMembers.rollno': rollno },
//                 { 'teamMembers.email': email },
//             ],
//         }).lean();

//         if (existingRegistration) {
//             return res.status(409).send({ message: 'This team name, roll number, college, course, or email is already registered', isRegistered: true });
//         }

//         res.status(200).send({ isRegistered: false });
//     } catch (err) {
//         console.error('Check registration error:', err);
//         res.status(500).send({ message: 'Server error' });
//     }
// });

// app.post('/api/register', authenticateToken, upload.fields([
//     { name: "clg_id", maxCount: 1 },
//     ...Array.from({ length: 10 }, (_, i) => ({ name: `teamMembers[${i}][clg_id]`, maxCount: 1 }))
// ]), validateEventRegistration, async (req, res) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//         return res.status(400).send({ message: 'Validation failed', errors: errors.array() });
//     }

//     const { 
//         event,
//         teamName,
//         teamLeaderName,
//         email,
//         mobile,
//         gender,
//         college,
//         course,
//         year,
//         rollno,
//         teamSize,
//         teamMembers
//     } = req.body;

//     try {
//         // Validate existing registration
//         const findStudent = await DataRegisterModel.findOne({ 
//             $or: [
//                 { email },
//                 { mobile },
//                 { 'teamMembers.email': email },
//                 { rollno },
//                 { 'teamMembers.rollno': rollno },
//                 { teamName },
//                 { $and: [{ college }, { course }, { email }] },
//             ]
//         }).lean();
//         if (findStudent) {
//             return res.status(409).send({ message: "You or your team are already registered" });
//         }

//         // Validate files
//         if (!req.files || !req.files.clg_id) {
//             return res.status(400).send({ message: "College ID is required for team leader" });
//         }

//         // Prepare upload promises
//         const uploadPromises = [
//             { path: req.files.clg_id[0].path, public_id: uuidv4() + req.files.clg_id[0].originalname }
//         ];
//         const parsedTeamMembers = Array.isArray(teamMembers) ? teamMembers : [];
//         for (let index = 0; index < parsedTeamMembers.length; index++) {
//             if (!req.files[`teamMembers[${index}][clg_id]`]) {
//                 throw new Error(`College ID is required for team member ${index + 1}`);
//             }
//             uploadPromises.push({
//                 path: req.files[`teamMembers[${index}][clg_id]`][0].path,
//                 public_id: uuidv4() + req.files[`teamMembers[${index}][clg_id]`][0].originalname
//             });
//         }

//         // Parallel uploads with Promise.allSettled
//         const uploadResults = await Promise.allSettled(uploadPromises.map(({ path, public_id }) =>
//             cloudinary.uploader.upload(path, {
//                 public_id,
//                 resource_type: 'auto',
//                 timeout: 10000 // Timeout after 10 seconds
//             })
//         ));

//         // Handle upload results
//         const successfulUploads = uploadResults.map((result, index) => ({
//             index,
//             status: result.status,
//             value: result.status === 'fulfilled' ? result.value.secure_url : null,
//             reason: result.status === 'rejected' ? result.reason : null
//         }));

//         // Check for failed uploads
//         const failedUploads = successfulUploads.filter(upload => upload.status === 'rejected');
//         if (failedUploads.length > 0) {
//             console.error('Failed uploads:', failedUploads.map(upload => upload.reason));
//             throw new Error('One or more file uploads failed');
//         }

//         // Clean up files asynchronously
//         const cleanupPromises = uploadPromises.map(({ path }) => fsPromises.unlink(path).catch(err => console.log('Error deleting file:', err)));
//         await Promise.all(cleanupPromises);

//         // Assign URLs
//         const collegeIdUrl = successfulUploads[0].value;
//         const teamMemberUrls = successfulUploads.slice(1).map(upload => upload.value);

//         // Parse and validate team members
//         const uploadedTeamMembers = parsedTeamMembers.map((member, index) => ({
//             ...member,
//             clg_id: teamMemberUrls[index],
//             year: parseInt(member.year)
//         }));

//         const parsedTeamSize = Number(teamSize);
//         if (isNaN(parsedTeamSize) || parsedTeamSize < 0 || parsedTeamSize > 10) {
//             return res.status(400).send({ message: "Team size must be a number between 0 and 10" });
//         }

//         // Save to database
//         const newdata = new DataRegisterModel({
//             clg_id: collegeIdUrl,
//             registrationId: uuidv4(),
//             event,
//             teamName,
//             teamLeaderName,
//             email,
//             mobile: parseInt(mobile),
//             gender,
//             college,
//             course,
//             year: parseInt(year),
//             rollno,
//             teamSize: parsedTeamSize,
//             teamMembers: uploadedTeamMembers
//         });

//         const savedata = await newdata.save();
        
//         if (savedata) {
//             // Send confirmation emails asynchronously
//             sendConfirmationEmail(savedata).catch(err => console.error('Email sending failed:', err));

//             return res.status(201).send({
//                 message: `Congrats😀 ${teamName} Registered Successfully`,
//                 registrationId: savedata.registrationId,
//                 data: savedata
//             });
//         } else {
//             return res.status(400).send({ message: "Can't save data. Try again" });
//         }
//     } catch (err) {
//         console.error('Registration error:', err);
//         // Clean up any remaining files on error
//         const filesToDelete = [
//             req.files.clg_id?.[0]?.path,
//             ...parsedTeamMembers.map((_, index) => req.files[`teamMembers[${index}][clg_id]`]?.[0]?.path)
//         ].filter(Boolean);
//         await Promise.all(filesToDelete.map(file => fsPromises.unlink(file).catch(err => console.log('Error deleting file on error:', err))));
//         return res.status(500).send({ message: err.message || "Server error" });
//     }
// });

// app.get("/", (req, res) => {
//     res.send({"msg": "hi"});
// });

// const PORT = process.env.PORT || 5000; 
// app.listen(PORT, () => {
//     console.log(`Server running on PORT ${PORT}`);
// });
// NEW CODE 02-10-2025
// Optimized for speed: Removed image upload/Cloudinary for user reg
// Made OTP email async/non-blocking (fire-and-forget)
// Used lean() everywhere possible
// Aligned year validation to schema enum
const express = require("express");
const { default: mongoose } = require("mongoose");
require('dotenv').config();
const { getModel, events } = require("./Schema/schema.js"); // Adjusted import
const UserModel = require("./Schema/userSchema.js");
const app = express();
const cors = require("cors");
const multer = require("multer");
const { v4: uuidv4 } = require('uuid');
const cloudinary = require("cloudinary").v2;
const fs = require("fs"); // Import synchronous fs
const fsPromises = require("fs").promises; // Import fs.promises separately
const nodemailer = require('nodemailer');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const os = require('os');
const path = require('path');
const { body, validationResult } = require('express-validator');
const rateLimit = require('express-rate-limit');

app.set('trust proxy', 1);

const tmpDir = path.join(os.tmpdir(), 'Uploads');
if (!fs.existsSync(tmpDir)) {
  fs.mkdirSync(tmpDir, { recursive: true }); // Create Uploads directory if it doesn't exist
}

app.use(cors("*"));
app.use(express.json());
app.use(express.static('public', {
    setHeaders: (res, path) => {
      if (path.endsWith('.jsx')) {
        res.set('Content-Type', 'text/javascript');
      }
    }
}));
app.use(express.urlencoded({ extended: true }));

cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});

const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 5,
    message: 'Too many login attempts, please try again after 15 minutes'
});

const registerLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 5,
    message: 'Too many registration attempts, please try again after 1 hour'
});

const generateOTP = () =>
  Math.floor(100_000 + Math.random() * 900_000).toString();

const sendOTPEmail = async (email, otp) => {
 const mailHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Email Verification – CROSSROADS</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      background: #f2f4f8;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    }
    .email-wrapper {
      max-width: 600px;
      margin: 50px auto;
      background: #ffffff;
      border-radius: 14px;
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
      overflow: hidden;
    }
    .email-header {
      background: linear-gradient(135deg, #667eea, #764ba2);
      padding: 40px 30px;
      text-align: center;
      color: #ffffff;
    }
    .email-header h1 {
      margin: 0;
      font-size: 26px;
      font-weight: 700;
    }
    .email-header p {
      margin-top: 10px;
      font-size: 15.5px;
      opacity: 0.95;
    }
    .email-body {
      padding: 30px;
      color: #333;
    }
    .email-body p {
      font-size: 15.5px;
      line-height: 1.6;
      margin: 12px 0;
    }
    .otp-block {
      margin: 30px auto;
      background: #f4f7ff;
      border: 2px solid #cdd9ff;
      border-radius: 10px;
      text-align: center;
      padding: 20px;
      width: fit-content;
    }
    .otp-title {
      font-size: 14px;
      color: #666;
      margin-bottom: 8px;
    }
    .otp-code {
      font-size: 38px;
      letter-spacing: 10px;
      font-family: 'Courier New', monospace;
      font-weight: bold;
      color: #4a5fe1;
    }
    .security-note {
      font-size: 13.5px;
      color: #555;
      margin-top: 30px;
      line-height: 1.6;
    }
    .footer {
      background: #f9fafc;
      text-align: center;
      padding: 18px 30px;
      font-size: 12.5px;
      color: #888;
      border-top: 1px solid #e3e7ed;
    }
    .footer a {
      color: #667eea;
      text-decoration: none;
      font-weight: 500;
    }
  </style>
</head>
<body>
  <div class="email-wrapper">
    <div class="email-header">
      <h1>Verify Your Email</h1>
      <p>Welcome to CROSSROADS – Secure your account</p>
    </div>
    <div class="email-body">
      <p>Hello 👋,</p>
      <p>Thanks for signing up with CROSSROADS! To verify your email address, please use the following One-Time Password (OTP):</p>

      <div class="otp-block">
        <div class="otp-title">Your Verification Code</div>
        <div class="otp-code">${otp}</div>
      </div>

      <p class="security-note">
        ⏰ This code will expire in <strong>10 minutes</strong>.<br>
        🔐 For your security, <strong>never share</strong> this code with anyone—even CROSSROADS staff.<br>
        ❌ If you didn’t request this, you can safely ignore this email.
      </p>
    </div>
    <div class="footer">
      Need help? <a href="mailto:ag0567688@gmail.com">Contact Support</a><br />
      &copy; ${new Date().getFullYear()} CROSSROADS. All rights reserved.
    </div>
  </div>
</body>
</html>
`;


  try {
    await transporter.sendMail({
      from: `"CROSSROADS" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "🔐 Complete Your CROSSROADS Registration",
      html: mailHtml,
    });
    return true;
  } catch (err) {
    console.error("❌ Failed to send OTP email:", err);
    return false;
  }
};

module.exports = { generateOTP, sendOTPEmail };

const generateLeaderEmailTemplate = (userData) => {
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
                .team-members {
                    margin-top: 20px;
                }
                .team-members h3 {
                    color: #333;
                    border-bottom: 1px solid #007bff;
                    padding-bottom: 5px;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <h2 class="header">Registration Confirmation</h2>
                <div class="greeting">
                    <p>Dear ${userData.teamLeaderName},</p>
                    <p>I hope you're doing well! We're excited to inform you that you have successfully registered as the team leader for the HIET Ghaziabad Tech Event. Your registration details are provided below for your reference.</p>
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
                        <td>Team Size (Excluding Leader)</td>
                        <td>${userData.teamSize}</td>
                    </tr>
                </table>
                ${userData.teamMembers && userData.teamMembers.length > 0 ? `
                <div class="team-members">
                    <h3>Team Members</h3>
                    <table class="data-table">
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Course</th>
                            <th>Branch</th>
                            <th>Year</th>
                            <th>Roll No</th>
                        </tr>
                        ${userData.teamMembers.map(member => `
                        <tr>
                            <td>${member.name}</td>
                            <td>${member.email}</td>
                            <td>${member.course}</td>
                            <td>${member.branch}</td>
                            <td>${member.year}</td>
                            <td>${member.rollno}</td>
                        </tr>
                        `).join('')}
                    </table>
                </div>
                ` : ''}
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

const generateMemberEmailTemplate = (userData, member) => {
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
                    <p>Hello ${member.name},</p>
                    <p>We're excited to confirm that you have successfully registered as a team member for the HIET Ghaziabad Tech Event in the team "${userData.teamName}" led by ${userData.teamLeaderName}. Your registration details are provided below for your reference.</p>
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
                        <td>Your Name</td>
                        <td>${member.name}</td>
                    </tr>
                    <tr>
                        <td>Your Email</td>
                        <td>${member.email}</td>
                    </tr>
                    <tr>
                        <td>Your Course</td>
                        <td>${member.course}</td>
                    </tr>
                    <tr>
                        <td>Your Branch</td>
                        <td>${member.branch}</td>
                    </tr>
                    <tr>
                        <td>Your Year</td>
                        <td>${member.year}</td>
                    </tr>
                    <tr>
                        <td>Your Roll No</td>
                        <td>${member.rollno}</td>
                    </tr>
                    <tr>
                        <td>Team Size (Excluding Leader)</td>
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
        // Send email to team leader
        const leaderMailOptions = {
            from: `"Event Registration" <${process.env.EMAIL_USER}>`,
            to: userData.email,
            subject: `Registration Confirmation - ${userData.event}`,
            html: generateLeaderEmailTemplate(userData)
        };
        await transporter.sendMail(leaderMailOptions);

        // Send emails to team members
        for (const member of userData.teamMembers) {
            const memberMailOptions = {
                from: `"Event Registration" <${process.env.EMAIL_USER}>`,
                to: member.email,
                subject: `Registration Confirmation - ${userData.event}`,
                html: generateMemberEmailTemplate(userData, member)
            };
            await transporter.sendMail(memberMailOptions);
        }
        return true;
    } catch (error) {
        console.error('Error sending email:', error);
        return false;
    }
};

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

const connectiontodatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            maxPoolSize: 10,
            minPoolSize: 2,
            connectTimeoutMS: 10000,
        });
        console.log("YOUR DATABASE IS CONNECTED SUCCESSFULLY");   
    } catch(err) {
        console.log(err);
    }
};

connectiontodatabase();

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
    limits: { fileSize: 1000000 },
});

const validateUserRegistration = [
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('email').isEmail().normalizeEmail().withMessage('Invalid email format'),
    body('mobile').matches(/^[6-9][0-9]{9}$/).withMessage('Invalid mobile number'),
    body('college').trim().notEmpty().withMessage('College is required'),
    body('branch').trim().notEmpty().withMessage('Branch is required'),
    // Fixed: Convert string to int before validation
    body('year').trim().toInt().isInt({ min: 1, max: 4 }).withMessage('Year must be between 1 and 4'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
    // Removed image validation
];

const validateEventRegistration = [
    body('event').trim().notEmpty().withMessage('Event is required'),
    body('teamName').trim().notEmpty().withMessage('Team name is required'),
    body('teamLeaderName').trim().notEmpty().withMessage('Team leader name is required'),
    body('email').isEmail().normalizeEmail().withMessage('Invalid email format'),
    body('mobile').matches(/^[6-9][0-9]{9}$/).withMessage('Invalid mobile number'),
    body('gender').isIn(['male', 'female', 'other']).withMessage('Invalid gender'),
    body('college').trim().notEmpty().withMessage('College is required'),
    body('course').trim().notEmpty().withMessage('Course is required'),
    body('year').isInt({ min: 1, max: 12 }).withMessage('Year must be between 1 and 12'),
    body('rollno').trim().notEmpty().withMessage('Roll number is required'),
    body('teamSize').isInt({ min: 0, max: 10 }).withMessage('Team size must be between 0 and 10'),
    body('teamMembers.*.name').trim().notEmpty().withMessage('Team member name is required'),
    body('teamMembers.*.email').isEmail().normalizeEmail().withMessage('Invalid team member email format'),
    body('teamMembers.*.course').trim().notEmpty().withMessage('Team member course is required'),
    body('teamMembers.*.branch').trim().notEmpty().withMessage('Team member branch is required'),
    body('teamMembers.*.year').isInt({ min: 1, max: 12 }).withMessage('Team member year must be between 1 and 12'),
    body('teamMembers.*.rollno').trim().notEmpty().withMessage('Team member roll number is required'),
    // Removed teamMembers.*.clg_id validation
];

app.post('/api/user/register', registerLimiter, validateUserRegistration, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).send({ message: 'Validation failed', errors: errors.array() });
    }

    const { name, email, mobile, college, branch, year, password } = req.body;

    try {
        const existingUser = await UserModel.findOne({ email }).lean();
        if (existingUser) {
            return res.status(409).send({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const otp = generateOTP();

        const user = new UserModel({
            name,
            email,
            mobile,
            college,
            branch,
            year: parseInt(year),
            password: hashedPassword,
            otp,
            otpExpires: Date.now() + 10 * 60 * 1000,
        });

        await user.save();

        // Send OTP email asynchronously (non-blocking for speed)
        sendOTPEmail(email, otp).catch(err => console.error('Failed to send OTP email:', err));

        res.status(201).send({ message: 'OTP sent to your email' });
    } catch (err) {
        console.error('Registration error:', err);
        res.status(500).send({ message: 'Server error', error: err.message });
    }
});

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
        const user = await UserModel.findOne({ email }).lean();
        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }

        if (user.otp !== otp || user.otpExpires < Date.now()) {
            return res.status(400).send({ message: 'Invalid or expired OTP' });
        }

        await UserModel.updateOne({ email }, { otp: null, otpExpires: null, isVerified: true });
        res.status(200).send({ message: 'OTP verified successfully' });
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: 'Server error' });
    }
});

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
        const user = await UserModel.findOne({ email }).lean();
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

app.get('/api/user/dashboard', authenticateToken, async (req, res) => {
    try {
        const user = await UserModel.findById(req.user.userId).select('-password -otp -otpExpires').lean();
        // Query across all event collections
        const eventsData = await Promise.all(events.map(async (e) => {
            const Model = getModel(e);
            return await Model.find({ $or: [{ email: user.email }, { 'teamMembers.email': user.email }] }).lean();
        }));
        const allEvents = [].concat(...eventsData);
        res.status(200).send({ user, events: allEvents });
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: 'Server error' });
    }
});

app.post('/api/register/check', authenticateToken, [
    body('teamName').trim().notEmpty().withMessage('Team name is required'),
    body('rollno').trim().notEmpty().withMessage('Roll number is required'),
    body('college').trim().notEmpty().withMessage('College is required'),
    body('course').trim().notEmpty().withMessage('Course is required'),
    body('email').isEmail().normalizeEmail().withMessage('Invalid email format'),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).send({ message: 'Validation failed', errors: errors.array() });
    }

    const { teamName, rollno, college, course, email } = req.body;

    try {
        // Check across all event collections
        const checks = await Promise.all(events.map(async (e) => {
            const Model = getModel(e);
            return await Model.findOne({
                $or: [
                    { teamName },
                    { rollno },
                    { email },
                    { $and: [{ college }, { course }, { email }] },
                    { 'teamMembers.rollno': rollno },
                    { 'teamMembers.email': email },
                ],
            }).lean();
        }));
        const existingRegistration = checks.find(check => check);
        if (existingRegistration) {
            return res.status(409).send({ message: 'This team name, roll number, college, course, or email is already registered', isRegistered: true });
        }

        res.status(200).send({ isRegistered: false });
    } catch (err) {
        console.error('Check registration error:', err);
        res.status(500).send({ message: 'Server error' });
    }
});

app.post('/api/register', authenticateToken, upload.single('clg_id'), validateEventRegistration, async (req, res) => { // Changed to single upload for leader only
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
        teamSize,
        teamMembers
    } = req.body;

    try {
        // Validate existing registration across all events
        const checks = await Promise.all(events.map(async (e) => {
            const Model = getModel(e);
            return await Model.findOne({ 
                $or: [
                    { email },
                    { mobile },
                    { 'teamMembers.email': email },
                    { rollno },
                    { 'teamMembers.rollno': rollno },
                    { teamName },
                    { $and: [{ college }, { course }, { email }] },
                ]
            }).lean();
        }));
        const findStudent = checks.find(check => check);
        if (findStudent) {
            return res.status(409).send({ message: "You or your team are already registered" });
        }

        // Validate files - only leader
        if (!req.file) {
            return res.status(400).send({ message: "College ID is required for team leader" });
        }

        // Upload leader clg_id
        const uploadResult = await cloudinary.uploader.upload(req.file.path, {
            public_id: uuidv4() + req.file.originalname,
            resource_type: 'auto',
            timeout: 10000
        });

        // Clean up file
        await fsPromises.unlink(req.file.path).catch(err => console.log('Error deleting file:', err));

        const collegeIdUrl = uploadResult.secure_url;

        // Parse and validate team members (no clg_id)
        const parsedTeamMembers = Array.isArray(teamMembers) ? teamMembers : [];
        const uploadedTeamMembers = parsedTeamMembers.map((member) => ({
            ...member,
            year: parseInt(member.year)
        }));

        const parsedTeamSize = Number(teamSize);
        if (isNaN(parsedTeamSize) || parsedTeamSize < 0 || parsedTeamSize > 10) {
            return res.status(400).send({ message: "Team size must be a number between 0 and 10" });
        }

        // Get event-specific model
        const Model = getModel(event);

        // Save to database
        const newdata = new Model({
            clg_id: collegeIdUrl,
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
            teamSize: parsedTeamSize,
            teamMembers: uploadedTeamMembers
        });

        const savedata = await newdata.save();
        
        if (savedata) {
            // Send confirmation emails asynchronously
            sendConfirmationEmail(savedata).catch(err => console.error('Email sending failed:', err));

            return res.status(201).send({
                message: `Congrats😀 ${teamName} Registered Successfully`,
                registrationId: savedata.registrationId,
                data: savedata
            });
        } else {
            return res.status(400).send({ message: "Can't save data. Try again" });
        }
    } catch (err) {
        console.error('Registration error:', err);
        // Clean up on error
        if (req.file) {
            await fsPromises.unlink(req.file.path).catch(err => console.log('Error deleting file on error:', err));
        }
        return res.status(500).send({ message: err.message || "Server error" });
    }
});

app.get("/", (req, res) => {
    res.send({"msg": "hi"});
});

const PORT = process.env.PORT || 5000; 
app.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT}`);
});


// Optimized for speed: Removed image upload/Cloudinary for user reg
// Enhanced email logging + test endpoint
// Temporarily sync email for debugging (switch to async later)
