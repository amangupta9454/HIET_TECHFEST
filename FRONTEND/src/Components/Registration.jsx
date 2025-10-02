// // new code 1 aug
// import { useState, useEffect } from 'react';

// const Registration = () => {
//     const [user, setUser] = useState({
//         event: "",
//         teamName: "",
//         teamLeaderName: "",
//         email: "",
//         mobile: "",
//         gender: "",
//         college: "",
//         course: "",
//         year: "",
//         rollno: "",
//         clg_id: null,
//         teamSize: "",
//         teamMembers: [],
//         registrationId: "",
//     });
//     const [errors, setErrors] = useState({});
//     const [success, setSuccess] = useState('');
//     const [loading, setLoading] = useState(false);
//     const baseUrl = import.meta.env.VITE_BACKEND_URL;

//     useEffect(() => {
//         const token = localStorage.getItem('token');
//         if (token) {
//             fetchUserData(token);
//         }
//     }, []);

//     const fetchUserData = async (token) => {
//         try {
//             const response = await fetch(`${baseUrl}/api/user/dashboard`, {
//                 headers: { Authorization: `Bearer ${token}` },
//             });
//             const data = await response.json();
//             if (response.ok) {
//                 setUser((prev) => ({ ...prev, email: data.user.email, mobile: data.user.mobile }));
//             } else {
//                 setErrors({ general: data.message || 'Failed to fetch user data' });
//                 localStorage.removeItem('token');
//             }
//         } catch {
//             setErrors({ general: 'Server error. Please try again.' });
//         }
//     };

//     const validateField = (name, value, index = null) => {
//         let error = '';
//         const requiredFields = [
//             'event', 'teamName', 'teamLeaderName', 'email', 'mobile', 'gender',
//             'college', 'course', 'year', 'rollno', 'teamSize'
//         ];

//         if (requiredFields.includes(name) && !value) {
//             error = `${name.charAt(0).toUpperCase() + name.slice(1).replace(/([A-Z])/g, ' $1').trim()} is required`;
//         } else if (name === 'teamSize' && value) {
//             const num = parseInt(value);
//             if (isNaN(num) || num < 0 || num > 10) {
//                 error = 'Team size must be between 0 and 10';
//             }
//         } else if (name === 'clg_id' && value && value.size > 1000000) {
//             error = 'College ID image must be less than 1MB';
//         } else if (name === 'mobile' && value && !/^[6-9][0-9]{9}$/.test(value)) {
//             error = 'Mobile number must be a valid 10-digit number starting with 6-9';
//         } else if (name === 'email' && value && !/^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/.test(value)) {
//             error = 'Invalid email format';
//         } else if (name.includes('teamMembers') && index !== null) {
//             const fieldName = name.split('.')[1];
//             if (['name', 'email', 'course', 'branch', 'year', 'rollno'].includes(fieldName) && !value) {
//                 error = `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} is required for team member ${index + 1}`;
//             } else if (fieldName === 'email' && value && !/^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/.test(value)) {
//                 error = `Invalid email format for team member ${index + 1}`;
//             } else if (fieldName === 'clg_id' && value && value.size > 1000000) {
//                 error = `College ID image must be less than 1MB for team member ${index + 1}`;
//             }
//         }

//         return error;
//     };

//     const handleChange = (e, index = null) => {
//         const { name, value, files } = e.target;
//         let newValue = files ? files[0] : value;

//         if (index !== null) {
//             setUser((prev) => {
//                 const updatedMembers = [...prev.teamMembers];
//                 updatedMembers[index] = { ...updatedMembers[index], [name]: newValue };
//                 return { ...prev, teamMembers: updatedMembers };
//             });
//             const error = validateField(`teamMembers.${name}`, newValue, index);
//             setErrors((prev) => ({
//                 ...prev,
//                 [`teamMembers.${index}.${name}`]: error,
//                 general: prev.general && !error ? '' : prev.general,
//             }));
//         } else {
//             if (name === 'teamSize') {
//                 const num = parseInt(value) || 0;
//                 setUser((prev) => ({
//                     ...prev,
//                     teamSize: value,
//                     teamMembers: Array(num).fill().map((_, i) => prev.teamMembers[i] || {
//                         name: '', email: '', course: '', branch: '', year: '', rollno: '', clg_id: null
//                     }),
//                 }));
//             } else if (name === 'course') {
//                 setUser((prev) => ({
//                     ...prev,
//                     course: value,
//                     year: value === 'school' ? '' : prev.year,
//                 }));
//             } else {
//                 setUser((prev) => ({
//                     ...prev,
//                     [name]: newValue,
//                 }));
//             }
//             const error = validateField(name, newValue);
//             setErrors((prev) => ({
//                 ...prev,
//                 [name]: error,
//                 general: prev.general && !error ? '' : prev.general,
//             }));
//         }
//     };

//     const validateForm = () => {
//         const newErrors = {};
//         Object.keys(user).forEach((key) => {
//             if (key !== 'registrationId' && key !== 'teamMembers') {
//                 const error = validateField(key, user[key]);
//                 if (error) {
//                     newErrors[key] = error;
//                 }
//             }
//         });

//         if (!user.clg_id) {
//             newErrors.clg_id = 'College ID is required';
//         }

