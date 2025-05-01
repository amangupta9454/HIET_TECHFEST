import React, { useState } from 'react';
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

const EventCard = ({ imageSrc, eventName, onClick }) => (
  <div className="group relative bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-500 border-2 border-transparent rounded-3xl shadow-lg overflow-hidden transition-all duration-500 transform hover:-translate-y-2 hover:scale-105 hover:shadow-[0_0_60px_rgba(255,255,255,0.3)] hover:ring-4 hover:ring-pink-400 animate-floating-glow">
    <div className="relative h-60 w-full overflow-hidden">
      <img
        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out drop-shadow-xl"
        src={imageSrc}
        alt={eventName}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-50" />
    </div>
    <div className="p-6 text-center relative z-10 backdrop-blur-md bg-white/5 rounded-b-3xl">
      <h2 className="text-2xl font-extrabold text-white drop-shadow-xl group-hover:text-yellow-400 transition-all duration-300 tracking-wider">
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

const Events = () => {
  const [selectedEvent, setSelectedEvent] = useState(null);

  return (
    <div className="relative z-0 min-h-screen py-24 px-4 bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] overflow-hidden">

      {/* Sparkling Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle,_#ffffff22_1px,_transparent_1px)] [background-size:20px_20px] opacity-20 pointer-events-none animate-pulse"></div>

      <h1 className="text-5xl font-extrabold text-center text-white drop-shadow-lg mb-16 animate-fade-in text-shadow-lg">
        🎉 Upcoming Tech Events
      </h1>

      {/* Event Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12 max-w-7xl mx-auto px-2">
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
          <div className="bg-gradient-to-tl from-indigo-600 via-purple-600 to-pink-600 border-2 border-gray-200 rounded-3xl p-8 max-w-2xl w-full mx-4 relative shadow-2xl animate-fade-in-up max-h-[85vh] overflow-y-auto">
            <button
              onClick={() => setSelectedEvent(null)}
              className="absolute top-4 right-4 text-gray-200 hover:text-red-400 transition-colors"
            >
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <h3 className="text-3xl font-extrabold text-white mb-6 text-center">{selectedEvent.name}</h3>
            <div className="space-y-4 text-gray-200 text-[16px] leading-relaxed">
              <p><strong>Description:</strong> {selectedEvent.details.description}</p>
              <p><strong>Timing:</strong> {selectedEvent.details.timing}</p>
              <p><strong>Location:</strong> {selectedEvent.details.location}</p>
              <p><strong>Judging Criteria:</strong> {selectedEvent.details.judgingCriteria}</p>
              <p><strong>Organizer:</strong> {selectedEvent.details.organizer}</p>
            </div>

            <div className="mt-6 text-center">
              <button
                onClick={() => setSelectedEvent(null)}
                className="px-6 py-3 bg-gradient-to-r from-pink-600 to-indigo-600 text-white font-semibold rounded-full hover:bg-gradient-to-r hover:from-pink-700 hover:to-indigo-700 transition-all duration-300"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Events;
