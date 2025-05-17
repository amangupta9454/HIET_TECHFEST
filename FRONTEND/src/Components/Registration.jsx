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
//         aadhar: "",
//         teamSize: "",
//         aadharImage: null,
//         registrationId: "",
//     });
//     const [error, setError] = useState('');
//     const [success, setSuccess] = useState('');
//     const baseUrl = import.meta.env.VITE_BACKEND_URL;

//     useEffect(() => {
//         // Fetch user data to prefill email
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
//                 setError(data.message || 'Failed to fetch user data');
//                 localStorage.removeItem('token');
//             }
//         } catch (err) {
//             setError('Server error. Please try again.');
//         }
//     };

//     const handleChange = (e) => {
//         const { name, value, files } = e.target;
//         setUser((prev) => ({
//             ...prev,
//             [name]: files ? files[0] : value,
//         }));
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setError('');
//         setSuccess('');

//         if (!user.event || !user.teamName || !user.teamLeaderName || !user.email || !user.mobile || !user.gender || !user.college || !user.course || !user.year || !user.rollno || !user.aadhar || !user.teamSize || !user.clg_id || !user.aadharImage) {
//             setError('Please fill all required fields');
//             return;
//         }

//         const token = localStorage.getItem('token');
//         if (!token) {
//             setError('You must be logged in to register');
//             return;
//         }

//         // Check for existing registration with rollno, teamLeaderName, or aadhar
//         try {
//             const checkResponse = await fetch(`${baseUrl}/api/register/check`, {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     'Authorization': `Bearer ${token}`,
//                 },
//                 body: JSON.stringify({
//                     rollno: user.rollno,
//                     teamLeaderName: user.teamLeaderName,
//                     aadhar: user.aadhar,
//                 }),
//             });

//             const checkData = await checkResponse.json();
//             if (!checkResponse.ok) {
//                 setError(checkData.message || 'Registration check failed');
//                 return;
//             }

//             if (checkData.isRegistered) {
//                 setError('This roll number, team leader name, or Aadhar number is already registered for an event');
//                 return;
//             }
//         } catch (err) {
//             setError('Error checking registration status. Please try again.');
//             return;
//         }

//         const formData = new FormData();
//         Object.keys(user).forEach((key) => {
//             if (user[key]) {
//                 formData.append(key, user[key]);
//             }
//         });

//         try {
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
//                     email: user.email, // Retain email
//                     mobile: user.mobile, // Retain mobile number
//                     gender: "",
//                     college: "",
//                     course: "",
//                     year: "",
//                     rollno: "",
//                     clg_id: null,
//                     aadhar: "",
//                     teamSize: "",
//                     aadharImage: null,
//                     registrationId: "",
//                 });
//             } else {
//                 setError(data.message || 'Registration failed');
//             }
//         } catch (err) {
//             setError('Something went wrong. Please try again.');
//             console.error('Fetch error:', err);
//         }
//     };

//     return (
//         <div className="min-h-screen relative overflow-hidden">
//             <div className="absolute inset-0 bg-gradient-to-br from-[#1a1033] via-[#0d1b38] to-[#2a0a4d] bg-[length:200%_200%] animate-background"></div>
//             <div className="relative z-0 flex items-center justify-center p-6 min-h-screen">
//                 <div className="w-full max-w-3xl bg-white/10 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/40 p-12 hover:shadow-[0_0_80px_rgba(147,51,234,0.6)] transition-all duration-700">
//                     <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-indigo-200 to-blue-300 text-center mb-12 tracking-widest drop-shadow-lg">
//                         EVENT REGISTRATION
//                     </h1>

