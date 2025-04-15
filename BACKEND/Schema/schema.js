const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
    "clg_id": {               // ✅ Store file path
        type: String,         
        required: true
    },
    "registrationId": {
        type: String,
        required: true,
        unique: true
    },
    "event": {
        type: String,
        required: true
    },
    "teamName": {
        type: String,
        required: true
    },
    "teamLeaderName": {
        type: String,
        required: true
    },
    "email": {
        type: String,
        required: true,
        match: /^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/
    },
    "mobile": {
        type: String,            // ✅ Use String for mobile
        required: true,
        match: /^[6-9][0-9]{9}$/
    },
    "gender": {
        type: String,
        enum: ['male', 'female', 'other'],
        required: true
    },
    "college": {
        type: String,
        required: true
    },
    "course": {
        type: String,
        required: true
    },
    "year": {
        type: Number,
        required: true,
        enum: [1, 2, 3, 4]
    },
    "rollno": {
        type: String,
        required: true
    },
    "aadhar": {
        type: String,
        required: true,
        match: /^[0-9]{12}$/
    },
    "teamSize": {
        type: String,
        required: true,
        min: 1,
        max: 4
    },
    "aadharImage":{
        type:String,
        required:true
    }
}, { timestamps: true });

const Model = mongoose.model("DataRegister", Schema);
module.exports = Model;