//         user.teamMembers.forEach((member, index) => {
//             ['name', 'email', 'course', 'branch', 'year', 'rollno'].forEach((field) => {
//                 const error = validateField(`teamMembers.${field}`, member[field], index);
//                 if (error) {
//                     newErrors[`teamMembers.${index}.${field}`] = error;
//                 }
//             });
//             if (!member.clg_id) {
//                 newErrors[`teamMembers.${index}.clg_id`] = `College ID is required for team member ${index + 1}`;
//             }
//         });

//         setErrors(newErrors);
//         return Object.keys(newErrors).length === 0;
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setErrors({ general: '' });
//         setSuccess('');
//         setLoading(true);

//         if (!validateForm()) {
//             setErrors((prev) => ({
//                 ...prev,
//                 general: 'Please correct the errors in the form',
//             }));
//             setLoading(false);
//             return;
//         }

//         const token = localStorage.getItem('token');
//         if (!token) {
//             setErrors({ general: 'You must be logged in to register' });
//             setLoading(false);
//             return;
//         }

//         try {
//             const checkResponse = await fetch(`${baseUrl}/api/register/check`, {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     'Authorization': `Bearer ${token}`,
//                 },
//                 body: JSON.stringify({
//                     teamName: user.teamName,
//                     rollno: user.rollno,
//                     college: user.college,
//                     course: user.course,
//                     email: user.email,
//                 }),
//             });

//             const checkData = await checkResponse.json();
//             if (!checkResponse.ok) {
//                 setErrors({ general: checkData.message || checkData.errors?.map(e => e.msg).join(', ') || 'Registration check failed' });
//                 setLoading(false);
//                 return;
//             }

//             if (checkData.isRegistered) {
//                 setErrors({ general: 'This team name, team leader roll number, college, course, or email is already registered for an event' });
//                 setLoading(false);
//                 return;
//             }

//             const formData = new FormData();
//             Object.keys(user).forEach((key) => {
//                 if (key === 'teamMembers') {
//                     user.teamMembers.forEach((member, index) => {
//                         Object.keys(member).forEach((field) => {
//                             if (member[field]) {
//                                 formData.append(`teamMembers[${index}][${field}]`, member[field]);
//                             }
//                         });
//                     });
//                 } else if (user[key]) {
//                     formData.append(key, user[key]);
//                 }
//             });

//             const response = await fetch(`${baseUrl}/api/register`, {
//                 method: 'POST',
//                 headers: {
//                     'Authorization': `Bearer ${token}`,
//                 },
//                 body: formData,
//             });

//             const data = await response.json();
//             if (response.ok) {
//                 setSuccess('Registration successful!');
//                 setUser({
//                     event: "",
//                     teamName: "",
//                     teamLeaderName: "",
//                     email: user.email,
//                     mobile: user.mobile,
//                     gender: "",
//                     college: "",
//                     course: "",
//                     year: "",
//                     rollno: "",
//                     clg_id: null,
//                     teamSize: "",
//                     teamMembers: [],
//                     registrationId: "",
//                 });
//                 setErrors({});
//             } else {
//                 setErrors({ general: data.message || data.errors?.map(e => e.msg).join(', ') || 'Registration failed' });
//             }
//         } catch (err) {
//             setErrors({ general: 'Something went wrong. Please try again.' });
//             console.error('Fetch error:', err);
//         } finally {
//             setLoading(false);
//         }
//     };

//     const getYearOptions = (course) => {
//         if (course === 'school') {
//             return [
//                 { value: "", label: "Select year" },
//                 { value: "9", label: "9" },
//                 { value: "10", label: "10" },
//                 { value: "11", label: "11" },
//                 { value: "12", label: "12" },
//             ];
//         }
//         return [
//             { value: "", label: "Select year" },
//             { value: "1", label: "1" },
//             { value: "2", label: "2" },
//             { value: "3", label: "3" },
//             { value: "4", label: "4" },
//         ];
//     };

//     return (
//         <div className="min-h-screen relative overflow-hidden">
//             <div className="absolute inset-0 bg-gradient-to-br from-[#1a1033] via-[#0d1b38] to-[#2a0a4d] bg-[length:200%_200%] animate-background"></div>
//             <div className="relative z-0 flex items-center justify-center p-6 min-h-screen">
//                 <div className="w-full max-w-3xl bg-white/10 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/40 p-12 hover:shadow-[0_0_80px_rgba(147,51,234,0.6)] transition-all duration-700">
//                     <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-indigo-200 to-blue-300 text-center mb-12 tracking-widest drop-shadow-lg">
//                         EVENT REGISTRATION
//                     </h1>

//                     {errors.general && (
//                         <div className="bg-red-700/40 text-red-100 p-5 rounded-2xl mb-8 text-center border border-red-600/70 shadow-inner">
//                             {errors.general}
//                         </div>
//                     )}
//                     {success && (
//                         <div className="bg-green-700/40 text-green-100 p-5 rounded-2xl mb-8 text-center border border-green-600/70 shadow-inner">
//                             {success}
//                         </div>
//                     )}

