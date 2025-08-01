import { useState } from "react";
import { FaYoutube, FaWhatsapp, FaLinkedin, FaInstagram, FaEnvelope, FaArrowUp, FaPhone } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    return (
        <footer className="relative bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-10 border-t-[5px] border-cyan-500 shadow-2xl">
            <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 text-center sm:text-left">
                <div className="space-y-4">
                    <h2 className="text-lg font-semibold text-cyan-400 border-b-2 border-cyan-600 pb-2 uppercase tracking-wider animate-fadeIn">
                        Events Queries?
                    </h2>
                    <div className="space-y-3">
                        {[
                            { name: 'AMAN GUPTA', phone: '9560472926' },
                            { name: 'HARISH JAYVEER SINGH', phone: '1234567890' },
                            { name: 'CHESHTA SHARMA', phone: '1234567890' },
                            { name: 'ANSHIKA YADAV', phone: '34494829299' },
                            { name: 'MANISH DARGAN', phone: '1234567890' },
                        ].map(({ name, phone }) => (
                            <p key={name} className="text-sm sm:text-base font-light">
                                <span className="text-violet-400 font-medium">{name}:</span>
                                <a href={`tel:+91${phone}`} className="hover:text-green-400 ml-1 transition-all duration-300 ease-in-out">
                                    {phone}
                                </a>
                            </p>
                        ))}
                    </div>
                </div>
                <div className="space-y-4">
                    <h2 className="text-lg font-semibold text-cyan-400 border-b-2 border-cyan-600 pb-2 uppercase tracking-wider animate-fadeIn">
                        Technical Queries?
                    </h2>
                    <div className="space-y-3">
                        <p className="text-sm sm:text-base font-light">
                            <span className="text-violet-400 font-bold text-lg">WhatsApp:</span>
                            <a href="https://wa.me/9651585712" className="hover:text-green-400 ml-1 transition-all duration-300 ease-in-out text-green-500 font-normal text-lg">
                                Whatsapp
                            </a>
                        </p>
                        <p className="text-sm sm:text-base font-light">
                            <span className="text-violet-400 font-bold text-lg">Email:</span>
                            <a href="mailto:ag0567688@gmail.com" className="hover:text-green-400 ml-1 transition-all duration-300 ease-in-out text-green-500 font-normal text-lg">
                               Email me
                            </a>
                        </p>
                        <p className="text-sm sm:text-base font-light">
                            <span className="text-violet-400 font-bold text-lg">Call:</span>
                            <a href="tel:+919651585712" className="hover:text-green-400 ml-1 transition-all duration-300 ease-in-out text-green-500 font-normal text-lg">
                               Call Me
                            </a>
                        </p>
                    </div>
                </div>
                <div className="flex flex-col items-center sm:items-start gap-4">
                    <h2 className="text-lg font-semibold text-cyan-400 border-b-2 border-cyan-600 pb-2 uppercase tracking-wider animate-fadeIn">
                        Quick Links
                    </h2>
                    <div className="flex flex-col items-center sm:items-start gap-2">
                        <Link to="/" className="text-gray-400 text-sm sm:text-base transition-all duration-300 ease-in-out hover:translate-x-1 hover:underline hover:text-cyan-600">
                            Home
                        </Link>
                        <Link to="/event" className="text-gray-400 text-sm sm:text-base transition-all duration-300 ease-in-out hover:translate-x-1 hover:underline hover:text-cyan-600">
                            Event
                        </Link>
                        <Link to="/schedule" className="text-gray-400 text-sm sm:text-base transition-all duration-300 ease-in-out hover:translate-x-1 hover:underline hover:text-cyan-600">
                            Schedule
                        </Link>
                        <Link to="/registration" className="text-gray-400 text-sm sm:text-base transition-all duration-300 ease-in-out hover:translate-x-1 hover:underline hover:text-cyan-600">
                            Events Registration
                        </Link>
                        <Link to="/contact" className="text-gray-400 text-sm sm:text-base transition-all duration-300 ease-in-out hover:translate-x-1 hover:underline hover:text-cyan-600">
                            Contact
                        </Link>
                        <Link to="/login" className="text-gray-400 text-sm sm:text-base transition-all duration-300 ease-in-out hover:translate-x-1 hover:underline hover:text-cyan-600">
                            Login
                        </Link>
                    </div>
                </div>
                <div className="text-center">
                    <h2 className="text-lg font-semibold text-cyan-400 border-b-2 border-amber-600 pb-2 uppercase tracking-wider animate-fadeIn">
                        Follow Us
                    </h2>
                    <div className="flex justify-center gap-5 sm:gap-6 mt-4">
                        <a href="https://www.youtube.com/@HiTechCollege" className="text-red-500 hover:text-white transition-transform hover:scale-125" target="_blank" rel="noopener noreferrer">
                            <FaYoutube size={30} />
                        </a>
                        <a href="https://wa.me/9651585712" className="text-green-400 hover:text-white transition-transform hover:scale-125" target="_blank" rel="noopener noreferrer">
                            <FaWhatsapp size={30} />
                        </a>
                        <a href="https://www.linkedin.com/amangupta9454" className="text-blue-400 hover:text-white transition-transform hover:scale-125" target="_blank" rel="noopener noreferrer">
                            <FaLinkedin size={30} />
                        </a>
                        <a href="https://www.instagram.com/gupta_aman_9161" className="text-pink-500 hover:text-white transition-transform hover:scale-125" target="_blank" rel="noopener noreferrer">
                            <FaInstagram size={28} />
                        </a>
                        <a href="mailto:ag0567688@gmail.com" className="text-yellow-400 hover:text-white transition-transform hover:scale-125" target="_blank" rel="noopener noreferrer">
                            <FaEnvelope size={30} />
                        </a>
                    </div>
                    <div className="flex items-center justify-center gap-4 mt-4">
                        <h2
                            className="text-3xl font-extrabold text-amber-400 cursor-pointer tracking-wide transition-transform hover:scale-110 animate-glow"
                            onClick={() => setIsModalOpen(true)}
                        >
                            CROSSROADS
                        </h2>
                    </div>
                </div>
            </div>
            <div className="mt-12 text-center pt-6">
                <h2 className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-cyan-400 animate-fadeIn border-b-2 border-amber-600">
                    CROSSROADS<span className="text-amber-400 animate-pulse">@2025</span>
                </h2>
                <p className="mt-2 text-sm sm:text-base text-white font-light animate-slideIn border-b-2 border-amber-500">
                    Crossroad is the technical fest of HI-TECH Institute of Engineering and Technology where creativity and innovation meet energy and excitement. With over 20+ years of excellence, this event promises inspiration and growth.
                </p>
                <div className="mt-4 text-xs sm:text-sm text-white animate-pulse">
                    © {new Date().getFullYear()} Crossroad Technical Fest. All rights reserved.
                </div>
                <div className="mt-2 text-xs sm:text-sm text-white animate-pulse">
                    This website is created by{' '}
                    <a href="https://www.linkedin.com/in/amangupta9454/" target="_blank" rel="noopener noreferrer" className="underline hover:text-gray-300">
                        Code Veda
                    </a>.
                </div>
                <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="mt-6 bg-cyan-500 text-white p-3 rounded-full hover:bg-cyan-600 transition-transform hover:scale-110 shadow-lg animate-bounce cursor-pointer">
                    <FaArrowUp size={24} />
                </button>
            </div>
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/80 z-50">
                    <div className="bg-gray-900 p-6 rounded-xl max-w-sm w-full mx-4 shadow-xl">
                        <h3 className="text-lg sm:text-xl font-semibold text-cyan-400 mb-3 animate-fadeIn">About CROSSROADS</h3>
                        <p className="text-sm sm:text-base text-gray-200 animate-slideIn">
                            Crossroad 2025 is the flagship technical fest of HI-TECH Institute of Engineering and Technology.
                            It is a platform where students showcase their talent in innovation, technology, and creativity.
                        </p>
                        <button className="mt-4 px-4 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 cursor-pointer" onClick={() => setIsModalOpen(false)}>
                            Close
                        </button>
                    </div>
                </div>
            )}
        </footer>
    );
};

export default Footer;