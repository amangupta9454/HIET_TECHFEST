/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Dashboard = ({ setModeFromNavbar }) => {
  const [dashboardData, setDashboardData] = useState(null);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const baseUrl = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetchDashboardData(token);
    } else {
      navigate('/login');
    }
  }, [navigate]);

  useEffect(() => {
    if (setModeFromNavbar) {
      setModeFromNavbar((mode) => {
        if (mode === 'dashboard') return () => navigate('/dashboard');
        return () => {};
      });
    }
  }, [setModeFromNavbar, navigate]);

  const fetchDashboardData = async (token) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${baseUrl}/api/user/dashboard`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      if (response.ok) {
        setDashboardData(data);
      } else {
        setErrors({ general: data.message || 'Failed to fetch dashboard data' });
        localStorage.removeItem('token');
        navigate('/login');
      }
    } catch (err) {
      setErrors({ general: 'Server error. Please try again.' });
      navigate('/login');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setDashboardData(null);
    setSuccess('Logged out successfully!');
    navigate('/login');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <svg className="animate-spin h-10 w-10 text-purple-600" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
      </div>
    );
  }

  if (!dashboardData) return null;

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
          <h1 className="text-2xl sm:text-3xl font-bold text-white text-center mb-6 sm:mb-8">DASHBOARD</h1>

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
                <span className="button-shine absolute top-0 left-[-100%] w-1/3 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-[20deg]"></span>
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;