//                     <form onSubmit={handleSubmit} className="space-y-10">
//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
//                             {[
//                                 {
//                                     label: "Event",
//                                     name: "event",
//                                     type: "select",
//                                     options: [
//                                         { value: "", label: "Select your Event" },
//                                         { value: "robo-race", label: "ROBO RACE" },
//                                         { value: "project-exhibition", label: "PROJECT EXHIBITION" },
//                                         { value: "cultural", label: "CULTURAL EVENT" },
//                                         { value: "dance", label: "DANCE COMPETITION" },
//                                         { value: "code", label: "CODE PUZZLE" },
//                                         { value: "nukad", label: "NUKKAD NATAK" },
//                                         { value: "singing", label: "SINGING COMPETITION" },
//                                         { value: "admad", label: "AD-MAD SHOW" },
//                                     ],
//                                 },
//                                 { label: "Team Name", name: "teamName", type: "text", placeholder: "Enter team name" },
//                                 { label: "Team Leader Name", name: "teamLeaderName", type: "text", placeholder: "Enter team leader name" },
//                                 { label: "Email", name: "email", type: "email", placeholder: "Enter email", disabled: true },
//                                 { label: "Mobile Number", name: "mobile", type: "tel", placeholder: "Enter mobile number" },
//                                 {
//                                     label: "Gender",
//                                     name: "gender",
//                                     type: "select",
//                                     options: [
//                                         { value: "", label: "Select gender" },
//                                         { value: "male", label: "Male" },
//                                         { value: "female", label: "Female" },
//                                         { value: "other", label: "Other" },
//                                     ],
//                                 },
//                                 {
//                                     label: "College",
//                                     name: "college",
//                                     type: "select",
//                                     options: [
//                                         { value: "", label: "Select your College" },
//                                         { value: "ABESIT", label: "ABESIT,Ghaziabad" },
//                                         { value: "ims", label: "IMS Engineering College,Ghaziabad" },
//                                         { value: "abesec", label: "ABES Engineering College,Ghaziabad" },
//                                         { value: "akg", label: "AKGEC,Ghaziabad" },
//                                         { value: "jss", label: "JSS Noida" },
//                                         { value: "rkgit", label: "RKGIT,Ghaziabad" },
//                                         { value: "gl", label: "GL Bajaj,Noida" },
//                                         { value: "HIET", label: "HI-TECH INSTITUTE OF ENGINEERING AND TECHNOLOGY GHAZIABAD" },
//                                         { value: "niet", label: "NIET" },
//                                         { value: "gniot", label: "GNIOT" },
//                                         { value: "galgotiacollege", label: "GALGOTIAS UNIVERSITY" },
//                                         { value: "galgotia", label: "GALGOTIAS COLLEGE" },
//                                         { value: "kiet", label: "KIET" },
//                                         { value: "bg", label: "Bhagwati Institute of Technology" },
//                                         { value: "hr", label: "H.R. Group of Institutions" },
//                                         { value: "inm", label: "INMANTEC Institutions" },
//                                         { value: "dps", label: "Delhi Public School (DPS), Ghaziabad" },
//                                         { value: "kend", label: "Kendriya Vidyalaya, Ghaziabad" },
//                                         { value: "other", label: "OTHER" },
//                                     ],
//                                 },
//                                 {
//                                     label: "Course",
//                                     name: "course",
//                                     type: "select",
//                                     options: [
//                                         { value: "", label: "Select your Course" },
//                                         { value: "school", label: "School Student (9-12)" },
//                                         { value: "btech", label: "B.Tech" },
//                                         { value: "bca", label: "BCA" },
//                                         { value: "bba", label: "BBA" },
//                                         { value: "bpharma", label: "B.PHARMA" },
//                                         { value: "mtech", label: "M.TECH" },
//                                         { value: "mca", label: "MCA" },
//                                         { value: "mba", label: "MBA" },
//                                         { value: "inter", label: "INTERMEDIATE" },
//                                         { value: "other", label: "OTHER" },
//                                     ],
//                                 },
//                                 {
//                                     label: "Year",
//                                     name: "year",
//                                     type: "select",
//                                     options: getYearOptions(user.course),
//                                 },
//                                 {
//                                     label: "Team Size (Excluding Leader)",
//                                     name: "teamSize",
//                                     type: "select",
//                                     options: [
//                                         { value: "", label: "Select team size" },
//                                         ...Array.from({ length: 11 }, (_, i) => ({
//                                             value: `${i}`,
//                                             label: `${i}`
//                                         }))
//                                     ],
//                                 },
//                                 { label: "University Roll No", name: "rollno", type: "text", placeholder: "Enter roll number" },
//                                 { label: "College ID (Max 1MB)", name: "clg_id", type: "file" },
//                             ].map((field) => (
//                                 <div key={field.name} className="space-y-4">
//                                     <label className="text-white font-bold tracking-wider drop-shadow-lg">{field.label}</label>
//                                     {field.type === "select" ? (
//                                         <select
//                                             name={field.name}
//                                             value={user[field.name]}
//                                             onChange={handleChange}
//                                             className={`w-full p-5 rounded-2xl bg-gradient-to-r from-white/15 to-white/25 text-white border ${errors[field.name] ? 'border-red-500' : 'border-white/50'} focus:ring-4 focus:ring-purple-600/60 focus:border-purple-500 hover:bg-white/40 transition-all duration-300 shadow-lg`}
//                                         >
//                                             {field.options.map((opt) => (
//                                                 <option key={opt.value} value={opt.value} className="bg-indigo-900 text-white">
//                                                     {opt.label}
//                                                 </option>
//                                             ))}
//                                         </select>
//                                     ) : field.type === "file" ? (
//                                         <input
//                                             type="file"
//                                             name={field.name}
//                                             onChange={handleChange}
//                                             accept="image/jpeg,image/jpg,image/png,application/pdf"
//                                             className={`w-full p-5 rounded-2xl bg-gradient-to-r from-white/15 to-white/25 text-white border ${errors[field.name] ? 'border-red-500' : 'border-white/50'} file:mr-8 file:py-4 file:px-8 file:rounded-2xl file:border-0 file:bg-gradient-to-r file:from-purple-700 file:to-indigo-700 file:text-white hover:file:bg-gradient-to-r hover:file:from-purple-800 hover:file:to-indigo-800 transition-all duration-300 shadow-lg`}
//                                         />
//                                     ) : (
//                                         <input
//                                             type={field.type}
//                                             name={field.name}
//                                             value={field.type === "number" ? user[field.name] || "" : user[field.name]}
//                                             onChange={handleChange}
//                                             placeholder={field.placeholder}
//                                             disabled={field.disabled}
//                                             className={`w-full p-5 rounded-2xl bg-gradient-to-r from-white/15 to-white/25 text-white border ${errors[field.name] ? 'border-red-500' : 'border-white/50'} focus:ring-4 focus:ring-purple-600/60 focus:border-purple-500 hover:bg-white/40 transition-all duration-300 shadow-lg disabled:bg-gray-600/50 disabled:cursor-not-allowed`}
//                                         />
//                                     )}
//                                     {errors[field.name] && (
//                                         <p className="text-red-400 text-sm mt-1">{errors[field.name]}</p>
//                                     )}
//                                 </div>
//                             ))}
//                         </div>

