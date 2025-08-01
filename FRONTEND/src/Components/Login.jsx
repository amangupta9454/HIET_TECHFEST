/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Login = ({ setModeFromNavbar }) => {
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const baseUrl = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/dashboard');
    }
  }, [navigate]);

  useEffect(() => {
    if (setModeFromNavbar) {
      setModeFromNavbar((mode) => {
        if (mode === 'login') return () => navigate('/login');
        if (mode === 'register') return () => navigate('/register');
        if (mode === 'dashboard') return () => navigate('/dashboard');
        return () => {};
      });
    }
  }, [setModeFromNavbar, navigate]);

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setErrors({ general: '' });
    setSuccess('');
    setIsLoading(true);

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
        navigate('/dashboard');
      } else {
        setErrors({ general: data.message || 'Login failed' });
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
          <h1 className="text-2xl sm:text-3xl font-bold text-white text-center mb-6 sm:mb-8">LOGIN</h1>

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

          <form onSubmit={handleLoginSubmit} className="space-y-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-4">
              {[
                { label: 'Email', name: 'email', type: 'email', placeholder: 'Enter email' },
                { label: 'Password', name: 'password', type: showPassword ? 'text' : 'password', placeholder: 'Enter password' },
              ].map((field) => (
                <div key={field.name} className="space-y-2">
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
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-white"
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
                    <svg className="animate-spin h-5 w-5 mr-2 text-white" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    <span>Loading...</span>
                  </div>
                ) : (
                  <>
                    <svg
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
                    <span className="button-shine absolute top-0 left-[-100%] w-1/3 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-[20deg]"></span>
                  </>
                )}
              </motion.button>
            </div>
            <div className="text-center mt-4">
              <button type="button" onClick={() => navigate('/register')} className="text-white hover:text-purple-300 text-sm">
                Not registered? Register here
              </button>
            </div>
            <div className="mt-8">
              <h2 className="text-2xl font-bold text-white text-center mb-4 bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text">
                Important Information
              </h2>
              <div className="bg-white/5 p-6 rounded-lg border border-white/20">
                <ul className="list-disc list-inside text-white/80 space-y-2 font-semibold">
                  <li>A single email address can be used to participate in an event only once.</li>
                  <li>When you tap on login with your registered credentials, please wait for some time as the system processes your request.</li>
                  <li>For event registration, please use the same email you used to register as a new user. Using a different email will prevent your dashboard details from being updated for that particular event.</li>
                </ul>
              </div>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;