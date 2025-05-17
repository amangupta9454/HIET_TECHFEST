/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const Login = ({ setModeFromNavbar }) => {
  const [mode, setMode] = useState('login');
  const [user, setUser] = useState({
    name: '',
    email: '',
    mobile: '',
    college: '',
    branch: '',
    year: '',
    image: null,
    password: '',
  });
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [dashboardData, setDashboardData] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // New state for loading
  const baseUrl = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    gsap.to('.background-overlay', {
      background: 'linear-gradient(45deg, #1a1033, #0d1b38, #2a0a4d, #1a1033)',
      backgroundSize: '200% 200%',
      duration: 15,
      repeat: -1,
      yoyo: true,
      ease: 'linear',
    });

    gsap.to('.button-shine', {
      xPercent: 200,
      duration: 2,
      repeat: -1,
      ease: 'linear',
    });

    const token = localStorage.getItem('token');
    if (token) {
      fetchDashboardData(token);
    }
  }, []);

  useEffect(() => {
    if (setModeFromNavbar) {
      setModeFromNavbar(setMode);
    }
  }, [setModeFromNavbar]);

  const fetchDashboardData = async (token) => {
    try {
      const response = await fetch(`${baseUrl}/api/user/dashboard`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      if (response.ok) {
        setDashboardData(data);
        setMode('dashboard');
      } else {
        setError(data.message || 'Failed to fetch dashboard data');
        localStorage.removeItem('token');
      }
    } catch (err) {
      setError('Server error. Please try again.');
    }
  };

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRegisterChange = (e) => {
    const { name, value, files } = e.target;
    setUser((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsLoading(true); // Start loading

    try {
      const response = await fetch(`${baseUrl}/api/user/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginData),
      });
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('token', data.token);
        setSuccess('Login successful!');
        fetchDashboardData(data.token);
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const formData = new FormData();
    Object.keys(user).forEach((key) => {
      if (user[key]) formData.append(key, user[key]);
    });

    try {
      const response = await fetch(`${baseUrl}/api/user/register`, {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      if (response.ok) {
        setSuccess('OTP sent to your email. Please verify.');
        setMode('otp');
      } else {
        setError(data.message || 'Registration failed');
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const response = await fetch(`${baseUrl}/api/user/verify-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: user.email, otp }),
      });
      const data = await response.json();
      if (response.ok) {
        setSuccess('Registration successful! Please login.');
        setMode('login');
        setUser({
          name: '',
          email: '',
          mobile: '',
          college: '',
          branch: '',
          year: '',
          image: null,
          password: '',
        });
        setOtp('');
      } else {
        setError(data.message || 'OTP verification failed');
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setDashboardData(null);
    setMode('login');
    setSuccess('Logged out successfully!');
  };

  const renderForm = () => {
    if (mode === 'login') {
      return (
        <form onSubmit={handleLoginSubmit} className="space-y-6">
          <div className="form-section grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-4">
            {[
              { label: 'Email', name: 'email', type: 'email', placeholder: 'Enter email' },
              { label: 'Password', name: 'password', type: showPassword ? 'text' : 'password', placeholder: 'Enter password' },
            ].map((field) => (
              <div key={field.name} className="form-group space-y-2">
                <label className="text-white font-semibold tracking-wide">{field.label}</label>
                <div className="relative">
                  <input
                    type={field.type}
                    name={field.name}
                    value={loginData[field.name]}
                    onChange={handleLoginChange}
                    placeholder={field.placeholder}
                    className="w-full p-3 rounded-lg bg-white/10 text-white border border-white/30 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300 placeholder-white/50"
                  />
                  {field.name === 'password' && (
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white"
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
          <div className="text-center">
            <motion.button
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={isLoading}
              className={`relative px-8 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <svg className="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Loading...</span>
                </div>
              ) : (
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 inline-block mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="relative z-0">Login</span>
                  <span className="button-shine absolute top-0 left-[-100%] w-1/3 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent" style={{ transform: 'skewX(-20deg)' }}></span>
                </>
              )}
            </motion.button>
          </div>
          <div className="text-center mt-4">
            <button type="button" onClick={() => setMode('register')} className="text-white hover:text-purple-300 text-sm">
              Not registered? Register here
            </button>
          </div>
          <div className="info-section mt-8">
            <h2 className="text-2xl font-bold text-white text-center mb-4 bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text">
              Important Information
            </h2>
            <div className="bg-white/5 p-6 rounded-lg border border-white/20">
              <ul className="list-disc list-inside text-white/80 space-y-2 font-semibold">
              <li>
                  A single email address can be used to participate in an event only once.
                </li>
                <li>
                  When you tap on login with your registered credentials, please wait for some time as the system processes your request.
                </li>
                <li>
                  For event registration, please use the same email you used to register as a new user. Using a different email will prevent your dashboard details from being updated for that particular event.
                </li>
              </ul>
            </div>
          </div>
        </form>
      );
    } else if (mode === 'register') {
      return (
        <form onSubmit={handleRegisterSubmit} className="space-y-6">
          <div className="form-section grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-4">
            {[
              { label: 'Name', name: 'name', type: 'text', placeholder: 'Enter name' },
              { label: 'Email', name: 'email', type: 'email', placeholder: 'Enter email' },
              { label: 'Mobile Number', name: 'mobile', type: 'tel', placeholder: 'Enter mobile number', maxLength: 10 },
              { label: 'College', name: 'college', type: 'text', placeholder: 'Enter college name' },
              { label: 'Branch', name: 'branch', type: 'text', placeholder: 'Enter branch name' },
              {
                label: 'Year',
                name: 'year',
                type: 'select',
                options: [
                  { value: '', label: 'Select year' },
                  { value: '1', label: '1' },
                  { value: '2', label: '2' },
                  { value: '3', label: '3' },
                  { value: '4', label: '4' },
                ],
              },
              { label: 'Password', name: 'password', type: showPassword ? 'text' : 'password', placeholder: 'Enter password' },
              { label: 'Profile Image (Max 1MB)', name: 'image', type: 'file' },
            ].map((field) => (
              <div key={field.name} className="form-group space-y-2">
                <label className="text-white font-semibold tracking-wide">{field.label}</label>
                {field.type === 'select' ? (
                  <select
                    name={field.name}
                    value={user[field.name]}
                    onChange={handleRegisterChange}
                    className="w-full p-3 rounded-lg bg-white/10 text-white border border-white/30 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300"
                  >
                    {field.options.map((opt) => (
                      <option key={opt.value} value={opt.value} className="bg-indigo-900 text-white">
                        {opt.label}
                      </option>
                    ))}
                  </select>
                ) : field.type === 'file' ? (
                  <input
                    type="file"
                    name={field.name}
                    onChange={handleRegisterChange}
                    accept="image/jpeg,image/jpg,image/png"
                    className="w-full p-3 rounded-lg bg-white/10 text-white border border-white/30 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-purple-600 file:text-white hover:file:bg-purple-700 transition-all duration-300"
                  />
                ) : (
                  <div className="relative">
                    <input
                      type={field.type}
                      name={field.name}
                      value={user[field.name]}
                      onChange={handleRegisterChange}
                      placeholder={field.placeholder}
                      className="w-full p-3 rounded-lg bg-white/10 text-white border border-white/30 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300 placeholder-white/50"
                    />
                    {field.name === 'password' && (
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white"
                      >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                      </button>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="text-center">
            <motion.button
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative px-8 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all duration-300"
            >
              <span className="relative z-0">Register</span>
              <span className="button-shine absolute top-0 left-[-100%] w-1/3 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent" style={{ transform: 'skewX(-20deg)' }}></span>
            </motion.button>
          </div>
          <div className="text-center mt-4">
            <button type="button" onClick={() => setMode('login')} className="text-white hover:text-purple-300 text-sm">
              Already registered? Login here
            </button>
          </div>
        </form>
      );
    } else if (mode === 'otp') {
      return (
        <form onSubmit={handleOtpSubmit} className="space-y-6">
          <div className="form-section grid grid-cols-1 gap-6">
            <div className="form-group space-y-2">
              <label className="text-white font-semibold tracking-wide">Enter OTP</label>
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter OTP"
                className="w-full p-3 rounded-lg bg-white/10 text-white border border-white/30 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300 placeholder-white/50"
              />
            </div>
          </div>
          <div className="text-center">
            <motion.button
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative px-8 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all duration-300"
            >
              <span className="relative z-0">Verify OTP</span>
              <span className="button-shine absolute top-0 left-[-100%] w-1/3 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent" style={{ transform: 'skewX(-20deg)' }}></span>
            </motion.button>
          </div>
        </form>
      );
    } else if (mode === 'dashboard' && dashboardData) {
      return (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-white text-center">Welcome, {dashboardData.user.name}</h2>
          <div className="bg-white/10 rounded-lg p-4">
            <h3 className="text-xl font-semibold text-white mb-3">User Details</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-white text-sm">
                <tbody>
                  {[
                    { label: 'Name', value: dashboardData.user.name },
                    { label: 'Email', value: <span className="break-all">{dashboardData.user.email}</span> },
                    { label: 'Mobile', value: dashboardData.user.mobile },
                    { label: 'College', value: dashboardData.user.college },
                    { label: 'Branch', value: dashboardData.user.branch },
                    { label: 'Year', value: dashboardData.user.year },
                    { label: 'Profile Image', value: <img src={dashboardData.user.image} alt="Profile" className="w-16 h-16 rounded-full" /> },
                  ].map((item) => (
                    <tr key={item.label} className="border-b border-white/10">
                      <td className="py-2 pr-4 font-semibold">{item.label}</td>
                      <td className="py-2">{item.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="bg-white/10 rounded-lg p-4">
            <h3 className="text-xl font-semibold text-white mb-3">Applied Events</h3>
            {dashboardData.events.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full text-white text-sm">
                  <thead>
                    <tr className="bg-purple-600/30">
                      <th className="py-2 px-3 text-left">Event</th>
                      <th className="py-2 px-3 text-left">Team Name</th>
                      <th className="py-2 px-3 text-left">Registration ID</th>
                      <th className="py-2 px-3 text-left">Team Size</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dashboardData.events.map((event) => (
                      <tr key={event.registrationId} className="border-b border-white/10">
                        <td className="py-2 px-3">{event.event}</td>
                        <td className="py-2 px-3">{event.teamName}</td>
                        <td className="py-2 px-3">{event.registrationId}</td>
                        <td className="py-2 px-3">{event.teamSize}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-white">No events applied yet.</p>
            )}
          </div>
          <div className="text-center">
            <motion.button
              onClick={handleLogout}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative px-8 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white font-semibold rounded-lg hover:from-red-700 hover:to-red-800 transition-all duration-300"
            >
              <span className="relative z-0">Logout</span>
              <span className="button-shine absolute top-0 left-[-100%] w-1/3 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent" style={{ transform: 'skewX(-20deg)' }}></span>
            </motion.button>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen relative overflow-hidden pt-16">
      <div className="background-overlay absolute inset-0" style={{ background: 'linear-gradient(45deg, #1a1033, #0d1b38, #2a0a4d, #1a1033)', backgroundSize: '200% 200%' }}></div>
      <div className="relative z-0 flex items-center justify-center p-4 sm:p-6 min-h-screen">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="w-full max-w-lg sm:max-w-2xl bg-white/10 backdrop-blur-lg rounded-xl p-6 sm:p-8 border border-white/20"
        >
          <h1 className="text-2xl sm:text-3xl font-bold text-white text-center mb-6 sm:mb-8">
            {mode === 'login' ? 'LOGIN' : mode === 'register' ? 'REGISTER' : mode === 'otp' ? 'VERIFY OTP' : 'DASHBOARD'}
          </h1>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-red-600/50 text-red-100 p-3 rounded-lg mb-6 text-center border border-red-500/50"
            >
              {error}
            </motion.div>
          )}
          {success && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-green-600/50 text-green-100 p-3 rounded-lg mb-6 text-center border border-green-500/50"
            >
              {success}
            </motion.div>
          )}

          {renderForm()}
        </motion.div>
      </div>
    </div>
  );
};

export default Login;