//                         {user.teamMembers.map((member, index) => (
//                             <div key={index} className="space-y-10 border-t border-white/20 pt-8 mt-8">
//                                 <h2 className="text-2xl font-bold text-white">Team Member {index + 1}</h2>
//                                 <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
//                                     {[
//                                         { label: "Name", name: "name", type: "text", placeholder: `Enter team member ${index + 1} name` },
//                                         { label: "Email", name: "email", type: "email", placeholder: `Enter team member ${index + 1} email` },
//                                         {
//                                             label: "Course",
//                                             name: "course",
//                                             type: "select",
//                                             options: [
//                                                 { value: "", label: "Select course" },
//                                                 { value: "school", label: "School Student (9-12)" },
//                                                 { value: "btech", label: "B.Tech" },
//                                                 { value: "bca", label: "BCA" },
//                                                 { value: "bba", label: "BBA" },
//                                                 { value: "bpharma", label: "B.PHARMA" },
//                                                 { value: "mtech", label: "M.TECH" },
//                                                 { value: "mca", label: "MCA" },
//                                                 { value: "mba", label: "MBA" },
//                                                 { value: "inter", label: "INTERMEDIATE" },
//                                                 { value: "other", label: "OTHER" },
//                                             ],
//                                         },
//                                         { label: "Branch", name: "branch", type: "text", placeholder: `Enter team member ${index + 1} branch` },
//                                         {
//                                             label: "Year",
//                                             name: "year",
//                                             type: "select",
//                                             options: getYearOptions(member.course),
//                                         },
//                                         { label: "Roll No", name: "rollno", type: "text", placeholder: `Enter team member ${index + 1} roll number` },
//                                         { label: `College ID (Max 1MB)`, name: "clg_id", type: "file" },
//                                     ].map((field) => (
//                                         <div key={field.name} className="space-y-4">
//                                             <label className="text-white font-bold tracking-wider drop-shadow-lg">{field.label}</label>
//                                             {field.type === "select" ? (
//                                                 <select
//                                                     name={field.name}
//                                                     value={member[field.name] || ""}
//                                                     onChange={(e) => handleChange(e, index)}
//                                                     className={`w-full p-5 rounded-2xl bg-gradient-to-r from-white/15 to-white/25 text-white border ${errors[`teamMembers.${index}.${field.name}`] ? 'border-red-500' : 'border-white/50'} focus:ring-4 focus:ring-purple-600/60 focus:border-purple-500 hover:bg-white/40 transition-all duration-300 shadow-lg`}
//                                                 >
//                                                     {field.options.map((opt) => (
//                                                         <option key={opt.value} value={opt.value} className="bg-indigo-900 text-white">
//                                                             {opt.label}
//                                                         </option>
//                                                     ))}
//                                                 </select>
//                                             ) : field.type === "file" ? (
//                                                 <input
//                                                     type="file"
//                                                     name={field.name}
//                                                     onChange={(e) => handleChange(e, index)}
//                                                     accept="image/jpeg,image/jpg,image/png,application/pdf"
//                                                     className={`w-full p-5 rounded-2xl bg-gradient-to-r from-white/15 to-white/25 text-white border ${errors[`teamMembers.${index}.${field.name}`] ? 'border-red-500' : 'border-white/50'} file:mr-8 file:py-4 file:px-8 file:rounded-2xl file:border-0 file:bg-gradient-to-r file:from-purple-700 file:to-indigo-700 file:text-white hover:file:bg-gradient-to-r hover:file:from-purple-800 hover:file:to-indigo-800 transition-all duration-300 shadow-lg`}
//                                                 />
//                                             ) : (
//                                                 <input
//                                                     type={field.type}
//                                                     name={field.name}
//                                                     value={member[field.name] || ""}
//                                                     onChange={(e) => handleChange(e, index)}
//                                                     placeholder={field.placeholder}
//                                                     className={`w-full p-5 rounded-2xl bg-gradient-to-r from-white/15 to-white/25 text-white border ${errors[`teamMembers.${index}.${field.name}`] ? 'border-red-500' : 'border-white/50'} focus:ring-4 focus:ring-purple-600/60 focus:border-purple-500 hover:bg-white/40 transition-all duration-300 shadow-lg`}
//                                                 />
//                                             )}
//                                             {errors[`teamMembers.${index}.${field.name}`] && (
//                                                 <p className="text-red-400 text-sm mt-1">{errors[`teamMembers.${index}.${field.name}`]}</p>
//                                             )}
//                                         </div>
//                                     ))}
//                                 </div>
//                             </div>
//                         ))}

