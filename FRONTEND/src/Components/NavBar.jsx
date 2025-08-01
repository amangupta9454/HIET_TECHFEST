import { Link, useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { useState } from "react";

const NavBar = () => {
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();
  const isAuthenticated = !!localStorage.getItem('token');

  const handleLinkClick = () => {
    setIsMobile(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
    setIsMobile(false);
  };

  return (
    <div className="text-xl flex justify-between items-center w-full h-16 px-10 rounded-b-3xl bg-gradient-to-r from-[#0f2027] via-[#203a43] to-[#2c5364] text-white fixed z-10 shadow-[0_4px_30px_rgba(0,255,255,0.2)] border-b-2 border cyan-400 transition-all duration-500 ease-in-out backdrop-blur-md hover:shadow-[0_6px_40px_rgba(0,255,255,0.4)] hover:scale-[1.03] hover:backdrop-blur-xl hover:bg-gradient-to-r hover:from-[#203a43] hover:via-[#2c5364] hover:to-[#0f2027]">
      <div>
        <h1 className="text-2xl font-bold ml-6 text-white font-serif transform transition-all duration-500 ease-in-out hover:text-cyan-400 animate-pulse hover:scale-110 cursor-pointer">
          CROSSROADS
        </h1>
      </div>
      <div className="md:hidden" onClick={() => setIsMobile(!isMobile)}>
        {isMobile ? (
          <FaTimes size={30} className="text-pink-700 cursor-pointer transition-transform duration-500 ease-in-out rotate-180 hover:rotate-0 hover:scale-125" />
        ) : (
          <FaBars size={30} className="text-white cursor-pointer transition-transform duration-300 ease-in-out scale-105 hover:scale-125 hover:rotate-90" />
        )}
      </div>
      <ul
        className={`md:flex ${
          isMobile
            ? "flex flex-col space-y-2 absolute top-16 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-gray-600 to-cyan-700 text-white p-2 w-4/5 shadow-lg rounded-lg animate-fade-in-down"
            : "hidden"
        } md:space-x-7 uppercase`}
      >
        {[
          { path: "/", label: "Home" },
          { path: "/event", label: "Events" },
          { path: "/schedule", label: "Schedule" },
          { path: "/registration", label: "Event Registration" },
          ...(isAuthenticated ? [{ path: "/dashboard", label: "Dashboard" }] : []),
          { path: "/contact", label: "Contact" },
          ...(isAuthenticated
            ? [{ path: "#", label: "Logout", onClick: handleLogout }]
            : [
                { path: "/login", label: "Login" },
                
              ]),
        ].map(({ path, label, onClick }) => (
          <li
            key={path + label}
            className="cursor-pointer font-medium text-white transition-all duration-300 ease-in-out hover:text-pink-500 hover:scale-110 hover:translate-x-2 hover:bg-gray-800 px-3 py-2 rounded-lg capitalize"
            onClick={() => {
              handleLinkClick();
              if (onClick) onClick();
            }}
          >
            {onClick ? (
              <span>{label}</span>
            ) : (
              <Link to={path}>{label}</Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NavBar;