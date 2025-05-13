import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import event1 from '../assets/coding.jpg';
import event2 from '../assets/project.jpg';
import event3 from '../assets/robo.jpg';
import event4 from '../assets/cultural.jpg';
import event5 from '../assets/rangoli.jpeg';
import event6 from '../assets/food.jpg';
import event7 from '../assets/drama.jpg';
import event8 from '../assets/song.jpg';
import event9 from '../assets/poster.jpg';
import event10 from '../assets/rock.jpg';
import event11 from '../assets/dance.jpg';
import w1 from '../assets/w1.jpg';
import w2 from '../assets/w2.jpg';
import w3 from '../assets/w3.jpg';
import w4 from '../assets/w4.jpg';
import w5 from '../assets/w5.jpg';
import w6 from '../assets/w6.jpg';
import w7 from '../assets/w7.jpg';
import w8 from '../assets/w8.jpg';
import w9 from '../assets/w9.jpg';
import w10 from '../assets/w10.jpg';
import w11 from '../assets/w11.jpg';
import w12 from '../assets/w12.jpg';
import w13 from '../assets/w13.jpg';
import w14 from '../assets/w14.jpg';

const events = [
  {
    id: 1,
    imageSrc: event1,
    name: 'Code Puzzle',
    details: {
      description: 'A coding quiz to challenge logical and programming skills.',
      timing: 'April 20, 2025, 9:00 AM - April 21, 2025, 9:00 AM',
      location: 'Block 1 Lab F',
      judgingCriteria: 'Innovation, Functionality, Design, Presentation',
      organizer: 'Tech Fusion',
    },
  },
  {
    id: 2,
    imageSrc: event2,
    name: 'Project Exhibition',
    details: {
      description: 'Display and present innovative student projects across domains.',
      timing: 'April 22, 2025, 10:00 AM - 2:00 PM',
      location: 'AI Research Center',
      judgingCriteria: 'Originality, Impact, Technical Execution',
      organizer: 'Tech Fusion',
    },
  },
  {
    id: 3,
    imageSrc: event3,
    name: 'Robo Race',
    details: {
      description: 'Compete with your robots in high-speed challenges.',
      timing: 'April 23, 2025, 1:00 PM - 5:00 PM',
      location: 'Innovation Arena',
      judgingCriteria: 'Speed, Control, Design, Navigation',
      organizer: 'Tech Fusion',
    },
  },
  {
    id: 4,
    imageSrc: event4,
    name: 'Cultural Events',
    details: {
      description: 'Showcase of traditional and contemporary performances.',
      timing: 'April 24, 2025, 9:00 AM - 3:00 PM',
      location: 'Auditorium',
      judgingCriteria: 'Creativity, Presentation, Crowd Engagement',
      organizer: 'Tech Fusion',
    },
  },
  {
    id: 5,
    imageSrc: event5,
    name: 'Rangoli Competition',
    details: {
      description: 'Create beautiful rangoli designs using vibrant colors.',
      timing: 'April 25, 2025, 10:00 AM - 4:00 PM',
      location: 'Cultural Hall',
      judgingCriteria: 'Creativity, Neatness, Color Usage, Theme Representation',
      organizer: 'Tech Fusion',
    },
  },
  {
    id: 6,
    imageSrc: event6,
    name: 'Food Without Fire',
    details: {
      description: 'Prepare delicious dishes without using fire or heat.',
      timing: 'April 26, 2025, 9:00 AM - 5:00 PM',
      location: 'Cafeteria Hall',
      judgingCriteria: 'Taste, Presentation, Innovation, Hygiene',
      organizer: 'Tech Fusion',
    },
  },
  {
    id: 7,
    imageSrc: event7,
    name: 'Nukkad Natak',
    details: {
      description: 'Perform impactful street plays on social issues.',
      timing: 'April 27-28, 2025, 10:00 AM',
      location: 'Open Stage',
      judgingCriteria: 'Message Clarity, Acting, Engagement, Theme Relevance',
      organizer: 'Tech Fusion',
    },
  },
  {
    id: 8,
    imageSrc: event8,
    name: 'Singing',
    details: {
      description: 'Showcase your vocal talent across genres and languages.',
      timing: 'April 29, 2025, 11:00 AM - 3:00 PM',
      location: 'Auditorium',
      judgingCriteria: 'Vocal Quality, Pitch, Expression, Stage Presence',
      organizer: 'Tech Fusion',
    },
  },
  {
    id: 9,
    imageSrc: event9,
    name: 'Technical Poster',
    details: {
      description: 'Present technical concepts and innovations through posters.',
      timing: 'April 30, 2025, 9:00 AM - 1:00 PM',
      location: 'Exhibition Hall',
      judgingCriteria: 'Content Clarity, Design, Innovation, Presentation',
      organizer: 'Tech Fusion',
    },
  },
  {
    id: 10,
    imageSrc: event11,
    name: 'Inter College Dance Competition',
    details: {
      description: 'Dance teams from various colleges compete with style and energy.',
      timing: 'April 30, 2025, 2:00 PM - 6:00 PM',
      location: 'Main Auditorium',
      judgingCriteria: 'Choreography, Synchronization, Expression, Costume',
      organizer: 'Tech Fusion',
    },
  },
  {
    id: 11,
    imageSrc: event10,
    name: 'Rock Band',
    details: {
      description: 'Bands compete by performing electrifying live music sets.',
      timing: 'April 30, 2025, 6:30 PM - 9:30 PM',
      location: 'Main Stage',
      judgingCriteria: 'Music Quality, Stage Presence, Originality, Coordination',
      organizer: 'Tech Fusion',
    },
  },
  {
    id: 12,
    imageSrc: event11,
    name: 'Short Film Making',
    details: {
      description: 'Create a short film showcasing storytelling, direction, and editing skills.',
      timing: 'May 1, 2025, 10:00 AM - 4:00 PM',
      location: 'Media Lab',
      judgingCriteria: 'Storytelling, Creativity, Technical Execution, Impact',
      organizer: 'Tech Fusion',
    },
  },
  {
    id: 13,
    imageSrc: event11,
    name: 'Ad Mad Show',
    details: {
      description: 'Create fun and creative advertisements for fictional products.',
      timing: 'May 2, 2025, 11:00 AM - 3:00 PM',
      location: 'Seminar Hall',
      judgingCriteria: 'Creativity, Humor, Messaging, Presentation',
      organizer: 'Tech Fusion',
    },
  },
  {
    id: 14,
    imageSrc: event11,
    name: 'Treasure Hunt',
    details: {
      description: 'Solve clues and find hidden items in a campus-wide adventure.',
      timing: 'May 3, 2025, 9:00 AM - 1:00 PM',
      location: 'College Grounds',
      judgingCriteria: 'Teamwork, Time Management, Problem-Solving',
      organizer: 'Tech Fusion',
    },
  },
];