//                         <div className="text-center">
//                             <button
//                                 type="submit"
//                                 disabled={loading}
//                                 className="px-12 py-5 bg-gradient-to-r from-purple-700 to-indigo-700 text-white font-bold rounded-2xl shadow-lg hover:from-purple-800 hover:to-indigo-800 hover:shadow-[0_0_25px_rgba(147,51,234,0.8)] transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center mx-auto"
//                             >
//                                 {loading ? (
//                                     <svg
//                                         className="animate-spin h-6 w-6 mr-2 text-white"
//                                         xmlns="http://www.w3.org/2000/svg"
//                                         fill="none"
//                                         viewBox="0 0 24 24"
//                                     >
//                                         <circle
//                                             className="opacity-25"
//                                             cx="12"
//                                             cy="12"
//                                             r="10"
//                                             stroke="currentColor"
//                                             strokeWidth="4"
//                                         ></circle>
//                                         <path
//                                             className="opacity-75"
//                                             fill="currentColor"
//                                             d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                                         ></path>
//                                     </svg>
//                                 ) : null}
//                                 {loading ? 'Registering...' : 'Register Now'}
//                             </button>
//                         </div>
//                     </form>
//                 </div>
//             </div>
//             <style>
//                 {`
//                     @keyframes background {
//                         0% { background-position: 0% 50%; }
//                         50% { background-position: 100% 50%; }
//                         100% { background-position: 0% 50%; }
//                     }
//                     .animate-background {
//                         animation: background 15s ease infinite;
//                     }
//                 `}
//             </style>
//         </div>
//     );
// };

