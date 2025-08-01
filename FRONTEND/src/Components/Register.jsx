/* eslint-disable no-unused-vars */
import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Register = ({ setModeFromNavbar }) => {
  const [mode, setMode] = useState('register');
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
  const [otp, setOtp] = useState('');
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const baseUrl = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();

  const validateRegisterField = (name, value) => {
    let error = '';
    const requiredFields = ['name', 'email', 'mobile', 'college', 'branch', 'password'];

    if (requiredFields.includes(name) && !value) {
      error = `${name.charAt(0).toUpperCase() + name.slice(1)} is required`;
    } else if (name === 'email' && value && !/^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/.test(value)) {
      error = 'Invalid email format';
    } else if (name === 'mobile' && value && !/^[6-9][0-9]{9}$/.test(value)) {
      error = 'Mobile number must be a valid 10-digit number starting with 6-9';
    } else if (name === 'year' && !value) {
      error = 'Year is required';
    } else if (name === 'year' && value && !['1', '2', '3', '4'].includes(value)) {
      error = 'Year must be 1, 2, 3, or 4';
    } else if (name === 'password' && value && value.length < 6) {
      error = 'Password must be at least 6 characters';
    } else if (name === 'image' && value && value.size > 1000000) {
      error = 'Profile image must be less than 1MB';
    } else if (name === 'image' && value && !['image/jpeg', 'image/jpg', 'image/png'].includes(value.type)) {
      error = 'Profile image must be JPEG, JPG, or PNG';
    }

    return error;
  };

  const validateRegisterForm = () => {
    const newErrors = {};
    Object.keys(user).forEach((key) => {
      const error = validateRegisterField(key, user[key]);
      if (error) {
        newErrors[key] = error;
      }
    });

    if (!user.image) {
      newErrors.image = 'Profile image is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegisterChange = (e) => {
    const { name, value, files } = e.target;
    const newValue = files ? files[0] : value;

    setUser((prev) => ({
      ...prev,
      [name]: newValue,
    }));

    const error = validateRegisterField(name, newValue);
    setErrors((prev) => ({
      ...prev,
      [name]: error,
      general: prev.general && !error ? '' : prev.general,
    }));
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setErrors({ general: '' });
    setSuccess('');
    setIsLoading(true);

    if (!validateRegisterForm()) {
      setErrors((prev) => ({
        ...prev,
        general: 'Please correct the errors in the form',
      }));
      setIsLoading(false);
      return;
    }

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
        setErrors({ general: data.message || 'Registration failed' });
      }
    } catch (err) {
      setErrors({ general: 'Something went wrong. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    setErrors({ general: '' });
    setSuccess('');
    setIsLoading(true);

    try {
      const response = await fetch(`${baseUrl}/api/user/verify-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: user.email, otp }),
      });
      const data = await response.json();
      if (response.ok) {
        setSuccess('Registration successful! Please login.');
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
        navigate('/login');
      } else {
        setErrors({ general: data.message || 'OTP verification failed' });
      }
    } catch (err) {
      setErrors({ general: 'Something went wrong. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden pt-16">
      <div className="background-overlay absolute inset-0 bg-gradient-to-r from-[#1a1033] via-[#0d1b38] to-[#2a0a4d] bg-[length:200%_200%]" />
      <div className="relative z-0 flex items-center justify-center p-4 sm:p-6 min-h-screen">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="w-full max-w-lg sm:max-w-2xl bg-white/10 backdrop-blur-lg rounded-xl p-6 sm:p-8 border border-white/20"
        >
          <h1 className="text-2xl sm:text-3xl font-bold text-white text-center mb-6 sm:mb-8">
            {mode === 'register' ? 'REGISTER' : 'VERIFY OTP'}
          </h1>

          {errors.general && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-red-600/50 text-red-100 p-3 rounded-lg mb-6 text-center border border-red-500/50"
            >
              {errors.general}
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

          {mode === 'register' ? (
            <form onSubmit={handleRegisterSubmit} className="space-y-6">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-4">
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
                  <div key={field.name} className="space-y-2">
                    <label className="text-white font-semibold tracking-wide">{field.label}</label>
                    {field.type === 'select' ? (
                      <select
                        name={field.name}
                        value={user[field.name]}
                        onChange={handleRegisterChange}
                        className={`w-full p-3 rounded-lg bg-white/10 text-white border ${errors[field.name] ? 'border-red-500' : 'border-white/30'} focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300`}
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
                        className={`w-full p-3 rounded-lg bg-white/10 text-white border ${errors[field.name] ? 'border-red-500' : 'border-white/30'} file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-purple-600 file:text-white hover:file:bg-purple-700 transition-all duration-300`}
                      />
                    ) : (
                      <div className="relative">
                        <input
                          type={field.type}
                          name={field.name}
                          value={user[field.name]}
                          onChange={handleRegisterChange}
                          placeholder={field.placeholder}
                          maxLength={field.maxLength}
                          className={`w-full p-3 rounded-lg bg-white/10 text-white border ${errors[field.name] ? 'border-red-500' : 'border-white/30'} focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300 placeholder-white/50`}
                        />
                        {field.name === 'password' && (
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-white"
                          >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                          </button>
                        )}
                      </div>
                    )}
                    {errors[field.name] && (
                      <p className="text-red-400 text-sm">{errors[field.name]}</p>
                    )}
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
                      <svg className="animate-spin h-5 w-5 mr-2 text-white" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      <span>Loading...</span>
                    </div>
                  ) : (
                    <>
                      <span className="relative z-0">Register</span>
                      <span className="button-shine absolute top-0 left-[-100%] w-1/3 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-[20deg]"></span>
                    </>
                  )}
                </motion.button>
              </div>
              <div className="text-center mt-4">
                <button type="button" onClick={() => navigate('/login')} className="text-white hover:text-purple-300 text-sm">
                  Already registered? Login here
                </button>
              </div>
            </form>
          ) : (
            <form onSubmit={handleOtpSubmit} className="space-y-6">
              <div className="grid grid-cols-1 gap-6">
                <div className="space-y-2">
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
                  disabled={isLoading}
                  className={`relative px-8 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <svg className="animate-spin h-5 w-5 mr-2 text-white" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      <span>Loading...</span>
                    </div>
                  ) : (
                    <>
                      <span className="relative z-0">Verify OTP</span>
                      <span className="button-shine absolute top-0 left-[-100%] w-1/3 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-[20deg]"></span>
                    </>
                  )}
                </motion.button>
              </div>
            </form>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Register;