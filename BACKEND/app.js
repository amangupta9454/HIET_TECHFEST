const express = require("express");
const { default: mongoose } = require("mongoose");
require('dotenv').config();
const Model = require("./Schema/schema.js");
const app = express();
const cors = require("cors");
const multer = require("multer");
const { v4: uuidv4 } = require('uuid');
const cloudinary = require("cloudinary").v2;
const fs = require("fs");
const nodemailer = require('nodemailer');

app.use(cors({
    origin: "*"
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Cloudinary Configuration with .env


// Email functionality
const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// Function to generate email template using schema fields only
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

// Function to send confirmation email
const sendConfirmationEmail = async (userData) => {
    try {
        const mailOptions = {
            from: `"Event Registration" <${process.env.EMAIL_USER}>`,
            to: userData.email,
            subject: `Registration Confirmation - ${userData.event}`,
            html: generateEmailTemplate(userData)
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent: ' + info.messageId);
        return true;
    } catch (error) {
        console.error('Error sending email:', error);
        return false;
    }
};

app.get("/", (req, res) => {
    res.send({"msg": "hi"});
});

const PORT = process.env.PORT || 5000; 
app.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT}`);
});

const connectiontodatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("YOUR DATABASE IS CONNECTED SUCCESSFULLY");   
    } catch(err) {
        console.log(err);
    }
};

connectiontodatabase();
// cloudinary

cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});

// Image storage configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {

        cb(null, '/tmp');
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

// Unique public id in cloudinary
const randoms = uuidv4();
const randoms2 = uuidv4();

app.post('/api/register', upload.fields([
    { name: "clg_id" },
    { name: "aadharImage" }
]), async (req, res) => {
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

    console.log(req.body);

    try {   
        if (!email || !mobile || !event || !teamName || !teamLeaderName || !college || !course || !year || !aadhar || !rollno || !gender || !teamSize) {
            console.log("Missing required fields");
            return res.status(400).send({ "message": "Missing required fields" });
        }

        const findStudent = await Model.findOne({ email, mobile });
        if (findStudent) {
            return res.status(409).send({ "message": "You are already registered" });
        }

        console.log(req.files);
        if (!req.files || !req.files.clg_id || !req.files.aadharImage) {
            console.log("can't receive files. Check that you have sent both the files");
            return res.status(400).send({ "message": "can't receive files. Check that you have sent both the files" });
        }

        const uploadResultcollegeId = await cloudinary.uploader.upload(
            req.files.clg_id[0].path, {
                public_id: randoms + "" + req.files.clg_id[0].originalname,
            }
        );

        console.log(uploadResultcollegeId);
        if (!uploadResultcollegeId) {
            console.log("can't upload image try again");
            return res.status(400).send({ "message": "can't upload college ID image try again" });
        }

        const uploadResultaadharcard = await cloudinary.uploader.upload(
            req.files.aadharImage[0].path, {
                public_id: randoms2 + "" + req.files.aadharImage[0].originalname,
            }
        );

        console.log(uploadResultaadharcard);
        if (!uploadResultaadharcard) {
            console.log("can't upload aadhar image try again");
            return res.status(400).send({ "message": "can't upload aadhar image try again" });
        }

        fs.unlink(req.files.clg_id[0].path, (err) => {
            if (!err) {
                console.log("college id file deleted");
            } else {
                console.log("error in deleting file college id");
            }
        });

        fs.unlink(req.files.aadharImage[0].path, (err) => {
            if (!err) {
                console.log("aadhar card file deleted");
            } else {
                console.log("error in deleting file aadhar card");
            }
        });

        const newdata = await new Model({
            "clg_id": uploadResultcollegeId.secure_url,
            "registrationId": uuidv4(),
            "event": event,
            "teamName": teamName,
            "teamLeaderName": teamLeaderName,
            "email": email,
            "mobile": parseInt(mobile),
            "gender": gender,
            "college": college,
            "course": course,
            "year": parseInt(year),
            "rollno": rollno,
            "aadhar": aadhar,
            "teamSize": parseInt(teamSize),
            "aadharImage": uploadResultaadharcard.secure_url
        });

        const savedata = await newdata.save();
        if (savedata) {
            // Call the email sending function here
            const emailSent = await sendConfirmationEmail(savedata);
            if (!emailSent) {
                console.log("Email sending failed, but registration successful");
            }

            return res.status(201).send({
                "message": `Congrats😀 ${teamName} Registered Successfully`,
                "registrationId": savedata.registrationId,
                "data": savedata
            });
        } else {
            return res.status(400).send({ "message": "can't save data. Try again" });
        }
    } catch (err) {
        console.log(err);
        return res.status(500).send({ "message": "Server error" });
    }
});