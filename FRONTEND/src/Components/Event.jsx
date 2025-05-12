import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import event1 from '/1.jpeg';
import event2 from '/cultural.jpg';
import event3 from '/dance.jpg';
import event4 from '/hietlogo.png';
import event5 from '/logo.jpeg';
import event6 from '/project 1.jpeg';
import event7 from '/project.jpeg';
import event8 from '/robo.jpg';
import event9 from '/song.jpg';

const events = [
  {
    id: 1,
    imageSrc: event1,
    name: 'Tech Hackathon',
    details: {
      description: 'A 24-hour coding marathon to build innovative solutions.',
      timing: 'April 20, 2025, 9:00 AM - April 21, 2025, 9:00 AM',
      location: 'Tech Hub, Downtown',
      judgingCriteria: 'Innovation, Functionality, Design, Presentation',
      organizer: 'Tech Innovators Club',
    },
  },
  {
    id: 2,
    imageSrc: event2,
    name: 'AI Workshop',
    details: {
      description: 'Hands-on session on building AI models.',
      timing: 'April 22, 2025, 10:00 AM - 2:00 PM',
      location: 'AI Research Center',
      judgingCriteria: 'N/A',
      organizer: 'AI Pioneers',
    },
  },
  {
    id: 3,
    imageSrc: event3,
    name: 'Startup Pitch',
    details: {
      description: 'Pitch your startup idea to investors.',
      timing: 'April 23, 2025, 1:00 PM - 5:00 PM',
      location: 'Innovation Arena',
      judgingCriteria: 'Feasibility, Scalability, Presentation',
      organizer: 'Entrepreneur Network',
    },
  },
  {
    id: 4,
    imageSrc: event4,
    name: 'Robotics Challenge',
    details: {
      description: 'Build and compete with autonomous robots.',
      timing: 'April 24, 2025, 9:00 AM - 3:00 PM',
      location: 'Robotics Lab',
      judgingCriteria: 'Design, Functionality, Performance',
      organizer: 'RoboTech Society',
    },
  },
  {
    id: 5,
    imageSrc: event5,
    name: 'Cybersecurity CTF',
    details: {
      description: 'Capture the Flag competition for security enthusiasts.',
      timing: 'April 25, 2025, 10:00 AM - 4:00 PM',
      location: 'Cyber Hub',
      judgingCriteria: 'Speed, Accuracy, Problem-Solving',
      organizer: 'CyberSec Group',
    },
  },
  {
    id: 6,
    imageSrc: event6,
    name: 'Data Science Bootcamp',
    details: {
      description: 'Learn data analysis and visualization techniques.',
      timing: 'April 26, 2025, 9:00 AM - 5:00 PM',
      location: 'Data Analytics Center',
      judgingCriteria: 'N/A',
      organizer: 'Data Wizards',
    },
  },
  {
    id: 7,
    imageSrc: event7,
    name: 'Game Dev Jam',
    details: {
      description: 'Create a game in 48 hours.',
      timing: 'April 27-28, 2025, 10:00 AM',
      location: 'Gaming Studio',
      judgingCriteria: 'Creativity, Gameplay, Design',
      organizer: 'Game Dev Collective',
    },
  },
  {
    id: 8,
    imageSrc: event8,
    name: 'AR/VR Showcase',
    details: {
      description: 'Experience and create AR/VR applications.',
      timing: 'April 29, 2025, 11:00 AM - 3:00 PM',
      location: 'VR Arena',
      judgingCriteria: 'Immersion, Innovation, Usability',
      organizer: 'XR Innovators',
    },
  },
  {
    id: 9,
    imageSrc: event9,
    name: 'Cloud Computing Summit',
    details: {
      description: 'Explore cloud technologies and architectures.',
      timing: 'April 30, 2025, 9:00 AM - 1:00 PM',
      location: 'Cloud Center',
      judgingCriteria: 'N/A',
      organizer: 'Cloud Experts',
    },
  },
];

