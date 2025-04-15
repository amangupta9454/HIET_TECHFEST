/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';

const Registration = () => {
    const [user, setUser] = useState({
        event: "",
        teamName: "",
        teamLeaderName: "",
        email: "",
        mobile: "",
        gender: "",
        college: "",
        course: "",
        year: "",
        rollno: "",
        clg_id: null,
        aadhar: "",
        teamSize: "",
        aadharImage: null,
        registrationId: "",
    });

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        // GSAP background animation
        gsap.to('.background-overlay', {
            background: 'linear-gradient(45deg, #1a1033, #0d1b38, #2a0a4d, #1a1033)',
            backgroundSize: '200% 200%',
            duration: 15,
            repeat: -1,
            yoyo: true,
            ease: 'linear',
        });

        // Shine effect for button
        gsap.to('.button-shine', {
            xPercent: 200,
            duration: 2,
            repeat: -1,
            ease: 'linear',
        });
    }, []);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (files) {
            setUser(prev => ({
                ...prev,
                [name]: files[0]
            }));
        } else {
            setUser(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
    
        if (!user.event || !user.teamName || !user.teamLeaderName || !user.email) {
            setError('Please fill all required fields');
            return;
        }

        const formData = new FormData();
        Object.keys(user).forEach(key => {
            if (user[key]) {
                formData.append(key, user[key]);
            }
        });
        const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';
        const url = `${baseUrl}/api/register`;
        console.log('Raw VITE_BACKEND_URL:', import.meta.env.VITE_BACKEND_URL);
        console.log('Using URL:', url);

        try {
            const response = await fetch(url, {
                method: 'POST',
                body: formData,
            });
        
            const data = await response.json();
            if (response.ok) {
                setSuccess('Registration successful!');
                setUser({
                    event: "",
                    teamName: "",
                    teamLeaderName: "",
                    email: "",
                    mobile: "",
                    gender: "",
                    college: "",
                    course: "",
                    year: "",
                    rollno: "",
                    clg_id: null,
                    aadhar: "",
                    teamSize: "",
                    aadharImage: null,
                    registrationId: "",
                });
            } else {
                setError(data.message || 'Registration failed');
            }
        } catch (err) {
            setError('Something went wrong. Please try again.');
            console.error('Fetch error:', err);
        } 
    };

    return (
        <div className="min-h-screen relative overflow-hidden">
            <div 
                className="background-overlay absolute inset-0" 
                style={{ 
                    background: 'linear-gradient(45deg, #1a1033, #0d1b38, #2a0a4d, #1a1033)', 
                    backgroundSize: '200% 200%' 
                }}
            ></div>
            <div className="relative z-0 flex items-center justify-center p-6 min-h-screen">
                <motion.div 
                    initial={{ opacity: 0, scale: 0.85, rotate: -5 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                    className="registration-container max-w-3xl w-full bg-gradient-to-br from-white/10 to-white/20 backdrop-blur-2xl rounded-3xl shadow-[0_0_50px_rgba(147,51,234,0.4)] p-12 border border-white/40 hover:shadow-[0_0_80px_rgba(147,51,234,0.6)] transition-all duration-700"
                    onMouseEnter={() => gsap.to('.registration-container', { rotate: 1, scale: 1, duration: 0.8 })}
                    onMouseLeave={() => gsap.to('.registration-container', { rotate: 0, scale: 1, duration: 0.8 })}
                >
                    <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-indigo-200 to-blue-300 text-center mt-8 mb-12 md:mt-12 md:mb-16 tracking-widest drop-shadow-[0_4px_8px_rgba(0,0,0,0.5)]">EVENT REGISTRATION </h1>
    
                    {error && (
                        <motion.div
                            initial={{ opacity: 0, y: -30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="error-message bg-red-700/40 text-red-100 p-5 rounded-2xl mb-8 text-center border border-red-600/70 shadow-[inset_0_0_15px_rgba(255,0,0,0.3)]"
                        >
                            {error}
                        </motion.div>
                    )}
                    {success && (
                        <motion.div
                            initial={{ opacity: 0, y: -30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="success-message bg-green-700/40 text-green-100 p-5 rounded-2xl mb-8 text-center border border-green-600/70 shadow-[inset_0_0_15px_rgba(0,255,0,0.3)]"
                        >
                            {success}
                        </motion.div>
                    )}
    
                    <form onSubmit={handleSubmit} className="space-y-10">
                        <div className="form-section grid grid-cols-1 md:grid-cols-2 gap-10">
                            {[
                                { label: "Event", name: "event", type: "select", options: [
                                    { value: "", label: "Select your Event" },
                                    { value: "robo-race", label: "ROBO RACE" },
                                    { value: "project-exhibition", label: "PROJECT EXHIBITION" },
                                    { value: "cultural", label: "CULTURAL EVENT" },
                                    { value: "dance", label: "DANCE COMPETITION" },
                                    { value: "code", label: "CODE PUZZLE" },
                                    { value: "nukad", label: "NUKKAD NATAK" },
                                    { value: "singing", label: "SINGING COMPETITION" },
                                    { value: "admad", label: "AD-MAD SHOW" },
                                ]},
                                { label: "Team Name", name: "teamName", type: "text", placeholder: "Enter team name" },
                                { label: "Team Leader Name", name: "teamLeaderName", type: "text", placeholder: "Enter team leader name" },
                                { label: "Email", name: "email", type: "email", placeholder: "Enter email" },
                                { label: "Mobile Number", name: "mobile", type: "tel", placeholder: "Enter mobile number" },
                                { label: "Gender", name: "gender", type: "select", options: [
                                    { value: "", label: "Select gender" },
                                    { value: "male", label: "Male" },
                                    { value: "female", label: "Female" },
                                    { value: "other", label: "Other" },
                                ]},
                                { label: "College", name: "college", type: "select", options: [
                                    { value: "", label: "Select your College" },
                                    { value: "ABESIT", label: "ABESIT,Ghaziabad" },
                                    { value: "ims", label: "IMS Engineering College,Ghaziabad" },
                                    { value: "abesec", label: "ABES Engineering College,Ghaziabad" },
                                    { value: "akg", label: "AKGEC,Ghaziabad" },
                                    { value: "jss", label: "JSS Noida" },
                                    { value: "rkgit", label: "RKGIT,Ghaziabad" },
                                    { value: "gl", label: "GL Bajaj,Noida" },
                                    { value: "HIET  ", label: "HI-TECH INSTITUTE OF ENGINEERING AND TECHNOLOGY GHAZIABAD" },
                                    { value: "niet", label: "NIET" },
                                    { value: "gniot", label: "GNIOT" },
                                    { value: "galgotiacollege", label: "GALGOTIAS UNIVERSITY" },
                                    { value: "galgotia", label: "GALGOTIAS COLLEGE" },
                                    { value: "kiet", label: "KIET" },
                                    { value: "bg", label: "Bhagwati Institute of Technology" },
                                    { value: "hr", label: "H.R. Group of Institutions" },
                                    { value: "inm", label: "INMANTEC Institutions" },
                                    { value: "dps", label: "Delhi Public School (DPS), Ghaziabad" },
                                    { value: "kend", label: "Kendriya Vidyalaya, Ghaziabad" },
                                    { value: "other", label: "OTHER" },
                                ]},
                                { label: "Course", name: "course", type: "select", options: [
                                    { value: "", label: "Select your Course" },
                                    { value: "btech", label: "B.Tech" },
                                    { value: "bca", label: "BCA" },
                                    { value: "bba", label: "BBA" },
                                    { value: "bpharma", label: "B.PHARMA" },
                                    { value: "mtech", label: "M.TECH" },
                                    { value: "mca", label: "MCA" },
                                    { value: "mba", label: " MBA" },
                                    { value: "inter", label: "INTERMEDIATE" },
                                    { value: "high", label: "HIGH SCHOOL" },
                                    { value: "other", label: "OTHER" },
                                ]},
                                { label: "Year", name: "year", type: "select", options: [
                                    { value: "", label: "Select year" },
                                    { value: "1", label: "1" },
                                    { value: "2", label: "2" },
                                    { value: "3", label: "3" },
                                    { value: "4", label: "4" },
                                ]},
                                { label: "Team Size", name: "teamSize", type: "number", placeholder: "Enter team size" },
                                { label: "University Roll No", name: "rollno", type: "text", placeholder: "Enter roll number" },
                                { label: "Aadhar Number", name: "aadhar", type: "text", placeholder: "Enter 12-digit Aadhar number" },
                            ].map((field) => (
                                <motion.div
                                    key={field.name}
                                    className="form-group space-y-4"
                                    whileHover={{ y: -8, scale: 1.02 }}
                                    transition={{ duration: 0.4 }}
                                >
                                    <label className="text-white font-bold tracking-wider drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">{field.label}</label>
                                    {field.type === "select" ? (
                                        <select
                                            name={field.name}
                                            value={user[field.name]}
                                            onChange={handleChange}
                                            className="w-full p-5 rounded-2xl bg-gradient-to-r from-white/15 to-white/25 text-white border border-white/50 focus:ring-4 focus:ring-purple-600/60 focus:border-purple-500 transition-all duration-700 hover:bg-white/40 shadow-[0_4px_15px_rgba(0,0,0,0.2)]"
                                        >
                                            {field.options.map(opt => (
                                                <option key={opt.value} value={opt.value} className="bg-indigo-900/95 text-white">
                                                    {opt.label}
                                                </option>
                                            ))}
                                        </select>
                                    ) : (
                                        <input
                                            type={field.type}
                                            name={field.name}
                                            value={user[field.name]}
                                            onChange={handleChange}
                                            placeholder={field.placeholder}
                                            className="w-full p-5 rounded-2xl bg-gradient-to-r from-white/15 to-white/25 text-white border border-white/50 focus:ring-4 focus:ring-purple-600/60 focus:border-purple-500 transition-all duration-700 hover:bg-white/40 placeholder-white/70 shadow-[0_4px_15px_rgba(0,0,0,0.2)]"
                                        />
                                    )}
                                </motion.div>
                            ))}
                        </div>
    
                        <div className="form-section space-y-10">
                            {[
                                { label: "Aadhar Card (Max 300KB)", name: "aadharImage" },
                                { label: "College ID (Max 300KB)", name: "clg_id" },
                            ].map((field) => (
                                <motion.div
                                    key={field.name}
                                    className="form-group space-y-4"
                                    whileHover={{ y: -8, scale: 1.02 }}
                                    transition={{ duration: 0.4 }}
                                >
                                    <label className="text-white font-bold tracking-wider drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">{field.label}</label>
                                    <input
                                        type="file"
                                        name={field.name}
                                        onChange={handleChange}
                                        accept="image/jpeg,image/jpg,image/png,application/pdf"
                                        className="w-full p-5 rounded-2xl bg-gradient-to-r from-white/15 to-white/25 text-white border border-white/50 file:mr-8 file:py-4 file:px-8 file:rounded-2xl file:border-0 file:bg-gradient-to-r file:from-purple-700 file:to-indigo-700 file:text-white hover:file:from-purple-800 hover:file:to-indigo-800 transition-all duration-700 shadow-[0_4px_15px_rgba(0,0,0,0.2)]"
                                    />
                                </motion.div>
                            ))}
                        </div>
    
                        <div className="text-center">
                            <motion.button
                                type="submit"
                                whileHover={{ scale: 1.15, boxShadow: "0 0 25px rgba(147, 51, 234, 0.8)" }}
                                whileTap={{ scale: 0.9 }}
                                className="relative px-12 py-5 bg-gradient-to-r from-purple-700 to-indigo-700 text-white font-bold rounded-2xl shadow-[0_0_20px_rgba(147,51,234,0.5)] hover:from-purple-800 hover:to-indigo-800 transition-all duration-500 overflow-hidden"
                            >
                                <span className="relative z-0">Register Now</span>
                                <span 
                                    className="button-shine absolute top-0 left-[-100%] w-1/3 h-full bg-gradient-to-r from-transparent via-white/30 to-transparent" 
                                    style={{ transform: 'skewX(-20deg)' }}
                                ></span>
                            </motion.button>
                        </div>
                    </form>
                </motion.div>
            </div>
        </div>
    );
};

export default Registration;