// export default Registration;
// NEW CODE 02-10-2025
// Updated: Removed clg_id file input and validation for team members
import { useState, useEffect } from 'react';

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
        teamSize: "",
        teamMembers: [],
        registrationId: "",
    });
    const [errors, setErrors] = useState({});
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);
    const baseUrl = import.meta.env.VITE_BACKEND_URL;

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            fetchUserData(token);
        }
    }, []);

    const fetchUserData = async (token) => {
        try {
            const response = await fetch(`${baseUrl}/api/user/dashboard`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            const data = await response.json();
            if (response.ok) {
                setUser((prev) => ({ ...prev, email: data.user.email, mobile: data.user.mobile }));
            } else {
                setErrors({ general: data.message || 'Failed to fetch user data' });
                localStorage.removeItem('token');
            }
        } catch {
            setErrors({ general: 'Server error. Please try again.' });
        }
    };

    const validateField = (name, value, index = null) => {
        let error = '';
        const requiredFields = [
            'event', 'teamName', 'teamLeaderName', 'email', 'mobile', 'gender',
            'college', 'course', 'year', 'rollno', 'teamSize'
        ];

        if (requiredFields.includes(name) && !value) {
            error = `${name.charAt(0).toUpperCase() + name.slice(1).replace(/([A-Z])/g, ' $1').trim()} is required`;
        } else if (name === 'teamSize' && value) {
            const num = parseInt(value);
            if (isNaN(num) || num < 0 || num > 10) {
                error = 'Team size must be between 0 and 10';
            }
        } else if (name === 'clg_id' && value && value.size > 1000000) {
            error = 'College ID image must be less than 1MB';
        } else if (name === 'mobile' && value && !/^[6-9][0-9]{9}$/.test(value)) {
            error = 'Mobile number must be a valid 10-digit number starting with 6-9';
        } else if (name === 'email' && value && !/^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/.test(value)) {
            error = 'Invalid email format';
        } else if (name.includes('teamMembers') && index !== null) {
            const fieldName = name.split('.')[1];
            if (['name', 'email', 'course', 'branch', 'year', 'rollno'].includes(fieldName) && !value) {
                error = `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} is required for team member ${index + 1}`;
            } else if (fieldName === 'email' && value && !/^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/.test(value)) {
                error = `Invalid email format for team member ${index + 1}`;
            }
            // Removed clg_id validation for members
        }

        return error;
    };

    const handleChange = (e, index = null) => {
        const { name, value, files } = e.target;
        let newValue = files ? files[0] : value;

        if (index !== null) {
            setUser((prev) => {
                const updatedMembers = [...prev.teamMembers];
                updatedMembers[index] = { ...updatedMembers[index], [name]: newValue };
                return { ...prev, teamMembers: updatedMembers };
            });
            const error = validateField(`teamMembers.${name}`, newValue, index);
            setErrors((prev) => ({
                ...prev,
                [`teamMembers.${index}.${name}`]: error,
                general: prev.general && !error ? '' : prev.general,
            }));
        } else {
            if (name === 'teamSize') {
                const num = parseInt(value) || 0;
                setUser((prev) => ({
                    ...prev,
                    teamSize: value,
                    teamMembers: Array(num).fill().map((_, i) => prev.teamMembers[i] || {
                        name: '', email: '', course: '', branch: '', year: '', rollno: ''
                        // Removed clg_id
                    }),
                }));
            } else if (name === 'course') {
                setUser((prev) => ({
                    ...prev,
                    course: value,
                    year: value === 'school' ? '' : prev.year,
                }));
            } else {
                setUser((prev) => ({
                    ...prev,
                    [name]: newValue,
                }));
            }
            const error = validateField(name, newValue);
            setErrors((prev) => ({
                ...prev,
                [name]: error,
                general: prev.general && !error ? '' : prev.general,
            }));
        }
    };

    const validateForm = () => {
        const newErrors = {};
        Object.keys(user).forEach((key) => {
            if (key !== 'registrationId' && key !== 'teamMembers') {
                const error = validateField(key, user[key]);
                if (error) {
                    newErrors[key] = error;
                }
            }
        });

        if (!user.clg_id) {
            newErrors.clg_id = 'College ID is required';
        }

        user.teamMembers.forEach((member, index) => {
            ['name', 'email', 'course', 'branch', 'year', 'rollno'].forEach((field) => {
                const error = validateField(`teamMembers.${field}`, member[field], index);
                if (error) {
                    newErrors[`teamMembers.${index}.${field}`] = error;
                }
            });
            // Removed member.clg_id check
        });

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({ general: '' });
        setSuccess('');
        setLoading(true);

        if (!validateForm()) {
            setErrors((prev) => ({
                ...prev,
                general: 'Please correct the errors in the form',
            }));
            setLoading(false);
            return;
        }

        const token = localStorage.getItem('token');
        if (!token) {
            setErrors({ general: 'You must be logged in to register' });
            setLoading(false);
            return;
        }

        try {
            const checkResponse = await fetch(`${baseUrl}/api/register/check`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({
                    teamName: user.teamName,
                    rollno: user.rollno,
                    college: user.college,
                    course: user.course,
                    email: user.email,
                }),
            });

            const checkData = await checkResponse.json();
            if (!checkResponse.ok) {
                setErrors({ general: checkData.message || checkData.errors?.map(e => e.msg).join(', ') || 'Registration check failed' });
                setLoading(false);
                return;
            }

            if (checkData.isRegistered) {
                setErrors({ general: 'This team name, team leader roll number, college, course, or email is already registered for an event' });
                setLoading(false);
                return;
            }

            const formData = new FormData();
            Object.keys(user).forEach((key) => {
                if (key === 'teamMembers') {
                    user.teamMembers.forEach((member, index) => {
                        Object.keys(member).forEach((field) => {
                            if (member[field]) {
                                formData.append(`teamMembers[${index}][${field}]`, member[field]);
                            }
                        });
                    });
                } else if (user[key]) {
                    formData.append(key, user[key]);
                }
            });

            const response = await fetch(`${baseUrl}/api/register`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                body: formData,
            });

            const data = await response.json();
            if (response.ok) {
                setSuccess('Registration successful!');
                setUser({
                    event: "",
                    teamName: "",
                    teamLeaderName: "",
                    email: user.email,
                    mobile: user.mobile,
                    gender: "",
                    college: "",
                    course: "",
                    year: "",
                    rollno: "",
                    clg_id: null,
                    teamSize: "",
                    teamMembers: [],
                    registrationId: "",
                });
                setErrors({});
            } else {
                setErrors({ general: data.message || data.errors?.map(e => e.msg).join(', ') || 'Registration failed' });
            }
        } catch (err) {
            setErrors({ general: 'Something went wrong. Please try again.' });
            console.error('Fetch error:', err);
        } finally {
            setLoading(false);
        }
    };

    const getYearOptions = (course) => {
        if (course === 'school') {
            return [
                { value: "", label: "Select year" },
                { value: "9", label: "9" },
                { value: "10", label: "10" },
                { value: "11", label: "11" },
                { value: "12", label: "12" },
            ];
        }
        return [
            { value: "", label: "Select year" },
            { value: "1", label: "1" },
            { value: "2", label: "2" },
            { value: "3", label: "3" },
            { value: "4", label: "4" },
        ];
    };

    return (
        <div className="min-h-screen relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-[#1a1033] via-[#0d1b38] to-[#2a0a4d] bg-[length:200%_200%] animate-background"></div>
            <div className="relative z-0 flex items-center justify-center p-6 min-h-screen">
                <div className="w-full max-w-3xl bg-white/10 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/40 p-12 hover:shadow-[0_0_80px_rgba(147,51,234,0.6)] transition-all duration-700">
                    <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-indigo-200 to-blue-300 text-center mb-12 tracking-widest drop-shadow-lg">
                        EVENT REGISTRATION
                    </h1>

                    {errors.general && (
                        <div className="bg-red-700/40 text-red-100 p-5 rounded-2xl mb-8 text-center border border-red-600/70 shadow-inner">
                            {errors.general}
                        </div>
                    )}
                    {success && (
                        <div className="bg-green-700/40 text-green-100 p-5 rounded-2xl mb-8 text-center border border-green-600/70 shadow-inner">
                            {success}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-10">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                            {[
                                {
                                    label: "Event",
                                    name: "event",
                                    type: "select",
                                    options: [
                                        { value: "", label: "Select your Event" },
                                        { value: "robo-race", label: "ROBO RACE" },
                                        { value: "project-exhibition", label: "PROJECT EXHIBITION" },
                                        { value: "cultural", label: "CULTURAL EVENT" },
                                        { value: "dance", label: "DANCE COMPETITION" },
                                        { value: "code", label: "CODE PUZZLE" },
                                        { value: "nukad", label: "NUKKAD NATAK" },
                                        { value: "singing", label: "SINGING COMPETITION" },
                                        { value: "admad", label: "AD-MAD SHOW" },
                                    ],
                                },
                                { label: "Team Name", name: "teamName", type: "text", placeholder: "Enter team name" },
                                { label: "Team Leader Name", name: "teamLeaderName", type: "text", placeholder: "Enter team leader name" },
                                { label: "Email", name: "email", type: "email", placeholder: "Enter email", disabled: true },
                                { label: "Mobile Number", name: "mobile", type: "tel", placeholder: "Enter mobile number" },
                                {
                                    label: "Gender",
                                    name: "gender",
                                    type: "select",
                                    options: [
                                        { value: "", label: "Select gender" },
                                        { value: "male", label: "Male" },
                                        { value: "female", label: "Female" },
                                        { value: "other", label: "Other" },
                                    ],
                                },
                                {
                                    label: "College",
                                    name: "college",
                                    type: "select",
                                    options: [
                                        { value: "", label: "Select your College" },
                                        { value: "ABESIT", label: "ABESIT,Ghaziabad" },
                                        { value: "ims", label: "IMS Engineering College,Ghaziabad" },
                                        { value: "abesec", label: "ABES Engineering College,Ghaziabad" },
                                        { value: "akg", label: "AKGEC,Ghaziabad" },
                                        { value: "jss", label: "JSS Noida" },
                                        { value: "rkgit", label: "RKGIT,Ghaziabad" },
                                        { value: "gl", label: "GL Bajaj,Noida" },
                                        { value: "HIET", label: "HI-TECH INSTITUTE OF ENGINEERING AND TECHNOLOGY GHAZIABAD" },
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
                                    ],
                                },
                                {
                                    label: "Course",
                                    name: "course",
                                    type: "select",
                                    options: [
                                        { value: "", label: "Select your Course" },
                                        { value: "school", label: "School Student (9-12)" },
                                        { value: "btech", label: "B.Tech" },
                                        { value: "bca", label: "BCA" },
                                        { value: "bba", label: "BBA" },
                                        { value: "bpharma", label: "B.PHARMA" },
                                        { value: "mtech", label: "M.TECH" },
                                        { value: "mca", label: "MCA" },
                                        { value: "mba", label: "MBA" },
                                        { value: "inter", label: "INTERMEDIATE" },
                                        { value: "other", label: "OTHER" },
                                    ],
                                },
                                {
                                    label: "Year",
                                    name: "year",
                                    type: "select",
                                    options: getYearOptions(user.course),
                                },
                                {
                                    label: "Team Size (Excluding Leader)",
                                    name: "teamSize",
                                    type: "select",
                                    options: [
                                        { value: "", label: "Select team size" },
                                        ...Array.from({ length: 11 }, (_, i) => ({
                                            value: `${i}`,
                                            label: `${i}`
                                        }))
                                    ],
                                },
                                { label: "University Roll No", name: "rollno", type: "text", placeholder: "Enter roll number" },
                                { label: "College ID (Max 1MB)", name: "clg_id", type: "file" },
                            ].map((field) => (
                                <div key={field.name} className="space-y-4">
                                    <label className="text-white font-bold tracking-wider drop-shadow-lg">{field.label}</label>
                                    {field.type === "select" ? (
                                        <select
                                            name={field.name}
                                            value={user[field.name]}
                                            onChange={handleChange}
                                            className={`w-full p-5 rounded-2xl bg-gradient-to-r from-white/15 to-white/25 text-white border ${errors[field.name] ? 'border-red-500' : 'border-white/50'} focus:ring-4 focus:ring-purple-600/60 focus:border-purple-500 hover:bg-white/40 transition-all duration-300 shadow-lg`}
                                        >
                                            {field.options.map((opt) => (
                                                <option key={opt.value} value={opt.value} className="bg-indigo-900 text-white">
                                                    {opt.label}
                                                </option>
                                            ))}
                                        </select>
                                    ) : field.type === "file" ? (
                                        <input
                                            type="file"
                                            name={field.name}
                                            onChange={handleChange}
                                            accept="image/jpeg,image/jpg,image/png,application/pdf"
                                            className={`w-full p-5 rounded-2xl bg-gradient-to-r from-white/15 to-white/25 text-white border ${errors[field.name] ? 'border-red-500' : 'border-white/50'} file:mr-8 file:py-4 file:px-8 file:rounded-2xl file:border-0 file:bg-gradient-to-r file:from-purple-700 file:to-indigo-700 file:text-white hover:file:bg-gradient-to-r hover:file:from-purple-800 hover:file:to-indigo-800 transition-all duration-300 shadow-lg`}
                                        />
                                    ) : (
                                        <input
                                            type={field.type}
                                            name={field.name}
                                            value={field.type === "number" ? user[field.name] || "" : user[field.name]}
                                            onChange={handleChange}
                                            placeholder={field.placeholder}
                                            disabled={field.disabled}
                                            className={`w-full p-5 rounded-2xl bg-gradient-to-r from-white/15 to-white/25 text-white border ${errors[field.name] ? 'border-red-500' : 'border-white/50'} focus:ring-4 focus:ring-purple-600/60 focus:border-purple-500 hover:bg-white/40 transition-all duration-300 shadow-lg disabled:bg-gray-600/50 disabled:cursor-not-allowed`}
                                        />
                                    )}
                                    {errors[field.name] && (
                                        <p className="text-red-400 text-sm mt-1">{errors[field.name]}</p>
                                    )}
                                </div>
                            ))}
                        </div>

                        {user.teamMembers.map((member, index) => (
                            <div key={index} className="space-y-10 border-t border-white/20 pt-8 mt-8">
                                <h2 className="text-2xl font-bold text-white">Team Member {index + 1}</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                    {[
                                        { label: "Name", name: "name", type: "text", placeholder: `Enter team member ${index + 1} name` },
                                        { label: "Email", name: "email", type: "email", placeholder: `Enter team member ${index + 1} email` },
                                        {
                                            label: "Course",
                                            name: "course",
                                            type: "select",
                                            options: [
                                                { value: "", label: "Select course" },
                                                { value: "school", label: "School Student (9-12)" },
                                                { value: "btech", label: "B.Tech" },
                                                { value: "bca", label: "BCA" },
                                                { value: "bba", label: "BBA" },
                                                { value: "bpharma", label: "B.PHARMA" },
                                                { value: "mtech", label: "M.TECH" },
                                                { value: "mca", label: "MCA" },
                                                { value: "mba", label: "MBA" },
                                                { value: "inter", label: "INTERMEDIATE" },
                                                { value: "other", label: "OTHER" },
                                            ],
                                        },
                                        { label: "Branch", name: "branch", type: "text", placeholder: `Enter team member ${index + 1} branch` },
                                        {
                                            label: "Year",
                                            name: "year",
                                            type: "select",
                                            options: getYearOptions(member.course),
                                        },
                                        { label: "Roll No", name: "rollno", type: "text", placeholder: `Enter team member ${index + 1} roll number` },
                                        // Removed college ID file input for members
                                    ].map((field) => (
                                        <div key={field.name} className="space-y-4">
                                            <label className="text-white font-bold tracking-wider drop-shadow-lg">{field.label}</label>
                                            {field.type === "select" ? (
                                                <select
                                                    name={field.name}
                                                    value={member[field.name] || ""}
                                                    onChange={(e) => handleChange(e, index)}
                                                    className={`w-full p-5 rounded-2xl bg-gradient-to-r from-white/15 to-white/25 text-white border ${errors[`teamMembers.${index}.${field.name}`] ? 'border-red-500' : 'border-white/50'} focus:ring-4 focus:ring-purple-600/60 focus:border-purple-500 hover:bg-white/40 transition-all duration-300 shadow-lg`}
                                                >
                                                    {field.options.map((opt) => (
                                                        <option key={opt.value} value={opt.value} className="bg-indigo-900 text-white">
                                                            {opt.label}
                                                        </option>
                                                    ))}
                                                </select>
                                            ) : (
                                                <input
                                                    type={field.type}
                                                    name={field.name}
                                                    value={member[field.name] || ""}
                                                    onChange={(e) => handleChange(e, index)}
                                                    placeholder={field.placeholder}
                                                    className={`w-full p-5 rounded-2xl bg-gradient-to-r from-white/15 to-white/25 text-white border ${errors[`teamMembers.${index}.${field.name}`] ? 'border-red-500' : 'border-white/50'} focus:ring-4 focus:ring-purple-600/60 focus:border-purple-500 hover:bg-white/40 transition-all duration-300 shadow-lg`}
                                                />
                                            )}
                                            {errors[`teamMembers.${index}.${field.name}`] && (
                                                <p className="text-red-400 text-sm mt-1">{errors[`teamMembers.${index}.${field.name}`]}</p>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}

                        <div className="text-center">
                            <button
                                type="submit"
                                disabled={loading}
                                className="px-12 py-5 bg-gradient-to-r from-purple-700 to-indigo-700 text-white font-bold rounded-2xl shadow-lg hover:from-purple-800 hover:to-indigo-800 hover:shadow-[0_0_25px_rgba(147,51,234,0.8)] transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center mx-auto"
                            >
                                {loading ? (
                                    <svg
                                        className="animate-spin h-6 w-6 mr-2 text-white"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <circle
                                            className="opacity-25"
                                            cx="12"
                                            cy="12"
                                            r="10"
                                            stroke="currentColor"
                                            strokeWidth="4"
                                        ></circle>
                                        <path
                                            className="opacity-75"
                                            fill="currentColor"
                                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                        ></path>
                                    </svg>
                                ) : null}
                                {loading ? 'Registering...' : 'Register Now'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <style>
                {`
                    @keyframes background {
                        0% { background-position: 0% 50%; }
                        50% { background-position: 100% 50%; }
                        100% { background-position: 0% 50%; }
                    }
                    .animate-background {
                        animation: background 15s ease infinite;
                    }
                `}
            </style>
        </div>
    );
};

export default Registration;