const EventCard = ({ imageSrc, eventName, onClick }) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="group relative bg-gradient-to-br from-purple-700 via-indigo-600 to-blue-600 border-2 border-transparent rounded-3xl shadow-xl overflow-hidden transition-all duration-500 transform hover:-translate-y-3 hover:scale-105 hover:shadow-[0_0_80px_rgba(255,255,255,0.4)] hover:ring-4 hover:ring-pink-500 animate-floating">
      <div className="relative h-64 w-full overflow-hidden">
        {!loaded && (
          <div className="absolute inset-0 bg-gray-300 animate-pulse" />
        )}
        <img
          className={`w-full h-full object-cover group-hover:scale-115 transition-transform duration-700 ease-in-out drop-shadow-2xl ${loaded ? 'opacity-100' : 'opacity-0'}`}
          src={imageSrc}
          alt={eventName}
          onLoad={() => setLoaded(true)}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />
      </div>
      <div className="p-6 text-center relative z-10 bg-gradient-to-b from-transparent to-black/30 rounded-b-3xl">
        <h2 className="text-2xl font-extrabold text-white drop-shadow-xl group-hover:text-yellow-300 transition-all duration-300 tracking-wide">
          {eventName}
        </h2>
        <button
          onClick={onClick}
          className="mt-4 px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-700 text-white font-semibold rounded-full shadow-lg hover:from-indigo-700 hover:to-purple-800 hover:scale-105 transition-all duration-300 hover:ring-2 hover:ring-pink-300"
        >
          Know More
        </button>
        <span className="absolute top-4 right-4 text-lg text-white opacity-0 group-hover:opacity-100 transition-all duration-500 animate-pulse">
          ✨
        </span>
      </div>
    </div>
  );
};

const Events = () => {
  const [selectedEvent, setSelectedEvent] = useState(null);

  return (
    <div className="relative z-0 min-h-screen py-16 px-4 bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] overflow-hidden">
      {/* Sparkling Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle,_#ffffff22_1px,_transparent_1px)] [background-size:20px_20px] opacity-20 pointer-events-none animate-pulse"></div>

      {/* Parallax Background */}
      <div className="absolute inset-0 parallax-bg opacity-30" />

      <h1 className="text-4xl sm:text-5xl font-extrabold text-center text-white drop-shadow-lg mb-12 animate-fade-in">
        🎉 Upcoming Tech Events
      </h1>

      {/* Event Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 max-w-7xl mx-auto px-4">
        {events.map((event) => (
          <EventCard
            key={event.id}
            imageSrc={event.imageSrc}
            eventName={event.name}
            onClick={() => setSelectedEvent(event)}
          />
        ))}
      </div>

      {/* Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm transition-all duration-300">
          <div className="glassmorphism rounded-3xl p-6 sm:p-8 max-w-lg w-full mx-4 relative shadow-2xl animate-fade-in-up max-h-[85vh] overflow-y-auto">
            <button
              onClick={() => setSelectedEvent(null)}
              className="absolute top-4 right-4 text-gray-200 hover:text-red-400 transition-colors"
            >
              <svg className="w-6 h-6 sm:w-7 sm:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-6 text-center">{selectedEvent.name}</h3>
            <div className="space-y-4 text-gray-200 text-sm sm:text-base leading-relaxed">
              <p><strong>Description:</strong> {selectedEvent.details.description}</p>
              <p><strong>Timing:</strong> {selectedEvent.details.timing}</p>
              <p><strong>Location:</strong> {selectedEvent.details.location}</p>
              <p><strong>Judging Criteria:</strong> {selectedEvent.details.judgingCriteria}</p>
              <p><strong>Organizer:</strong> {selectedEvent.details.organizer}</p>
            </div>

            <div className="mt-6 flex flex-col sm:flex-row justify-center gap-4">
              <button
                onClick={() => setSelectedEvent(null)}
                className="px-6 py-3 bg-gradient-to-r from-pink-600 to-indigo-600 text-white font-semibold rounded-full hover:from-pink-700 hover:to-indigo-700 transition-all duration-300"
              >
                Close
              </button>
              <Link to="/registration"
                
                className="px-6 py-3 bg-gradient-to-r from-green-500 to-teal-500 text-white font-semibold rounded-full hover:from-green-600 hover:to-teal-600 transition-all duration-300"
              >
                Register Now
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Events;