const winners = [
  { id: 1, imageSrc: w1, name: 'Winner 1' },
  { id: 2, imageSrc: w2, name: 'Winner 2' },
  { id: 3, imageSrc: w3, name: 'Winner 3' },
  { id: 4, imageSrc: w4, name: 'Winner 4' },
  { id: 5, imageSrc: w5, name: 'Winner 5' },
  { id: 6, imageSrc: w6, name: 'Winner 6' },
  { id: 7, imageSrc: w7, name: 'Winner 7' },
  { id: 8, imageSrc: w8, name: 'Winner 8' },
  { id: 9, imageSrc: w9, name: 'Winner 9' },
  { id: 10, imageSrc: w10, name: 'Winner 10' },
  { id: 11, imageSrc: w11, name: 'Winner 11' },
  { id: 12, imageSrc: w12, name: 'Winner 12' },
  { id: 13, imageSrc: w13, name: 'Winner 13' },
  { id: 14, imageSrc: w14, name: 'Winner 14' },
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

const WinnerCard = ({ imageSrc, winnerName }) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="group relative bg-gradient-to-br from-teal-700 via-cyan-600 to-blue-600 border-2 border-transparent rounded-3xl shadow-xl overflow-hidden transition-all duration-500 transform hover:-translate-y-3 hover:scale-105 hover:shadow-[0_0_80px_rgba(255,255,255,0.4)] hover:ring-4 hover:ring-yellow-500 animate-floating">
      <div className="relative h-64 w-full overflow-hidden">
        {!loaded && (
          <div className="absolute inset-0 bg-gray-300 animate-pulse" />
        )}
        <img
          className={`w-full h-full object-cover group-hover:scale-115 transition-transform duration-700 ease-in-out drop-shadow-2xl ${loaded ? 'opacity-100' : 'opacity-0'}`}
          src={imageSrc}
          alt={winnerName}
          onLoad={() => setLoaded(true)}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />
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

      {/* Winners Section */}
      <div className="mt-16">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-center text-white drop-shadow-lg mb-12 animate-fade-in">
          🏆 Winners of Tech Events 2024
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 max-w-7xl mx-auto px-4">
          {winners.map((winner) => (
            <WinnerCard
              key={winner.id}
              imageSrc={winner.imageSrc}
              
            />
          ))}
        </div>
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
              <Link
                to="/registration"
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