//                     {error && (
//                         <div
//                             className="bg-red-700/40 text-red-100 p-5 rounded-2xl mb-8 text-center border border-red-600/70 shadow-inner"
//                         >
//                             {error}
//                         </div>
//                     )}
//                     {success && (
//                         <div
//                             className="bg-green-700/40 text-green-100 p-5 rounded-2xl mb-8 text-center border border-green-600/70 shadow-inner"
//                         >
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
//                                         { value: "btech", label: "B.Tech" },
//                                         { value: "bca", label: "BCA" },
//                                         { value: "bba", label: "BBA" },
//                                         { value: "bpharma", label: "B.PHARMA" },
//                                         { value: "mtech", label: "M.TECH" },
//                                         { value: "mca", label: "MCA" },
//                                         { value: "mba", label: " MBA" },
//                                         { value: "inter", label: "INTERMEDIATE" },
//                                         { value: "high", label: "HIGH SCHOOL" },
//                                         { value: "other", label: "OTHER" },
//                                     ],
//                                 },
//                                 {
//                                     label: "Year",
//                                     name: "year",
//                                     type: "select",
//                                     options: [
//                                         { value: "", label: "Select year" },
//                                         { value: "1", label: "1" },
//                                         { value: "2", label: "2" },
//                                         { value: "3", label: "3" },
//                                         { value: "4", label: "4" },
//                                     ],
//                                 },
//                                 { label: "Team Size", name: "teamSize", type: "number", placeholder: "Team size (1-4)", min: 1, max: 4 },
//                                 { label: "University Roll No", name: "rollno", type: "text", placeholder: "Enter roll number" },
//                                 { label: "Aadhar Number", name: "aadhar", type: "text", placeholder: "Enter 12-digit Aadhar number" },
//                             ].map((field) => (
//                                 <div key={field.name} className="space-y-4">
//                                     <label className="text-white font-bold tracking-wider drop-shadow-lg">{field.label}</label>
//                                     {field.type === "select" ? (
//                                         <select
//                                             name={field.name}
//                                             value={user[field.name]}
//                                             onChange={handleChange}
//                                             className="w-full p-5 rounded-2xl bg-gradient-to-r from-white/15 to-white/25 text-white border border-white/50 focus:ring-4 focus:ring-purple-600/60 focus:border-purple-500 hover:bg-white/40 transition-all duration-300 shadow-lg"
//                                         >
//                                             {field.options.map((opt) => (
//                                                 <option key={opt.value} value={opt.value} className="bg-indigo-900 text-white">
//                                                     {opt.label}
//                                                 </option>
//                                             ))}
//                                         </select>
//                                     ) : (
//                                         <input
//                                             type={field.type}
//                                             name={field.name}
//                                             value={field.type === "number" ? user[field.name] || "" : user[field.name]}
//                                             onChange={handleChange}
//                                             placeholder={field.placeholder}
//                                             min={field.min}
//                                             max={field.max}
//                                             disabled={field.disabled}
//                                             className="w-full p-5 rounded-2xl bg-gradient-to-r from-white/15 to-white/25 text-white border border-white/50 focus:ring-4 focus:ring-purple-600/60 focus:border-purple-500 hover:bg-white/40 transition-all duration-300 shadow-lg disabled:bg-gray-600/50 disabled:cursor-not-allowed"
//                                         />
//                                     )}
//                                 </div>
//                             ))}
//                         </div>

//                         <div className="space-y-10">
//                             {[
//                                 { label: "Aadhar Card (Max 300KB)", name: "aadharImage" },
//                                 { label: "College ID (Max 300KB)", name: "clg_id" },
//                             ].map((field) => (
//                                 <div key={field.name} className="space-y-4">
//                                     <label className="text-white font-bold tracking-wider drop-shadow-lg">{field.label}</label>
//                                     <input
//                                         type="file"
//                                         name={field.name}
//                                         onChange={handleChange}
//                                         accept="image/jpeg,image/jpg,image/png,application/pdf"
//                                         className="w-full p-5 rounded-2xl bg-gradient-to-r from-white/15 to-white/25 text-white border border-white/50 file:mr-8 file:py-4 file:px-8 file:rounded-2xl file:border-0 file:bg-gradient-to-r file:from-purple-700 file:to-indigo-700 file:text-white hover:file:bg-gradient-to-r hover:file:from-purple-800 hover:file:to-indigo-800 transition-all duration-300 shadow-lg"
//                                     />
//                                 </div>
//                             ))}
//                         </div>

//                         <div className="text-center">
//                             <button
//                                 type="submit"
//                                 className="px-12 py-5 bg-gradient-to-r from-purple-700 to-indigo-700 text-white font-bold rounded-2xl shadow-lg hover:from-purple-800 hover:to-indigo-800 hover:shadow-[0_0_25px_rgba(147,51,234,0.8)] transition-all duration-300"
//                             >
//                                 Register Now
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



// new 
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
        aadhar: "",
        teamSize: "",
        aadharImage: null,
        registrationId: "",
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const baseUrl = import.meta.env.VITE_BACKEND_URL;

    useEffect(() => {
        // Fetch user data to prefill email
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
                setError(data.message || 'Failed to fetch user data');
                localStorage.removeItem('token');
            }
        } catch (err) {
            setError('Server error. Please try again.');
        }
    };

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setUser((prev) => ({
            ...prev,
            [name]: files ? files[0] : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        // Client-side validation
        if (!user.event || !user.teamName || !user.teamLeaderName || !user.email || !user.mobile || !user.gender || !user.college || !user.course || !user.year || !user.rollno || !user.aadhar || !user.teamSize || !user.clg_id || !user.aadharImage) {
            setError('Please fill all required fields');
            return;
        }

        if (!/^\d{12}$/.test(user.aadhar)) {
            setError('Aadhar number must be exactly 12 digits');
            return;
        }

        if (user.teamSize < 1 || user.teamSize > 4) {
            setError('Team size must be between 1 and 4');
            return;
        }

        if (user.clg_id && user.clg_id.size > 1000000) {
            setError('College ID image must be less than 1MB');
            return;
        }

        if (user.aadharImage && user.aadharImage.size > 1000000) {
            setError('Aadhar image must be less than 1MB');
            return;
        }

        const token = localStorage.getItem('token');
        if (!token) {
            setError('You must be logged in to register');
            return;
        }

        // Check for existing registration with rollno, teamLeaderName, or aadhar
        try {
            const checkResponse = await fetch(`${baseUrl}/api/register/check`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({
                    rollno: user.rollno,
                    teamLeaderName: user.teamLeaderName,
                    aadhar: user.aadhar,
                }),
            });

            const checkData = await checkResponse.json();
            if (!checkResponse.ok) {
                setError(checkData.message || checkData.errors?.map(e => e.msg).join(', ') || 'Registration check failed');
                return;
            }

            if (checkData.isRegistered) {
                setError('This roll number, team leader name, or Aadhar number is already registered for an event');
                return;
            }
        } catch (err) {
            setError('Error checking registration status. Please try again.');
            return;
        }

        const formData = new FormData();
        Object.keys(user).forEach((key) => {
            if (user[key]) {
                formData.append(key, user[key]);
            }
        });

        try {
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
                    email: user.email, // Retain email
                    mobile: user.mobile, // Retain mobile number
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
                setError(data.message || data.errors?.map(e => e.msg).join(', ') || 'Registration failed');
            }
        } catch (err) {
            setError('Something went wrong. Please try again.');
            console.error('Fetch error:', err);
        }
    };

    return (
        <div className="min-h-screen relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-[#1a1033] via-[#0d1b38] to-[#2a0a4d] bg-[length:200%_200%] animate-background"></div>
            <div className="relative z-0 flex items-center justify-center p-6 min-h-screen">
                <div className="w-full max-w-3xl bg-white/10 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/40 p-12 hover:shadow-[0_0_80px_rgba(147,51,234,0.6)] transition-all duration-700">
                    <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-indigo-200 to-blue-300 text-center mb-12 tracking-widest drop-shadow-lg">
                        EVENT REGISTRATION
                    </h1>

                    {error && (
                        <div
                            className="bg-red-700/40 text-red-100 p-5 rounded-2xl mb-8 text-center border border-red-600/70 shadow-inner"
                        >
                            {error}
                        </div>
                    )}
                    {success && (
                        <div
                            className="bg-green-700/40 text-green-100 p-5 rounded-2xl mb-8 text-center border border-green-600/70 shadow-inner"
                        >
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
                                    ],
                                },
                                {
                                    label: "Year",
                                    name: "year",
                                    type: "select",
                                    options: [
                                        { value: "", label: "Select year" },
                                        { value: "1", label: "1" },
                                        { value: "2", label: "2" },
                                        { value: "3", label: "3" },
                                        { value: "4", label: "4" },
                                    ],
                                },
                                { label: "Team Size", name: "teamSize", type: "number", placeholder: "Team size (1-4)", min: 1, max: 4 },
                                { label: "University Roll No", name: "rollno", type: "text", placeholder: "Enter roll number" },
                                { label: "Aadhar Number", name: "aadhar", type: "text", placeholder: "Enter 12-digit Aadhar number" },
                            ].map((field) => (
                                <div key={field.name} className="space-y-4">
                                    <label className="text-white font-bold tracking-wider drop-shadow-lg">{field.label}</label>
                                    {field.type === "select" ? (
                                        <select
                                            name={field.name}
                                            value={user[field.name]}
                                            onChange={handleChange}
                                            className="w-full p-5 rounded-2xl bg-gradient-to-r from-white/15 to-white/25 text-white border border-white/50 focus:ring-4 focus:ring-purple-600/60 focus:border-purple-500 hover:bg-white/40 transition-all duration-300 shadow-lg"
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
                                            value={field.type === "number" ? user[field.name] || "" : user[field.name]}
                                            onChange={handleChange}
                                            placeholder={field.placeholder}
                                            min={field.min}
                                            max={field.max}
                                            disabled={field.disabled}
                                            className="w-full p-5 rounded-2xl bg-gradient-to-r from-white/15 to-white/25 text-white border border-white/50 focus:ring-4 focus:ring-purple-600/60 focus:border-purple-500 hover:bg-white/40 transition-all duration-300 shadow-lg disabled:bg-gray-600/50 disabled:cursor-not-allowed"
                                        />
                                    )}
                                </div>
                            ))}
                        </div>

                        <div className="space-y-10">
                            {[
                                { label: "Aadhar Card (Max 1MB)", name: "aadharImage" },
                                { label: "College ID (Max 1MB)", name: "clg_id" },
                            ].map((field) => (
                                <div key={field.name} className="space-y-4">
                                    <label className="text-white font-bold tracking-wider drop-shadow-lg">{field.label}</label>
                                    <input
                                        type="file"
                                        name={field.name}
                                        onChange={handleChange}
                                        accept="image/jpeg,image/jpg,image/png,application/pdf"
                                        className="w-full p-5 rounded-2xl bg-gradient-to-r from-white/15 to-white/25 text-white border border-white/50 file:mr-8 file:py-4 file:px-8 file:rounded-2xl file:border-0 file:bg-gradient-to-r file:from-purple-700 file:to-indigo-700 file:text-white hover:file:bg-gradient-to-r hover:file:from-purple-800 hover:file:to-indigo-800 transition-all duration-300 shadow-lg"
                                    />
                                </div>
                            ))}
                        </div>

                        <div className="text-center">
                            <button
                                type="submit"
                                className="px-12 py-5 bg-gradient-to-r from-purple-700 to-indigo-700 text-white font-bold rounded-2xl shadow-lg hover:from-purple-800 hover:to-indigo-800 hover:shadow-[0_0_25px_rgba(147,51,234,0.8)] transition-all duration-300"
                            >
                                Register Now
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